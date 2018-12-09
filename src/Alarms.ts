import {Observable, from, bindCallback} from 'rxjs';
import {Event} from "./Utility/Event";

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

    /**
     * Events
     */

    static onAlarm<T=Type.Alarms.AlarmInfo>(): Observable<T> {
        return Alarms.remapEvent<T>('Alarm', ['alarm']);
    }

    /**
     * Local event remaper
     *
     * @param {TabsEvents} name
     * @param {string[]} argNames
     * @returns {Observable<T>}
     */
    private static remapEvent<T>(name: AlarmEvents, argNames: string[]): Observable<T> {
        return Event.remapEvent<AlarmEvents, T>(chrome.alarms, name, argNames);
    }
}