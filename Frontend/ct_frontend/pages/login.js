import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import { useRouter } from "next/router";


export default function Login() {

    
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [ alert, setAlert ] = useState("");
    const [typealert, setTypeAlert] = useState("");
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies(["username"]);
    const [auth_token, setAuthToken] = useState("");
    const [loading, setLoading] = useState(false);

    var cookieExpiry = new Date();
    cookieExpiry.setDate(cookieExpiry.getDate()+60);

    const router = useRouter();



    const handleSubmit = () => {
        if(username == ""){
            setTypeAlert("error")
            setAlert("Please enter your username");
        }else if(password == ""){
            setTypeAlert("error")
            setAlert("Please enter your password");
           
        }else{
          setLoading(true)
           axios.post("http://127.0.0.1:8000/api-token-auth/", {
            username: username,
            password: password
            })
            
            
            .then(res => {
              console.log("res",res);
              if(res.status === 200){

                
                setCookie("token", res.data.token,{expires: cookieExpiry});
                setLoading(false)


                setTypeAlert("success");
                setAlert("Login Successful");
                
                setUsername("");
                setPassword("");
                
                return res.data.token;
              }
          }).then((resp) => {
            console.log("auth: ",resp);
            

            axios.post('http://127.0.0.1:8000/api/get_user_details/',{
              token:resp
            }).then(res=>{
            
              console.log( res.data.username);
              setCookieUsername("username", res.data.username, {expires: cookieExpiry});
              setLoading(false)
              router.push("/createroom");

            }
            )




          })
          .catch(err => {
            if(err.response.status === 400){
              
              setTypeAlert("error");
              setAlert("Invalid credentials");
              console.log("err",err.response.data);
            }else{
              setTypeAlert("error");
              setAlert("Something went wrong");
              
            }
            setLoading(false)
          })
        }
        
        console.log(password, username);
        

    }



  return (
    <>
      {loading ? <Spinner /> : ""}


      {alert && <Alert typeAlert={typealert} message={alert} />}
 

      <motion.div className="container w-full mt-4"
      initial={{
          opacity: 0,
          translateY: '100vh',
        }}
        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
        transition={{ duration: 0.8 }}
        >
        <div>
          <h1 className="text-center mt-5 text-3xl font-bold">
            Login
          </h1>
          <p className="text-center text-md mt-3 text-white">
            Do not have an account ?
            <Link href="/register">
              <a className=" text-blue-500 hover:text-blue-700 mx-1">Register</a>
            </Link>
          </p>
        </div>

        <div className="flex w-full justify-center mt-5">
          <div className="container md:w-1/2 px-3 md:px-0">
            <div className="grid grid-cols-1 mt-3">
            
              <input className="bg-offBlack rounded-[10px] p-3 " type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            
            <div className="grid grid-cols-1 mt-3">
              <input className="bg-offBlack rounded-[10px] p-3 " type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
     
            </div>

            <button className="bg-primary hover:bg-offPrimary hover:scale-[100.5%] ease-in-out duration-100 text-white rounded-[12px] px-3 py-2 font-bold w-full mt-5" onClick={handleSubmit}>Login</button>
          </div>
        </div>
      </motion.div>
    </>
  );
}