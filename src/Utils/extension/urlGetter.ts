
function urlGetter(): string {
    const url = window.location.href; 
    const urlObject = new URL(url);
    return urlObject.hostname;
}

export default urlGetter;