import { Component } from "@angular/core";

declare var require;
const styles: string = require("./footer.component.styl");
const template: string = require("./footer.component.pug");

@Component({
    selector: "footer",
    styles: [styles],
    template
})

export class FooterComponent {
    constructor() {}
}
