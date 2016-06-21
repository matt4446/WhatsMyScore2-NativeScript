import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ICompetitorContext } from "../../models/models.d";
import {PageControl} from "../../decorators/pageControl";
import {Logger} from "../../providers/logger";
import {CompetitorResultRow, CompetitorResultRowHeader} from "./competitor.result.score.row";

@PageControl({
    selector: 'competitor-result-detail-row',
    directives: [CompetitorResultRow, CompetitorResultRowHeader],
    template: `
        <nx-item > 
        
            <StackLayout item-col-3>
                <Label *ngIf="person.Removed" text="Withdrawn" textWrap="true"></Label>
                
                <nx-list *ngIf="!person.Removed">
                    <competitor-result-row-header></competitor-result-row-header>
                    <competitor-result-row *ngIf="person.Pass1" [scoreline]="person.Pass1"></competitor-result-row>
                    <competitor-result-row *ngIf="person.Pass2" [scoreline]="person.Pass2"></competitor-result-row> 
                    <competitor-result-row *ngIf="person.Pass3" [scoreline]="person.Pass3"></competitor-result-row>
                    <competitor-result-row *ngIf="person.Pass4" [scoreline]="person.Pass4"></competitor-result-row>
                </nx-list>
                
            </StackLayout>
        </nx-item>
    `
})
export class ResultsDetailRow{
    @Input()
    public person; 
}

@PageControl({
  selector: 'competitor-result',
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
    
    <competitor-result-detail-row [person]="context.Competitor" *ngIf="IsExpanded()" (tap)="ShowHideResults()"></competitor-result-detail-row>
  `,
  //changeDetection: ChangeDetectionStrategy.,
  changeDetection: ChangeDetectionStrategy.Default,
  directives: [ResultsDetailRow],
  styleUrls: ["./pages/templates/competitor.results.css"]
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
    this.logger.NotifyObjectProperties(value);
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