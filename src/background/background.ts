
import setStorage from "../Utils/extension/setStorage";
import storageHandler from "../Utils/extension/storageHandler";

let previousTabId: number | null = null;
let previousTabStartTime: number | null = null;

// Listen for the tab activation event
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const currentTabId = activeInfo.tabId;
    const currentTime = new Date().getTime();

    try {
        // Handle time tracking for the previous tab
        if (previousTabId !== null && previousTabId !== currentTabId && previousTabStartTime !== null) {
            await handlePreviousTabTimeTracking(previousTabId, currentTime);
        }

        // Handle the new current tab
        const currentTab = await getCurrentTab(currentTabId);
        if (currentTab && currentTab.url && !isInternalUrl(currentTab.url)) {
            const currentDomain = new URL(currentTab.url).hostname;
            console.log('Entered tab domain:', currentDomain);
            
            await storageHandler(currentDomain);
            previousTabStartTime = currentTime;
        }

        // Update the previously active tab ID
        previousTabId = currentTabId;
    } catch (error) {
        console.error('Error in tab activation handler:', error);
    }
});

// Handle window focus changes
chrome.windows.onFocusChanged.addListener(async (windowId) => {
    const currentTime = new Date().getTime();
    
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        // Browser lost focus - stop tracking time for current tab
        if (previousTabId !== null && previousTabStartTime !== null) {
            await handlePreviousTabTimeTracking(previousTabId, currentTime);
            previousTabStartTime = null;
        }
    } else {
        // Browser gained focus - start tracking time for active tab
        try {
            const tabs = await chrome.tabs.query({ active: true, windowId: windowId });
            if (tabs[0] && !isInternalUrl(tabs[0].url || '')) {
                previousTabStartTime = currentTime;
            }
        } catch (error) {
            console.error('Error handling window focus change:', error);
        }
    }
});

// Helper function to get current tab
async function getCurrentTab(tabId: number): Promise<chrome.tabs.Tab | null> {
    return new Promise((resolve) => {
        chrome.tabs.get(tabId, (tab) => {
            if (chrome.runtime.lastError) {
                console.error('Error fetching current tab:', chrome.runtime.lastError.message);
                resolve(null);
                return;
            }
            resolve(tab);
        });
    });
}

// Helper function to handle time tracking for previous tab
async function handlePreviousTabTimeTracking(tabId: number, endTime: number): Promise<void> {
    if (previousTabStartTime === null) return;

    try {
        const previousTab = await getCurrentTab(tabId);
        if (previousTab && previousTab.url && !isInternalUrl(previousTab.url)) {
            const previousDomain = new URL(previousTab.url).hostname;
            console.log('Tracking time for domain:', previousDomain);

            chrome.storage.local.get('data', async (result) => {
                if (chrome.runtime.lastError) {
                    console.error('Error getting storage data:', chrome.runtime.lastError);
                    return;
                }

                if (result.data && result.data.stats) {
                    await setStorage(result.data.stats, endTime, previousDomain, true);
                } else {
                    // Initialize storage if needed
                    await storageHandler(previousDomain);
                }
            });
        }
    } catch (error) {
        console.error('Error tracking time for previous tab:', error);
    }
}

// Helper function to check if URL is internal (chrome://, chrome-extension://, etc.)
function isInternalUrl(url: string): boolean {
    return url.startsWith('chrome://') || 
           url.startsWith('chrome-extension://') || 
           url.startsWith('moz-extension://') || 
           url.startsWith('about:') ||
           url === '';
}


