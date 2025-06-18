import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Tenant {
  city: string;
  logo: string;
  company: string;
  tenant: number;
  PPE: string;
  effRate:string
}

// Static data for multiple cities
const getRandomPercentage = () => `${Math.floor(Math.random() * 41) + 60}%`; // Random % between 60% and 100%

const ALL_DATA = [
  // Lahore
  { city: 'Lahore', logo: 'landscape', company: 'DHA', tenant: 8, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Lahore', logo: 'landscape', company: 'Gulberg', tenant: 9, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Lahore', logo: 'landscape', company: 'Walton', tenant: 210, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Lahore', logo: 'landscape', company: 'Cantt', tenant: 165, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Lahore', logo: 'landscape', company: 'Johar Town', tenant: 184, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Lahore', logo: 'landscape', company: 'Saddar', tenant: 184, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Lahore', logo: 'landscape', company: 'Wapda Town', tenant: 184, PPE: getRandomPercentage(), effRate: getRandomPercentage() },

  // Karachi
  { city: 'Karachi', logo: 'apartment', company: 'Tech Hub', tenant: 12, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Karachi', logo: 'landscape', company: 'Fast Solutions', tenant: 45, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Karachi', logo: 'waves', company: 'Infinity', tenant: 78, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Karachi', logo: 'hub', company: 'Soft Square', tenant: 110, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Karachi', logo: 'developer_board', company: 'Visionary', tenant: 200, PPE: getRandomPercentage(), effRate: getRandomPercentage() },

  // Islamabad
  { city: 'Islamabad', logo: 'apartment', company: 'Sky Towers', tenant: 25, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Islamabad', logo: 'landscape', company: 'Cloud Technologies', tenant: 150, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Islamabad', logo: 'waves', company: 'Softonix', tenant: 30, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Islamabad', logo: 'hub', company: 'Innovate IT', tenant: 175, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Islamabad', logo: 'developer_board', company: 'Metro Tech', tenant: 60, PPE: getRandomPercentage(), effRate: getRandomPercentage() },

  // Peshawar
  { city: 'Peshawar', logo: 'apartment', company: 'Frontier Tech', tenant: 20, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Peshawar', logo: 'landscape', company: 'Skyline Solutions', tenant: 35, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Peshawar', logo: 'waves', company: 'Pak Devs', tenant: 80, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Peshawar', logo: 'hub', company: 'Next Level', tenant: 140, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Peshawar', logo: 'developer_board', company: 'Elite Software', tenant: 95, PPE: getRandomPercentage(), effRate: getRandomPercentage() },

  // Quetta
  { city: 'Quetta', logo: 'apartment', company: 'BalochTech', tenant: 15, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Quetta', logo: 'landscape', company: 'Quetta Solutions', tenant: 50, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Quetta', logo: 'waves', company: 'Mountain Tech', tenant: 110, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Quetta', logo: 'hub', company: 'Pioneer Soft', tenant: 90, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
  { city: 'Quetta', logo: 'developer_board', company: 'Quetta Innovators', tenant: 130, PPE: getRandomPercentage(), effRate: getRandomPercentage() },
];


@Component({
  selector: 'app-tenant-grid',
  templateUrl: './tenant-grid.component.html',
  styleUrls: ['./tenant-grid.component.css']
})
export class TenantGridComponent implements OnInit, AfterViewInit {
  cities: string[] = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta'];
  selectedCity: string = 'Lahore'; // Default selected city

  displayedColumns: string[] = ['company', 'tenant', 'PPE','effRate'];
  dataSource = new MatTableDataSource<Tenant>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  ngOnInit() {
    this.filterData(); // Initialize data with Lahore's data
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterData() {
    this.dataSource.data = ALL_DATA.filter(branch => branch.city === this.selectedCity);
  }
}
