
import React from "react";

import storageClear from "../../Utils/extension/clearStorage";

const Main = () => {

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("clicked")
        storageClear();
    };

    return (
        <div>
            <button className="border-2" onClick={handleClick}>Clear</button>
        </div>
    )
}

export default Main;