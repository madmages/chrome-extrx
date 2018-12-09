import {Observable, bindCallback} from 'rxjs';
import {Event} from "./Utility/Event";

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

    /**
     * Events
     */

    static onCreated<T=Type.Bookmarks.CreatedInfo>(): Observable<T> {
        return Bookmarks.remapEvent<T>('Created', ['id', 'bookmark']);
    }

    static onRemoved<T=Type.Bookmarks.RemovedInfo>(): Observable<T> {
        return Bookmarks.remapEvent<T>('Removed', ['id', 'removeInfo']);
    }

    static onChanged<T=Type.Bookmarks.ChangedInfo>(): Observable<T> {
        return Bookmarks.remapEvent<T>('Changed', ['id', 'changeInfo']);
    }

    static onMoved<T=Type.Bookmarks.MovedInfo>(): Observable<T> {
        return Bookmarks.remapEvent<T>('Moved', ['id', 'moveInfo']);
    }

    static onChildrenReordered<T=Type.Bookmarks.ChildrenReorderedInfo>(): Observable<T> {
        return Bookmarks.remapEvent<T>('ChildrenReordered', ['id', 'reorderInfo']);
    }

    static onImportBegan<T=void>(): Observable<T> {
        return Bookmarks.remapEvent<T>('ImportBegan');
    }

    static onImportEnded<T=void>(): Observable<T> {
        return Bookmarks.remapEvent<T>('ImportEnded');
    }

    /**
     * Local event remaper
     *
     * @param {TabsEvents} name
     * @param {string[]} argNames
     * @returns {Observable<T>}
     */
    private static remapEvent<T>(name: BookmarksEvents, argNames: string[] = []): Observable<T> {
        return Event.remapEvent<BookmarksEvents, T>(chrome.tabs, name, argNames);
    }
}