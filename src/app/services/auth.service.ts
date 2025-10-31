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
        sessionStorage.setItem('reput', token); // Access sessionStorage only in browser
      }
    }

    getToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        return sessionStorage.getItem('reput');
      }
      return null;
    }
  
    clearToken(): void {
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.removeItem('reput');
      }
    }


    setEntityId(id: number) {
  this.entityId = id;
}

getEntityId(): number | null {
  return this.entityId;
}

    // logout(): void {
    //   this.clearToken();
    //   this.router.navigate(['/login']);

    // }

    // logout():Observable<any>{
    //   this.clearToken();
    //   this.router.navigate(['/login'])
    //   return this.http.post(`${this.apiUrl}/userlogout`,{});
    // }

    // logout(): Observable<any> {
    //   return this.http.post(`${this.apiUrl}/userlogout`, {}).pipe(
    //     tap(() => {
    //       this.clearToken(); // clear after successful call
    //       this.router.navigate(['/login']);
    //     }),
    //     catchError((error) => {
    //       console.error('Logout error:', error);
    //       return throwError(() => error);
    //     })
    //   );
    // }


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
         return this.http.post(`${this.apiUrl}/UserLogin`, userDetails).pipe(
          tap((response: any) => {
            if(response.issuccessful){
              this.storeToken(response.data.token);
              // console.log("response.data.token",response.data.token);
            }    
          })
        );
    }



    // ________________________________________________InviteChildUsers_____________


    InviteChildUsers(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/InviteChildUsers`, userDetails).pipe(
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

    getCategoryWithSubCategoryscope1(): Observable<any> {
      return this.http.get(`${this.apiUrl}/getCategoryWithSubCategoryscope1`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("User getCategoryWithSubCategoryscope1 successfully");
          }
        }),
        catchError((error) => {
          console.error("Error getCategoryWithSubCategoryscope1 user:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }

    getCategoryWithSubCategoryscope2(): Observable<any> {
      return this.http.get(`${this.apiUrl}/getCategoryWithSubCategoryscope2`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("User getCategoryWithSubCategoryscope2 successfully");
          }
        }),
        catchError((error) => {
          console.error("Error getCategoryWithSubCategoryscope2 user:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }

    getCategoryWithSubCategoryscope3(): Observable<any> {
      return this.http.get(`${this.apiUrl}/getCategoryWithSubCategoryscope3`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("User getCategoryWithSubCategoryscope3 successfully");
          }
        }),
        catchError((error) => {
          console.error("Error getCategoryWithSubCategoryscope3 user:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }


    // _____________________________ResetUserPassword________________________
 

  // Method to request a UserCode
  requestUserCode(emailDetails: { UserName: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/ResetUserPassword`, emailDetails).pipe(
      tap((response: any) => {
        if (response.issuccessful) {
          console.log("UserCode requested successfully");
        }
      }),
      catchError((error) => {
        console.error("Error requesting UserCode:", error);
        // return throwError(() => new Error(error));
        return throwError(() => error);
      })
    );
  }

  // Method to verify the UserCode
  verifyUserCode(userCodeDetails: { UserName: string, UserCode: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/ResetUserPassword`, userCodeDetails).pipe(
      tap((response: any) => {
        if (response.issuccessful) {
          console.log("UserCode verified successfully");
        }
      }),
      catchError((error) => {
        console.error("Error verifying UserCode:", error);
        // return throwError(() => new Error(error));
        return throwError(() => error);
      })
    );
  }

  // Method to reset the user's password
  ResetUserPassword(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ResetUserPassword`, userDetails).pipe(
      tap((response: any) => {
        if (response.issuccessful) {
          console.log("User password reset successfully");
        }
      }),
      catchError((error) => {
        console.error("Error resetting password:", error);
        // return throwError(() => new Error(error));
        return throwError(() => error);
      })
    );
  }



  GetYearwiseTotalEmission(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/GetYearwiseTotalEmission`, userDetails).pipe(
      tap((response: any) => {
        if (response.issuccessful) {
          console.log("GetYearwiseTotalEmission successfully");
        }
      }),
      catchError((error) => {
        console.error("Error GetYearwiseTotalEmission:", error);
        return throwError(() => error);
      })
    );
  }

   //__________________________________InitiateInsertAccountingData

         InitiateInsertAccountingData(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/InitiateInsertAccountingData`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("InitiateInsertAccountingData successfully");
          }
        }),
        catchError((error) => {
          console.error("Error InitiateInsertAccountingData:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }

    //__________________________________getPreviewData

    getPreviewData(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/getPreviewDataByInitiateAndScope`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("getPreviewDataByInitiateAndScope successfully");
          }
        }),
        catchError((error) => {
          console.error("Error InitiateInsertAccountingData:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }
    
    //__________________________________ScopeOneEmissions Auditor

    ScopeOneEmissionsAudit(userDetails: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/insertScope1EmissionAudit`, userDetails).pipe(
          tap((response: any) => {
            if (response.issuccessful) {
              console.log("insertScope1Emission successfully");
            }
          }),
          catchError((error) => {
            console.error("Error insertScopeOneEmissions:", error);
            // return throwError(() => new Error(error));
            return throwError(() => error);
          })
        );
      } 

      //__________________________________ScopeTwoEmissions Auditor

      ScopeTwoEmissionsAudit(userDetails: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/insertScope2Emissionaudit`, userDetails).pipe(
          tap((response: any) => {
            if (response.issuccessful) {
              console.log("insertScope1Emission successfully");
            }
          }),
          catchError((error) => {
            console.error("Error insertScopeOneEmissions:", error);
            // return throwError(() => new Error(error));
            return throwError(() => error);
          })
        );
      } 

  //__________________________________insertScopeOneEmissions Auditor

      insertScopeOneEmissionsAudit(userDetails: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/insertScope1Emission`, userDetails).pipe(
          tap((response: any) => {
            if (response.issuccessful) {
              console.log("insertScope1Emission successfully");
            }
          }),
          catchError((error) => {
            console.error("Error insertScopeOneEmissions:", error);
            // return throwError(() => new Error(error));
            return throwError(() => error);
          })
        );
      } 


      //__________________________________insertScopeTwoEmissions Auditor

      insertScopeTwoEmissionsAudit(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertScope2Emission`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertScope1Emission successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertScopeOneEmissions:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    } 


          //__________________________________insertScopeThreeEmissions Auditor

      insertScopeThreeEmissionsAudit(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertScope3EmissionAuditNew`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertScope1Emission successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertScopeOneEmissions:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    } 

    //__________________________________insertScopeOneEmissions


     
    insertScopeOneEmissions(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertScopeOneEmissions`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertScopeOneEmissions successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertScopeOneEmissions:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    } 


    InsertScopeOneEmissionsNew(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/InsertScopeOneEmissionsNew`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("InsertScopeOneEmissionsNew successfully");
          }
        }),
        catchError((error) => {
          console.error("Error InsertScopeOneEmissionsNew:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    } 

    //__________________________________insertScopeTwoEmissions


    insertScopeTwoEmissions(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertScopeTwoEmissions`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertScopeTwoEmissions successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertScopeTwoEmissions:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }

    InsertScopeTwoEmissionCityLevel(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/InsertScopeTwoEmissionCityLevel`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("InsertScopeTwoEmissionCityLevel successfully");
          }
        }),
        catchError((error) => {
          console.error("Error InsertScopeTwoEmissionCityLevel:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }

    InsertScopeOneEmissionCityLevel(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/InsertScopeOneEmissionCityLevel`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("InsertScopeOneEmissionCityLevel successfully");
          }
        }),
        catchError((error) => {
          console.error("Error InsertScopeOneEmissionCityLevel:", error);
          return throwError(() => error);
        })
      );
    }

    InsertScopeOneEmissionCityLevelV2(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/InsertScopeOneEmissionCityLevelV2`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("InsertScopeOneEmissionCityLevelV2 successfully");
          }
        }),
        catchError((error) => {
          console.error("Error InsertScopeOneEmissionCityLevelV2:", error);
          return throwError(() => error);
        })
      );
    }


    //__________________________________insertScopeThreeEmissions


    insertScopeThreeEmissions(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertScopeThreeEmissions`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertScopeThreeEmissions successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertScopeThreeEmissions:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);
        })
      );
    }

    insertScope3EmissionFn(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertScope3EmissionFn`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertScope3EmissionFn successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertScope3EmissionFn:", error);
          return throwError(() => error);
        })
      );
    }
    insertScope3WithProcedure(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertScope3WithProcedure`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertScope3WithProcedure successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertScope3WithProcedure:", error);
          return throwError(() => error);
        })
      );
    }

    updateScopeData(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/updateScopeData`, data).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("updateScopeData successfully");
          }
        }),
        catchError((error) => {
          console.error("Error updateScopeData:", error);
          return throwError(() => error);
        })
      );
    }


    GetAccountingDataByInitiateId(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/GetAccountingDataByInitiateId`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetAccountingDataByInitiateId successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetAccountingDataByInitiateId:", error);
          return throwError(() => error);
        })
      );
    }


    GetGHGPreviewData(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/GetGHGPreviewData`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetGHGPreviewData successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetGHGPreviewData:", error);
          return throwError(() => error);
        })
      );
    }

    //__________________________________InsertEnergyConsumption


    InsertEnergyConsumption(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/InsertEnergyConsumption`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("InsertEnergyConsumption successfully");
          }
        }),
        catchError((error) => {
          console.error("Error InsertEnergyConsumption:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);        })
      );
    }


    //__________________________________GetFuelTypeJson

        GetFuelTypeJson(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/GetFuelTypeJson`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetFuelTypeJson successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetFuelTypeJson:", error);
          // return throwError(() => new Error(error));
          return throwError(() => error);        })
      );
    }




    //__________________________________GetAllCategories


    GetAllCategories(): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetAllCategories`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetAllCategories successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetAllCategories:", error);
          return throwError(() => error);        })
      );
    }

    Getinitateaccountingdata(data:any): Observable<any> {
      return this.http.post(`${this.apiUrl}/Getinitateaccountingdata`,data).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("Getinitateaccountingdata successfully");
          }
        }),
        catchError((error) => {
          console.error("Error Getinitateaccountingdata:", error);
          return throwError(() => error);        })
      );
    }


 


 


        GetCategoryAndSubCategory(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/GetCategoryAndSubCategory`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("GetCategoryAndSubCategory successfully");
              }
            }),
            catchError((error) => {
              console.error("Error GetCategoryAndSubCategory:", error);
              return throwError(() => error);
            })
          );
        }

  
    // _________________________________transport_line_chart

    transport_line_chart(): Observable<any> {
      return this.http.get(`${this.apiUrl}/transport_line_chart`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("transport_line_chart successfully");
          }
        }),
        catchError((error) => {
          console.error("Error transport_line_chart:", error);
          return throwError(() => error);        })
      );
    }

 
    
    //__________________________________insertScopeThreeEmissions


    GetAllSubSourceTypes(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/GetAllSubSourceTypes`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetAllSubSourceTypes successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetAllSubSourceTypes:", error);
          return throwError(() => error);        })
      );
    }



    // ______________GetGraph

    GetGraph(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/GetGraph`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetGraph successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetGraph:", error);
          return throwError(() => error);        })
      );
    }


    // _____________checkElectricityConsumptionData

    checkElectricityConsumptionData(userDetails: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/checkElectricityConsumptionData`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("checkElectricityConsumptionData successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetGraph:", error);
          return throwError(() => error);       
         })
      );
    }

    // _____________getScope1Emissions

    getScope1Emissions(userDetails: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/getScope1Emissions`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("getScope1Emissions successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetGraph:", error);
          return throwError(() => error);       
         })
      );
    }
    // _____________getScope2Emissions

    getScope2Emissions(userDetails: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/getScope2Emissions`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("getScope2Emissions successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetGraph:", error);
          return throwError(() => error);       
         })
      );
    }
    // _____________getScope3Emissions

    getScope3Emissions(userDetails: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/getScope3Emissions`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("getScope3Emissions successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetGraph:", error);
          return throwError(() => error);       
         })
      );
    }

    // _____________Transportation_Emissions



    Transportation_Emissions(userDetails: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/Transportation_Emissions`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("checkElectricityConsumptionData successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetGraph:", error);
          return throwError(() => error);       
         })
      );
    }


    // _______insertElectricityConsumption

    insertElectricityConsumption(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/insertElectricityConsumption`,userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("insertElectricityConsumption successfully");
          }
        }),
        catchError((error) => {
          console.error("Error insertElectricityConsumption:", error);
          return throwError(() => error);        })
      );
    }


    // _______excelUpload

