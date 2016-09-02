import { TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

import { AppComponent } from "./app.component";

describe("Testing AppComponent", () => {
    let app: AppComponent;

    beforeEach(() => {
        app = new AppComponent();
    });

    it("should exist", () => {
        expect(app instanceof AppComponent).toBeTruthy();
    });
});