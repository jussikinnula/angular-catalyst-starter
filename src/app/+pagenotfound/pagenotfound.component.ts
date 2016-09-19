import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

declare var require;
const styles: string = require("./pagenotfound.component.styl");
const template: string = require("./pagenotfound.component.pug");

@Component({
    styles: [styles],
    template
})

export class PageNotFoundComponent {}