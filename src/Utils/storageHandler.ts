
import ShortUniqueId from 'short-unique-id';
import StatProps from '../Props/stats';

import isDuplicate from './isDuplicate';
import statsStorageInitializer from './statsStorageInitializer';
import setStorage from './setStorage';


function storageHandler(domain: string) {

    chrome.storage.local.get('data', function(result) {

        let statsArray: StatProps[] = [];

        console.log(result)

        // inilialises the storage if its empty, if not then it stores it
        !result.stats ? statsStorageInitializer() : statsArray = result.stats;
        
        // checks if the user visit the same origin again else it returns false
        let obj: boolean | StatProps = isDuplicate(statsArray, domain);

        if(!obj){

            const UID = new ShortUniqueId({ length: 15 });
            obj = {
                id: UID.rnd(),
                name: domain,
                time: 0,
                maxTime: 0,
                lastUsed: new Date().toLocaleString()
            };
        } 

        const currentTimeStamp = new Date().getTime();
        console.log(currentTimeStamp, obj);

        // chrome.storage.local.get('data', function(result) {
            
        //     chrome.storage.local.set({ settings: { ...result } }, function() {

        //     })
        // })



        if(typeof obj !== 'boolean'){
            // timer(obj);
            statsArray.push(obj);
        }
        setStorage(statsArray);
        
    });

}

export default storageHandler;