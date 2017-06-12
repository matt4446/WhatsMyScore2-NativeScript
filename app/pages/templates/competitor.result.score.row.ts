import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

import {ICompetitiorScoreLine} from "../../models/models";
import {Logger} from "../../providers/logger";

@Component({
    selector: "competitor-result-row-header",
    template: `
        <GridLayout class="header" columns="*,*,*,*,*,*">

            <Label text="E1" textWrap="true" col="0"></Label>
            <Label text="E2" textWrap="true" col="1"></Label>
            <Label text="E3" textWrap="true" col="2"></Label>
            <Label text="E4" textWrap="true" col="3"></Label>
            <Label text="E5" textWrap="true" col="4"></Label>
            <Label text="DIFF" textWrap="true" col="5"></Label>

        </GridLayout>
    `,
    styleUrls: ["./pages/templates/competitor.results.css"]
})
export class CompetitorResultRowHeader {

}

@Component({
  selector: "competitor-result-row",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <GridLayout class="result" columns="*,*,*,*,*,*">

        <Label
            [class.invalid]="excludeIndividualTrampolineScore(0)"
            [text]="model.Form1" textWrap="true" col="0"></Label>
        <Label
            [class.invalid]="excludeIndividualTrampolineScore(1)"
            [text]="model.Form2" textWrap="true" col="1"></Label>
        <Label
            [class.invalid]="excludeIndividualTrampolineScore(2)"
            [text]="model.Form3" textWrap="true" col="2"></Label>
        <Label
            [class.invalid]="excludeIndividualTrampolineScore(3)"
            [text]="model.Form4" textWrap="true" col="3"></Label>
        <Label
            [class.invalid]="excludeIndividualTrampolineScore(4)"
            [text]="model.Form5" textWrap="true" col="4"></Label>
        <Label
            [text]="model.Difficulty" textWrap="true" col="5"></Label>

    </GridLayout>

    <GridLayout class="result" columns="*,*,*">
        <Label [text]="'ToF: ' + model.Bonus" textWrap="true" col="0" *ngIf="model.Bonus"></Label>
        <Label [text]="'Penalty: ' + model.Penalty" textWrap="true" col="1" *ngIf="model.Penalty"></Label>
        <Label [text]="'Total: ' + model.Total" textWrap="true" col="2"></Label>
    </GridLayout>
  `,
  styleUrls: ["./pages/templates/competitor.results.css"]
})
export class CompetitorResultRow {
    private model : ICompetitiorScoreLine;

    private formMinIndex : number;
    private formMaxIndex : number;

    public excludeIndividualTrampolineScore(index: number): boolean {
        this.logger.Notify("check score");
        this.logger.Notify("compare: "+ index + " to " + this.formMinIndex + " or " + this.formMinIndex);
        return index === this.formMinIndex || index === this.formMaxIndex;
    }

    @Input()
    public set scoreline(value : ICompetitiorScoreLine){
        this.model = value;
        this.setupIndividual();
        this.logger.NotifyObjectProperties(value);
    }

    private setupIndividual(): void {
        let formScores : number[] = [
            this.model.Form1,
            this.model.Form2,
            this.model.Form3,
            this.model.Form4,
            this.model.Form5
        ];

        let min : number = formScores[0];
        let max : number = formScores[0];

        this.formMinIndex = 0;
        this.formMaxIndex = 0;

        for (let i: number = 1; i < formScores.length; i++) {
            if (formScores[i] > max) {
                this.formMaxIndex = i;
                max = formScores[i];
            }else if(formScores[i] < min) {
                this.formMinIndex = i;
                min = formScores[i];
            }
        }
    }

    constructor(private logger: Logger) {

    }
}