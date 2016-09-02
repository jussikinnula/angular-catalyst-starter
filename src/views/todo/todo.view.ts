import { Component } from "@angular/core";

declare var require;
const styles: string = require("./todo.view.styl");
const template: string = require("./todo.view.pug");

@Component({
    styles: [styles],
    template
})

export class TodoView {
    constructor() {}
}