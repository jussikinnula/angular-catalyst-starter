import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { TodoService } from "../../services";

import { ITodo } from "../../../../models";

declare var require;
const styles: string = require("./todo-edit.component.styl");
const template: string = require("./todo-edit.component.pug");

@Component({
    selector: "todo-edit",
    styles: [styles],
    template
})

export class TodoEditComponent implements OnInit {
    selected: ITodo;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        private todoService: TodoService
    ) {}

    ngOnInit() {
        this.route.params.subscribe( (params: any) => {
            const id = params["todo"];
            this.todoService.findTodo(id).subscribe( todo => this.selected = todo );
        });
    }

    save(title: string) {
        let todo = Object.create(this.selected);
        todo.title = title;
        this.todoService.updateTodo(todo);
        this.router.navigate(["/todo"]);
    }

    remove() {
        this.todoService.removeTodo(this.selected);
        this.router.navigate(["/todo"]);
    }

    cancel() {
        this.router.navigate(["/todo"]);
    }

    create(title: string) {
        let todo: ITodo = {
            created: new Date,
            title: title
        };
        this.todoService.createTodo(todo);
    }
}
