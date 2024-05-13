import React from "react";

import Stats from "../Stats/Stats";
import Graph from "../Graph/Graph";

const Figures = () => {
    return (
        <div className="flex gap-4 bg-gray-300 w-component h-44 ml-2 rounded">
            <Stats />
            <Graph />
        </div>
    )
}

export default Figures;