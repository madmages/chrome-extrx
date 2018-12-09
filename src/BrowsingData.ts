import {Observable, bindCallback} from 'rxjs';

export class BrowsingData {

    static settings(): Observable<chrome.browsingData.SettingsCallback> {
        return bindCallback<chrome.browsingData.SettingsCallback>(chrome.browsingData.settings)();
    }

    static remove(options: chrome.browsingData.RemovalOptions, dataToRemove: chrome.browsingData.DataTypeSet): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions, chrome.browsingData.DataTypeSet>(chrome.browsingData.remove)(options, dataToRemove);
    }

    static removeAppcache(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeAppcache)(options);
    }

    static removeCache(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeCache)(options);
    }

    static removeCookies(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeCookies)(options);
    }

    static removeDownloads(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeDownloads)(options);
    }

    static removeFileSystems(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeFileSystems)(options);
    }

    static removeFormData(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeFormData)(options);
    }

    static removeHistory(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeHistory)(options);
    }

    static removeIndexedDB(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeIndexedDB)(options);
    }

    static removeLocalStorage(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeLocalStorage)(options);
    }

    static removePluginData(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removePluginData)(options);
    }

    static removePasswords(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removePasswords)(options);
    }

    static removeWebSQL(options: chrome.browsingData.RemovalOptions): Observable<void> {
        return bindCallback<chrome.browsingData.RemovalOptions>(chrome.browsingData.removeWebSQL)(options);
    }
}