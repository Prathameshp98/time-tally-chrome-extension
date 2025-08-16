
import StatProps from "../../Props/stats.d";

async function clearAllStorage(){
    chrome.storage.local.clear(async function() {
        console.log('All data has been cleared from local storage');
    });
}

async function clearStorageByOrigin(domain: string | string[]){

    chrome.storage.local.get('data', async function(result) {
        const allStats = result?.data?.stats;
        let updatedStats: StatProps[];

        if(Array.isArray(domain)){
            updatedStats = await allStats.filter((obj: StatProps) => {
                return !domain.includes(obj.name);
            });
        } else {
            updatedStats = await allStats.filter((obj: StatProps) => obj.name !== domain);
        }
        

        chrome.storage.local.set({ data: { stats: updatedStats, settings: result.data.settings }}, async function() {
            console.log(`Deleted ${domain} data`);
        });
    })
}

const clearStorage = {
    clearAllStorage,
    clearStorageByOrigin
};

export default clearStorage;

