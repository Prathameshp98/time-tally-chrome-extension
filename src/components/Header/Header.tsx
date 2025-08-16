import React from "react";
import { Tooltip } from 'react-tooltip';

import Branding from "../Branding/Branding";

import Setting from '../../static/icons/setting.png';

const Header = () => {
    return (
        <div className="w-component h-12 m-2 rounded flex justify-between items-center">
            <Branding />
            <div className="flex items-center">
                <Tooltip id="setting" />
                <a 
                    data-tooltip-id="setting" 
                    data-tooltip-content="Setting"
                    className="flex items-center"
                >
                    <img 
                        src={Setting}
                        alt={'settings'}
                        className="cursor-pointer w-5 h-5"
                    />
                </a>
            </div>
        </div>
    )
}

export default Header;