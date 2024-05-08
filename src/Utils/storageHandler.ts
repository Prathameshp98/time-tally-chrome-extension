
import ShortUniqueId from 'short-unique-id';
import StatProps from '../Props/stats';

import isDuplicate from './isDuplicate';
import statsStorageInitializer from './statsStorageInitializer';
import setStorage from './setStorage';


function storageHandler(domain: string) {

    chrome.storage.local.get('data', function(result) {

        let statsArray: StatProps[] = [];

        // inilialises the storage if its empty, if not then it stores it
        !result.data ? statsStorageInitializer() : statsArray = result.data.stats;
        
        // checks if the user visit the same origin again else it returns false
        let obj: boolean | StatProps = isDuplicate(statsArray, domain);

        // if newly visited the website
        if(!obj){

            // const UID = new ShortUniqueId({ length: 15 });
            // obj = {
            //     id: UID.rnd(),
            //     name: domain,
            //     time: 0,
            //     maxTime: 0,
            //     lastUsed: new Date().getTime()
            // };

            obj = {
                id: Math.random(),
                name: domain,
                time: 0,
                maxTime: 0,
                lastUsed: new Date().getTime()
            }

            if(typeof obj !== 'boolean'){
                statsArray.push(obj);
            }
            setStorage(statsArray);

        } else {
            // sets the variable to current time stamp if the origin is already present in the storage
            // in order to update lastUsed
            const currentTimeStamp = new Date().getTime();

            if(typeof obj !== 'boolean'){
                setStorage(statsArray, currentTimeStamp, obj.name);
            }
            
        }

    });

}

export default storageHandler;