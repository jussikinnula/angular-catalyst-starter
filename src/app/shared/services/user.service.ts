import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable()
export class UserService {
    selection: ReplaySubject<any> = new ReplaySubject(1);
    private store: any = {};

    constructor() {}

    get(key: string) {
        return this.store[key];
    }

    set(key: string, value: any) {
        this.store[key] = value;
        this.selection.next(this.store);
    }
}