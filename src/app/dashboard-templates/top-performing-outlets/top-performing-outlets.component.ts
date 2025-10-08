import { Component } from '@angular/core';

@Component({
  selector: 'app-top-performing-outlets',
  templateUrl: './top-performing-outlets.component.html',
  styleUrl: './top-performing-outlets.component.css'
})
export class TopPerformingOutletsComponent {
topOutlets = [
    {
      rank: 1,
      name: 'Islamabad',
      location: 'F-7 Branch, Islamabad',
      attendance: 94,
      rating: 4.1,
      violations: 1,
      status: 'Excellent',
      statusClass: 'status-excellent'
    },
    {
      rank: 2,
      name: 'Karachi',
      location: 'Dolmen Mall, Karachi',
      attendance: 96,
      rating: 4.3,
      violations: 2,
      status: 'Great',
      statusClass: 'status-great'
    },
    {
      rank: 3,
      name: 'Lahore',
      location: 'M.M. Alam Road, Lahore',
      attendance: 94,
      rating: 4.1,
      violations: 3,
      status: 'Good',
      statusClass: 'status-good'
    },
    {
      rank: 4,
      name: 'Rawalpindi',
      location: 'Saddar Branch, Rawalpindi',
      attendance: 92,
      rating: 4.0,
      violations: 4,
      status: 'Good',
      statusClass: 'status-good'
    },
    {
      rank: 5,
      name: 'Faisalabad',
      location: 'Clock Tower, Faisalabad',
      attendance: 90,
      rating: 3.9,
      violations: 5,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    },
    {
      rank: 6,
      name: 'Multan',
      location: 'Bosan Road, Multan',
      attendance: 89,
      rating: 3.8,
      violations: 6,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    },
    {
      rank: 7,
      name: 'Hyderabad',
      location: 'AutoBhan Road, Hyderabad',
      attendance: 91,
      rating: 4.0,
      violations: 3,
      status: 'Good',
      statusClass: 'status-good'
    },
    {
      rank: 8,
      name: 'Peshawar',
      location: 'University Road, Peshawar',
      attendance: 88,
      rating: 3.7,
      violations: 6,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    },
    {
      rank: 9,
      name: 'Quetta',
      location: 'Jinnah Road, Quetta',
      attendance: 87,
      rating: 3.6,
      violations: 7,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    },
    {
      rank: 10,
      name: 'Sialkot',
      location: 'Cantt Branch, Sialkot',
      attendance: 85,
      rating: 3.5,
      violations: 8,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    }
  ];
}