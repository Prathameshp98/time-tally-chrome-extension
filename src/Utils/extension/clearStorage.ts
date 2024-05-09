
import StatProps from "../../Props/stats";

function clearAllStorage(){
    chrome.storage.local.clear(function() {
        console.log('All data has been cleared from local storage');
    });
}

function clearStorageByOrigin(domain: string | string[]){

    chrome.storage.local.get('data', function(result) {
        const allStats = result?.data?.stats;
        let updatedStats: StatProps[];

        if(Array.isArray(domain)){
            updatedStats = allStats.filter((obj: StatProps) => {
                return !domain.includes(obj.name);
            });
        } else {
            updatedStats = allStats.filter((obj: StatProps) => obj.name !== domain);
        }
        

        chrome.storage.local.set({ data: { stats: updatedStats, settings: result.data.settings }}, function() {
            console.log(`Deleted ${domain} data`);
        });
    })
}

const clearStorage = {
    clearAllStorage,
    clearStorageByOrigin
}

export default clearStorage;

