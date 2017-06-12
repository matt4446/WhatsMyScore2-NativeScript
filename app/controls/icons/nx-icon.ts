import { Component, EventEmitter, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "nx-icon",
    styleUrls: ["nx-icon.css"],
    outputs: ["tap"],
    template: `

        <GridLayout rows="*" columns="*" (tap)="click($event)">
            <StackLayout class="icon-layer-back">
            </StackLayout>
            <StackLayout  class="icon-layer-front">
            </StackLayout>
            <StackLayout class="icon-wrapper">
                <Label *ngIf="iconText" class="icon-text" [material-icon] [text]="iconText"></Label>
                <Label *ngIf="justText" class="icon-text" [text]="justText"></Label>
            </StackLayout>

        </GridLayout>
    `
})
export class NxIcon {
    @Input("text")
    public justText: string;

    @Input("icon")
    public iconText: string;

    private click(args: any): void {
        if(this.tap) {
            this.tap.next(args);
        }
    }
    public tap = new EventEmitter();
}