import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TodoComponent } from './todo.component';
import { TodoRouting } from './todo.routing';
import { TodoService } from './todo.service';
import { TodoEditComponent } from './todo-edit';
import { TodoListComponent } from './todo-list';

@NgModule({
  imports: [SharedModule, TodoRouting],
  providers: [TodoService],
  declarations: [TodoComponent, TodoEditComponent, TodoListComponent]
})

export class TodoModule {}
