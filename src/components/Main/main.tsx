
import React, { useEffect, useState } from "react";

import StatProps from "../../Props/stats";
import getTimeDifference from "../../Utils/general/getTimeDifference";

import Header from "../Header/Header";
import Notification from "../Notification/Notification";
import QuickSettings from "../QuickSettings/QuickSettings";
import Figures from "../Figures/Figures";
import Footer from "../Footer/Footer";

const Main = () => {

    const[showNotification, setShowNotification] = useState(true);
    const[message, setMessage] = useState('');

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.url) {
            const urlObject = new URL(tabs[0].url);
            chrome.storage.local.get('data', async function(result) {

                let statsArray: StatProps[] = [];
                if(result.data) {
                    statsArray = result.data.stats;

                    const isVisted = statsArray.filter(each => urlObject.hostname === each.name);
                    if(isVisted.length){
                        setMessage(`Hey, you have been here <strong>${getTimeDifference(isVisted[0].lastUsed, new Date().getTime())}</strong> ago.`);
                    } else {
                        setMessage('Hi, its your first visit on this website.');
                    }
                } else {
                    setMessage('Hi, its your first visit on this website.');
                }
            })
          }
        });
    }, []);

    return (
        <div className="w-full h-fit">
            <Header />
            {showNotification && 
                <Notification 
                    setShowNotification={() => setShowNotification(false)}  
                    message={message}
                />
            }
            <QuickSettings />
            <Figures />
            <Footer />
        </div>
    )
}

export default Main;