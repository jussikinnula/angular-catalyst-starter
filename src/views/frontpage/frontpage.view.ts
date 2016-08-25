import { Component } from "@angular/core";

declare var require;
const styles: string = require("./frontpage.view.styl");
const template: string = require("./frontpage.view.pug");

@Component({
    styles: [styles], 
    template
})

export class FrontpageView {
    constructor() {}
}