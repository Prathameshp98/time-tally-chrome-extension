
function statsStorageInitializer(){

    const newObj = {
        stats: [],
        settings: {
            isblocked: false,
            blockedOrigins: [],
            currentTimeStamp: 0
        }
    }

    chrome.storage.local.set(newObj, function() {
        console.log('Initialised the stats');   
    });

}

export default statsStorageInitializer;