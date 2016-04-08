import {Page} from "../../decorators/page";
import {Page as PageControl} from "ui/page";
import {Logger} from "../../providers/logger";
import {NxPullToRefresh} from "../../controls/pullToRefresh/pullToRefresh";
import {Image} from "ui/image"
//Page is a wrapper on @Component

@Page({
    selector: "start",
    template: `
        <StackLayout >

            <nx-card>
                <nx-header item-top>
                    <label [text]="'Test Card' | Title" class="nx-header-title"></label>
                </nx-header>
                <nx-item>
                    <label text="Pull on the image to refresh"></label>
                    <label class="note" [text]="Message"></label>
                </nx-item>
                
                <nx-item [nxRoute]="['Start']">
                    <ion-icon item-left icon="ion-map"></ion-icon>
                    <label text="Back to Start"></label>
                    <ion-icon item-right icon="ion-chevron-right"></ion-icon>
                </nx-item>
            </nx-card>

            <StackLayout class='inset'>
                <nx-pull-to-refresh (refresh)="refreshPage($event)">
                    <img [src]="RandomImage" stretch ="none"> 
                </nx-pull-to-refresh>
            </StackLayout>
        </StackLayout>
    `,
    directives: [NxPullToRefresh]
})
export class TestPage 
{
    private _randomImage = "https://unsplash.it/1600/1600/?random=";

    public RefreshedTimes = 0;
    public Message = "Pull to refresh";
    public RandomImage = "https://unsplash.it/1600/1600/?random=0";
    constructor(private logger:Logger, private page: PageControl)
    {
        this.logger.Notify("Start Page - constructor hit"); 
        page.actionBarHidden = true;
    }
    
    public refreshPage(args: any) {
        console.log("page refresh -> go");
        setTimeout(() => {
            args.object.refreshing = false;
            this.RefreshedTimes += 1;
            this.Message = "Pull to refresh - " + this.RefreshedTimes;
            this.RandomImage = this._randomImage + this.RefreshedTimes;
        }, 1000);
    }
}
