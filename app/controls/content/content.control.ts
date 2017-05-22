import {
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from "@angular/core";
import { NxPullToRefresh, NxPullToRefreshAnimateElement } from "../pullToRefresh/pullToRefresh.control";
import { Observable, Subject, Subscription } from "rxjs/Rx";

import { Logger } from "../../providers/logger";
import { PullToRefresh } from "nativescript-pulltorefresh";

@Component({
    selector:"nx-content",
    template: `
    <GridLayout>
        <nx-pull-to-refresh #refreshControl
            (refreshStarted)="refreshPage($event)"
            (refreshCompleted)="refreshPageCompleted($event)">
            <StackLayout [pull-to-animate]>
                <ng-content></ng-content>
            </StackLayout>
        </nx-pull-to-refresh>
        <ActivityIndicator
            [busy]="isLoading"
            [visibility]="isLoading ? 'visible' : 'collapse'"
            horizontalAlignment="center"
            verticalAlignment="center">
        </ActivityIndicator>
    </GridLayout>
    `,
    providers: []
})
export class NxContent {
    private container: ElementRef;

    constructor(private logger:Logger) {
    }

    @Input()
    public isLoading : boolean = false;

    @ContentChild(NxPullToRefresh)
    private content : ElementRef;

    @Input()
    public refreshComplete : boolean = true;

    private refreshPage(args) {
        this.logger.Notify("content restart ->");
        this.refreshStarted.next(args);
        this.isLoading = true;
    }

    private refreshPageCompleted($event) {
        this.refreshCompleted.next($event);
        this.isLoading = false;
    }

    @Output("refreshStarted")
    public refreshStarted = new EventEmitter();
    @Output("refreshCompleted")
    public refreshCompleted = new EventEmitter();
}