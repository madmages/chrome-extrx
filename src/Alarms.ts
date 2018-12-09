import {Observable, from, bindCallback, fromEventPattern} from 'rxjs';

type AlarmEvents = 'Alarm';

export class Alarms {
    static create(alarmInfo: chrome.alarms.AlarmCreateInfo, name?: string): Observable<void> {
        return from([chrome.alarms.create(name, alarmInfo)]);
    }

    static get(name?: string): Observable<chrome.alarms.Alarm> {
        return bindCallback<string, chrome.alarms.Alarm>(chrome.alarms.get)(name);
    }

    static getAll(): Observable<chrome.alarms.Alarm[]> {
        return bindCallback<chrome.alarms.Alarm[]>(chrome.alarms.getAll)();
    }

    static clear(name?: string): Observable<boolean> {
        return bindCallback<string, boolean>(chrome.alarms.clear)(name);
    }

    static clearAll(): Observable<boolean> {
        return bindCallback<boolean>(chrome.alarms.clearAll)();
    }

    static onAlarm(): Observable<chrome.alarms.Alarm> {
        return Alarms.on<chrome.alarms.Alarm>('Alarm');
    }

    static on<T>(name: AlarmEvents): Observable<T> {
        let tabs: any = chrome.alarms;
        let eventObject: chrome.events.Event<any> = tabs['on' + name];
        return fromEventPattern<T>(
            (h: () => T) => eventObject.addListener(h),
            (h: () => T) => eventObject.removeListener(h)
        );
    }
}