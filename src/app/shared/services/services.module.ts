import { NgModule, ModuleWithProviders } from "@angular/core";

import { TodoService } from "./todo.service";
import { UserService } from "./user.service";

const SERVICES = [
        TodoService,
        UserService
]

@NgModule({
    providers: [
        ...SERVICES
    ]
})
export class ServicesModule {}
