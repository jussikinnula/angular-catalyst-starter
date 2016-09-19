import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, ReplaySubject } from "rxjs";

import { ITodo } from "../../../models";

@Injectable()
export class TodoService {
    todos: ReplaySubject<any> = new ReplaySubject(1);
    private list: ITodo[];
    private url: string = "/rest/todo";

    constructor(private http: Http) {
        this.listTodos();
    }

    listTodos(): void {
        this.http.get(this.url)
            .map( (response: Response) => response.json() )
            .subscribe(
                (response: any) => {
                    this.list = response.todos;
                    this.todos.next(this.list);
                },
                (error: any) => console.log(error)
            );
    }

    createTodo(todo: ITodo): void {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.url, todo, options)
            .map( (response: Response) => response.json() )
            .subscribe(
                (todo: ITodo) => this.updateOrCreateTodo(todo),
                (error: any) => console.log(error)

            );
    }

    findTodo(id: number): Observable<any> {
        return Observable.create( observer => {
            this.todos.subscribe( todos => {
                const index = this.findIndex(id);
                observer.next(todos[index]);
            });
        });
    }

    updateTodo(todo: ITodo): void {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        this.http.put(this.url + "/" + todo.id, todo, options)
            .map( (response: Response) => response.json() )
            .subscribe(
                (todo: ITodo) => this.updateOrCreateTodo(todo),
                (error: any) => console.log(error)
            );
    }


    removeTodo(todo: ITodo): void {
        this.http.delete(this.url + "/" + todo.id)
            .map( (response: Response) => response.json() )
            .subscribe(
                (success: any) => {
                    const index = this.findIndex(todo.id);
                    if (index !== -1) {
                        this.list.splice(index, 1);
                        this.todos.next(this.list);
                    }
                },
                (error: any) => console.log(error)

            );
    }

    private updateOrCreateTodo(todo: ITodo) {
        const index: number = this.findIndex(todo.id);
        if (index === -1) {
            // Create
            this.list.push(todo);
        } else {
            // Update
            this.list[index] = todo
        }
        this.todos.next(this.list);        
    }

    private findIndex(id: number): number {
        return this.list.findIndex((todo: ITodo) => {
            return todo.id == id;
        });
    }
}