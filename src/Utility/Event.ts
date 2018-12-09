import {map} from "rxjs/operators";
import {fromEventPattern, Observable} from "rxjs/index";

export class Event {

    public static remapEvent<T, R>(subject: object, name: T, argNames: string[]): Observable<R> {
        return Event.on(subject, name)
            .pipe(map<any[], R>(localArgs => {
                let result: any = {};
                for (let i = 0; i < localArgs.length; i++) {
                    result[argNames[i]] = localArgs[i];
                }

                return result;
            }));
    }

    private static on<T>(subject: any, name: T): Observable<any[]> {
        let eventObject: chrome.events.Event<any> = subject['on' + name];
        let realHandler = function (handler: Function) {
            return function () {
                handler(arguments);
            }
        };
        return fromEventPattern<any[]>(
            (handler: (args?: any[]) => any) => eventObject.addListener(realHandler(handler)),
            (handler: (args?: any[]) => any) => eventObject.removeListener(realHandler(handler))
        );
    }
}