excelUpload(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/upload`, formData).pipe(
    tap((response: any) => {
      if (response.issuccessful) {
        console.log("excelUpload successfully");
      }
    }),
    catchError((error) => {
      console.error("Error excelUpload:", error);
      return throwError(() => error);
    })
  );
}


uploadResource(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/uploadResource`, formData).pipe(
    tap((response: any) => {
      if (response.issuccessful) {
        console.log("uploadResource successfully");
      }
    }),
    catchError((error) => {
      console.error("Error uploadResource:", error);
      return throwError(() => error);
    })
  );
}



// _____________BulkUpload


upload2(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/upload2`, formData).pipe(
    tap((response: any) => {
      if (response.issuccessful) {
        console.log("excelUpload successfully");
      }
    }),
    catchError((error) => {
      console.error("Error excelUpload:", error);
      return throwError(() => error);
    })
  );
}

 
 




// ________________________________________________________________________________________














    // _________________________________________________API integration For Industry 🤘🏼___________________________________________


        //__________________________________GetScopeEmissionInformationi 


    GetEmissionsResponseForIndustry(scopeEntityID: any, sourceTypeID: any, quarter:any, year:any, username : any, IndustryID: any, initiate_id: any): Observable<any> {
      const url = `${this.apiUrl}/GetEmissionsResponseForIndustry`;
      // const body = {
      //   ScopeEntityID: scopeEntityID,
      //   SourceTypeID: sourceTypeID || '',// Send an empty string if no specific source
      //   Quarter: quarter,
      //   Year: year
      // };
      const body = {
        ScopeEntityID: scopeEntityID,
        SubcategoryID: sourceTypeID || '',// Send an empty string if no specific source
        Quarters: quarter,
        UserName: username,
        Year: year,
        IndustryID: Number(IndustryID),
        initiate_id: initiate_id
      };
      return this.http.post<any>(url, body);
    }

    GetUnifiedScopeEmissionDetailssummery(
      SubcategoryID: any,
      quarter: any,
      year: any,
      username: string,
      IndustryID: any,
      initiate_id: any
    ): Observable<any> {
      const url = `${this.apiUrl}/GetUnifiedScopeEmissionDetailssummery`;

      const body = {
        subcategoryid: SubcategoryID ?? '',
        quarters: quarter ?? '',
        username: username,
        year: year,
        industryid: IndustryID,
        initiate_id: initiate_id
      };

      return this.http.post<any>(url, body);
    }


        getIndustryNames(username : any): Observable<any> {
      const url = `${this.apiUrl}/getIndustryNames`;
        // const body = {
        //   ScopeEntityID: scopeEntityID,
        //   SourceTypeID: sourceTypeID || '',// Send an empty string if no specific source
        //   Quarter: quarter,
        //   Year: year
        // };
        const body = {
          UserName: username,
        };
        return this.http.post<any>(url, username);
    }


    
    GetindustryLevelCategory(): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetindustryLevelCategory`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetAllCategories successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetAllCategories:", error);
          return throwError(() => error);        })
      );
    }



        //__________________________________insertScopeTwoEmissions


        InsertScopeOneDetailsForIndustry(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertScopeOneDetailsForIndustry`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("insertScopeTwoEmissions successfully");
              }
            }),
            catchError((error) => {
              console.error("Error insertScopeTwoEmissions:", error);
              return throwError(() => error);
            })
          );
        }

        InsertScopeTwoDetailsForIndustry(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertScopeTwoDetailsForIndustry`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("insertScopeTwoEmissions successfully");
              }
            }),
            catchError((error) => {
              console.error("Error insertScopeTwoEmissions:", error);
              return throwError(() => error);
            })
          );
        }
        InsertScopeThreeDetailsForIndustry(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertScopeThreeDetailsForIndustry`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("insertScopeTwoEmissions successfully");
              }
            }),
            catchError((error) => {
              console.error("Error insertScopeTwoEmissions:", error);
              return throwError(() => error);
            })
          );
        }


        InsertScopeThreeDetailsForIndustry2(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertScopeThreeDetailsForIndustry`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("insertScopeTwoEmissions successfully");
              }
            }),
            catchError((error) => {
              console.error("Error insertScopeTwoEmissions:", error);
              return throwError(() => error);
            })
          );
        }



        // Upload chart to S3
