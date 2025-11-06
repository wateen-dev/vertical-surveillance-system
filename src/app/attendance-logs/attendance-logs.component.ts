import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeRegistrationService } from '../employeeregistration/service/employeeregistrationservice';
import { MatPaginator } from '@angular/material/paginator';
import { ToastService } from '../service/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-attendance-logs',
  templateUrl: './attendance-logs.component.html',
  styleUrl: './attendance-logs.component.css'
})
export class AttendanceLogsComponent {
  // Dropdown and Search Data

  selectedCategory = '';
  selectedCompany = ''; // Empty for no filter
  searchQuery = '';
  displayedColumns: string[] = ['id', 'name', 'company', 'category', 'phone'];
  dataSource = new MatTableDataSource<any>([]);
  rawData: any[] = []; // keep unfiltered data
  logColumns = ['date', 'checkInTime', 'checkOutTime'];
  TimeStamplogColumns = ['id', 'date', 'day', 'TimeStamp'];
  selectedEmployee: any = null;
  filteredLogs: any[] = [];
  filteredTimeLogs: any[] = [];
  accessStatus: 'Allowed' | 'Revoked' = 'Allowed';
  isPresent: boolean = false;
  selectedCard: string = '';
  ds: any;
  checkinVisible: boolean = true;
  timestampVisible: boolean = false;
  lastSyncedTime: string = '';
  private apiUrl = environment.apiUrl;
  private local_apiUrl = environment.localApiUrl;
  imagePath1Base64: any;
  filterType: string = 'month'; // default
  filteredData: any[] = [];
  logs: any[] = [];   // <-- Add this at the top of your component
  chartRef: Highcharts.Chart | null = null;
  constructor(private verticalService: EmployeeRegistrationService, private route: ActivatedRoute, private toastService: ToastService, private http: HttpClient) {
    debugger;
    this.updateLastSyncedTime();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('attendancePaginator') attendancePaginator!: MatPaginator;
  @ViewChild('aiLogsPaginator') aiLogsPaginator!: MatPaginator;

  attendanceDataSource = new MatTableDataSource<any>([]);
  aiLogsDataSource = new MatTableDataSource<any>([]);
  ngOnInit(): void {
    debugger;
    this.route.queryParams.subscribe((params) => {
      this.selectedCard = params['card'];
      if (this.selectedCard == 'Employees')
        this.selectedCategory = 'employee'
      if (this.selectedCard == 'Visitors')
        this.selectedCategory = 'visitor'
      if (this.selectedCard == 'Executives')
        this.selectedCategory = 'tenant'
      if (this.selectedCard != undefined)
        this.isPresent = true;
      console.log('Selected Card:', this.selectedCard); // Debugging output
    });
    this.loadData();
    // this.checkInLogs.paginator = this.paginator;
  }
  hidecheckin() {
    this.checkinVisible = false;
    this.timestampVisible = true;

    // ✅ re-attach paginator when showing AI Logs
    if (this.aiLogsDataSource) {
      this.aiLogsDataSource.paginator = this.aiLogsPaginator;
    }
  }

  // When switching back to Attendance Logs
  hideTimeStamp() {
    this.timestampVisible = false;
    this.checkinVisible = true;

    // ✅ re-attach paginator when showing Attendance Logs
    if (this.attendanceDataSource) {
      this.attendanceDataSource.paginator = this.attendancePaginator;
    }
  }
  refreshComponent() {
    this.selectedCard = ''
    this.selectedCategory = ''
    this.selectedCompany = ''
    this.searchQuery = ''
    this.selectedEmployee = null
    this.filteredLogs = []
    this.filteredTimeLogs = []
    this.loadData();
  }

  refreshLogs() {
    this.onRowClick(this.selectedEmployee)
  }
  updateLastSyncedTime(): void {
    const now = new Date();
    this.lastSyncedTime = `${now.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  // loadData(): void {
  //   this.verticalService.fetchAllData().subscribe((data: any) => {
  //     this.rawData = data.result; // store original
  //     this.dataSource = new MatTableDataSource(this.rawData);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }
  loadData(isRefresh: boolean = false): void {
  this.verticalService.fetchAllData().subscribe((data: any) => {
    this.rawData = data.result; // store original
    this.dataSource = new MatTableDataSource(this.rawData);
    this.dataSource.paginator = this.paginator;

    // ✅ if refresh, regenerate chart
    if (isRefresh) {
      const dummyLogs = this.generateDummyLogs();   // or fetched logs
      const workedLogs = this.calculateWorkedHours(dummyLogs);
      this.applyFilter(workedLogs);
      this.updateChart(this.filteredData);
    }
  });
}

  fetchImages(path: any): void {
    const fileName = path.split("\\").pop();
    // this.http.get(this.local_apiUrl+`Vertical/GetImagesBase64?fileName=${fileName}`).subscribe((data:any) => {

    this.http.get(this.local_apiUrl + `Vertical/GetImagesBase64?fileName=${fileName}`).subscribe((data: any) => {

      this.imagePath1Base64 = data.thumbnailBase64;

    },
      (error) => {
        console.error('Error fetching thumbnail:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.attendanceDataSource.paginator = this.attendancePaginator;
    this.aiLogsDataSource.paginator = this.aiLogsPaginator;

    const container = document.getElementById('employeeChart');
    if (container) {
      this.chartRef = Highcharts.chart(container, this.chartOptions);
    } else {
      console.error('Chart container not found!');
    }
  }
  onRowClick(row: any) {
    debugger
    if (!row) return;
    // ✅ fetch employee/visitor image if available
    if (row.profilePicture) {
      this.fetchImages(row.profilePicture);
    }

    // ✅ set selected employee and access status
    this.selectedEmployee = row;
    this.accessStatus = 'Allowed';

    if (this.selectedCategory != 'visitor') {
      // ✅ fetch employee check-in logs
      this.verticalService.fetchCheckInLogs(row.id).subscribe(
        (logs: any[]) => {

          this.attendanceDataSource.data = logs || [];
          //adding code to implement a pie chart
          this.loadDummyData();
          // const worked = this.calculateWorkedHours(logs);
          // this.applyFilter(worked);
          // this.updateChart(this.filteredData);

          // keep paginator working after data assignment
          if (this.attendancePaginator) {
            this.attendanceDataSource.paginator = this.attendancePaginator;
          }

          // fetch AI timestamp logs
          this.fetchtimestamplogs(row.id);
        },
        (error) => {
          console.error('Error fetching check-in logs:', error);
          this.attendanceDataSource.data = [];
        }
      );
    } else {
      // ✅ visitor case
      this.verticalService.fetchCheckInLogsVisitors(row.id).subscribe(
        (logs: any[]) => {
          this.attendanceDataSource.data = logs || [];

          if (this.attendancePaginator) {
            this.attendanceDataSource.paginator = this.attendancePaginator;
          }
        },
        (error) => {
          console.error('Error fetching visitor check-in logs:', error);
          this.attendanceDataSource.data = [];
        }
      );
    }
  }


  // fetchtimestamplogs(id: any) {
  //   this.verticalService.fetchTimestampLogs(id).subscribe((logs: any[]) => {
  //     this.aiLogsDataSource.data = logs || [];
  //   });
  // }

  fetchtimestamplogs(id: any) {
    this.verticalService.fetchTimestampLogs(id).subscribe((logs: any[]) => {
      this.aiLogsDataSource.data = logs || [];
      this.aiLogsDataSource.paginator = this.aiLogsPaginator;   // ✅ re-attach paginator
    });
  }
  allowAccess() {
    this.accessStatus = 'Allowed';

    this.toastService.showSuccess('Access has been allowed.');
  }

  revokeAccess() {
    this.accessStatus = 'Revoked';

    this.toastService.showSuccess('Access has been revoked.');
  }
  filterTable(): void {
    const categoryFilter = this.selectedCategory?.toLowerCase() || '';
    const companyFilter = this.selectedCompany?.toLowerCase() || '';
    const searchFilter = this.searchQuery?.toLowerCase() || '';

    const filteredData = this.rawData.filter((item: any) => {
      const matchesCompany =
        !companyFilter || item.company.toLowerCase() === companyFilter;

      const matchesCategory =
        !categoryFilter || item.category.toLowerCase() === categoryFilter;

      const matchesSearch =
        item.name.toLowerCase().includes(searchFilter) ||
        (item.email && item.email.toLowerCase().includes(searchFilter)) ||
        (item.phone && item.phone.includes(searchFilter));

      const matchesPresent = this.isPresent
        ? item.status === 'Present'
        : true;

      return matchesCompany && matchesCategory && matchesSearch && matchesPresent;
    });

    // ✅ Update dataSource but keep paginator intact
    this.dataSource.data = filteredData;
    this.dataSource.paginator = this.paginator;
  }
  //adding new code for the chart implementation
  calculateWorkedHours(logs: any[]): { date: string, hours: number }[] {
    return logs.map(log => {
      try {
        const baseDate = log.date.includes("T")
          ? log.date.split("T")[0]
          : log.date;

        if (!log.checkInTime || !log.checkOutTime) {
          return { date: log.date, hours: 0 };
        }

        const checkIn = new Date(`${baseDate}T${log.checkInTime}`);
        const checkOut = new Date(`${baseDate}T${log.checkOutTime}`);

        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
          return { date: log.date, hours: 0 };
        }

        let hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
        if (hours < 0) hours = 0;

        return {
          date: log.date,
          hours: parseFloat(hours.toFixed(2))
        };
      } catch (e) {
        console.error("Invalid log entry:", log, e);
        return { date: log.date, hours: 0 };
      }
    });
  }

  applyFilter(logs: any[]) {
    const today = new Date();

    if (this.filterType === 'day') {
      this.filteredData = logs.filter(l => new Date(l.date).toDateString() === today.toDateString());
    }
    else if (this.filterType === 'week') {
      const start = new Date(today);
      start.setDate(today.getDate() - 7);
      this.filteredData = logs.filter(l => new Date(l.date) >= start && new Date(l.date) <= today);
    }
    else if (this.filterType === 'month') {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      this.filteredData = logs.filter(l => new Date(l.date) >= start && new Date(l.date) <= today);
    }
    else {
      this.filteredData = logs; // default: all
    }
  }

  chartOptions: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: '#fff' },
    title: { text: 'Employee Attendance Overview' },
    accessibility: { enabled: false },
    tooltip: { pointFormat: '{series.name}: <b>{point.y} hours</b>' },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: true, format: '{point.name}: {point.percentage:.1f} %' },
        showInLegend: true
      }
    },
    series: [{ type: 'pie', name: 'Worked Hours', data: [] }]
  };
  updateChart(logs: any[]) {
    const workedLogs = this.calculateWorkedHours(logs);

    // const totalWorked = workedLogs.reduce((sum, l) => sum + l.hours, 0);
    const totalWorked = Math.floor(Math.random() * 200) + 50;
    const totalExpected = workedLogs.length * 8; // 8 hrs per day
    const remaining = totalExpected - totalWorked;

    // Update chart only if container exists
    const container = document.getElementById('employeeChart');
    if (container) {
      if (!this.chartRef) {
        this.chartRef = Highcharts.chart(container, {
          ...this.chartOptions,
          series: [{
            type: 'pie',
            name: 'Worked Hours',
            data: [
              { name: 'Worked Hours', y: totalWorked, color: '#4CAF50' },
              { name: 'Remaining Hours', y: remaining > 0 ? remaining : 0, color: '#FF9800' }
            ]
          }]
        });
      } else {
        this.chartRef.update({
          series: [{
            type: 'pie',
            name: 'Worked Hours',
            data: [
              { name: 'Worked Hours', y: totalWorked, color: '#4CAF50' },
              { name: 'Remaining Hours', y: remaining > 0 ? remaining : 0, color: '#FF9800' }
            ]
          }]
        });
      }
    } else {
      console.warn('Chart container not yet available.');
    }
  }

  applyFilterAndUpdate() {
    const worked = this.calculateWorkedHours(this.logs); // ✅ use stored logs
    this.applyFilter(this.logs);
    setTimeout(() => {
      this.updateChart(this.filteredData);
    }, 300);
  }
  // Generate dummy logs for multiple employees
  generateDummyLogs(count: number = 5, days: number = 30): any[] {
    const dummyLogs: any[] = [];
    const employeeIds = Array.from({ length: count }, (_, i) => 6000 + i); // e.g., 6000, 6001, ...

    for (let empId of employeeIds) {
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i); // last X days

        // Random check-in between 7 AM - 11 AM
        const checkInHour = 7 + Math.floor(Math.random() * 4);
        const checkInMin = Math.floor(Math.random() * 60);
        const checkInTime = `${String(checkInHour).padStart(2, '0')}:${String(checkInMin).padStart(2, '0')}:00`;

        // Random check-out between 2 PM - 7 PM
        const checkOutHour = 14 + Math.floor(Math.random() * 6);
        const checkOutMin = Math.floor(Math.random() * 60);
        const checkOutTime = `${String(checkOutHour).padStart(2, '0')}:${String(checkOutMin).padStart(2, '0')}:00`;

        dummyLogs.push({
          employeeId: empId,
          date: date.toISOString(),
          accessType: "Main Entrance",
          checkInTime,
          checkOutTime
        });
      }
    }

    return dummyLogs;
  }
  loadDummyData() {
    const logs = this.generateDummyLogs(10, 15); // 10 employees, 15 days each
    this.logs = logs;  // store globally
    const worked = this.calculateWorkedHours(logs);
    this.applyFilter(worked);
    this.updateChart(this.filteredData);
  }
}
