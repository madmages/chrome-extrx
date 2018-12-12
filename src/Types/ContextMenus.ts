declare namespace Type.ContextMenus {
    export interface ClickedInfo {
        info: chrome.contextMenus.OnClickData,
        tab: chrome.tabs.Tab,
    }
}
