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
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { MatDividerModule } from '@angular/material/divider';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { CreateNewCoustomerComponent } from './create-new-coustomer/create-new-coustomer.component';
import { CustomServicesComponent } from './custom-services/custom-services.component';
import { EmployeeregistrationComponent } from './employeeregistration/employeeregistration.component';
import { TenantregistrationComponent } from './tenantregistration/tenantregistration.component';
import { VerticalsurveillancesSystemComponent } from './verticalsurveillances-system/verticalsurveillances-system.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FloorHeatmapComponent } from './dashboard-templates/floor-heatmap/floor-heatmap.component';
import { AppViolationsComponent } from './dashboard-templates/app-violations/app-violations.component';
import { AnalyticsOverviewComponent } from './dashboard-templates/analytics-overview/analytics-overview.component';
import { GraphHeatmapComponent } from './dashboard-templates/graph-heatmap/graph-heatmap.component';
import { AttendanceLogsComponent } from './attendance-logs/attendance-logs.component';
import { StaffPerfomanceComponent } from './staff-perfomance/staff-perfomance.component';
import { LiveFootfallChartComponent } from './dashboard-templates/live-footfall-chart/live-footfall-chart.component';
import { SalesCategoryChartComponent } from './dashboard-templates/sales-category-chart/sales-category-chart.component';
import { SalesCategoryWeeklyChartComponent } from './dashboard-templates/sales-category-weekly-chart/sales-category-weekly-chart.component';
import { SystemHealthComponent } from './dashboard-templates/system-health/system-health.component';
import { BusinessInsightsComponent } from './dashboard-templates/business-insights/business-insights.component';
import { PerformanceMetricsComponent } from './dashboard-templates/performance-metrics/performance-metrics.component';
import { PerformanceOverviewComponent } from './dashboard-templates/performance-overview/performance-overview.component';
import { TopPerformingOutletsComponent } from './dashboard-templates/top-performing-outlets/top-performing-outlets.component';
import { LiveIncidentsComponent } from './live-incidents/live-incidents.component';
import { LiveIncidentReportingComponent } from './live-incident-reporting/live-incident-reporting.component';
import { RealTimeViolationComponent } from './dashboard-templates/real-time-violation/real-time-violation.component';
import { HeatmapChartComponent } from './dashboard-templates/heatmap-chart/heatmap-chart.component';
import { DashboardFiltersComponent } from './dashboard-templates/dashboard-filters/dashboard-filters.component';
import { OutletDialogComponent } from './dashboard-templates/outlet-dialog/outlet-dialog.component';
import { SectionHourlyDialogComponent } from './dashboard-templates/section-hourly-dialog/section-hourly-dialog.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { AddCameraComponent } from './add-camera/add-camera.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { CameraListComponent } from './camera-list/camera-list.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { AddViolationComponent } from './add-violation/add-violation.component';
import { ViolationListComponent } from './violation-list/violation-list.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { InterfaceFormsComponent } from './interface-forms/interface-forms.component';
import { CompetitorOutletsComponent } from './dashboard-templates/competitor-outlets/competitor-outlets.component';
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
        UniformViolationsComponent,
        AdminDashboardComponent,
        FloorHeatmapComponent,
        AppViolationsComponent,
        AnalyticsOverviewComponent,
        GraphHeatmapComponent,
        AttendanceLogsComponent,
        StaffPerfomanceComponent,
        LiveFootfallChartComponent,
        SalesCategoryChartComponent,
        SalesCategoryWeeklyChartComponent,
        SystemHealthComponent,
        BusinessInsightsComponent,
        PerformanceMetricsComponent,
        PerformanceOverviewComponent,
        TopPerformingOutletsComponent,
        LiveIncidentsComponent,
        LiveIncidentReportingComponent,
        RealTimeViolationComponent,
        HeatmapChartComponent,
        DashboardFiltersComponent,
        OutletDialogComponent,
        SectionHourlyDialogComponent,
        AddBranchComponent,
        AddCameraComponent,
        BranchListComponent,
        CameraListComponent,
        AddCompanyComponent,
        CompanyListComponent,
        AddViolationComponent,
        ViolationListComponent,
        AddRolesComponent,
        RolesListComponent,
        InterfaceFormsComponent,
        CompetitorOutletsComponent
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
        MatProgressBarModule,
        MatDividerModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
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
        provideHttpClient(withFetch()),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
