import { Component } from "@angular/core";

declare var require;
const styles: string = require("./todo.component.styl");
const template: string = require("./todo.component.pug");

@Component({
    styles: [styles],
    template
})

export class TodoComponent {
    constructor() {}
}