import React from "react";

import Github from '../../static/icons/github.png';
import Star from '../../static/icons/star.png';

const Socials = () => {
    return (
        <div className="h-12 w-28 rounded flex gap-2">
            <img 
                src={Github}
                alt="github"
                className="w-9 h-9 mt-1 cursor-pointer"
            />
            <img 
                src={Star}
                alt="star"
                className="w-9 h-9 mt-1 cursor-pointer"
            />
        </div>
    )
}

export default Socials;