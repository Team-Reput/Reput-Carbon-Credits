import { Routes } from '@angular/router';  
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './common/login/login.component';
import { OnboardingComponent } from './common/onboarding/onboarding.component';
import { CarbonRetirementsComponent } from './components/carbon-retirements/carbon-retirements.component';
// import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPurchaseComponent } from './components/my-purchase/my-purchase.component';
import { FeaturesComponent } from './components/features/features.component';

 

export const routes: Routes = [
        
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {path:'login' , component:LoginComponent},
    {path:'onboarding' , component:OnboardingComponent},
    {path:'retire' , component:CarbonRetirementsComponent},
    // {path:'nav' , component:NavbarComponent},
    {path:'dash' , component:DashboardComponent},
    {path:'pur' , component:MyPurchaseComponent},
    {path:'feat' , component:FeaturesComponent},
    

 
    { path: '**', redirectTo: 'login' },


    

];



 