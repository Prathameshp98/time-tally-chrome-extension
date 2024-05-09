
import storageHandler from "../Utils/extension/storageHandler";
import urlGetter from "../Utils/extension/urlGetter";

window.onload = (() => {

    const domainName = urlGetter();
    storageHandler(domainName);

})