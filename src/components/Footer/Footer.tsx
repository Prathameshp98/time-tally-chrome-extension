import React from "react";

import Socials from "../Socials/Socials";
import Feedback from "../Feedback/Feedback";

const Footer = () => {
    return (
        <div className="w-component h-12 m-2 rounded flex gap-8">
            <Socials />
            <Feedback />
        </div>
    )
}

export default Footer;