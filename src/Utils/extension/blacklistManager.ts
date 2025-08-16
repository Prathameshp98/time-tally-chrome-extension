/**
 * Utility functions for managing website blacklist
 */

export interface BlacklistEntry {
    domain: string;
    addedAt: number;
}

/**
 * Add a domain to the blacklist
 */
export const addToBlacklist = async (domain: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('data', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }

            const data = result.data || { stats: [], settings: { isblocked: false, blockedOrigins: [], currentTimeStamp: 0 } };
            
            // Ensure blockedOrigins exists and is an array
            if (!data.settings.blockedOrigins) {
                data.settings.blockedOrigins = [];
            }

            // Check if domain is already blacklisted
            const isAlreadyBlocked = data.settings.blockedOrigins.some((entry: BlacklistEntry) => entry.domain === domain);
            
            if (!isAlreadyBlocked) {
                const newEntry: BlacklistEntry = {
                    domain: domain,
                    addedAt: new Date().getTime()
                };
                data.settings.blockedOrigins.push(newEntry);
            }

            chrome.storage.local.set({ data }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                    return;
                }
                resolve();
            });
        });
    });
};

/**
 * Remove a domain from the blacklist
 */
export const removeFromBlacklist = async (domain: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('data', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }

            const data = result.data;
            if (data && data.settings && data.settings.blockedOrigins) {
                data.settings.blockedOrigins = data.settings.blockedOrigins.filter(
                    (entry: BlacklistEntry) => entry.domain !== domain
                );

                chrome.storage.local.set({ data }, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                        return;
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
};

/**
 * Check if a domain is blacklisted
 */
export const isBlacklisted = async (domain: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('data', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }

            const data = result.data;
            if (data && data.settings && data.settings.blockedOrigins) {
                const isBlocked = data.settings.blockedOrigins.some(
                    (entry: BlacklistEntry) => entry.domain === domain
                );
                resolve(isBlocked);
            } else {
                resolve(false);
            }
        });
    });
};

/**
 * Get all blacklisted domains
 */
export const getBlacklist = async (): Promise<BlacklistEntry[]> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('data', (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }

            const data = result.data;
            if (data && data.settings && data.settings.blockedOrigins) {
                resolve(data.settings.blockedOrigins);
            } else {
                resolve([]);
            }
        });
    });
};
