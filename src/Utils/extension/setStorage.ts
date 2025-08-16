
import StatProps from '../../Props/stats.d';

async function setStorage(statsArray: StatProps[], updatedTimeStamp?: number, domain?: string, isTimeUpdate?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
        if (updatedTimeStamp && domain && isTimeUpdate) {
            // Find the domain entry and calculate time spent
            const domainEntry = statsArray.find(entry => entry.name === domain);
            if (domainEntry && domainEntry.lastUsed) {
                const timeSpent = Math.round((updatedTimeStamp - domainEntry.lastUsed) / 1000);
                domainEntry.time += timeSpent;
                if (timeSpent > domainEntry.maxTime) {
                    domainEntry.maxTime = timeSpent;
                }
            }
        }

        // Update lastUsed timestamp for the domain
        if (updatedTimeStamp && domain) {
            const domainEntry = statsArray.find(entry => entry.name === domain);
            if (domainEntry) {
                domainEntry.lastUsed = updatedTimeStamp;
            }
        }

        chrome.storage.local.get('data', (result) => {
            if (chrome.runtime.lastError) {
                console.error('Error getting storage data:', chrome.runtime.lastError);
                reject(chrome.runtime.lastError);
                return;
            }

            const settings = result.data?.settings || {
                isblocked: false,
                blockedOrigins: [],
                currentTimeStamp: 0
            };

            chrome.storage.local.set({ 
                data: { 
                    stats: statsArray, 
                    settings: settings 
                }
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Error setting storage data:', chrome.runtime.lastError);
                    reject(chrome.runtime.lastError);
                    return;
                }
                console.log('Data successfully saved to storage');
                resolve();
            });
        });
    });
}

export default setStorage;