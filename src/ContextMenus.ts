import {Observable, bindCallback} from 'rxjs';
import {Event} from "./Utility/Event";

type ContextMenusEvents = 'Clicked';

export class ContextMenus {
    static create(createProperties: chrome.contextMenus.CreateProperties): Observable<void> {
        return bindCallback(chrome.contextMenus.create)(createProperties);
    }

    static update(id: number, updateProperties: chrome.contextMenus.UpdateProperties): Observable<void> {
        return bindCallback(chrome.contextMenus.update)(id, updateProperties);
    }

    static remove(menuItemId: number): Observable<void> {
        return bindCallback(chrome.contextMenus.remove)(menuItemId);
    }

    static removeAll(): Observable<void> {
        return bindCallback(chrome.contextMenus.removeAll)();
    }

    /**
     * Events
     */

    static onClicked<T=Type.ContextMenus.ClickedInfo>(): Observable<T> {
        return ContextMenus.remapEvent<T>('Clicked', ['info', 'tab']);
    }

    /**
     * Local event remaper
     *
     * @param {TabsEvents} name
     * @param {string[]} argNames
     * @returns {Observable<T>}
     */
    private static remapEvent<T>(name: ContextMenusEvents, argNames: string[]): Observable<T> {
        return Event.remapEvent<ContextMenusEvents, T>(chrome.alarms, name, argNames);
    }
}