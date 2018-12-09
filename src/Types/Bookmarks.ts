declare namespace Type.Bookmarks {
    export interface ChildrenReorderedInfo {
        id: string,
        reorderInfo: chrome.bookmarks.BookmarkReorderInfo,
    }

    export interface MovedInfo {
        id: string,
        moveInfo: chrome.bookmarks.BookmarkMoveInfo,
    }

    export interface ChangedInfo {
        id: string,
        changeInfo: chrome.bookmarks.BookmarkChangeInfo,
    }

    export interface RemovedInfo {
        id: string,
        removeInfo: chrome.bookmarks.BookmarkRemoveInfo,
    }

    export interface CreatedInfo {
        id: string,
        bookmark: chrome.bookmarks.BookmarkTreeNode,
    }
}
