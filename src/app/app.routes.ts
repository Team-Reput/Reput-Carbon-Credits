import { Routes } from '@angular/router';  
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './common/login/login.component';
import { OnboardingComponent } from './common/onboarding/onboarding.component';
import { CarbonRetirementsComponent } from './components/Buyer/carbon-retirements/carbon-retirements.component';
import { DashboardComponent } from './components/Buyer/dashboard/dashboard.component';
import { MyPurchaseComponent } from './components/Buyer/my-purchase/my-purchase.component';
import { FeaturesComponent } from './components/Buyer/features/features.component';
import { OverviewComponent } from './components/Buyer/overview/overview.component';
import { CheckoutComponent } from './components/Buyer/checkout/checkout.component';
import { RetireProofComponent } from './components/Buyer/retire-proof/retire-proof.component';
import { ProductDetailComponent } from './components/Buyer/product-detail/product-detail.component';
import { BuyerProfileComponent } from  './components/Buyer/buyer-profile/buyer-profile.component';
import { SupplierDashboardComponent } from './components/Seller/supplier-dashboard/supplier-dashboard.component';
import { TokenRequestComponent } from './components/Seller/token-request/token-request.component';
import { PortfolioComponent } from './components/Buyer/portfolio/portfolio.component';
import { SellerOnboardingComponent } from './components/Seller/seller-onboarding/seller-onboarding.component';

 

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
    {path:'supplierDash' , component:SupplierDashboardComponent},
    {path:'token-request' , component:TokenRequestComponent},
    {path:'buyer-profile' , component:BuyerProfileComponent},
    {path:'portfolio' , component:PortfolioComponent},
    {path:'seller-onboarding' , component:SellerOnboardingComponent},
    { path: '**', redirectTo: 'login' },


    

];



 









