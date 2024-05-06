
import storageHandler from "../Utils/storageHandler";
import urlGetter from "../Utils/urlGetter";
import storageClear from "../Utils/clearStorage";

//global vars
let time: number;

window.onload = (() => {

    const domainName = urlGetter();
    storageClear();
    // storageHandler(domainName);

})

const style = document.createElement('style');
style.innerHTML = `
    body {
        position: fixed;
        top: 0;
        right: 0;
        width: 300px; /* Adjust width as needed */
        height: 100%; /* Full height of the screen */
        background-color: #f0f0f0; /* Background color */
        box-shadow: -3px 0 5px rgba(0, 0, 0, 0.3); /* Optional shadow effect */
        z-index: 1000; /* z-index to keep the drawer above other content */
    }
`;
document.head.appendChild(style);