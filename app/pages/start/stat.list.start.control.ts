import {Component} from '@angular/core';
import {PageControl} from "../../decorators/pageControl";
@PageControl({
  selector: 'start-list-main',
  template: `
    <nx-list>
        <nx-header item-top>
            <label [text]="'Start' | Title" class="nx-header-title"></label>
        </nx-header>

        <nx-item [nxRoute]="['Regions']" animate="true">
            <ion-icon item-left icon="ion-map"></ion-icon>

            <label text="Leagues & Regions"></label>
            <label class="note" text="BUCS, SUTL ..."></label>

            <ion-icon item-right icon="ion-chevron-right"></ion-icon>
        </nx-item>
    </nx-list>
  `
})
export class StartListControl {

    constructor() {

    }
}