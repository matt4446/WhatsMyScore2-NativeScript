import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ICompetitor} from "../../models/models.d";
import {PageControl} from "../../decorators/pageControl";
import {Logger} from "../../providers/logger";
import {CompetitorResultRow, CompetitorResultRowHeader} from "./competitor.result.score.row";

@PageControl({
  selector: 'competitor-result',
  template: `
    <nx-item (tap)="ShowHideResults()">
        <label [text]="person.FullName"></label>
        <label [text]="person.Club" class="note"></label>
        
        <StackLayout item-right>
            <Label class='note' [text]="GetRank()" textWrap="true"></Label>
            <Label class='note' [text]="person.Total | number:'3.3-3'" textWrap="true"></Label>
        </StackLayout>
    </nx-item>
    <nx-item *ngIf="expanded"> 
      <StackLayout full-item>
        <competitor-result-row-header></competitor-result-row-header>
        <competitor-result-row *ngIf="person.Pass1" [scoreline]="person.Pass1"></competitor-result-row>
        <competitor-result-row *ngIf="person.Pass2" [scoreline]="person.Pass2"></competitor-result-row> 
        <competitor-result-row *ngIf="person.Pass3" [scoreline]="person.Pass3"></competitor-result-row>
        <competitor-result-row *ngIf="person.Pass4" [scoreline]="person.Pass4"></competitor-result-row>
      </StackLayout>
    </nx-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush, 
  directives: [CompetitorResultRow, CompetitorResultRowHeader],
  styleUrls: ["./pages/templates/competitor.results.css"]
})


export class CompetitorResult {
  private person : ICompetitor = undefined;
  private expanded : boolean = false;

  public ShowHideResults() {
    this.expanded = !this.expanded;
  }

  @Input("competitor")
  public set competitor(value: ICompetitor){
    // var t = typeof(value);
    // console.log("set person: " + t);
    //this.logger.NotifyObjectProperties(value);
    this.person = value;
  }

  public GetRank(){
    if(!this.person){return "-";}
    let person = this.person;

    //for the competitor reaching the final     
    if (person.FinalRank > 0) {
        return CompetitorResult.DisplayRank(person.FinalRank);
    }

    return CompetitorResult.DisplayRank(person.Rank);
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