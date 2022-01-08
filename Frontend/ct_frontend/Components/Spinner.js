import {ImSpinner2} from 'react-icons/im'


export default function Spinner(){
    return (
        <>
            <div className="container absolute inset-0 bg-black bg-opacity-40 z-20 ">
                <div className="flex justify-center items-center w-full h-full">
                    <ImSpinner2 className="animate-spin text-white opacity-100 text-5xl"/>

                </div>
            </div>
        </>
    )
}