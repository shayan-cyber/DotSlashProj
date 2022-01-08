export default function Loader(){
    return (
        <>
        <div className="container inset-0 bg-black bg-opacity-40 z-10">
            <div className="container bg-offBlack p-5 px-10 animate-pulse">
                <div className="w-full flex items-center">
                    <div className="w-[50px] h-[50px] rounded-full bg-offgrey">

                    </div>
                    <div className="w-full mx-4 rounded-md bg-offgrey h-[60px]">

                    </div>

                </div>
                <div className="my-4  bg-offgrey rounded-md h-[60vh] w-full">

                </div>
                <div className="grid grid-cols-3 my-4 gap-2">
                    <div className="bg-offgrey rounded-md w-full h-[40px]">

                    </div>
                    <div className="bg-offgrey rounded-md w-full h-[40px]">

                    </div>
                    <div className="bg-offgrey rounded-md w-full h-[40px]">

                    </div>

                </div>

            </div>


        </div>
        </>
    )
}