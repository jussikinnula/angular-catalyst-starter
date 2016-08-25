import { BrowserModule  } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// App component
import { AppComponent } from "./app.component";

// View components
import { FrontpageView, TodoView } from "../views";

// Routing
import { routing } from "./app.routing";

// Shared pipes
import { PipesModule } from "../pipes/pipes.module";

// Shared services
import { ServicesModule } from "../services/services.module";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpModule,
        PipesModule,
        ServicesModule,
        routing
    ],
    providers: [
        ServicesModule
    ],
    declarations: [
        AppComponent,
        FrontpageView,
        TodoView
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
