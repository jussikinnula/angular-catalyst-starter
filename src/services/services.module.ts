import { NgModule, ModuleWithProviders } from "@angular/core";

import { TodoService } from "./todo.service";
import { UserService } from "./user.service";

@NgModule({
    providers: [
        TodoService,
        UserService
    ]
})
export class ServicesModule {}
