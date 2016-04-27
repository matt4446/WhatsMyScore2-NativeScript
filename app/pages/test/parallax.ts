import {Page} from "../../decorators/page";
import {Page as PageControl} from "ui/page";
import {Logger} from "../../providers/logger";

import {Image} from "ui/image";
import {PullToRefresh} from "nativescript-pulltorefresh";
import {Color} from "color";
import {NxPullToRefresh} from "../../controls/pullToRefresh/pullToRefresh";
import {Paralax, ParallaxCollapsableItem} from "../../controls/parallax/parallax";
//Page is a wrapper on @Component
//
@Page({
    selector: "parallax-test-page",
    template: `
        <StackLayout class="inset">           
            <nx-card>
                <nx-header item-top>
                    <label [text]="'Test parallax' | Title" class="nx-header-title"></label>
                </nx-header>
                <nx-parallax>
                    <StackLayout header>
                        <img collapse-parallax src="https://unsplash.it/1600/1600/?random=1" stretch="none">
                    </StackLayout>
                    <StackLayout>
                        <nx-list>
                            <nx-item *ngFor="#item of items | orderBy:'ClassName'">
                                <ion-icon item-left icon="ion-clipboard"></ion-icon>
                                <label [text]="item.number"></label>
                                <ion-icon item-right icon="ion-ios-people"></ion-icon>
                            </nx-item>
                        </nx-list>
                    </StackLayout>
                </nx-parallax>
            </nx-card>
        </StackLayout>
    `,
    directives: [Paralax, ParallaxCollapsableItem ]
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
