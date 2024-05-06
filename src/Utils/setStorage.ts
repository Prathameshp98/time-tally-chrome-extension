
import StatProps from '../Props/stats';

function setStorage(statsArray: StatProps[]){
    chrome.storage.local.set({ stats: statsArray }, function() {
        console.log('Data is saved');   

        chrome.storage.local.get('stats', function(result) {
            console.log('Data retrieved from storage:', result.stats);
        });
    });
}

export default setStorage;