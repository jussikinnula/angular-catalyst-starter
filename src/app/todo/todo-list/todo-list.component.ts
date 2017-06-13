import { Component } from '@angular/core';

import { TodoService } from '../todo.service';

import { ITodo } from '../../../models';

@Component({
  selector: 'todo-list',
  styleUrls: ['./todo-list.component.styl'],
  templateUrl: './todo-list.component.pug'
})

export class TodoListComponent {
  todos: ITodo[];

  constructor(private todoService: TodoService) {
    this.todoService.todos.subscribe( todos => this.todos = todos);
  }
}
