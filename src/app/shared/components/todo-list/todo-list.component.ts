import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { TodoService } from "../../services";

import { ITodo } from "../../../../models";

declare var require;
const styles: string = require("./todo-list.component.styl");
const template: string = require("./todo-list.component.pug");

@Component({
    selector: "todo-list",
    styles: [styles],
    template
})

export class TodoListComponent {
    todos: ITodo[];

    constructor(public router: Router, private todoService: TodoService) {
        this.todoService.todos.subscribe( todos => this.todos = todos);
    }
}
