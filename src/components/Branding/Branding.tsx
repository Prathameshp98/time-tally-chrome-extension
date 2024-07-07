import React from "react";
import Brandlogo from "../../static/icons/clock-32.png";

const Branding = () => {
    return (
        <div className="h-12 w-80 rounded flex gap-2 cursor-pointer">
            <img 
                src={Brandlogo}
                alt="brand logo"
                height={55}
                width={50}
            />
            <h1 className="text-2xl font-normal py-2">Time Tally</h1>
        </div>
    )
}

export default Branding;