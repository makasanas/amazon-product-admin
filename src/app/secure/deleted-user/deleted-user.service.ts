import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { environment } from './../../../environments/environment';


@Injectable()
export class DeletedUserService {

    constructor(private http: Http) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', localStorage.getItem('token').replace(/\"/g, ""));
    }

    getUsers(page, limit) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(environment.apiUrl + 'admin/deleteduser?page='+page+'&limit='+limit, { headers: headers }).pipe(map((response: any) => response.json()));
    }

}