import {Component} from "@angular/core";

@Component({
  selector: "start-list-main",
  template: `
    <nx-list>
        <nx-header item-top>
            <label [text]="'Start' | Title" class="title"></label>
        </nx-header>

        <nx-item [nsRouterLink]="['/regions']" animate="true" pageTransition="slide">
            <!--<ion-icon item-left icon="ion-map"></ion-icon>-->
            <nx-icon item-left icon="today"></nx-icon>
            <label class="title" text="Leagues & Regions"></label>
            <label class="note" text="BUCS, SUTL ..."></label>
            <nx-icon item-right icon="chevron_right"></nx-icon>
        </nx-item>
    </nx-list>
  `
})
export class StartListControl {
}