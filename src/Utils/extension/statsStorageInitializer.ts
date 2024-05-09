
async function statsStorageInitializer(){

    const newObj = {
        data: {
            stats: [],
            settings: {
                isblocked: false,
                blockedOrigins: [],
                currentTimeStamp: 0
            }
        }     
    }

    chrome.storage.local.set(newObj, async function() {
        
        chrome.storage.local.get('data', async function(result) {
            console.log('Initialised the stats', result.data); 
        })
    });

}

export default statsStorageInitializer;