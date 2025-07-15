import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticsService } from '../dashboard/services/statisticsService';
@Component({
  selector: 'app-uniform-violations',
  templateUrl: './uniform-violations.component.html',
  styleUrl: './uniform-violations.component.css'
})
export class UniformViolationsComponent implements OnInit {
  violationCount: string = '';
  base64Image: string = '';
  isLoading: boolean = true;
  statistics: any[] = [];
  maxValue: number = 0;
  constructor(private route: ActivatedRoute,private statisticsService: StatisticsService,private router: Router) {}
violationInfo = {
  name: 'Uniform Violation',
  area: 'Order Delivery Section',
  date: '06-21-2025',
  camera: 'Order Section',
  time: '21:54:48'
};
  ngOnInit(): void {
     this.loadDefaultActions();
    //  this.loadCashierStatistics();
     this.fetchImage("UniformViolation.png")
  }
  
    fetchImage(filePath: string): void {
    this.statisticsService.getImageBase64(filePath).subscribe({
      next: (data) => {
        this.base64Image = 'data:image/jpeg;base64,' + data.thumbnailBase64;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching image:', err);
        this.isLoading = false;
      }
    });
  }
  loadDefaultActions() {
    let value = this.route.snapshot.paramMap.get('value');
    if(value){
      this.violationCount = value;
    }
  }
  loadCashierStatistics(): void {
    this.statisticsService.getCashierStatistics().subscribe({
      next: (data) => {
        if (data) {
          this.statistics = [
            { label: 'Employees', value: +data.employees, icon: 'groups' },
            { label: 'Cash Counter', value: +data.cashCounter, icon: 'point_of_sale' },
            { label: 'Order Placer', value: +data.orderPlacement, icon: 'playlist_add' },
            { label: 'Order Receiver', value: +data.orderReceiving, icon: 'assignment_turned_in' },
            { label: 'Uniform Violations', value: +data.uniformViolations, icon: 'report_problem' }
          ];
        }
        this.maxValue = Math.max(...this.statistics.map((s) => s.value));
      },
      error: (error) => {
        console.error('API error:', error);
      }
    });
  }
  fetchImageFromApi(value: number): void {
    // Simulating API call — replace this with actual HTTP request
    setTimeout(() => {
      // Example base64 string for placeholder image (you’ll replace with real one)
      this.base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...'; 
      this.isLoading = false;
    }, 1000);
  }
}

