import {Component} from "@angular/core";

@Component({
  selector: "start-list-search",
  template: `
    <nx-list>
        <nx-header item-top>
            <label [text]="'Search' | Title" class="nx-header-title"></label>
        </nx-header>
        <nx-item (tap)="incomplete($event)" animate="true">
            <ion-icon item-left icon="ion-calendar"></ion-icon>
            <label text="Competitions"></label>
            <ion-icon item-right icon="ion-search"></ion-icon>
        </nx-item>
        <nx-item (tap)="incomplete($event)" animate="true">
            <ion-icon item-left icon="ion-ios-people"></ion-icon>
            <label text="Competitors"></label>
            <ion-icon item-right icon="ion-search"></ion-icon>
        </nx-item>
    </nx-list>
  `
})
export class StartListSearchControl {
}