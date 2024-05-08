import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assests/tailwind.css';

import Main from '../components/Main/main';

const app = (
        <div className=''>
            <h1 className="text-green-500">Hello Prathamesh</h1>
            <Main />
        </div>
    )

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(app);