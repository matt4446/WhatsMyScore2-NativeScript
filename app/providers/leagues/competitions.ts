// import {Injectable} from 'angular2/core';
// import {Http, Response} from "angular2/http";
// 
// import {Logger} from "../../providers/logger/logger";
// import {IProvider} from "../../models/models";
// import {Settings} from "../routes/routes";
// import {Observable, Subscription, BehaviorSubject} from 'rxjs/Rx';
// 
// export class CompetitionService
// {
//     constructor(private $http: Http, private logger: Logger){
//         logger.notify("ProviderService created");
//     }
//     
//     public List(providerId: any)
//     {
//         let base = Settings.WebApiBaseUrl;
//         let endpoint = "/Api/Providers/{0}/Competitions/Enabled".replace("{0}", providerId);
//         let route = base + endpoint;
//         
//         this.logger.notify("Load :" + route);
//         
//         var promise = this.$http.get(route);
//         
//         this.logger.notifyResponse(promise);
//                 
//         return promise;
//     }
//     
//     public Get(competitionId: any)
//     {
//         let base = Settings.WebApiBaseUrl;
//         let endpoint = "/Api/Competition/{0}".replace("{0}", competitionId);
//         let route = base + endpoint;
//         
//         this.logger.notify("Load :" + route);
//         
//         var promise = this.$http.get(route);
//         
//         return promise;
// //         var route = kendo.format("Api/Competition/{0}", competitionId);
// //             route = kendo.format("{0}/{1}", Settings.WebApiBaseUrl, route);
// // 
// //             var promise = this.$http.get(route);
// // 
// //             return promise;
//     }
// }