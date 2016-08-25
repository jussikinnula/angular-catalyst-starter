import { Component } from "@angular/core";

//import { HeaderComponent, FooterComponent } from "../components";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";

declare var require;
const styles: string = require("./app.component.styl");
const template: string = require("./app.component.pug");

@Component({
    selector: "app",
    styles: [styles],
    directives: [
        HeaderComponent,
        FooterComponent
    ],
    template
})

export class AppComponent {

    constructor() {}
}
