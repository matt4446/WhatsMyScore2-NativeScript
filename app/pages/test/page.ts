import {Page} from "../../decorators/page";
import {Page as PageControl} from "ui/page";
import {Logger} from "../../providers/logger";
import {NxPullToRefresh} from "../../controls/pullToRefresh/pullToRefresh";

//Page is a wrapper on @Component
@Page({
    selector: "start",
    template: `
        <StackLayout class='inset'>
            <nx-card>
                <nx-header item-top>
                    <label [text]="'Test Card' | Title" class="nx-header-title"></label>
                </nx-header>
                <nx-item [nxRoute]="['Start']">
                    <ion-icon item-left icon="ion-map"></ion-icon>
                    
                    <label text="Back to Start"></label>
                    
                    <ion-icon item-right icon="ion-chevron-right"></ion-icon>
                </nx-item>
            </nx-card>
            <StackLayout>
                <nx-pull-to-refresh (refresh)="refreshPage($event)">
                    <label [text]="Message"></label>
                    <label [text]="Message"></label>
                    <label [text]="Message"></label>
                    <label [text]="Message"></label>
                    <label [text]="Message"></label>
                    <label [text]="Message"></label>
                    <label [text]="Message"></label>
                </nx-pull-to-refresh>
            </StackLayout>
            
            
        </StackLayout>
    `,
    directives: [NxPullToRefresh]
})
export class TestPage 
{
    public RefreshedTimes = 0;
    public Message = "Pull to refresh";
    
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
        }, 1000);
    }
}
