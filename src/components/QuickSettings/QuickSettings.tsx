import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import { Tooltip } from 'react-tooltip';
import './toggle.css';

import clearStorage from "../../Utils/extension/clearStorage";
import disableTracking from "../../Utils/extension/disableTracking";

import Add from '../../static/icons/plus.png';
import Dustbin from '../../static/icons/dustbin.png';

const QuickSettings = () => {

    const[domainName, setDomainName] = useState('');
    const[blacklist, setBlacklist] = useState(false);
    const[disableTracker, setDisableTracker] = useState(false);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.url) {
              const urlObject = new URL(tabs[0].url);
              setDomainName(urlObject.hostname);
            }
        });

    }, []);

    const handleDeleteAll = () => {
        clearStorage.clearAllStorage();
    };

    return (
        <div className="w-component h-32 m-2 rounded p-1 flex flex-col gap-2">
            <h4 className="text-sm mb-1 font-semibold">{domainName}</h4>
            <div className="flex justify-between">
                <p className="text-sm">Blacklist this website</p>
                <Toggle
                    id='blacklist'
                    defaultChecked={blacklist}
                    onChange={() => {
                        setBlacklist(!blacklist);
                    }} 
                />
            </div>
            <div className="flex justify-between">
                <p className="text-sm">Disable mointoring</p>
                <Toggle
                    id='disable-tracking'
                    defaultChecked={disableTracker}
                    onChange={() => {
                        setDisableTracker(!disableTracker);
                    }} 
                />
            </div>
            <div className="flex justify-between">
                <div className="w-fit h-fit p-1.5 rounded border-1 border-grey-text bg-light-grey flex justify-between cursor-pointer">
                    <p className="text-sm text-dark-grey">Block website</p>
                    <img 
                        src={Add}
                        alt="add"
                        className="w-3 h-3 my-1 ml-1.5"
                    />
                </div>
                <div className="flex justify-between">
                    <p className="text-base text-dark-grey my-2 mx-1">Delete all data</p>
                    <Tooltip id="dustbin" />
                    <a 
                        data-tooltip-id="dustbin" 
                        data-tooltip-content="Delete all data"
                        data-tooltip-offset={5}
                    >
                        <img 
                            src={Dustbin}
                            alt="delete"
                            className="w-5 h-5 my-2.5 mx-1 cursor-pointer"
                            onClick={handleDeleteAll}
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default QuickSettings;