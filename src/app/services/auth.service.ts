import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { response } from 'express';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private entityId: number | null = null;


  checkDuplicateSupplierforBrand(obj: { email: any; tierLevel: number; supplierName: any; }) {
    throw new Error('Method not implemented.');
  }
  login(MasterUserID: any, UserName: any, Password: any, IsInvited: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl; // Replace with your API URL
  constructor(    
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }


    GetScopeEmissionInformation(scopeEntityID: any, sourceTypeID: any,  year:any): Observable<any> {
      const url = `${this.apiUrl}/GetScopeEmissionInformation`;
      const body = {
        ScopeEntityID: scopeEntityID,
        SourceTypeID: sourceTypeID || '',// Send an empty string if no specific source
        // Quarter: quarter,
        Year: year
      };
      return this.http.post<any>(url, body);
    }

    storeToken(token: string): void {

      console.log("isPlatformBrowser(this.platformId)");
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('reput-credit', token); // Access sessionStorage only in browser
      }
    }

    getToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        return sessionStorage.getItem('reput-credit');
      }
      return null;
    }
  
    clearToken(): void {
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.removeItem('reput-credit');
      }
    }


    setEntityId(id: number) {
  this.entityId = id;
}

getEntityId(): number | null {
  return this.entityId;
}

 


    logout(type?: 'unAuthorized' | 'manual'): void {
      if (type === 'unAuthorized') {

        console.log('Calling logout due to 401...');

        
        this.clearToken();
        this.router.navigate(['/login']);
      } else {
        this.http.post(`${this.apiUrl}/userlogout`, {}).subscribe({
          next: () => {
            this.clearToken();
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Logout error:', error);
          }
        });
      }
    }
    
    

    isAuthenticated(): boolean {
      return !!this.getToken();
    }

    // _________________________________UserLogin_______________ 

    
    UserLogin(userDetails:any): Observable<any> {
         return this.http.post(`${this.apiUrl}/auth/loginup`, userDetails).pipe(
          tap((response: any) => {
            if(response.issuccessful){
              this.storeToken(response.data.token);
              // console.log("response.data.token",response.data.token);
            }    
          })
        );
    }



    // ________________________________________________InviteChildUsers_____________


 

    fetchTotalEmission(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/fetchTotalEmission`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("User fetchTotalEmission successfully");
          }
        }),
        catchError((error) => {
          console.error("Error fetchTotalEmission user:", error);
          return throwError(() => error);
        })
      );
    }

    getCategoryEmissionScope3(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/getCategoryEmissionScope3`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("getCategoryEmissionScope3 successfully");
          }
        }),
        catchError((error) => {
          console.error("Error getCategoryEmissionScope3 :", error);
          return throwError(() => error);
        })
      );
    }

    getOrganisationName(data:any):Observable<any> {
      return this.http.post(`${this.apiUrl}/getOrganisationName`, data).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("User invited successfully");
          }
        }),
        catchError((error) => {
          console.error("Error inviting user:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }
 
    getProjectDashboard(payload: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/seller/getProjectDashboard`, payload);
    }

  
 
}
