import { addProviders } from "@angular/core/testing";
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