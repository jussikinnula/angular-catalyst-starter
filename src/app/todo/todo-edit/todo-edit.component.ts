import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TodoService } from '../todo.service';

import { ITodo } from '../../../models';

@Component({
  selector: 'todo-edit',
  styleUrls: ['./todo-edit.component.styl'],
  templateUrl: './todo-edit.component.pug'
})

export class TodoEditComponent implements OnInit {
  selected: ITodo;
  loading: boolean;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      const id = parseInt(params['todo'], 10);
      if (id > 0) {
        this.loading = true;
        this.todoService.findTodo(id).subscribe(
          todo => {
            this.loading = false;
            this.selected = todo;
          },
          () => {}
        );
       } else {
         this.selected = undefined;
       }
    });
  }

  save(title: string) {
    let todo = Object.create(this.selected);
    todo.title = title;
    this.loading = true;
    this.todoService.updateTodo(todo)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['/todo']);
      });
  }

  remove() {
    this.loading = true;
    this.todoService.removeTodo(this.selected)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['/todo']);
      });
}

  cancel() {
    this.router.navigate(['/todo']);
  }

  create(title: string) {
    let todo: ITodo = {
      created: new Date,
      title: title
    };
    this.loading = true;
    this.todoService.createTodo(todo)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['/todo']);
      });
  }
}
