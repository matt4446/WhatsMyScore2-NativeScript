export interface IRegion 
{
    Id: number;
    Name: string;
    Logo: string;
}

/*
{"Id":17,
"Name":"BUCS 2015 - Day 2 - Finals",
"LocationName":"Sheffield Ice Arena",
"CreatedUtc":"2015-02-22T10:41:22.197Z",
"StartDateTimeUtc":"2015-02-22T09:00:00Z",
"EndDateTimeUtc":"2015-08-23T16:00:00Z",
"LastUploadedUtc":null,
"Published":true,"
Public":true,"Provider":{"Id":1,"Name":"BUCS","Logo":"content/logos/bucs-logo.jpg","CompetitionCount":null},"Notices":"None","Documents":null},{"Id":16,"Name":"BUCS 2015 - DAY 1 & Syncro","LocationName":"Sheffield Ice Arena","CreatedUtc":"2015-02-21T16:53:17.077Z","StartDateTimeUtc":"2015-02-21T09:00:00Z","EndDateTimeUtc":"2015-02-21T17:30:00Z","LastUploadedUtc":null,"Published":true,"Public":true,"Provider":{"Id":1,"Name":"BUCS","Logo":"content/logos/bucs-logo.jpg","CompetitionCount":null},"Notices":"None","Documents":null}
*/

export interface ICompetition
{
    Id: number,
    Name: string;
    LocationName: string;
    CreatedUtc: string;
    StartDateTimeUtc: string;
    EndDateTimeUtc: string;
    LastUploadedUtc?: string;
    Published: boolean;
    Public: boolean;
}

export interface ICompetitionGrades {
    Discipline : string, 
    Grades : IGrade[]
}

//{"Id":3359,"Name":"Bournemouth University","Letter":"B","Competitors":1,"Teams":[]}
export interface IClub {
    Id: number;
    Letter: string;
    Name: string;
    Competitors: number;
}

//{"Id":1719,"ClassName":"BUCS 1 Elite Male","CompetitorsInFinal":0,"Discipline":"Individual","Competitors":11,"Enabled":true,"Panel":3}
export interface IGrade {
    Id: number;
    ClassName: string;
    Discipline: string;
    CompetitorsInFinal: number,
    Competitors: number;
    Enabled: boolean;
    Panel : number;
}

export interface IPage {
    title: string; 
    page: any;
}
