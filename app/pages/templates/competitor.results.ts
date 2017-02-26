import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ICompetitorContext } from "../../models/models";
import {Logger} from "../../providers/logger";
import {CompetitorResultRow, CompetitorResultRowHeader} from "./competitor.result.score.row";

@Component({
    selector: 'competitor-result-detail-row',
    template: ``
})
export class ResultsDetailRow{
    @Input()
    public person; 
}

@Component({
  selector: 'competitor-result',
  styleUrls: ["./pages/templates/competitor.results.css"],
  template: `
    <nx-item (tap)="ShowHideResults()">
        <StackLayout item-col-2-left>
            <label [text]="context.Competitor.FullName | Title"></label>
            <label [text]="context.Competitor.Club | Title" class="note"></label>
        </StackLayout>
 
        <StackLayout class="text-right" item-right>
            <Label class='note' *ngIf="!context.Competitor.Removed" [text]="GetRank() | Title" textWrap="true"></Label>
            <Label class='note' *ngIf="!context.Competitor.Removed" [text]="context.Competitor.Total | number:'3.3-3'" textWrap="true"></Label>
            <Label class='note' *ngIf="context.Competitor.Removed" text="x" textWrap="true"></Label>
        </StackLayout>
    </nx-item>
    
    <nx-item *ngIf="context.Expanded" (tap)="ShowHideResults()" > 
        
        <StackLayout item-col-3>
            <Label *ngIf="context.Competitor.Removed" text="Withdrawn" textWrap="true"></Label>
            
            <nx-list *ngIf="!context.Competitor.Removed">
                <competitor-result-row-header></competitor-result-row-header>
                <competitor-result-row *ngIf="context.Competitor.Pass1" [scoreline]="context.Competitor.Pass1"></competitor-result-row>
                <competitor-result-row *ngIf="context.Competitor.Pass2" [scoreline]="context.Competitor.Pass2"></competitor-result-row> 
                <competitor-result-row *ngIf="context.Competitor.Pass3" [scoreline]="context.Competitor.Pass3"></competitor-result-row>
                <competitor-result-row *ngIf="context.Competitor.Pass4" [scoreline]="context.Competitor.Pass4"></competitor-result-row>
            </nx-list>
            
            <VideoPlayer
                src="https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
                autoplay="true" 
                height="300"></VideoPlayer>
        </StackLayout>
    </nx-item>
  `,
  //changeDetection: ChangeDetectionStrategy.,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class CompetitorResult {
  private context : ICompetitorContext = undefined;

  public ShowHideResults() {
    this.logger.Notify("expand: " + this.context.Competitor.FullName);
    this.context.Expanded = !this.context.Expanded;
  }

  @Input("competitor")
  public set competitor(value: ICompetitorContext){
    // var t = typeof(value);
    // console.log("set person: " + t);
    //this.logger.NotifyObjectProperties(value);
    this.context = value;
  }

  public IsExpanded(){
      return this.context.Expanded;
  }

  public GetRank(){
    if(!this.context){return "-";}

    //for the competitor reaching the final     
    if (this.context.Competitor.FinalRank > 0) {
        return CompetitorResult.DisplayRank(this.context.Competitor.FinalRank);
    }

    return CompetitorResult.DisplayRank(this.context.Competitor.Rank);
  }

  constructor(private logger: Logger) {
  }

  public static DisplayRank(value: number) {
      if (value <= 0) return value.toString();
      switch (value % 100) {
          case 11:
          case 12:
          case 13:
              return value + "th";
      }
      switch (value % 10) {
          case 1:
              return value + "st";
          case 2:
              return value + "nd";
          case 3:
              return value + "rd";
          default:
              return value + "th";
      }
  }
}