import React from "react";
import { Tooltip } from 'react-tooltip';

import Github from '../../static/icons/github.png';
import Star from '../../static/icons/star.png';

const Socials = () => {
    return (
        <div className="h-12 w-28 rounded flex gap-2">
            <Tooltip id="github" />
            <a 
                data-tooltip-id="github" 
                data-tooltip-content="Github"
                data-tooltip-offset={5}
            >
                <img 
                    src={Github}
                    alt="github"
                    className="w-7 h-7 mt-3 cursor-pointer"
                />
            </a> 
            <Tooltip id="star" />
            <a 
                data-tooltip-id="star" 
                data-tooltip-content="Chrome store"
                data-tooltip-offset={5}
            >
                <img 
                    src={Star}
                    alt="star"
                    className="w-7 h-7 mt-3 cursor-pointer"
                />
            </a>
        </div>
    )
}

export default Socials;