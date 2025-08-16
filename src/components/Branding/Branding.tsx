import React from "react";

const ClockIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#fc546c" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="#fc546c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Branding = () => {
    return (
        <div className="h-12 w-80 rounded flex items-center gap-2 cursor-pointer">
            <ClockIcon />
            <h1 className="text-2xl font-normal">Time Tally</h1>
        </div>
    )
}

export default Branding;