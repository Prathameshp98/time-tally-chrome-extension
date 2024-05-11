
import statsStorageInitializer from "./statsStorageInitializer";

import DataProps from "../../Props/data";

async function dataChecker(): Promise<DataProps>  {

    return new Promise((resolve, reject) => {
        chrome.storage.local.get('data', async function(result) {
            if (!result.data) {
                try {
                    await statsStorageInitializer();
                    chrome.storage.local.get('data', function(result) {
                        resolve(result.data);
                    });
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(result.data);
            }
        });
    });

}

async function disableAll() {
    
    const data = await dataChecker();
    const stats = data.stats;
    const settings = {
        isblocked: !data.settings.isblocked,
        ...data.settings
    };

    chrome.storage.local.set({ data: { stats: stats, settings: settings }}, async function() {
        console.log(`${settings.isblocked ? 'Disabled' : 'Enabled'} tracking.`)
    });
    
}

async function disableByOrigin(domain: string, checked: boolean) {

    const data = await dataChecker();
    const stats = data.stats;

    let updatedOrigins: string[];
    if(checked){
        updatedOrigins = [...data.settings.blockedOrigins, domain];
    } else {
        updatedOrigins = data.settings.blockedOrigins.filter((origin: string) => origin !== domain);
    }

    const settings = {
        blockedOrigins: updatedOrigins,
        ...data.settings
    }

    chrome.storage.local.set({ data: { stats: stats, settings: settings }}, async function() {
        console.log(`${settings.isblocked ? 'Disabled' : 'Enabled'} tracking.`)
    });

}

const disableTracking = {
    disableAll,
    disableByOrigin
};

export default disableTracking;