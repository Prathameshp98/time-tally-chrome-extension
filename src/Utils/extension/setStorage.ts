
import StatProps from '../../Props/stats';

async function setStorage(statsArray: StatProps[], updatedTimeStamp?: number, domain?: string, isTimeUpdate?: boolean){

    console.log(domain, isTimeUpdate)

    if(updatedTimeStamp && domain){
        statsArray.forEach(each => {
            if(each.name === domain){
                each.lastUsed = updatedTimeStamp;
            }       
            if(isTimeUpdate){
                each.time +=  Math.round(((updatedTimeStamp - each.lastUsed) / 1000));
            }
        })

        console.log(statsArray, "*******************")
    }

    chrome.storage.local.get('data', async function(result) {
        console.log(statsArray, "++++++++++++++++++++++")

        chrome.storage.local.set({ data: { stats: statsArray, settings: result.data.settings }}, async function() { 
    
            chrome.storage.local.get('data', async function(result) {
                console.log('Data retrieved from storage:', result.data);
            });
        });
    })

}

export default setStorage;