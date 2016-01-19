import {Component} from 'angular2/core';

@Component({
    selector: "regionsPage",
    template:  `
<StackLayout orientation='vertical'>
    <Label [text]='message' class='title' (tap)='message = "OHAI"'></Label>
</StackLayout>
`
})
export class regionsPage 
{
    
}