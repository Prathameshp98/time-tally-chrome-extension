import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assests/tailwind.css';

const app = (
    <div>
        <h1 className="text-green-500">Hello Prathamesh</h1>
    </div>
)


const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(app)
