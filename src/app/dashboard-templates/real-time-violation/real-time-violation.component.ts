import { Component } from '@angular/core';

@Component({
  selector: 'app-real-time-violation',
  templateUrl: './real-time-violation.component.html',
  styleUrl: './real-time-violation.component.css'
})
export class RealTimeViolationComponent {
  violations = [
    {
      icon: "shield",
      value: 23,
      label: "Security Violations",
      subLabel: "+3 today",
      bg: "#fff5f5",
      color: "#ef4444"
    },
    {
      icon: "rule",
      value: 12,
      label: "SOP Violations",
      subLabel: "2 critical",
      bg: "#fff7ed",
      color: "#f97316"
    },
    {
      icon: "warning",
      value: 8,
      label: "Queue Violations",
      subLabel: "Peak hours",
      bg: "#fffbeb",
      color: "#eab308"
    },
    {
      icon: "visibility",
      value: 5,
      label: "Display Violations",
      subLabel: "Low priority",
      bg: "#eff6ff",
      color: "#3b82f6"
    },
    {
      icon: "videocam",
      value: 258,
      label: "Active Cameras",
      subLabel: "98% uptime",
      bg: "#ecfdf5",
      color: "#10b981"
    }
  ];
}
