import React from "react";

import Branding from "../Branding/Branding";

import Setting from '../../static/icons/setting.png';

const Header = () => {
    return (
        <div className="w-component h-12 m-2 rounded flex gap-13">
            <Branding />
            <div className="my-3">
                <img 
                    src={Setting}
                    alt={'settings'}
                    className="cursor-pointer"
                />
            </div>
        </div>
    )
}

export default Header;