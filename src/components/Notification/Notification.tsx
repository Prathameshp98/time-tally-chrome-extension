import React from "react";

import Close from '../../static/icons/close.png';
import Info from '../../static/icons/info.png';

const Notification = ({
    setShowNotification,
    message
}: {
    setShowNotification: () => void;
    message: string;
}) => {

    return (
        <div className="bg-yellow-200 rounded-lg w-component h-28 m-2 rounded flex justify-between">
            <img 
                src={Info}
                alt="info"
                className="w-20 h-20 m-4"
            />
            <div className="m-3">
                <p className="text-base mb-2" dangerouslySetInnerHTML={{ __html: message }}></p>
                <button 
                    onClick={setShowNotification}
                    className="w-20 h-8 rounded-md bg-white text-brand border-brand border-2 text-sm font-medium cursor-pointer"
                >
                    Got it
                </button>
            </div>
            <img 
                src={Close}
                alt="close"
                className="h-3 w-3 m-2 cursor-pointer"
                onClick={setShowNotification}
            />
        </div>
    )
}

export default Notification;