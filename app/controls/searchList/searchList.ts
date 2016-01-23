import { Control } from "../../decorators/control";
import { Input , Output,EventEmitter } from "angular2/core";
import { Logger} from "../../providers/logger";
import { Observable } from "data/observable";
//var observable = require("data/observable");
import { SearchBar } from "ui/search-bar"

//http://stackoverflow.com/questions/32568808/angular2-root-component-with-ng-content
@Control({
    selector: "search-list",
    templateUrl: "controls/searchList/searchList.html",
    inputs:["HintText", "SearchText"],
    outputs: ["OnSearch: OnSearch"]
})
export class SearchList {
    
    constructor(private logger: Logger)
    {
        this.logger.Notify("SearchList control Started");
        
        var searchBar = new SearchBar();
        SearchBar.textProperty
    }
    
    //@Input() 
    public HintText : string = "Search";
    //@Input() 
    public SearchText : string = ""; 
    //@Output()
    public OnSearch = new EventEmitter<ISearchEvent>();;
    
    public OnSubmit (args) : void {
        this.logger.Notify("ev: OnSubmit text");
        this.logger.Notify(args.object.text);
        
        let searchText = args.object.text;
        this.OnSearch.next(searchText);
    }
    
    public OnClear(args) : void {
        this.logger.Notify("ev: OnClear");
        this.OnSearch.next("");
        // this.Search.next({
        //     Value: ""
        // });
    }
}

export interface ISearchEvent
{
    Value: string;
}