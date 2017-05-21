import { Directive, ElementRef, ViewChild } from "@angular/core";

import { Logger } from "../../providers/logger";

@Directive({
    selector: "[nav-title]",
    host: {
        "class" : "nav-title"
    }
})
export class NxTitle {
    @ViewChild("item") private container: ElementRef;

    public constructor(private logger: Logger) {
    }
}