
import StatProps from '../Props/stats';

function setStorage(statsArray: StatProps[], updatedTimeStamp?: number, domain?: string, isTimeUpdate?: boolean){

    if(updatedTimeStamp && domain){
        statsArray.map(each => {
            if(each.name === domain){
                each.lastUsed = updatedTimeStamp;
            }       
            if(isTimeUpdate){
                each.time +=  Math.round(((updatedTimeStamp - each.lastUsed) / 1000));
            }
        })
    }

    chrome.storage.local.get('data', function(result) {

        chrome.storage.local.set({ data: { stats: statsArray, settings: result.data.settings }}, function() {
            console.log('Data is saved');   
    
            chrome.storage.local.get('data', function(result) {
                console.log('Data retrieved from storage:', result.data);
            });
        });
    })

}

export default setStorage;