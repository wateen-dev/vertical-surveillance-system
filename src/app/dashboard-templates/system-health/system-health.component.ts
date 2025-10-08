import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

interface SystemHealthItem {
  icon: string;
  label: string;
  value: string;
  subValue: string;
  color: string;
}

@Component({
  selector: 'app-system-health',
  templateUrl: './system-health.component.html',
  styleUrls: ['./system-health.component.css']
})
export class SystemHealthComponent implements OnInit {
  systemHealthData$: Observable<SystemHealthItem[]> | undefined;
  status = 'Online';

  ngOnInit(): void {
    this.systemHealthData$ = this.getSystemHealthData();
  }

  getSystemHealthData(): Observable<SystemHealthItem[]> {
    const data: SystemHealthItem[] = [
      {
        icon: 'photo_camera',
        label: 'Camera Network',
        value: '96.2%',
        subValue: '247/258 active',
        color: '#2ecc71'
      },
      {
        icon: 'bolt',
        label: 'AI Processing',
        value: '98.7%',
        subValue: '12ms avg response',
        color: '#4CAF50'
      },
      {
        icon: 'signal_cellular_alt',
        label: 'Network Uptime',
        value: '99.8%',
        subValue: '30 days avg',
        color: '#2196F3'
      },
      {
        icon: 'storage',
        label: 'Storage Usage',
        value: '78.4%',
        subValue: '2.1TB available',
        color: '#FF9800'
      },
      {
        icon: 'security',
        label: 'Security Systems',
        value: '92.5%',
        subValue: 'All sensors synced',
        color: '#00BCD4'
      },
      {
        icon: 'dns',
        label: 'Database Health',
        value: '88.6%',
        subValue: 'Low query latency',
        color: '#8E24AA'
      }
    ];
    return of(data);
  }
}
