import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from "@angular/common/http";
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import "rxjs/Rx";
import { Subject } from 'rxjs';
// import { Subject } from "rxjs/Subject";

@Injectable()
export class chatSupportService {
  public notificationCount:Subject<any> = new Subject();
  constructor(private http: HttpClient) { }
  
  getChartByUser() {
    console.log("userdata")
    return this.http.get(environment.url + environment.baseUrl + "/support/get-all-by-user");
}
addComment(data){
    console.log("data",data);
  return this.http.post(environment.url + environment.baseUrl + "/support/add", data);
  
}
getUsersComments(params){
  return this.http.get(environment.url + environment.baseUrl + "/support/recent-comments",{params:params});
  
}
getNotificationCount(id?){
  return this.http.get(environment.url + environment.baseUrl +'/support/notification-count', {params:{userId:id}});
}
getNotificationUpdate(data?){
  console.log(data)
  return this.http.put(environment.url + environment.baseUrl +'/support/update-view-status?userId='+data,{});  
}

}
