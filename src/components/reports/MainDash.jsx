/* eslint-disable react/prop-types */

import TotalSessionsGraph from "./graphs/TotalSessionsGraph";

const MainDash = ({ sessions }) => {
    return (
        <div className="flex flex-wrap overflow-auto h-[90dvh] justify-around">
            <div>
                
            </div>
            <div className="w-1/2 basis-[100%] h-1/2 overflow-auto p-4 m-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-2">Total Session Duration Graph</h2>
                <TotalSessionsGraph sessions={sessions} />
            </div>

            <div className="w-1/2 basis-[100%] h-1/2 overflow-auto p-4 m-4 bg-white rounded shadow">
                <h2 className="text-xl font-bold mb-2">Total Session Duration Graph</h2>
                <TotalSessionsGraph sessions={sessions} />
            </div>
        </div>
    )
}

export default MainDash;