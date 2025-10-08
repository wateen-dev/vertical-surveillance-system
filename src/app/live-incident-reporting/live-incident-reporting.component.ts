import { Component, OnInit } from '@angular/core';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  color: 'blue' | 'orange' | 'red' | 'green' | 'purple' | 'cyan' | 'yellow' | 'lime' | 'teal' | 'indigo' | 'gray';
}

@Component({
  selector: 'app-live-incident-reporting',
  templateUrl: './live-incident-reporting.component.html',
  styleUrls: ['./live-incident-reporting.component.css']
})
export class LiveIncidentReportingComponent implements OnInit {
  // sample incident metadata
  incidentTitle = 'Violation Details';
  location = 'Dolmen Mall, Karachi';
  timestamp = 'Feb 2, 2025 at 2:22 p.m.';
  priority = 'High';
  confidence = 96;
  newComment: string = '';
  comments = [
    {
      initials: 'SYS',
      name: 'System',
      tag: 'System',
      text: 'Ticket created automatically from AI violation detection',
      time: '7:32:15 PM'
    },
    {
      initials: 'AK',
      name: 'Ahmed Khan',
      text: 'Security team dispatched to location. Investigating the incident.',
      time: '7:35:22 PM'
    },
    {
      initials: 'SA',
      name: 'Sara Ahmed',
      text: 'Store manager notified. Reviewing CCTV footage.',
      time: '7:40:15 PM'
    }
  ];
  alerts = [
    {
      title: 'Shoplifting Attempt',
      description:
        'Individual concealing smartphone in bag near Samsung display. Customer exhibited suspicious behavior patterns including looking around frequently and attempting to block camera view.'
    },
  ];
  // image gallery (use real asset urls)
  images = [
    'assets/violation3.jpg',
    'assets/violation2.jpg',
    'assets/violation1.jpg',
    'assets/violation4.jpg',
    'assets/violation5.jpg'
  ];
  selectedImageIndex = 0;

  // violation info
  violation = {
    type: 'Shoplifting Attempt',
    severity: 'High',
    location: 'Karachi Dolmen Mall',
    timestamps: '10/12/2024, 2:32:45 PM',
    screenshotEvidence: 3,
    videoClipEvidence: 1
  };

  timeline: TimelineItem[] = [
  { time: '14:32:10', title: 'Individual Enters View', description: 'Person detected entering camera KHI-DOL-CAM-012 field of view', color: 'blue' },
  { time: '14:32:15', title: 'Suspicious Behavior Detected', description: 'AI detected unusual movement patterns consistent with shoplifting behaviour', color: 'orange' },
  { time: '14:32:20', title: 'Concealment Action Confirmed', description: 'High-confidence detection of item concealment - security alert triggered', color: 'red' },
  { time: '14:32:25', title: 'Security Team Notified', description: 'Alert sent to on-site security personnel for immediate response', color: 'green' },
  { time: '14:32:40', title: 'Response In Progress', description: 'Security personnel dispatched and moving towards incident location', color: 'purple' },
  { time: '14:33:00', title: 'Suspect Approached', description: 'Security officer visually confirms the suspect and begins engagement', color: 'cyan' },
  { time: '14:33:15', title: 'Verbal Warning Issued', description: 'Suspect confronted by officer and questioned regarding suspicious behavior', color: 'yellow' },
  { time: '14:33:30', title: 'Item Recovered', description: 'Suspect voluntarily produces concealed item upon questioning', color: 'lime' },
  { time: '14:33:45', title: 'Incident Logged', description: 'Case automatically logged in system with AI evidence and video clip attached', color: 'teal' },
  { time: '14:34:00', title: 'Report Generated', description: 'Incident report generated and forwarded to management review system', color: 'indigo' },
  { time: '14:34:20', title: 'Case Closed', description: 'Incident marked as resolved and archived in the case management system', color: 'gray' }
];

  // AI Analysis (sample paragraphs)
  aiAnalysis = [
    'AI detected multiple suspicious movement patterns and item concealment attempts consistent with shoplifting.',
    'Model confidence high (96%). Recommended immediate security intervention and evidence capture for case management.',
    'Suggested follow-ups: review contiguous video segments, preserve until case is closed, and attach to incident report.'
  ];

  constructor() { }

  ngOnInit(): void { }

  selectImage(idx: number) {
    this.selectedImageIndex = idx;
  }

  // CTA stubs - hook to your services
  alertSecurity() {
    console.log('Alert security clicked');
    // call API or show snackbar
  }

  markResolved() {
    console.log('Mark resolved clicked');
  }

  generateIncidentReport() {
    console.log('Generate incident report');
  }

  exportEvidence() {
    console.log('Export evidence');
  }

  shareWithTeam() {
    console.log('Share with team');
  }
  prevImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex + 1) % this.images.length;
  }
   addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        initials: 'US',
        name: 'User',
        text: this.newComment,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newComment = '';
    }
  }
}
