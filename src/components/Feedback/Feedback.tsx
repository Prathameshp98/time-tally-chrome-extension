import React from "react";

const Feedback = () => {
    return (
        <div className="h-12 w-72 rounded flex gap-8 py-3">
            <h3 className="text-base font-medium text-sky-500 cursor-pointer hover:text-sky-600">Send feedback</h3>
            <h3 className="text-base font-medium text-sky-500 cursor-pointer hover:text-sky-600">Report an issue</h3>
        </div>
    )
}

export default Feedback;