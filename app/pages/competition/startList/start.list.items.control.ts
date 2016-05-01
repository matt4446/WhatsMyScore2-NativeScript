import {PageControl} from "../../../decorators/pageControl";
import {Observable, Subscription, Subject} from 'rxjs/Rx';
import {GroupedObservable} from "rxjs/operator/groupBy";
import {IGrade} from "../../../models/models.d.ts";
import {Logger} from "../../../providers/logger";

@PageControl({
    selector : "StartListItems",
    template : `
        <nx-header item-top>
            <label [text]="title | Title" class="nx-header-title"></label>
        </nx-header>
        <nx-item><label text="hi"></label> 
        </nx-item>
        <nx-item *ngFor="#grade of grades | async">
            <label text="hi"></label> 
            <label [text]="grade.Name"></label>
        </nx-item>
    `,
    inputs: ["title", "items"]
})
export class StartListItems {
    constructor(private logger: Logger) {
        
    }
    
    public title = "";
    public grades: Observable<IGrade[]>;
    
    private _items: GroupedObservable<string,IGrade>
    public get items() : GroupedObservable<string,IGrade> {
        return this._items;
    };
    
    public set items(value: GroupedObservable<string,IGrade>) {
        this._items = value;
        value.subscribe(x=> {
            this.logger.Notify("key: " + value.key + " name:" + x.ClassName);
        });
        this.grades = value.toArray()
    } 
    
}