uploadChartToS3(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/upload-chart`, formData);
}

// Insert chart URL into database
insertChartUrl(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/insert-chart-url`, data);
}


            //__________________________________insertScopeTwoEmissions


        insertScopeTwoEmis2sions(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/insertScopeTwoEmissions`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("insertScopeTwoEmissions successfully");
              }
            }),
            catchError((error) => {
              console.error("Error insertScopeTwoEmissions:", error);
               return throwError(() => error);
            })
          );
        }



        //__________________________________insertScopeTwoEmissions


        insertScopeTwoEmi2ssions(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/insertScopeTwoEmissions`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("insertScopeTwoEmissions successfully");
              }
            }),
            catchError((error) => {
              console.error("Error insertScopeTwoEmissions:", error);
              return throwError(() => error);
            })
          );
        }





        


        //__________________________________InsertCategory


        InsertCategory(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertCategory`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("InsertCategory successfully");
              }
            }),
            catchError((error) => {
              console.error("Error InsertCategory:", error);
              return throwError(() => error);
            })
          );
        }


        //__________________________________InsertSubCategory


        InsertSubCategory(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertSubCategory`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("InsertSubCategory successfully");
              }
            }),
            catchError((error) => {
              console.error("Error InsertSubCategory:", error);
              return throwError(() => error);
            })
          );
        }

        //__________________________________InsertSubcategoryTemplateV2


        InsertSubcategoryTemplateV2(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertSubcategoryTemplateV2`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("InsertSubcategoryTemplateV2 successfully");
              }
            }),
            catchError((error) => {
              console.error("Error InsertSubcategoryTemplateV2:", error);
              return throwError(() => error);
            })
          );
        }


        //__________________________________InsertTemplate


        InsertTemplate(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/InsertTemplate`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("InsertTemplate successfully");
              }
            }),
            catchError((error) => {
              console.error("Error InsertTemplate:", error);
              return throwError(() => error);
            })
          );
        }


        //__________________________________GetCategoryAndSubcategoryForTemplates


        GetCategoryAndSubcategoryForTemplates(userDetails: any): Observable<any> {
          return this.http.post(`${this.apiUrl}/GetCategoryAndSubcategoryForTemplates`, userDetails).pipe(
            tap((response: any) => {
              if (response.issuccessful) {
                console.log("GetCategoryAndSubcategoryForTemplates successfully");
              }
            }),
            catchError((error) => {
              console.error("Error GetCategoryAndSubcategoryForTemplates:", error);
              return throwError(() => error);
            })
          );
        }




        // ____________________________GetSubcategory



        
        GetSubcategory(): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetSubcategory`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetSubcategory successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetSubcategory:", error);
          return throwError(() => error);        })
      );
    }



    // __________________________________GetCategory

    GetCategory(): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetCategory`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetCategory successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetCategory:", error);
          return throwError(() => error);        })
      );
    }


    // __________________________________GetUnit

    GetUnit(): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetUnit`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetUnit successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetUnit:", error);
          return throwError(() => error);        })
      );
    }



    // __________________________________getCatSubDropdown

    // getCatSubDropdown(): Observable<any> {
    //   return this.http.get(`${this.apiUrl}/getCatSubDropdown`).pipe(
    //     tap((response: any) => {
    //       if (response.issuccessful) {
    //         console.log("getCatSubDropdown successfully");
    //       }
    //     }),
    //     catchError((error) => {
    //       console.error("Error getCatSubDropdown:", error);
    //       return throwError(() => error);        })
    //   );
    // }


    getCatSubDropdown(): Observable<any>{
      const url = `${this.apiUrl}/getCatSubDropdown`; // Replace with your endpoint
      return this.http.post(url,{} );
    }



    // __________________________________getCatSubDropdownScope2

    getCatSubDropdownScope2(): Observable<any> {
      return this.http.get(`${this.apiUrl}/getCatSubDropdownScope2`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("getCatSubDropdownScope2 successfully");
          }
        }),
        catchError((error) => {
          console.error("Error getCatSubDropdownScope2:", error);
          return throwError(() => error);        })
      );
    }



    // __________________________________getCatSubDropdownScope3

    getCatSubDropdownScope3(): Observable<any> {
      return this.http.get(`${this.apiUrl}/getCatSubDropdownScope3`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("getCatSubDropdownScope3 successfully");
          }
        }),
        catchError((error) => {
          console.error("Error getCatSubDropdownScope3:", error);
          return throwError(() => error);        })
      );
    }

    // __________________________________GetCountryDropdown

    GetCountryDropdown(): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetCountryDropdown`).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetCountryDropdown successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetCountryDropdown:", error);
          return throwError(() => error);        })
      );
    }


    getDetailsForTemplates(userDetails: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/getDetailsForTemplates`, userDetails).pipe(
        tap((response: any) => {
          if (response.issuccessful) {
            console.log("GetCategoryAndSubcategoryForTemplates successfully");
          }
        }),
        catchError((error) => {
          console.error("Error GetCategoryAndSubcategoryForTemplates:", error);
          return throwError(() => error);
        })
      );
    }



    insertCBAM(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCBAM`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCbamOrganisationdetails(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCbamOrganisationdetails`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCbamProductdetails(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCbamProductdetails`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCBAMRawmaterialsFacilityinfo(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCBAMRawmaterialsFacilityinfo`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCBAMProductsalesoverview(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCBAMProductsalesoverview`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCBAMProductsalesoverviewUpload(payload: any | FormData): Observable<any> {
    const url = `${this.apiUrl}/upload`; // Replace with your actual API URL
    
    // If payload is FormData (contains file), don't set Content-Type header
    // The browser will set it automatically with the boundary
    if (payload instanceof FormData) {
      return this.http.post(url, payload);
    } else {
      // Regular JSON payload
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post(url, payload, { headers });
    }
  }

    insertCBAMProductionRoutes(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCBAMProductionRoutes`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCBAMSeeCalculations(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCBAMSeeCalculations`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCBAMScope1(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCBAMScope1`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    insertCBAMScope2(data : any): Observable<any>{
      const url = `${this.apiUrl}/insertCBAMScope2`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    getCBAMData(data : any): Observable<any>{
      const url = `${this.apiUrl}/getCBAMData`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    getCBAMProuctsCategory(data : any): Observable<any>{
      const url = `${this.apiUrl}/getCBAMProuctsCategory`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    getCBAMCNCodes(data : any): Observable<any>{
      const url = `${this.apiUrl}/getCBAMCNCodes`; // Replace with your endpoint
      return this.http.post(url, data );
    }

    getCBAMListData(data : any): Observable<any>{
      const url = `${this.apiUrl}/getCBAMListData`; // Replace with your endpoint
      return this.http.post(url, data );
    }


    // __________________________________ BRSR

    insertBusinessOverview(data: any): Observable<any> {
      const url = `${this.apiUrl}/insertBusinessOverview`; // Your API endpoint for the insert operation
      return this.http.post(url, data);  // Send data to the backend API
    }

    insertBsrsOperationsEmployee(data: any): Observable<any> {
      const url = `${this.apiUrl}/insertBsrsOperationsEmployee`;  // Replace with your actual endpoint
      return this.http.post(url, data);
    }

    insertBsrsRelatedCompany(data: any): Observable<any> {
      const url = `${this.apiUrl}/insertBsrsRelatedCompany`; // Replace with your actual API URL
      return this.http.post(url, data);
    }

      insertBsrCsrDetails(csrData: any): Observable<any> {
        const url = `${this.apiUrl}/insertBsrCsrDetails`;  // Replace with the correct API endpoint
        return this.http.post<any>(url, csrData);
      }

  getResponseForSectionA(entityId: string): Observable<any> {
  const requestPayload = { entity_id: entityId };

  return this.http.post(`${this.apiUrl}/getResponseForSectionA`, requestPayload).pipe(
    tap((response: any) => {
      if (response.issuccessful) {
        console.log("Section A fetched successfully");
      }
    }),
    catchError((error) => {
      console.error("Error fetching Section A details:", error);
      return throwError(() => error);
    })
  );
}


     
      
     processContent(data : any): Observable<any>{
      const url = `${this.apiUrl}/processContent`; // Replace with your endpoint
      return this.http.post(url, data );
    }

      // For Section B (one single API for all sub sections)

        insertManagement(managementData: any): Observable<any> {
          const url = `${this.apiUrl}/insertManagement`;  // Replace with the correct API endpoint
          return this.http.post<any>(url, managementData);
        }




        getResponseForSectionB(entityId: string): Observable<any> {
       const requestPayload = { entity_id: entityId };

  return this.http.post(`${this.apiUrl}/getResponseForSectionB`, requestPayload).pipe(
    tap((response: any) => {
      if (response.issuccessful) {
        console.log("Section B fetched successfully");
      }
    }),
    catchError((error) => {
      console.error("Error fetching Section B details:", error);
      return throwError(() => error);
    })
  );
}

         // Section C 

        // Principle 1 Essential

         insertTrainingAwareness(trainingData: any): Observable<any> {
          const url = `${this.apiUrl}/insertTrainingAwareness`;
          return this.http.post<any>(url, trainingData);
        }

        insertFinePenalities(finesData: any): Observable<any> {
          const url = `${this.apiUrl}/insertFinePenalities`;
          return this.http.post<any>(url, finesData);
        }

        insertAppeal(appealData: any): Observable<any> {
          const url = `${this.apiUrl}/insertAppeal`;
          return this.http.post<any>(url, appealData);
        }

        insertPolicy(policyData: any): Observable<any> {
          const url = `${this.apiUrl}/insertPolicy`;
          return this.http.post<any>(url, policyData);
        }

        insertDisciplinaryActions(actionsData: any): Observable<any> {
          const url = `${this.apiUrl}/insertDisciplinaryActions`;
          return this.http.post<any>(url, actionsData);
        }

        insertConflictInterestComplaints(conflictData: any): Observable<any> {
          const url = `${this.apiUrl}/insertConflictInterestComplaints`;
          return this.http.post<any>(url, conflictData);
        }

        insertCorrectiveActions(correctiveData: any): Observable<any> {
          const url = `${this.apiUrl}/insertCorrectiveActions`;
          return this.http.post<any>(url, correctiveData);
        }

        // Principle 1 Leadership

        insertPrincipleEthicsIntegrity(payload: any): Observable<any> {
          const url = `${this.apiUrl}/insertPrincipleEthicsIntegrity`; // adjust if needed
          return this.http.post<any>(url, payload);
        }



        // Principle 2 Essential

        insertCapexSourcing(payload: any) {
          const url = `${this.apiUrl}/insertCapexSourcing`;
          return this.http.post<any>(url, payload);
        }

        insertWasteManagement(payload: any) {
          const url = `${this.apiUrl}/insertWasteManagement`;
          return this.http.post<any>(url, payload);
        }

        // Principle 2 Leadership

        insertLcaDetails(payload: any) {
          const url = `${this.apiUrl}/insertLcaDetails`;
          return this.http.post<any>(url, payload);
        }

        insertRiskMigration(payload: any) {
          const url = `${this.apiUrl}/insertRiskMigration`;
          return this.http.post<any>(url, payload);
        }

        insertInputMaterial(payload: any) {
          const url = `${this.apiUrl}/insertInputMaterial`;
          return this.http.post<any>(url, payload);
        }

        insertProductPackage(payload: any) {
          const url = `${this.apiUrl}/insertProductPackage`;
          return this.http.post<any>(url, payload);
        }

        insertReclaimedPackagingPercentage(payload: any) {
          const url = `${this.apiUrl}/insertreclaimpercentage`;
          return this.http.post<any>(url, payload);
        }


        //get response for screen 2


       

        // Principle 3 Essential

        insertWellbeingMeasures(p: any) { return this.http.post<any>(`${this.apiUrl}/insertwellbeingmeasure`, p); }
        insertRetirementAccessibility(p: any) { return this.http.post<any>(`${this.apiUrl}/insertretirementaccess`, p); }
        insertParentalLeave(p: any) { return this.http.post<any>(`${this.apiUrl}/insertparentleave`, p); }
        insertGrievanceMechanism(p: any) { return this.http.post<any>(`${this.apiUrl}/insertgrievancemechanism`, p); }
        insertUnionMembership(p: any) { return this.http.post<any>(`${this.apiUrl}/insertunionmembership`, p); }
        insertBrsrTrainingDetails(p: any) { return this.http.post<any>(`${this.apiUrl}/insertbrsrtrainingdetails`, p); }
        insertBrsrPerformanceReview(p: any) { return this.http.post<any>(`${this.apiUrl}/insertbrsrperformancereview`, p); }
        insertBrsrHealthSafetyMangement(p: any) { return this.http.post<any>(`${this.apiUrl}/insertbrsrhealthsafetymangement`, p); }
        insertBrsrSafetyIncidents(p: any) { return this.http.post<any>(`${this.apiUrl}/insertbrsrsafetyincidents`, p); }
        insertBrsrSafetyDetails(p: any) { return this.http.post<any>(`${this.apiUrl}/insertbrsrsafetydetails`, p); }
        insertBrsrComplaints(p: any) { return this.http.post<any>(`${this.apiUrl}/insertbrsrcomplaints`, p); }
        insertBrsrAssessmentCorrectiveActions(p: any) { return this.http.post<any>(`${this.apiUrl}/insertbrsrassessmentcorrectiveactions`, p); }

        // Principle 3 Leadership

        insertBrsrLifeInsurance(data: any) {
          const url = `${this.apiUrl}/insertBrsrLifeInsurance`;
          return this.http.post<any>(url, data);
        }

        insertBrsrRehabilitation(data: any) {
          const url = `${this.apiUrl}/insertBrsrRehabilitation`;
          return this.http.post<any>(url, data);
        }

        insertBrsrValueChainAssessment(data: any) {
          const url = `${this.apiUrl}/insertBrsrValueChainAssessment`;
          return this.http.post<any>(url, data);
        }


        // Principle 4 Essential

        insertBrsrStakeholder(data: any) {
          const url = `${this.apiUrl}/insertBrsrStakeholder`;
          return this.http.post<any>(url, data);
        }

        // Principle 4 Leadership

        insertBrsrStakeholderConsultation(data: any) {
          const url = `${this.apiUrl}/insertBrsrStakeholderConsultation`;
          return this.http.post<any>(url, data);
        }





        // Principle 5 Essential

        insertBrsrHuman(data: any) {
          const url = `${this.apiUrl}/insertbrsrhumanrightstraining`;
          return this.http.post<any>(url, data);
        }

        insertBrsrMinimumWages(data: any) {
          const url = `${this.apiUrl}/insertbrsrminimumwages`;
          return this.http.post<any>(url, data);
        }

        insertBrsrRemenurationHr(data: any) {
          const url = `${this.apiUrl}/insertbrsrremenurationhr`;
          return this.http.post<any>(url, data);
        }

        insertBrsrComplaintsHumanRights(data: any) {
          const url = `${this.apiUrl}/insertbrsrcomplaintshumanrights`;
          return this.http.post<any>(url, data);
        }

        insertBrsrAssessmentsActions(data: any) {
          const url = `${this.apiUrl}/insertbrsrassessmentsactions`;
          return this.http.post<any>(url, data);
        }


        

        // Principle 5 Leadership

        insertBrsrHumanRightsAssessment(data: any) {
          const url = `${this.apiUrl}/insertbrsrhumanrightsassessment`;
          return this.http.post<any>(url, data);
        }


      //get response for screen 5





                 getSectionCScreen5(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen5`, data);
                  }


                  getSectionCScreen6(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen6`, data);
                  }



                getSectionCScreen7(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen7`, data);
                  }




                 getSectionCScreen8(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen8`, data);
                  }



                getSectionCScreen9(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen9`, data);
                  }



                 getSectionCScreen10(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen10`, data);
                  }



            getSectionCScreen11(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen11`, data);
                  }




               getSectionCScreen12(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen12`, data);
                  }




               getSectionCScreen14(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen14`, data);
                  }
        // Principle 6 Essential

        insertBrsrEnergyConsumption(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrenergyconsumption`, body);
        }
        insertBrsrWaterDisclosures(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrwaterdisclosures`, body);
        }
        insertBrsrAirEmissions(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrairemissions`, body);
        }
        insertBrsrGHGEmission(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrghgemission`, body);
        }
        insertBrsrWasteData(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrwastedata`, body);
        }
        insertBrsrSensitiveOperations(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrsensitiveoperations`, body);
        }
        insertBrsrEnvironmentalImpactAssessments(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrenvironmentalimpactassessment`, body);
        }
        insertBrsrEnvironmentalCompliance(body: any) {
          return this.http.post(`${this.apiUrl}/insertbrsrenvironmentalcompliance`, body);
        }

         // Principle 6 Leadership

           insertBrsrEnergyBreakup(payload: any): Observable<any> {
            return this.http.post(`${this.apiUrl}/insertBrsrEnergyBreakup`, payload);
          }

          // Insert BRSR Water Discharge
          insertBrsrWaterDischarge(payload: any): Observable<any> {
            return this.http.post(`${this.apiUrl}/insertBrsrWaterDischarge`, payload);
          }

          // Insert BRSR Water Stress Usage
          insertBrsrWaterStressUsage(payload: any): Observable<any> {
            return this.http.post(`${this.apiUrl}/insertBrsrWaterStressUsage`, payload);
          }

          // Insert BRSR Scope 3 Emissions
          insertBrsrScope3Emissions(payload: any): Observable<any> {
            return this.http.post(`${this.apiUrl}/insertBrsrScope3Emissions`, payload);
          }

          // Insert BRSR Environmental Initiatives
          insertBrsrEnvironmentalInitiatives(payload: any): Observable<any> {
            return this.http.post(`${this.apiUrl}/insertBrsrEnvironmentalInitiatives`, payload);
          }

          // Principle 7 Essential

            insertBrsrTradeAffiliations(payload: any): Observable<any> {
              return this.http.post(`${this.apiUrl}/insertBrsrTradeAffiliations`, payload);
            }

            insertBrsrTradeAntiCompetitveActions(payload: any): Observable<any> {
              return this.http.post(`${this.apiUrl}/insertBrsrTradeAntiCompetitveActions`, payload);
            }
          
          // Principle 7 Leadership

            insertBrsrPublicPolicyAdvocacy(payload: any): Observable<any> {
              return this.http.post(`${this.apiUrl}/insertBrsrPublicPolicyAdvocacy`, payload);
            }

          // Principle 8 Essential

            insertBrsrSocialImpactAssessment(payload: any): Observable<any> {
              return this.http.post<any>(`${this.apiUrl}/insertBrsrSocialImpactAssessment`, payload);
            }

            // -----------------------------
            // Insert BRSR RR Project Grievances
            // -----------------------------
            insertBrsrRRProjectGrievances(payload: any): Observable<any> {
              return this.http.post<any>(`${this.apiUrl}/insertBrsrRRProjectGrievances`, payload);
            }

            // -----------------------------
            // Insert BRSR Input Material Sourcing
            // -----------------------------
            insertBrsrInputMaterialSourcing(payload: any): Observable<any> {
              return this.http.post<any>(`${this.apiUrl}/insertBrsrInputMaterialSourcing`, payload);
            }

            // Principle 8 Leadership

             insertBrsrNegativeSocialImpacts(payload: any): Observable<any> {
                return this.http.post<any>(`${this.apiUrl}/insertbrsrnegativesocialimpacts`, payload);
              }

              // --- 2️⃣ CSR Projects + Procurement ---
              insertBrsrCsrProjectsProcurement(payload: any): Observable<any> {
                return this.http.post<any>(`${this.apiUrl}/insertbrsrcsrprojectsprocurement`, payload);
              }

              // --- 3️⃣ Traditional Knowledge IP ---
              insertBrsrTraditionalKnowledgeIp(payload: any): Observable<any> {
                return this.http.post<any>(`${this.apiUrl}/insertbrsrtraditionalknowledgeip`, payload);
              }

              // --- 4️⃣ IP Disputes ---
              insertBrsrIpDisputesCorrectiveActions(payload: any): Observable<any> {
                return this.http.post<any>(`${this.apiUrl}/insertbrsripdisputescorrectiveactions`, payload);
              }

              // --- 5️⃣ CSR Beneficiaries ---
              insertBrsrCsrBeneficiaries(payload: any): Observable<any> {
                return this.http.post<any>(`${this.apiUrl}/insertbrsrcsrbeneficiaries`, payload);
              }

              // Principle 9 Essential

                insertBrsrConsumerMechanismTurnover(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/insertBrsrConsumerMechanismTurnover`, payload);
                }

                // --- 2️⃣ Consumer Complaints ---
                insertBrsrConsumerComplaints(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/insertBrsrConsumerComplaints`, payload);
                }

                // --- 3️⃣ Product Safety, Recalls & Cybersecurity ---
                insertBrsrProductSafetyCyber(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/insertBrsrProductSafetyCyber`, payload);
                }

                // Principle 9 Leadership

                insertBrsrConsumerInfo(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/insertbrsrconsumerinfo`, payload);
                }
                
                
                
                // ___________________Brsr __________________________
                
                
                updateBSREntityFull(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBSREntityFull`, payload);
                }
                
                
                updateBSROperationEmployee(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBSROperationEmployee`, payload);
                }
                
                
                updatebrsrrelatedcompany(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrrelatedcompany`, payload);
                }
                
                
                updateBRSRCSRDetails(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBRSRCSRDetails`, payload);
                }



                // Get BRSR

                  getSectionCScreen1(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen1`, data);
                  }

                  getSectionCScreen2(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen2`, data);
                  }

                  getSectionCScreen3(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen3`, data);
                  }

                  getSectionCScreen4(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen4`, data);
                  }

                  getSectionCScreen13(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen13`, data);
                  }

                  getSectionCScreen13A(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen13A`, data);
                  }

                  getSectionCScreen15A(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen15A`, data);
                  }

                  getSectionCScreen15B(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen15B`, data);
                  }

                  getSectionCScreen15C(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen15C`, data);
                  }

                  getSectionCScreen16(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen16`, data);
                  }

                  getSectionCScreen17(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen17`, data);
                  }

                  getSectionCScreen18(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getSectionCScreen18`, data);
                  }


                 
                  //update function for section B

                  updateManagement(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatemanagement`, payload);
                }
                 getScopeEmissionsByInitiateId(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/getScopeEmissionsByInitiateId`, payload);
                }

                processAnomalyDetection(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/processAnomalyDetection`, payload);
                }


                processHotspotAnalysisByInitateID(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/processHotspotAnalysisByInitateID`, payload);
                }


                // processCityAnomaly(payload: any): Observable<any> {
                //   return this.http.post<any>(`${this.apiUrl}/processCityAnomaly`, payload);
                // }

                // processCityArima(payload: any): Observable<any> {
                //   return this.http.post<any>(`${this.apiUrl}/processCityArima`, payload);
                // }

                //prediction  model scope1
                processCityArima(): Observable<any> {
                  return this.http.get<any>(`${this.apiUrl}/processCityArima`);
                }

                //anomly model city scope1
                processCityAnomaly(): Observable<any> {
                  return this.http.get<any>(`${this.apiUrl}/processCityAnomaly`);
                }

                processCityPredictionS1(): Observable<any> {
                  return this.http.get<any>(`${this.apiUrl}/processCityPredictionS1`);
                }

                predictionCityScope2(): Observable<any> {
                  return this.http.get<any>(`${this.apiUrl}/predictionCityScope2`);
                }

                //anomly model city scope2
                processCityAnomalyS2(): Observable<any> {
                  return this.http.get<any>(`${this.apiUrl}/processCityAnomalyS2`);
                }

                processHotspot(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/processHotspotAnalysis`, payload);
                }

                predictiveAnalysis(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/processPredictive`, payload);
                }


                generateReport(payload: any): Observable<any> {
                  //return this.http.post<any>(`${this.apiUrl}/generateReport`, payload);
                  const url = `${this.apiUrl}/generateReport`;
                  return this.http.post(url, payload, { 
                    responseType: 'blob' // This tells Angular to expect binary data
                  });
                }




                 //update function for section C Screen 18

                  updateSectionCScreen18(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrconsumerinfo`, payload);
                }


                  updateBrsrConsumerMechanismTurnover(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrconsumermechanismturnover`, payload);
                }

                updateBrsrConsumerComplaints(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrconsumercomplaints`, payload);
                }

                 updateBrsrProductSafetyCyber(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrproductsafetycyber`, payload);
                }

                 updateBrsrSocialImpactAssessment(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrsocialimpactassessment`, payload);
                }

                updateBrsrRRProjectsGreivances(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrrrprojectsgreivances`, payload);
                }


                 updateBrsrInputMaterialSourcing(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrinputmaterialsourcing`, payload);
                }


                //update function for screen 16
                
                updateBrsrNegativeSocialImpacts(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrnegativesocialimpacts`, payload);
                }


                updateBrsrCsrProjectsProcurement(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrcsrprojectsprocurement`, payload);
                }


                updateBrsrTraditionalKnowledgeIp(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrtraditionalknowledgeip`, payload);
                }

                 updateBrsrIpDisputesCorrectiveActions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsripdisputescorrectiveactions`, payload);
                }


                  updateBrsrCsrBeneficiaries(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrcsrbeneficiaries`, payload);
                }



                //update function for screen 13

                updateBrsrTradeAffiliations(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrtradeaffiliations`, payload);
                }



                updateBrsrAntiCompetitiveActions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsranticompetitiveactions`, payload);
                }


                //update function for screen 14

                updateBrsrPublicPolicyAdvocacy(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrpublicpolicyadvocacy`, payload);
                }

                

                //update function for screen 11


               updateBRSRSEnvironmentalCompliance(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBRSRSEnvironmentalCompliance`, payload);
                }

                updateBRSRSEnvironmentalImpactAssessments(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBRSRSEnvironmentalImpactAssessments`, payload);
                }

                updateBrsrSensitiveOperations(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBrsrSensitiveOperations`, payload);
                }

                 updateBrsrWasteData(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBrsrWasteData`, payload);
                }

                updateBrsrGHGEmission(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBrsrGHGEmission`, payload);
                }

                  updateBrsrAirEmissions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBrsrAirEmissions`, payload);
                }

                  updateBrsrWaterDisclosures(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBrsrWaterDisclosures`, payload);
                }


                 updateBrsrEnergyConsumption(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateBrsrEnergyConsumption`, payload);
                }



                //update function for screen 3

                updateCapexSourcing(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatecapexsourcing`, payload);
                }


                updateWasteManagement(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatewastemanagement`, payload);
                }



                //update function for screen 4

                 updateLcaDetails(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatelcadetails`, payload);
                }


                 updateRiskMigration(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateriskmigration`, payload);
                }


                updateInputMaterial(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateinputmaterial`, payload);
                }


                 updateProductPackage(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateproductpackage`, payload);
                }

                 updateReclaimedPackagingPercentage(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatereclaimpercentage`, payload);
                }



                //update function for screen 1


                 updateTrainingAwareness(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatetrainingawareness`, payload);
                }


                 updateFinePenality(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatefinepenalities`, payload);
                }


                 updateAppeal(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateappeal`, payload);
                }


                 updatePolicy(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatepolicy`, payload);
                }


                 updateDisciplinaryActions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatedisciplinaryactions`, payload);
                }


                 updateConflictInterestComplaints(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateconflictinterestcomplaints`, payload);
                }


                 updateCorrectiveActions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatecorrectiveactions`, payload);
                }



                //update function for screen 2

                 updatePrincipleEthicsIntegrity(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateprincipleethicsintegrity`, payload);
                }


                


                //update function for screen 7

                 updateBRSRStakeholderEngagement(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrstakeholder`, payload);
                }


                // update function for screen 8

                updateBRSRStakeholderConsultation(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrstakeholderconsultation`, payload);
                }


                // update function for screen 5


                 updateWellbeingMeasures(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatewellbeingmeasures`, payload);
                }


                 updateRetirementAccessibility(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateretirementaccessibility`, payload);
                }


                updateParentLeave(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateparentleave`, payload);
                }

                updateGrievanceMechanism(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updategrievancemechanism`, payload);
                }

                updateUnionMembership(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateunionmembership`, payload);
                }

                 updateBrsrTrainingDetails(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrtrainingdetails`, payload);
                }


                 updateBrsrPerformanceReview(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrperformancereview`, payload);
                }


                  updateBrsrHealthSafetyMangement(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrhealthsafetymangement`, payload);
                }

                  updateBrsrSafetyIncidents(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrsafetyincidents`, payload);
                }


                  updateBrsrSafetyDetails(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrsafetydetails`, payload);
                }


                  updateBrsrComplaints(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrcomplaints`, payload);
                }


                  updateBrsrAssessmentCorrectiveActions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrassessmentcorrectiveactions`, payload);
                }



                //update function for screen 6


                 updateBrsrLifeInsurance(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrlifeinsurance`, payload);
                }


                  updateBrsrRehabilitation(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrrehabilitation`, payload);
                }

                  updateBrsrValueChainAssessment(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrvaluechainassessment`, payload);
                }


                //update function for screen 10


                updateBRSRSHumanRightsAssessment(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrhumanrightsassessment`, payload);
                }


                //update function for screen 12

                updateBrsrEnergyBreakup(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrenergybreakup`, payload);
                }


                 updateBrsrWaterDischarge(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrwaterdischarge`, payload);
                }


                  updateBrsrWaterStressUsage(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrwaterstressusage`, payload);
                }


                updateBrsrScope3Emissions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrscope3emissions`, payload);
                }


                 updateBrsrEnvironmentalInitiatives(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrenvironmentalinitiatives`, payload);
                }


                //update function for screen 9


                  updateBRSRHumanRightsTraining(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrhumanrightstraining`, payload);
                }


                
                  updateBRSRMinimumWages(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrminimumwages`, payload);
                }


                  updateBRSRRemenurationHr(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrremenurationhr`, payload);
                }


                 updateBrsrComplaintsHumanRights(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrcomplaintshumanrights`, payload);
                }


                updateBrsrAssessmentsActions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updatebrsrassessmentsactions`, payload);
                }





                processContentBRSR(data: any) {
                    return this.http.post(`${this.apiUrl}/processcontentbrsr`, data, {
                    responseType: 'blob'  // 👈 IMPORTANT!
                   });
                  }





                    getBRSRListData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getbrsrlistdata`; 
                     return this.http.post(url, data );
                    }



                     getAllBRSRData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getallbrsrdata`; 
                     return this.http.post(url, data );
                    }


                    
                     getBRSRTableData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getbrsrtabledata`; 
                     return this.http.post(url, data );
                    }

                    // For GRI

                      insertGriOrganization(data: any): Observable<any> {
                        const url = `${this.apiUrl}/insertGriOrganization`; 
                          return this.http.post(url, data );
                      }

                      // 📌 2. Insert GRI Employee Base
                      insertGriEmployeeBase(data: any): Observable<any> {

                        const url = `${this.apiUrl}/insertGriEmployeeBase`; 
                          return this.http.post(url, data );
                      }

                      insertGriGovernance(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriGovernance`; 
                          return this.http.post(url, data );
                      }

                      insertGriStrategyPoliciesPractices(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriStrategyPoliciesPractices`; 
                          return this.http.post(url, data );
                      }

                      // auth.service.ts
                      insertGriStakeholderEngagement(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriStakeholderEngagement`; 
                          return this.http.post(url, data );
                      }

                      // auth.service.ts
                      insertGriMaterialTopics(data: any): Observable<any> {

                          const url = `${this.apiUrl}/insertGriMaterialTopics`; 
                          return this.http.post(url, data );
                      }

                      insertAntiCorruption(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertAntiCorruption`; 
                          return this.http.post(url, data );
                      }

                      insertAntiCompetitiveBehavior(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertAntiCompetitiveBehavior`; 
                          return this.http.post(url, data );
                      }


                      
                        insertEnergyConsumptionBySource(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertEnergyConsumptionBySource`;
                          return this.http.post(url, data);
                        }

                          insertGriEmploymentTurnOver(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriEmploymentTurnOver`;
                          return this.http.post(url, data);
                        }



                        insertGriEnergy(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriEnergy`;
                          return this.http.post(url, data);
                        }

                        // Energy Consumption Outside Insert API
                        insertEnergyConsumptionOutside(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertenergyconsumptionoutside`;
                          return this.http.post(url, data);
                        }

                        // Energy Intensity Insert API
                        insertEnergyIntensity(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertenergyintensity`;
                          return this.http.post(url, data);
                        }

                        // Energy Consumption Summary Insert API
                        insertEnergyConsumptionSummary(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertenergyconsumption`;
                          return this.http.post(url, data);
                        }

                          insertGhgEmissions(payload: any): Observable<any> {
                            const url = `${this.apiUrl}/insertghgemissions`;  // Replace with the actual endpoint URL
                            return this.http.post(url, payload);
                          }

                            insertGriEmployment(payload: any): Observable<any> {
                              const url = `${this.apiUrl}/insertgriemployment`;  // Replace with your actual API endpoint
                              return this.http.post(url, payload);
                            }

                            insertGriEmploymentOhs(data: any): Observable<any> {
                              const url = `${this.apiUrl}/insertgriemploymentohs`;
                              return this.http.post(url, data);  // Send data to backend API
                            }

                            insertGriEmploymentTraining(data: any): Observable<any> {
                              const url = `${this.apiUrl}/insertgriemploymenttraining`; // Use the correct API endpoint
                              return this.http.post(url, data);  // Send data to the backend API
                            }

                            insertGriEmploymentPerformanceHealth(data: any): Observable<any> {
                              const url = `${this.apiUrl}/insertgriemploymentperformance`; // Use the correct API endpoint
                              return this.http.post(url, data);  // Send data to the backend API
                            }

                            insertGriDiversity(data: any): Observable<any> {
                              const url = `${this.apiUrl}/insertgridiversity`;  // Ensure this is the correct URL for your API
                              return this.http.post(url, data);
                            }

                            
                            insertGriDiversitySnapshot(data: any): Observable<any> {
                              const url = `${this.apiUrl}/insertGriDiversitySnapshot`;  // Ensure this is the correct URL for your API
                              return this.http.post(url, data);
                            }

                              insertGriCustomer(payload: any): Observable<any> {
                                const url = `${this.apiUrl}/insertgricustomer`; // Backend API endpoint for inserting GRI Customer Data
                                return this.http.post(url, payload);
                              }





                      //screen 15 

                      insertGriEmissions(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertgriemissions`; 
                          return this.http.post(url, data );
                      }


                      insertGriCo2Emissions(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriCo2Emissions`; 
                          return this.http.post(url, data );
                      }


                      insertGriGreenhouse(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriGreenhouse`; 
                          return this.http.post(url, data );
                      }


                        insertCo2EmissionsAll(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertCo2EmissionsAll`; 
                          return this.http.post(url, data );
                      }


                      insertGriGhp(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriGhp`; 
                          return this.http.post(url, data );
                      }


                       insertGriGhgEmissions(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriGhgEmissions`; 
                          return this.http.post(url, data );
                      }

                      insertGriCarbonOffset(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriCarbonOffset`; 
                          return this.http.post(url, data );
                      }


                      insertGriScope3(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriScope3`; 
                          return this.http.post(url, data );
                      }


                      insertGriGhgIntensity(data: any): Observable<any> {
                          const url = `${this.apiUrl}/insertGriGhgIntensity`; 
                          return this.http.post(url, data );
                      }


                      getGRIListData(data : any): Observable<any>{
                       const url = `${this.apiUrl}/getGRIListData`; 
                       return this.http.post(url, data );
                    }



                      getGRITableData(data : any): Observable<any>{
                       const url = `${this.apiUrl}/getGRITableData`; 
                       return this.http.post(url, data );
                    }



                  getGriOrganization(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgriorganization`, data);
                  }


                  getGriEmployeeBase(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgriemployeebase`, data);
                  }


                  getGriGovernance(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrigovernance`, data);
                  }


                  getGriStrategy(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgristrategy`, data);
                  }

                   getGriStakeholder(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgristakeholder`, data);
                  }


                updateGriOrganization(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriOrganization`, payload);
                }

                updateGriEmployeeBase(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriEmployeeBase`, payload);
                }

                updateGriGovernance(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriGovernance`, payload);
                }

                updateGriStrategyPoliciesPractices(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriStrategyPoliciesPractices`, payload);
                }


                updateGriStakeholderEngagement(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriStakeholderEngagement`, payload);
                }


                
                getGriMaterialTopics(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrimaterialtopics`, data);
                  }


                updateGriMaterialTopics(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriMaterialTopics`, payload);
                }

                 getGriAntiCorruption(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrianticorruption`, data);
                  }

                  updateAntiCorruption(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateAntiCorruption`, payload);
                }


                  getGriAntiCompetitive(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrianticompetitive`, data);
                  }


                  updateAntiCompetitiveBehavior(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateAntiCompetitiveBehavior`, payload);
                }



                 updateGriEnergy(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriEnergy`, payload);
                }


                 updateEnergyConsumptionSummary(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateEnergyConsumptionSummary`, payload);
                }


                 updateEnergyConsumptionOutside(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateEnergyConsumptionOutside`, payload);
                }


                 updateEnergyIntensity(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateEnergyIntensity`, payload);
                }


                  updateEnergyConsumptionBySource(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateEnergyConsumption`, payload);
                }



                  getGriDiversity(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgridiversity`, data);
                  }


                  updateDiversity(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updategridiversity`, payload);
                }


                  getGriCustom(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgricustom`, data);
                  }

                updateGriCustomer(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updategricustomer`, payload);
                }

                  
                  getGriEnergy(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrienergy`, data);
                  }

                  getGriEnergyConsumption(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrienergyconsumption`, data);
                  }

                   getGriEnergyOutside(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrienergyoutside`, data);
                  }

                   getGriEnergyIntensity(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrienergyintensity`, data);
                  }

                   getGhgEmission(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getghgemission`, data);
                  }


                  updateGhgEmissions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGhgEmissions`, payload);
                }


                   getGhgEmployment(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getghgemployment`, data);
                  }

                   getGriEmployment(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgriemployment`, data);
                  }

                  updateGriEmploymentOhs(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriEmploymentOhs`, payload);
                }


                  getGriEmploymentTraining(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgriemploymenttraining`, data);
                  }


                  updateGriEmploymentTraining(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriEmploymentTraining`, payload);
                }

                   getGriEmploymentPerformance(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgriemploymentperformance`, data);
                  }

                   updateGriEmploymentPerformanceHealth(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriEmploymentPerformance`, payload);
                }



                   getGhgEmissionStatement(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getghgemissionstatement`, data);
                  }

                   getGriCo2Emissions(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrico2emissions`, data);
                  }

                   getGriGreenhouse(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getgrigreenhouse`, data);
                  }
                  
                   getCo2EmissionsAll(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getCo2EmissionsAll`, data);
                  }

                   getGriGhp(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getGriGhp`, data);
                  }

                   getGriEmissionFactor(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getGriEmissionFactor`, data);
                  }

                   getGriCarbon(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getGriCarbon`, data);
                  }

                   getGriScope3Emissions(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getGriScope3Emissions`, data);
                  }

                    getGriGhgEmissions(data: any): Observable<any> {
                    return this.http.post<any>(`${this.apiUrl}/getGriGhgEmissions`, data);
                  }




                updateGriEmissions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriEmissions`, payload);
                }

                updateGriCo2Emissions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriCo2Emissions`, payload);
                }

                updateGriGreenhouse(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriGreenhouse`, payload);
                }

                updateCo2EmissionsAll(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateCo2EmissionsAll`, payload);
                }

                updateGriGhp(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriGhp`, payload);
                }

                updateGriGhgEmissions(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriGhgEmissions`, payload);
                }

                updateGriCarbonOffset(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriCarbonOffset`, payload);
                }

                updateGriScope3(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriScope3`, payload);
                }

                updateGriGhgIntensity(payload: any): Observable<any> {
                  return this.http.post<any>(`${this.apiUrl}/updateGriGhgIntensity`, payload);
                }


                //gri report api

               generateGRIReport(data: any): Observable<Blob> {
                const options = { responseType: 'blob' as 'json' };
                return this.http.post<Blob>(`${this.apiUrl}/generategrireport`, data, options);
              }









////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    getCategorySupplier(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategorySupplier`; 
                     return this.http.post(url, data );
                    }

                    insertcategorySupplier(data : any): Observable<any>{
                     const url = `${this.apiUrl}/insertcategorySupplier`; 
                     return this.http.post(url, data );
                    }


                    insertFootprintKPICategoryData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/insertFootprintKPICategoryData`; 
                     return this.http.post(url, data );
                    } 

                    getFootprintKPICategoryData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getFootprintKPICategoryData`; 
                     return this.http.post(url, data );
                    } 

                    getCategoryCompareData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategoryCompareData`; 
                     return this.http.post(url, data );
                    } 

                    insertcategory(data : any): Observable<any>{
                     const url = `${this.apiUrl}/insertcategory`; 
                     return this.http.post(url, data );
                    } 

                    getCategory(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategory`; 
                     return this.http.post(url, data );
                    } 

                    insertorUpdateCategoryData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/insertorUpdateCategoryData`; 
                     return this.http.post(url, data );
                    }

                    getCategoryWiseDataDashboard(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategoryWiseDataDashboard`; 
                     return this.http.post(url, data );
                    }

                    getCategoryDayWiseDataDashboard(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategoryDayWiseDataDashboard`; 
                     return this.http.post(url, data );
                    }

                    getSubCategoryDayWiseDataDashboard(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getSubCategoryDayWiseDataDashboard`; 
                     return this.http.post(url, data );
                    }

                    getSubCategorySummary(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getSubCategorySummary`; 
                     return this.http.post(url, data );
                    }

                    getFootprintIndustryDetails(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getFootprintIndustryDetails`; 
                     return this.http.post(url, data );
                    }

                    getFootprintTopBottomCompanyDetails(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getFootprintTopBottomCompanyDetails`; 
                     return this.http.post(url, data );
                    }

                    getSubCategoryMonthlyData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getSubCategoryMonthlyData`; 
                     return this.http.post(url, data );
                    }

                    insertSubCategoryKPI(data : any): Observable<any>{
                     const url = `${this.apiUrl}/insertSubCategoryKPI`; 
                     return this.http.post(url, data );
                    }

                    updateSubCategory(data : any): Observable<any>{
                     const url = `${this.apiUrl}/updateSubCategory`; 
                     return this.http.post(url, data );
                    }

                    getSubCategoryDetails(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getSubCategoryDetails`; 
                     return this.http.post(url, data );
                    }

                    prepopulateCategoryDetails(data : any): Observable<any>{
                     const url = `${this.apiUrl}/prepopulateCategoryDetails`; 
                     return this.http.post(url, data );
                    }

                    getCategoryTotalsByMaster(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategoryTotalsByMaster`; 
                     return this.http.post(url, data );
                    }

