import { Routes } from '@angular/router';  
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './common/login/login.component';
import { OnboardingComponent } from './common/onboarding/onboarding.component';
import { CarbonRetirementsComponent } from './components/carbon-retirements/carbon-retirements.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPurchaseComponent } from './components/my-purchase/my-purchase.component';
import { FeaturesComponent } from './components/features/features.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RetireProofComponent } from './components/retire-proof/retire-proof.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

 

export const routes: Routes = [
        
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {path:'login' , component:LoginComponent},
    {path:'onboarding' , component:OnboardingComponent},
    {path:'retire' , component:CarbonRetirementsComponent},
    {path:'dash' , component:DashboardComponent},
    {path:'pur' , component:MyPurchaseComponent},
    {path:'feat' , component:FeaturesComponent},
    {path:'over' , component:OverviewComponent},
    {path:'checkout' , component:CheckoutComponent},
    {path:'proof' , component:RetireProofComponent},
    {path:'detail' , component:ProductDetailComponent},
    { path: '**', redirectTo: 'login' },


    

];



 