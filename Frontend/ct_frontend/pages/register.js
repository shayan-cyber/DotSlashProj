import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import Alert from "../Components/Alert";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import Spinner from "../Components/Spinner";
import { useRouter } from "next/router";


export default function Register() {

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [typealert, setTypeAlert] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies(["username"]);
  const [loading, setLoading] = useState(false);

  var cookieExpiry = new Date();
  cookieExpiry.setDate(cookieExpiry.getDate()+60);
  const router = useRouter();

  const handleSubmit = () => {
    console.log(username, fullname, email, password, confirmPassword);
    if (username == "") {
      setTypeAlert("error");
      setAlert("Please enter your username");
    }
    else if (fullname == "") {
      setTypeAlert("error");
      setAlert("Please enter your fullname");
    }
    else if (email == "") {
      setTypeAlert("error");
      setAlert("Please enter your email");
    }
    else if (password == "") {
      setTypeAlert("error");
      setAlert("Please enter your password");
    }
    else if (confirmPassword == "") {
      setTypeAlert("error");
      setAlert("Please enter your confirm password");
    }

    else if (password !== confirmPassword) {
      setAlert("Password and Confirm Password do not match");
      setTypeAlert("error");
    }
    else {
      setLoading(true);
      axios
        .post("http://127.0.0.1:8000/api/register/", {
          username: username,
          first_name: fullname,
          email: email,
          password: password
        })
        .then(res => {
          console.log(res);
          setAlert("Signed up successfully");
          setTypeAlert("success");
          setCookie("token", res.data.token, {expires: cookieExpiry});
          setCookieUsername("username", res.data.username, {expires: cookieExpiry});
          setLoading(false);
          router.push("/createroom");
          
        })
        .catch(err => {
          console.log(err);
          setAlert("Register Failed");
          setTypeAlert("error");
          setLoading(false);
        });
    }




  }



  return (
    <>
      {loading ? <Spinner /> : ""}


      {alert && <Alert typeAlert={typealert} message={alert} />}
      <motion.div className="container w-full"
        initial={{
          opacity: 0,
          translateY: "-100vh",
        }}
        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="text-center mt-5 text-3xl font-bold">
            Create Account
          </h1>
          <p className="text-center text-md mt-3 text-white">
            Already have an account ?
            <Link href="/login">
              <a className=" text-blue-500 hover:text-blue-700 mx-1">Login</a>
            </Link>
          </p>
        </div>

        <div className="flex w-full justify-center mt-5">
          <div className="container md:w-1/2 px-3 md:px-0">
            <div className="grid grid-cols-2  gap-5 mt-3">
              <input className="bg-offBlack rounded-[10px] p-3 " placeholder="Full Name" type="text" value={fullname} onChange={e => setFullname(e.target.value)} />
              <input className="bg-offBlack rounded-[10px] p-3 " type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="grid grid-cols-1  mt-3">
              <input className="bg-offBlack rounded-[10px] p-3 " type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-2  gap-5 mt-3">
              <input className="bg-offBlack rounded-[10px] p-3 " type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <input className="bg-offBlack rounded-[10px] p-3 " type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <button className="bg-primary hover:bg-offPrimary hover:scale-[100.5%] ease-in-out duration-100 text-white rounded-[12px] px-3 py-2 font-bold w-full mt-5" onClick={handleSubmit}>Sign Up</button>
          </div>
        </div>
      </motion.div>
    </>
  );
}