// ________________City APIs

                    getCategorywiseEmissionScope1(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategorywiseEmissionScope1`; 
                     return this.http.post(url, data );
                    }

                    insertForest(data : any): Observable<any>{
                     const url = `${this.apiUrl}/insertForest`; 
                     return this.http.post(url, data );
                    }

                    getForest(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getForest`; 
                     return this.http.post(url, data );
                    }


                    getCategorywiseEmissionScope2(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getCategorywiseEmissionScope2`; 
                     return this.http.post(url, data );
                    }



                    getAIData(data : any): Observable<any>{
                     const url = `${this.apiUrl}/getAIData`; 
                     return this.http.post(url, data );
                    }




                    GetTotalScope1Emission(): Observable<any>{
                     const url = `${this.apiUrl}/GetTotalScope1Emission`; 
                     return this.http.get(url );
                    }



                    GetTotalScope2Emission(): Observable<any>{
                     const url = `${this.apiUrl}/GetTotalScope2Emission`; 
                     return this.http.get(url );
                    }

                    getHotspotDataByAI(data: any): Observable<any>{
                     const url = `${this.apiUrl}/getHotspotDataByAI`; 
                     return this.http.post(url, data);
                    }


                      downloadExcel(data: any): Observable<Blob> {
                        const url = `${this.apiUrl}/generate-excel`;
                        return this.http.post(url, data, { responseType: 'blob' });
                      }


 




                  insertGRI(payload: any | FormData): Observable<any> {
                   const url = `${this.apiUrl}/upload`; // Replace with your actual API URL
    
                 
                  if (payload instanceof FormData) {
                     return this.http.post(url, payload);
                    } else {
                       // Regular JSON payload
                  const headers = new HttpHeaders({
                   'Content-Type': 'application/json'
                  });
                  return this.http.post(url, payload, { headers });
                  }
                  }



                  


  









}
