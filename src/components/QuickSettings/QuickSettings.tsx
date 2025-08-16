import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import { Tooltip } from 'react-tooltip';
import './toggle.css';

import clearStorage from "../../Utils/extension/clearStorage";
import disableTracking from "../../Utils/extension/disableTracking";
import { addToBlacklist, removeFromBlacklist, isBlacklisted } from "../../Utils/extension/blacklistManager";

import Add from '../../static/icons/plus.png';
import Dustbin from '../../static/icons/dustbin.png';

const QuickSettings = () => {

    const[domainName, setDomainName] = useState('');
    const[blacklist, setBlacklist] = useState(false);
    const[disableTracker, setDisableTracker] = useState(false);
    const[showBlockInput, setShowBlockInput] = useState(false);
    const[blockDomain, setBlockDomain] = useState('');

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (tabs[0]?.url) {
              const urlObject = new URL(tabs[0].url);
              const hostname = urlObject.hostname;
              setDomainName(hostname);
              
              // Check if current domain is blacklisted
              try {
                const isCurrentlyBlacklisted = await isBlacklisted(hostname);
                setBlacklist(isCurrentlyBlacklisted);
              } catch (error) {
                console.error('Error checking blacklist status:', error);
              }
            }
        });

    }, []);

    const handleDeleteAll = () => {
        clearStorage.clearAllStorage();
    };

    const handleBlacklistToggle = async () => {
        try {
            if (blacklist) {
                await removeFromBlacklist(domainName);
                setBlacklist(false);
            } else {
                await addToBlacklist(domainName);
                setBlacklist(true);
            }
        } catch (error) {
            console.error('Error updating blacklist:', error);
        }
    };

    const handleBlockWebsite = async () => {
        if (showBlockInput && blockDomain.trim()) {
            try {
                await addToBlacklist(blockDomain.trim());
                setBlockDomain('');
                setShowBlockInput(false);
                alert(`${blockDomain.trim()} has been added to the blacklist`);
            } catch (error) {
                console.error('Error adding to blacklist:', error);
                alert('Error adding domain to blacklist');
            }
        } else {
            setShowBlockInput(!showBlockInput);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBlockWebsite();
        } else if (e.key === 'Escape') {
            setShowBlockInput(false);
            setBlockDomain('');
        }
    };

    return (
        <div className="w-component h-32 m-2 mb-8 rounded p-1 flex flex-col gap-2">
            <h4 className="text-sm mb-1 font-semibold">{domainName}</h4>
            <div className="flex justify-between">
                <p className="text-sm">Blacklist this website</p>
                <Toggle
                    id='blacklist'
                    checked={blacklist}
                    onChange={handleBlacklistToggle}
                />
            </div>
            <div className="flex justify-between">
                <p className="text-sm">Disable monitoring</p>
                <Toggle
                    id='disable-tracking'
                    defaultChecked={disableTracker}
                    onChange={() => {
                        setDisableTracker(!disableTracker);
                    }} 
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div 
                        className="w-fit h-fit p-1.5 rounded border border-gray-300 bg-gray-100 flex justify-between cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={handleBlockWebsite}
                    >
                        <p className="text-sm text-gray-700">Block website</p>
                        <img 
                            src={Add}
                            alt="add"
                            className="w-3 h-3 my-1 ml-1.5"
                        />
                    </div>
                    {showBlockInput && (
                        <input
                            type="text"
                            value={blockDomain}
                            onChange={(e) => setBlockDomain(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter domain (e.g., example.com)"
                            className="flex-1 ml-2 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            autoFocus
                        />
                    )}
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