
const Session = () => {
    return (
        <div className="bg-white ">
            <div className="flex flex-col relative items-center justify-center gap-10 py-10 p-7">
                <h1 className="text-3xl">Dear Student</h1>
                <div className="flex max-sm:flex-col gap-10 justify-center items-center">
                    <div className="flex basis-1/2">
                        <img className="w-auto" src="images/session.png" alt="" />
                    </div>
                    <div className="flex bg-c_5 gap-10 basis-1/2 py-20 max-sm:px-5 flex-col justify-center items-center">
                        <span className=" text-center font-bold text-xl">
                            <h2>Start Your Session And Navigate</h2>
                            <h2>To Moodle</h2>
                        </span>
                        <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl">Start Session</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Session
