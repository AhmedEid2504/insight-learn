
const Materials = () => {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-4xl text-center">Materials</h1>

            <div className="flex justify-center items-center">
                <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl" >Add Materials</button> 
            </div>
            <div className="w-[60vw] h-[70vh] bg-white shadow-md rounded-md ">
                <div className="flex flex-col gap-5 p-5">
                    <h2 className="text-2xl">Materials</h2>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl">Material 1</h3>
                            <div className="flex gap-5">
                                <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl" >Edit</button> 
                                <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl" >Delete</button> 
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl">Material 2</h3>
                            <div className="flex gap-5">
                                <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl" >Edit</button> 
                                <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl" >Delete</button> 
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl">Material 3</h3>
                            <div className="flex gap-5">
                                <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl" >Edit</button> 
                                <button className="bg-transparent text-black border-2 hover:bg-black hover:text-white transition-all duration-200 ease-in px-3 py-1 rounded-3xl" >Delete</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Materials
