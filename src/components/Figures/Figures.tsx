import React from "react";

import Stats from "../Stats/Stats";
import Graph from "../Graph/Graph";

const Figures = () => {
    return (
        <div className="flex gap-4 w-component h-44 ml-2">
            <Stats />
            <Graph />
        </div>
    )
}

export default Figures;