import {Observable, bindCallback} from 'rxjs';
import {Event} from "./Utility/Event";

type BrowserActionEvents =
    'Clicked'
    ;

export class BrowserAction {
    static setTitle(details: chrome.browserAction.TitleDetails): Observable<void> {
        return bindCallback<chrome.browserAction.TitleDetails>(chrome.browserAction.setTitle)(details);
    }

    static getTitle(details: chrome.browserAction.TitleDetails): Observable<string> {
        return bindCallback<chrome.browserAction.TitleDetails, string>(chrome.browserAction.getTitle)(details);
    }

    static setIcon(details: chrome.browserAction.TabIconDetails): Observable<void> {
        return bindCallback<chrome.browserAction.TabIconDetails>(chrome.browserAction.setIcon)(details);
    }

    static setPopup(details: chrome.browserAction.PopupDetails): Observable<void> {
        return bindCallback<chrome.browserAction.PopupDetails>(chrome.browserAction.setPopup)(details);
    }

    static getPopup(details: chrome.browserAction.PopupDetails): Observable<string> {
        return bindCallback<chrome.browserAction.PopupDetails, string>(chrome.browserAction.getPopup)(details);
    }

    static setBadgeText(details: chrome.browserAction.BadgeTextDetails): Observable<void> {
        return bindCallback<chrome.browserAction.BadgeTextDetails>(chrome.browserAction.setBadgeText)(details);
    }

    static getBadgeText(details: chrome.browserAction.BadgeTextDetails): Observable<string> {
        return bindCallback<chrome.browserAction.BadgeTextDetails, string>(chrome.browserAction.getBadgeText)(details);
    }

    static setBadgeBackgroundColor(details: chrome.browserAction.BadgeBackgroundColorDetails): Observable<void> {
        return bindCallback<chrome.browserAction.BadgeBackgroundColorDetails>(chrome.browserAction.setBadgeBackgroundColor)(details);
    }

    static getBadgeBackgroundColor(details: chrome.browserAction.BadgeBackgroundColorDetails): Observable<chrome.browserAction.ColorArray> {
        return bindCallback<chrome.browserAction.BadgeBackgroundColorDetails, chrome.browserAction.ColorArray>(chrome.browserAction.getBadgeBackgroundColor)(details);
    }

    static enable(tabId: number): Observable<void> {
        return bindCallback<number>(chrome.browserAction.enable)(tabId);
    }

    static disable(tabId: number): Observable<void> {
        return bindCallback<number>(chrome.browserAction.disable)(tabId);
    }

    /**
     * Events
     */

    static onClicked<T=Type.BrowserAction.ClickedInfo>(): Observable<T> {
        return BrowserAction.remapEvent<T>('Clicked', ['tab']);
    }

    /**
     * Local event remaper
     *
     * @param {TabsEvents} name
     * @param {string[]} argNames
     * @returns {Observable<T>}
     */
    private static remapEvent<T>(name: BrowserActionEvents, argNames: string[] = []): Observable<T> {
        return Event.remapEvent<BrowserActionEvents, T>(chrome.browserAction, name, argNames);
    }
}