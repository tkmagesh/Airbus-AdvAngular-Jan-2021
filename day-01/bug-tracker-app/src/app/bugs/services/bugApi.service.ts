import { Bug } from '../models/bug';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BugApiService{
    constructor(private _http : HttpClient){

    }
    getAll() : Observable<Bug[]>{
        return this._http.get<Bug[]>('http://localhost:4000/bugs')
    }
}