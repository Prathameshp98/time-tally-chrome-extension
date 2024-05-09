
import storageHandler from "../Utils/extension/storageHandler";
import urlGetter from "../Utils/extension/urlGetter";
import storageClear from "../Utils/extension/clearStorage";

//global vars
let time: number;

window.onload = (() => {

    const domainName = urlGetter();
    // storageClear();
    storageHandler(domainName);

})