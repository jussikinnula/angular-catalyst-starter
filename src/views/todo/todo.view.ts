import { Component } from "@angular/core";

import { TodoEditComponent, TodoListComponent } from "../../components";

declare var require;
const styles: string = require("./todo.view.styl");
const template: string = require("./todo.view.pug");

@Component({
    directives: [
        TodoEditComponent,
        TodoListComponent
    ],
    styles: [styles],
    template
})

export class TodoView {
    constructor() {}
}