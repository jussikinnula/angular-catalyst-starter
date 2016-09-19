import { Component } from "@angular/core";
import { Router } from "@angular/router";

declare var require;
const styles: string = require("./header.component.styl");
const template: string = require("./header.component.pug");

@Component({
    selector: "header",
    styles: [styles],
    template
})

export class HeaderComponent {
    constructor(public router: Router) {}
}
