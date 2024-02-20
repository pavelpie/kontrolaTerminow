import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(private http: HttpClient) {
  }

  zapytaj_o(o: string, dla: any): Observable<any> {
    return this.http.post(`${environment.server_url}/api/kontrola-terminow/zapytaj_o/${o}`, { dla: dla }, { headers: this.getHeader(), withCredentials: true });
  }

  zapisz(co: string, payload: any) {
    return this.http.post(`${environment.server_url}/api/kontrola-terminow/zapisz/${co}`, {
      payload: payload,
    }, { headers: this.getHeader(), withCredentials: true });
  }

  private getHeader() {
    let x_xsrf_token = this.getCookie('XSRF-TOKEN');
    const headers = new HttpHeaders({
      'X-XSRF-TOKEN': x_xsrf_token,
      'Accept': 'application/json'
    });
    return headers;
  }


  getCookie(name: string): string {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }

  refreshCsrfToken(): Observable<any> {
    return this.http.get(`${environment.server_url}/sanctum/csrf-cookie`, { withCredentials: true });
  }
  checkLogin() {
    return this.http.get(`${environment.server_url}/api/user`, { withCredentials: true });
  }


  checkIfUnauthenticatedAndRedirectIfSo(error: any) {
    if (error.error.message.startsWith('Unauthenticated')) {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `${environment.server_url}/login?intended=${returnUrl}`;

      console.log(error);

      return true;
    }
    return false;
  }



}
