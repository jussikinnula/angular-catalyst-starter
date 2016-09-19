import { Component } from "@angular/core";

declare var require;
const styles: string = require("./app.component.styl");
const template: string = require("./app.component.pug");

@Component({
    selector: "app",
    styles: [styles],
    template
})

export class AppComponent {

    constructor() {}
}
