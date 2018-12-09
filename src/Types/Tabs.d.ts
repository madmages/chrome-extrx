declare namespace Type.Tabs {
    export interface ActivatedInfo {
        activeInfo: chrome.tabs.TabActiveInfo
    }

    export interface UpdatedInfo {
        tabId: number,
        changeInfo: chrome.tabs.TabChangeInfo,
        tab: chrome.tabs.Tab
    }

    export interface CreatedInfo {
        tab: chrome.tabs.Tab
    }

    export interface MovedInfo {
        tabId: number,
        moveInfo: chrome.tabs.TabMoveInfo
    }

    export interface HighlightedInfo {
        highlightInfo: chrome.tabs.HighlightInfo
    }

    export interface DetachedInfo {
        tabId: number,
        detachInfo: chrome.tabs.TabDetachInfo
    }

    export interface AttachedInfo {
        tabId: number,
        attachInfo: chrome.tabs.TabAttachInfo
    }

    export interface RemovedInfo {
        tabId: number,
        removeInfo: chrome.tabs.TabRemoveInfo
    }

    export interface ReplacedInfo {
        addedTabId: number,
        removedTabId: number,
    }

    export interface ZoomChangeInfo {
        ZoomChangeInfo: chrome.tabs.ZoomChangeInfo,
    }
}
