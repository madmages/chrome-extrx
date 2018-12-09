import {Observable, bindCallback, from, fromEventPattern} from "rxjs";
import {map} from "rxjs/operators";

type TabsEvents =
    'Created'
    | 'Updated'
    | 'Moved'
    | 'Activated'
    | 'Highlighted'
    | 'Detached'
    | 'Attached'
    | 'Removed'
    | 'Replaced'
    | 'ZoomChange'
    ;

export class Tabs {
    static get(id: number): Observable<chrome.tabs.Tab> {
        return bindCallback(chrome.tabs.get)(id);
    }

    static getCurrent(): Observable<chrome.tabs.Tab> {
        return bindCallback(chrome.tabs.getCurrent)();
    }

    static create(createProperties: chrome.tabs.CreateProperties = {}) {
        return bindCallback(chrome.tabs.create)(createProperties);
    }

    static duplicate(tabId: number): Observable<chrome.tabs.Tab> {
        return bindCallback(chrome.tabs.duplicate)(tabId);
    }

    static connect(tabId: number, connectInfo: chrome.tabs.ConnectInfo = {}): Observable<chrome.runtime.Port> {
        return from([chrome.tabs.connect(tabId, connectInfo)]);
    }

    static sendMessage(tabId: number, message: any, options: chrome.tabs.MessageSendOptions = {}): Observable<any> {
        let result: ((arg1: number, arg2: any, arg3: chrome.tabs.MessageSendOptions) => Observable<any>)
            = bindCallback(chrome.tabs.sendMessage);
        return result(tabId, message, options);
    }

    static query(queryInfo: chrome.tabs.QueryInfo): Observable<chrome.tabs.Tab[]> {
        return bindCallback(chrome.tabs.query)(queryInfo);
    }

    static highlight(highlightInfo: chrome.tabs.HighlightInfo): Observable<chrome.windows.Window> {
        return bindCallback(chrome.tabs.highlight)(highlightInfo);
    }

    static update(updateProperties: chrome.tabs.UpdateProperties, tabId?: number): Observable<chrome.tabs.Tab> {
        return bindCallback(chrome.tabs.update)(tabId, updateProperties);
    }

    static move(tabIds: number[], moveProperties: chrome.tabs.MoveProperties): Observable<chrome.tabs.Tab[]> {
        return bindCallback(chrome.tabs.move)(tabIds, moveProperties);
    }

    static reload(tabId: number, reloadProperties: chrome.tabs.ReloadProperties): Observable<void> {
        return bindCallback<number, chrome.tabs.ReloadProperties>(chrome.tabs.reload)(tabId, reloadProperties);
    }

    static remove(tabIds: number[]): Observable<void> {
        return bindCallback<number[]>(chrome.tabs.remove)(tabIds);
    }

    static detectLanguage(tabId: number): Observable<string> {
        return bindCallback<number, string>(chrome.tabs.detectLanguage)(tabId);
    }

    static captureVisibleTab(windowId?: number, options?: chrome.tabs.CaptureVisibleTabOptions): Observable<string> {
        return bindCallback<number, chrome.tabs.CaptureVisibleTabOptions, string>(chrome.tabs.captureVisibleTab)(windowId, options);
    }

    static executeScript(details: chrome.tabs.InjectDetails, tabId?: number,): Observable<any[]> {
        return bindCallback<number, chrome.tabs.InjectDetails, any[]>(chrome.tabs.executeScript)(tabId, details);
    }

    static insertCSS(details: chrome.tabs.InjectDetails, tabId?: number,): Observable<void> {
        return bindCallback<number, chrome.tabs.InjectDetails, void>(chrome.tabs.insertCSS)(tabId, details);
    }

    static setZoom(zoomFactor: number, tabId?: number,): Observable<void> {
        return bindCallback<number, number>(chrome.tabs.setZoom)(tabId, zoomFactor);
    }

    static getZoom(tabId: number): Observable<number> {
        return bindCallback<number, number>(chrome.tabs.getZoom)(tabId);
    }

    static setZoomSettings(tabId: number, zoomSettings: chrome.tabs.ZoomSettings): Observable<void> {
        return bindCallback<number, chrome.tabs.ZoomSettings>(chrome.tabs.setZoomSettings)(tabId, zoomSettings);
    }

    static getZoomSettings(tabId: number): Observable<chrome.tabs.ZoomSettings> {
        return bindCallback<number, chrome.tabs.ZoomSettings>(chrome.tabs.getZoomSettings)(tabId);
    }

    static discard(tabId: number): Observable<chrome.tabs.Tab | undefined> {
        return bindCallback<number, chrome.tabs.Tab | undefined>(chrome.tabs.discard)(tabId);
    }

    static onCreated(): Observable<chrome.tabs.Tab> {
        return Tabs.on<chrome.tabs.Tab>('Created');
    }

    static onUpdated(): Observable<chrome.tabs.Tab> {
        return Tabs.on<any>('Updated');
    }

    static onActivated(): Observable<chrome.tabs.TabActiveInfo> {
        return Tabs.on<chrome.tabs.TabActiveInfo>('Activated');
    }

    private static on<T>(name: TabsEvents): Observable<T> {
        let tabs: any = chrome.tabs;
        let eventObject: chrome.events.Event<any> = tabs['on' + name];
        return fromEventPattern<T>(
            (handler: (handlerArg?: T) => any) => eventObject.addListener(handler),
            (handler: (handlerArg?: T) => any) => eventObject.removeListener(handler)
        );
    }
}