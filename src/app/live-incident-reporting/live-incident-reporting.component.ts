import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  color:
    | 'blue'
    | 'orange'
    | 'red'
    | 'green'
    | 'purple'
    | 'cyan'
    | 'yellow'
    | 'lime'
    | 'teal'
    | 'indigo'
    | 'gray';
}

@Component({
  selector: 'app-live-incident-reporting',
  templateUrl: './live-incident-reporting.component.html',
  styleUrls: ['./live-incident-reporting.component.css'],
})
export class LiveIncidentReportingComponent implements OnInit {
  // sample incident metadata
  incidentTitle = 'Violation Details';
  location = 'Dolmen Mall, Karachi';
  timestamp = 'Feb 2, 2025 at 2:22 p.m.';
  priority = 'High';
  confidence = 96;
  isLoading: boolean = false; // 🔹 Loading state
  // new — query params
  violationId: string | null = null;
  violationDate: string | null = null;
  isRealData = false;

  newComment: string = '';
  comments = [
    {
      initials: 'SYS',
      name: 'System',
      tag: 'System',
      text: 'Ticket created automatically from AI violation detection',
      time: '7:32:15 PM',
    },
    {
      initials: 'AK',
      name: 'Ahmed Khan',
      text: 'Security team dispatched to location. Investigating the incident.',
      time: '7:35:22 PM',
    },
    {
      initials: 'SA',
      name: 'Sara Ahmed',
      text: 'Store manager notified. Reviewing CCTV footage.',
      time: '7:40:15 PM',
    },
  ];

  alerts = [
    {
      title: 'Shoplifting Attempt',
      description:
        'Individual concealing smartphone in bag near Samsung display. Customer exhibited suspicious behavior patterns including looking around frequently and attempting to block camera view.',
    },
  ];

  // images — will be updated dynamically based on violationId
  images: string[] = [];
  selectedImageIndex = 0;

  // base dummy images
  dummyImages = [
    'assets/violation3.jpg',
    'assets/violation2.jpg',
    'assets/violation1.jpg',
    'assets/violation4.jpg',
    'assets/violation5.jpg',
  ];

  // list of real violationIds that have matching images
  realViolationIds = ['79016544', '41920645', '83460247','24942603','78255929','95822412'];

  // violation info
  violation = {
    type: 'Shoplifting Attempt',
    severity: 'High',
    location: 'Karachi Dolmen Mall',
    timestamps: '10/12/2024, 2:32:45 PM',
    screenshotEvidence: 3,
    videoClipEvidence: 1,
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
    { time: '14:34:20', title: 'Case Closed', description: 'Incident marked as resolved and archived in the case management system', color: 'gray' },
  ];

  aiAnalysis = [
    'AI detected multiple suspicious movement patterns and item concealment attempts consistent with shoplifting.',
    'Model confidence high (96%). Recommended immediate security intervention and evidence capture for case management.',
    'Suggested follow-ups: review contiguous video segments, preserve until case is closed, and attach to incident report.',
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

ngOnInit(): void {
  // 🔹 Start spinner at the beginning
  this.isLoading = true;

  this.route.queryParams.subscribe({
    next: (params) => {
      debugger;

      this.violationId = params['violationId'] || null;
      this.isRealData = this.violationId
        ? this.realViolationIds.includes(this.violationId)
        : false;

      // ✅ Existing logic — don't touch
      this.configureImages();

      // ✅ Dynamic field mapping
      const outlet = params['outlet'] || 'Unknown Location';
      const type = params['type'] || 'Unknown Type';
      const status = params['status'] || 'N/A';
      const severity = params['severity'] || 'N/A';
      const violationId = params['violationId'] || 'N/A';
      const violationDate = params['violationDate'] || null;
      const time = params['time'] || 'N/A';

      // ✅ Populate your data dynamically from URL
      this.incidentTitle = `${type} - ${status}`;
      this.location = outlet;
      this.timestamp = time;
      this.priority = severity;
      this.confidence = this.isRealData ? 98 : 90; // Example: real vs dummy confidence
      this.violationId = violationId;
      this.violationDate = violationDate
        ? violationDate.split('T')[0] // take only the date part
        : 'N/A';

      // 🔹 Stop spinner after processing
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error while loading route params:', err);
      this.isLoading = false; // stop spinner on error
    },
    complete: () => {
      // (optional) stop loading in case observable completes early
      this.isLoading = false;
    }
  });
}

  // 🔧 dynamic image setup
  configureImages() {
    if (this.isRealData && this.violationId) {
      // first image is real, rest are dummy
      this.images = [`assets/${this.violationId}.png`, ...this.dummyImages];
    } else {
      // dummy mode
      this.images = [...this.dummyImages];
    }
    this.selectedImageIndex = 0;
  }

  // existing methods preserved
  selectImage(idx: number) {
    this.selectedImageIndex = idx;
  }

  alertSecurity() {
    console.log('Alert security clicked');
  }

 markResolved() {
  // ✅ 1. Update local incident status
  this.incidentTitle = `${this.incidentTitle.split(' - ')[0]} - Resolved`;
  this.priority = 'Low'; // optional — you can set based on your logic

  // ✅ 2. Add a system comment automatically
  this.comments.push({
    initials: 'SYS',
    name: 'System',
    tag: 'System',
    text: 'Incident has been marked as resolved.',
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });

  // ✅ 3. Optional — if you have Angular Material, show a snackbar
  alert('✅ Incident successfully marked as resolved.');

  // ✅ 4. Optional — you can also trigger API call here to persist to backend
  // this.http.post('/api/incidents/resolve', { violationId: this.violationId }).subscribe(...)
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
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
      this.newComment = '';
    }
  }
  goBack() {
    this.router.navigate(['live-incidents']);
  }
}
