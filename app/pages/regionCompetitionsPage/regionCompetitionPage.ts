import {Component} from 'angular2/core';

@Component({
    selector: "regionCompetitionPage",
    template:  `
<StackLayout orientation='vertical'>
    <Label [text]='message' class='title' (tap)='message = "OHAI"'></Label>
</StackLayout>
`
})
export class regionCompetitionPage 
{
    
}