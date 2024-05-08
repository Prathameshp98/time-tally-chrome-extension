
import storageHandler from "../Utils/storageHandler";
import urlGetter from "../Utils/urlGetter";
import storageClear from "../Utils/clearStorage";

//global vars
let time: number;

window.onload = (() => {

    const domainName = urlGetter();
    // storageClear();
    storageHandler(domainName);

})