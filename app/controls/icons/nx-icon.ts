import { Component, EventEmitter, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "nx-icon",
    styleUrls: ["nx-icon.css"],
    outputs: ["tap"],
    template: `
        <StackLayout class="icon-wrapper2" (tap)="click($event)">
            <StackLayout class="icon-wrapper">
                <Label class="icon-text" [material-icon] [text]="iconText"></Label>
            </StackLayout>
        </StackLayout>
    `
})
export class NxIcon {

    @Input("icon")
    public iconText: string;

    private click(args: any): void {
        if(this.tap) {
            this.tap.next(args);
        }
    }
    public tap = new EventEmitter();
}