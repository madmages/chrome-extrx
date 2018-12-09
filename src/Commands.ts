import {Observable, bindCallback} from 'rxjs';
import {Event} from "./Utility/Event";

type CommandsEvents = 'Command';

export class Commands {

    static getAll(): Observable<chrome.commands.Command[]> {
        return bindCallback<chrome.commands.Command[]>(chrome.commands.getAll)();
    }

    /**
     * Events
     */

    static onCommand<T=Type.Commands.CommandInfo>(): Observable<T> {
        return Commands.remapEvent<T>('Command', ['command']);
    }

    /**
     * Local event remaper
     *
     * @param {TabsEvents} name
     * @param {string[]} argNames
     * @returns {Observable<T>}
     */
    private static remapEvent<T>(name: CommandsEvents, argNames: string[]): Observable<T> {
        return Event.remapEvent<CommandsEvents, T>(chrome.commands, name, argNames);
    }
}