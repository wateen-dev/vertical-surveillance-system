import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule, ToastrService } from 'ngx-toastr';
//Add Mat Fields
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion'; // Import the module
import { MatSelectModule } from '@angular/material/select';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips'; // Import MatChipsModule
import { MatPaginatorModule } from '@angular/material/paginator';
//HttpClient
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdministrationComponent } from './administration/administration.component';
import { CreateScreenComponent } from './create-screen/create-screen.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateOpportunityComponent } from './create-opportunity/create-opportunity.component';
import { LovManagerComponent } from './lov-manager/lov-manager.component';
import { MatTableModule } from '@angular/material/table';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { CreateNewCoustomerComponent } from './create-new-coustomer/create-new-coustomer.component';
import { CustomServicesComponent } from './custom-services/custom-services.component';
import { EmployeeregistrationComponent } from './employeeregistration/employeeregistration.component';
import { TenantregistrationComponent } from './tenantregistration/tenantregistration.component';
import { VerticalsurveillancesSystemComponent } from './verticalsurveillances-system/verticalsurveillances-system.component';

import { VisitorregistrationComponent } from './visitorregistration/visitorregistration.component';
import { FootfallAnalyticsComponent } from './dashboard-templates/footfall-analytics/footfall-analytics.component';
import { StatisticsChartComponent } from './dashboard-templates/statistics-chart/statistics-chart.component';
import { TenantGridComponent } from './dashboard-templates/tenant-grid/tenant-grid.component';
import { AvailableOccupancyComponent } from './dashboard-templates/available-occupancy/available-occupancy.component';
import { VisitorAnalyticsComponent } from './dashboard-templates/visitor-analytics/visitor-analytics.component';
import { EmployeeAttendanceComponent } from './dashboard-templates/employee-attendance/employee-attendance.component';
import { ClearanceComponent } from './dashboard-templates/clearance/clearance.component';
import { ReceptionistManagementComponent } from './receptionist-management/receptionist-management.component';
import { UserRegistrationComponent } from './userregistration/userregistration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ActiveAlarmsComponent } from './dashboard-templates/active-alarms/active-alarms.component';
import { EfficiencyOvertimeComponent } from './dashboard-templates/efficiency-overtime/efficiency-overtime.component';
import { SopComplianceComponent } from './dashboard-templates/sop-compliance/sop-compliance.component';
import { CakesbakesComponent } from './dashboard-templates/cakesbakes/cakesbakes.component';
import { DiningtableComponent } from './dashboard-templates/diningtable/diningtable.component';
import { UniformViolationsComponent } from './uniform-violations/uniform-violations.component';




// Pass the FusionCharts library and modules to the FusionChartsModule


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        SidenavComponent,
        AdministrationComponent,
        CreateScreenComponent,
        CreateCustomerComponent,
        CreateOpportunityComponent,
        LovManagerComponent,
        CustomFormComponent,
        CreateNewCoustomerComponent,
        CustomServicesComponent,
        EmployeeregistrationComponent,
        TenantregistrationComponent,
        VerticalsurveillancesSystemComponent,
        UserRegistrationComponent,
        VisitorregistrationComponent,
        FootfallAnalyticsComponent,
        StatisticsChartComponent,
        ActiveAlarmsComponent,
        TenantGridComponent,
        EfficiencyOvertimeComponent,
        AvailableOccupancyComponent,
        VisitorAnalyticsComponent,
        EmployeeAttendanceComponent,
        ClearanceComponent,
        ReceptionistManagementComponent,
        ResetPasswordComponent,
        SopComplianceComponent,
        CakesbakesComponent,
        DiningtableComponent,
        UniformViolationsComponent
       
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSelectModule,
        MatDialogModule,
        NgApexchartsModule,
        HighchartsChartModule,
        MatTableModule,
        
        MatIconModule],
        

    providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(withFetch()) // Enable fetch
        ,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
