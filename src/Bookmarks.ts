import {Observable, bindCallback, fromEventPattern} from 'rxjs';

type BookmarksEvents =
    'Created'
    | 'Removed'
    | 'Changed'
    | 'Moved'
    | 'ChildrenReordered'
    | 'ImportBegan'
    | 'ImportEnded'
    ;

export class Bookmarks {
    static get(idOrIdList: string[]): Observable<chrome.bookmarks.BookmarkTreeNode[]> {
        return bindCallback(chrome.bookmarks.get)(idOrIdList);
    }

    static getChildren(id: string): Observable<chrome.bookmarks.BookmarkTreeNode[]> {
        return bindCallback(chrome.bookmarks.getChildren)(id);
    }

    static getRecent(numberOfItems: number): Observable<chrome.bookmarks.BookmarkTreeNode[]> {
        return bindCallback(chrome.bookmarks.getRecent)(numberOfItems);
    }

    static getTree(): Observable<chrome.bookmarks.BookmarkTreeNode[]> {
        return bindCallback(chrome.bookmarks.getTree)();
    }

    static getSubTree(id: string): Observable<chrome.bookmarks.BookmarkTreeNode[]> {
        return bindCallback(chrome.bookmarks.getSubTree)(id);
    }

    static search(query: chrome.bookmarks.BookmarkSearchQuery): Observable<chrome.bookmarks.BookmarkTreeNode[]> {
        return bindCallback(chrome.bookmarks.search)(query);
    }

    static create(bookmark: chrome.bookmarks.BookmarkCreateArg): Observable<chrome.bookmarks.BookmarkTreeNode> {
        return bindCallback(chrome.bookmarks.create)(bookmark);
    }

    static move(id: string, destination: chrome.bookmarks.BookmarkMoveInfo): Observable<chrome.bookmarks.BookmarkTreeNode> {
        return bindCallback(chrome.bookmarks.move)(id, destination);
    }

    static update(id: string, changes: chrome.bookmarks.BookmarkChangesArg): Observable<chrome.bookmarks.BookmarkTreeNode> {
        return bindCallback(chrome.bookmarks.update)(id, changes);
    }

    static remove(id: string): Observable<void> {
        return bindCallback<string, void>(chrome.bookmarks.remove)(id);
    }

    static removeTree(id: string): Observable<void> {
        return bindCallback<string, void>(chrome.bookmarks.removeTree)(id);
    }

    static onCreated(): Observable<[string, chrome.bookmarks.BookmarkTreeNode]> {
        return Bookmarks.on('Created');
    }

    static onRemoved(): Observable<[string, chrome.bookmarks.BookmarkRemoveInfo]> {
        return Bookmarks.on('Removed');
    }

    static onChanged(): Observable<[string, chrome.bookmarks.BookmarkChangeInfo]> {
        return Bookmarks.on('Changed');
    }

    static onMoved(): Observable<[string, chrome.bookmarks.BookmarkMoveInfo]> {
        return Bookmarks.on('Moved');
    }

    static onChildrenReordered(): Observable<[string, chrome.bookmarks.BookmarkReorderInfo]> {
        return Bookmarks.on('ChildrenReordered');
    }

    static onImportBegan(): Observable<void> {
        return Bookmarks.on('ImportBegan');
    }

    static onImportEnded(): Observable<void> {
        return Bookmarks.on('ImportEnded');
    }

    private static on<T>(name: BookmarksEvents): Observable<T> {
        let tabs: any = chrome.bookmarks;
        let eventObject: chrome.events.Event<any> = tabs['on' + name];
        return fromEventPattern<T>(
            (h: () => T) => eventObject.addListener(h),
            (h: () => T) => eventObject.removeListener(h)
        );
    }
}