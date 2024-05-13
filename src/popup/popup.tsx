import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assests/tailwind.css';

import Main from '../components/Main/main';

const app = (
        <div className='w-full h-full p-2'>
            <Main />
        </div>
    )

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(app);