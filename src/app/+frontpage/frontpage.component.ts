import { Component } from "@angular/core";

declare var require;
const styles: string = require("./frontpage.component.styl");
const template: string = require("./frontpage.component.pug");

@Component({
    styles: [styles], 
    template
})

export class FrontpageComponent {
    constructor() {}
}