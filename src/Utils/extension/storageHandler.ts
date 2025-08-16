
import ShortUniqueId from 'short-unique-id';
import StatProps from '../../Props/stats.d';

import isDuplicate from './isDuplicate';
import statsStorageInitializer from './statsStorageInitializer';
import setStorage from './setStorage';

import generateRandomId from '../general/generateRandomId';


async function storageHandler(domain: string): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('data', async (result) => {
            try {
                if (chrome.runtime.lastError) {
                    console.error('Error getting storage data:', chrome.runtime.lastError);
                    reject(chrome.runtime.lastError);
                    return;
                }

                let statsArray: StatProps[] = [];

                // Initialize storage if it's empty, otherwise get existing stats
                if (!result.data) {
                    await statsStorageInitializer();
                    statsArray = [];
                } else {
                    statsArray = result.data.stats || [];
                }
                
                // Check if the user has visited this domain before
                let existingEntry: boolean | StatProps = isDuplicate(statsArray, domain);

                // If this is a new website visit
                if (!existingEntry) {
                    const newEntry: StatProps = {
                        id: await generateRandomId(20),
                        name: domain,
                        time: 0,
                        maxTime: 0,
                        lastUsed: new Date().getTime()
                    };

                    statsArray.push(newEntry);
                    await setStorage(statsArray);
                    resolve();

                } else {
                    // Update lastUsed timestamp for existing domain
                    const currentTimeStamp = new Date().getTime();
                    if (typeof existingEntry !== 'boolean') {
                        await setStorage(statsArray, currentTimeStamp, existingEntry.name);
                        resolve();
                    }
                }
            } catch (error) {
                console.error('Error in storageHandler:', error);
                reject(error);
            }
        });
    });
}

export default storageHandler;