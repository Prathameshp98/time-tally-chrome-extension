
import React from "react";

import storageClear from "../../Utils/extension/clearStorage";

import Header from "../Header/Header";
import Notification from "../Notification/Notification";
import QuickSettings from "../QuickSettings/QuickSettings";
import Figures from "../Figures/Figures";
import Footer from "../Footer/Footer";

const Main = () => {

    // const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    //     console.log("clicked")
    //     storageClear.clearAllStorage();
    // };

    return (
        <div className="w-full h-full">
            {/* <button className="border-2" onClick={handleClick}>Clear</button> */}
            <Header />
            <Notification />
            <QuickSettings />
            <Figures />
            <Footer />
        </div>
    )
}

export default Main;