import React from "react";

import Socials from "../Socials/Socials";
import Feedback from "../Feedback/Feedback";

const Footer = () => {
    return (
        <div className="bg-gray-300 w-component h-12 m-2 rounded flex gap-4">
            <Socials />
            <Feedback />
        </div>
    )
}

export default Footer;