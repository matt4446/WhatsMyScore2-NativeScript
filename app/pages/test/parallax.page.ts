import { Component } from '@angular/core';
import {Page as PageControl} from "ui/page";
import {Logger} from "../../providers/logger";

import {Image} from "ui/image";
import {PullToRefresh} from "nativescript-pulltorefresh";
import {Color} from "color";
import {NxPullToRefresh} from "../../controls/pullToRefresh/pullToRefresh.control";
import {Paralax, ParallaxCollapsableItem} from "../../controls/parallax/parallax";

@Component({
    selector: "parallax-test-page",
    template: `
        <StackLayout class="inset">           
            <nx-card>
                <nx-header item-top parallax-show>
                    <label [text]="'Test parallax' | Title" class="nx-header-title"></label>
                </nx-header>
                <nx-parallax>
                    <StackLayout header>
                        <img parallax-hide src="https://unsplash.it/1600/1600/?random=1" stretch="none">
                    </StackLayout>
                    <StackLayout pinned>
                        <nx-item>
                            <label text="hi"></label>
                        </nx-item>
                    </StackLayout>
                    <StackLayout>
                        <nx-list>
                            <nx-item *ngFor="let item of items | orderBy:'ClassName'">
                                <ion-icon item-left icon="ion-clipboard"></ion-icon>
                                <label [text]="item.number"></label>
                                <ion-icon item-right icon="ion-ios-people"></ion-icon>
                            </nx-item>
                        </nx-list>
                    </StackLayout>
                </nx-parallax>
                
            </nx-card>
        </StackLayout>
    `
})
export class ParallaxTestPage 
{    
    constructor(private logger:Logger, private page: PageControl)
    {
        page.actionBarHidden = true;
        
        let newItems = []; 
        
        for(let i=0; i< 25; i++){
            newItems.push({ number : i});
        }
        this.items = newItems;
    }
    
    public items :any[] = []; 
}
