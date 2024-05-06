import React from 'react';
import { createRoot } from 'react-dom/client';
import '../assests/tailwind.css';

const app = (
    <div className="w-96">
        <h1 className="text-blue-500">Options</h1>
    </div>
)


const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(app)
