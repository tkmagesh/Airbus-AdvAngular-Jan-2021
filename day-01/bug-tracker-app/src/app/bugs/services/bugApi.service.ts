import { Bug } from '../models/bug';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BugApiService{
    constructor(private _http : HttpClient){

    }
    getAll() : Observable<Bug[]>{
        return this._http
            .get<Bug[]>(environment.serviceEndPoint)
            .pipe(
                map(bugs => bugs.filter(bug => bug.active))
            )
    }

    save(bugData : Partial<Bug>) : Observable<Bug> {
        if (bugData.id === 0){
            return this._http.post<Bug>(environment.serviceEndPoint, bugData);
        } else {
            return this._http.put<Bug>(`${environment.serviceEndPoint}/${bugData.id}`, bugData)
        }
    }

    remove(bugData : Bug) : Observable<any>{
        return this._http.delete<Bug>(`${environment.serviceEndPoint}/${bugData.id}`)
    }
}