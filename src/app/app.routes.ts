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
import { TokenRequestComponent } from './components/Seller/project/token-request/token-request.component';
import { PortfolioComponent } from './components/Buyer/portfolio/portfolio.component';
import { SellerOnboardingComponent } from './components/Seller/onboard/seller-onboarding/seller-onboarding.component';
import { SellerValidationComponent } from './components/Seller/onboard/seller-validation/seller-validation.component';
import { ProjectComponent } from './components/Seller/project/project.component';
import { AboutProjectComponent } from './components/Seller/project/about-project/about-project.component';
import { TokenStatusComponent } from './components/Seller/project/token-status/token-status.component';
import { TokenPortfolioComponent } from './components/Seller/project/token-portfolio/token-portfolio.component';
import { RegisterProjectComponent } from './components/Seller/project/register-project/register-project.component';
import { TokenDetailsComponent } from './components/Seller/project/token-details/token-details.component';

 

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
    {path:'buyer-profile' , component:BuyerProfileComponent},
    {path:'proof' , component:RetireProofComponent},
    {path:'detail' , component:ProductDetailComponent},
    {path:'portfolio' , component:PortfolioComponent},

    {
        path: 'seller', canActivate: [AuthGuard], children: [
            {path:'seller-dashboard' , component:SupplierDashboardComponent},
            {path:'seller-onboarding' , component:SellerOnboardingComponent},
            {path:'seller-validation' , component:SellerValidationComponent},

            {path:'project' , component:ProjectComponent,children: [
                {path:'', redirectTo:'about-project', pathMatch:'full'},
                {path:'register-project', component: RegisterProjectComponent},
                {path:'token-request' , component:TokenRequestComponent},
                {path:'about-project', component: AboutProjectComponent},
                {path:'token-status', component: TokenStatusComponent},
                {path:'portfolio', component: TokenPortfolioComponent},
                {path:'token-details', component: TokenDetailsComponent}
            ]},
        ]
    },
    
    { path: '**', redirectTo: 'login' },


    

];



 









