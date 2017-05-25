import {Component} from "@angular/core";

@Component({
  selector: "start-list-search",
  template: `
    <nx-list>
        <nx-header item-top>
            <label [text]="'Search' | Title" class="nx-header-title"></label>
        </nx-header>

        <nx-item (tap)="incomplete($event)" animate="true">
            <nx-icon item-left icon="search"></nx-icon>
            <label text="Competitors"></label>
            <nx-icon item-right icon="chevron_right"></nx-icon>
        </nx-item>
    </nx-list>
  `
})
export class StartListSearchControl {
}