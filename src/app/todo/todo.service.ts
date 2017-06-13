import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs';

import { ITodo } from '../../models';

@Injectable()
export class TodoService {
  todos: ReplaySubject<any> = new ReplaySubject(1);
  private list: ITodo[];
  private url: string = '/rest/todo';

  constructor(private http: Http) {
    this.listTodos();
  }

  listTodos(): void {
    this.http.get(this.url)
      .map(res => res.json().todos)
      .map(todos => todos as ITodo[])
      .subscribe(
        todos => {
          this.list = todos;
          this.todos.next(this.list);
        },
        error => console.log(error)
      );
  }

  findTodo(id: number): Observable<ITodo> {
    return this.http.get(this.url + '/' + id)
      .map(res => res.json())
      .map(todo => todo as ITodo)
      .do(
        todo => {
          this.list = [
            ...this.list.filter(todo => todo.id != id),
            todo
          ];
          this.todos.next(this.list);
        },
        error => console.error(error)
      );
  }

  createTodo(createdTodo: ITodo): Observable<ITodo> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, createdTodo, options)
      .map(res => res.json())
      .map(todo => todo as ITodo)
      .do(
        todo => {
          this.list = [
            ...this.list,
            todo
          ];
          this.todos.next(this.list);
        },
        error => console.error(error)
      );
  }

  updateTodo(updatedTodo: ITodo): Observable<ITodo> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/' + updatedTodo.id, updatedTodo, options)
      .map(res => res.json())
      .map(todo => todo as ITodo)
      .do(
        todo => {
          this.list = [
            ...this.list.filter(todo => todo.id != updatedTodo.id),
            todo
          ];
          this.todos.next(this.list);
        },
        error => console.error(error)
      );
  }

  removeTodo(todo: ITodo): Observable<any> {
    return this.http.delete(this.url + '/' + todo.id)
      .map(res => res.json())
      .do(
        () => {
          this.list = [
            ...this.list.filter(item => item.id != todo.id)
          ];
          this.todos.next(this.list);
        },
        error => console.error(error)
      );
  }
}