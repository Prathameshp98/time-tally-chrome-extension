
import ShortUniqueId from 'short-unique-id';
import StatProps from '../../Props/stats';

import isDuplicate from './isDuplicate';
import statsStorageInitializer from './statsStorageInitializer';
import setStorage from './setStorage';

import generateRandomId from '../general/generateRandomId';


async function storageHandler(domain: string) {

    chrome.storage.local.get('data', async function(result) {

        let statsArray: StatProps[] = [];

        // inilialises the storage if its empty, if not then it stores it
        !result.data ? await statsStorageInitializer() : statsArray = result.data.stats;
        
        // checks if the user visit the same origin again else it returns false
        let obj: boolean | StatProps = isDuplicate(statsArray, domain);

        // if newly visited the website
        if(!obj){

            obj = {
                id: await generateRandomId(20),
                name: domain,
                time: 0,
                maxTime: 0,
                lastUsed: new Date().getTime()
            }

            if(typeof obj !== 'boolean'){
                statsArray.push(obj);
            }
            await setStorage(statsArray);

        } else {
            // sets the variable to current time stamp if the origin is already present in the storage
            // in order to update lastUsed
            const currentTimeStamp = new Date().getTime();

            if(typeof obj !== 'boolean'){
                await setStorage(statsArray, currentTimeStamp, obj.name);
            }
            
        }

    });

}

export default storageHandler;