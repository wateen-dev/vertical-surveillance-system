import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViolationService } from '../services/violation.service';
import { MatPaginator } from '@angular/material/paginator';
import { OutletDialogComponent } from '../outlet-dialog/outlet-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-top-performing-outlets',
  templateUrl: './top-performing-outlets.component.html',
  styleUrls: ['./top-performing-outlets.component.css']
})
export class TopPerformingOutletsComponent {
  topOutlets = [
    {
      rank: 1,
      name: 'Lahore',
      location: 'Y Block, Lahore',
      attendance: 97,
      rating: 4.2,
      revenue: 'PKR 3.2M',
      violations: 3,
      status: 'Excellent',
      statusClass: 'status-excellent'
    },
    {
      rank: 1,
      name: 'Islamabad',
      location: 'F-7 Branch, Islamabad',
      attendance: 94,
      rating: 5,
      revenue: 'PKR 2.8M',
      violations: 1,
      status: 'Excellent',
      statusClass: 'status-excellent'
    },
    {
      rank: 2,
      name: 'Karachi',
      location: 'Dolmen Mall, Karachi',
      attendance: 96,
      rating: 3.3,
      revenue: 'PKR 2.1M',
      violations: 2,
      status: 'Great',
      statusClass: 'status-great'
    },
    {
      rank: 4,
      name: 'Rawalpindi',
      location: 'Saddar Branch, Rawalpindi',
      attendance: 92,
      rating: 4.3,
      revenue: 'PKR 1.8M',
      violations: 4,
      status: 'Good',
      statusClass: 'status-good'
    },
    {
      rank: 5,
      name: 'Faisalabad',
      location: 'Clock Tower, Faisalabad',
      attendance: 90,
      rating: 4,
      revenue: 'PKR 1.3M',
      violations: 5,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    },
    {
      rank: 6,
      name: 'Multan',
      location: 'Bosan Road, Multan',
      attendance: 89,
      rating: 4.2,
      revenue: 'PKR 2.2M',
      violations: 6,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    },
    {
      rank: 7,
      name: 'Hyderabad',
      location: 'AutoBhan Road, Hyderabad',
      attendance: 91,
      rating: 4,
      revenue: 'PKR 0.8M',
      violations: 3,
      status: 'Good',
      statusClass: 'status-good'
    },
    {
      rank: 8,
      name: 'Peshawar',
      location: 'University Road, Peshawar',
      attendance: 88,
      rating: 4.2,
      revenue: 'PKR 1.2M',
      violations: 6,
      status: 'Needs Attention',
      statusClass: 'status-attention'
    }
  ];

  selectedOutlet: any = null;
  reviews: any[] = [];
  reviewsDataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['user', 'comment', 'stars'];
  isLoading: boolean = false; // 🔹 Loading state

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private violationService: ViolationService,   private dialog: MatDialog) {}

  ngOnInit() {}

  // 🔹 Opens the full-screen overlay dialog
  openOutletDialog(outlet: any) {
    this.isLoading = true; // 🔹 Start loading 
    this.violationService.searchOutlet({ textQuery: "Saphire " + (outlet.location || 'Lahore') }).subscribe({
      next: (res: any) => {
        if (res.places && res.places.length > 0) {
          const place = res.places[0];
          const selectedOutlet = {
            id: place.id,
            name: place.displayName?.text,
            address: place.formattedAddress,
            phone: place.internationalPhoneNumber,
            rating: place.rating,
            website: place.websiteUri,
            status: place.businessStatus,
            type: place.types?.[0],
            googleMapsUri: place.googleMapsUri,
            hours: place.currentOpeningHours?.weekdayDescriptions || [],
            openNow: place.currentOpeningHours?.openNow
          };

          this.violationService.getPlaceReviews(place.id).subscribe({
            next: (reviewsRes: any) => {
              const reviews = reviewsRes.reviews?.map((r: any) => ({
                user: r.authorAttribution?.displayName || 'Anonymous',
                comment: r.text?.text || 'No comment available',
                stars: r.rating
              })) || [];

              
               const dialogRef = this.dialog.open(OutletDialogComponent, {
              width: '100%',
              height: '100%',
              panelClass: 'full-screen-dialog',
              data: { selectedOutlet, reviews }
            });

            // 🔹 When dialog closes, stop loading
            dialogRef.afterClosed().subscribe(() => {
              this.isLoading = false;
            });
              
            }
          });
        }
      }
    });
  }


  // 🔹 Closes the overlay
  closeDialog() {
    this.selectedOutlet = null;
    this.reviews = [];
    this.reviewsDataSource = new MatTableDataSource(this.reviews);
  }

  // 🔹 Loads reviews for the selected place
  loadReviews(placeId: string) {
    this.violationService.getPlaceReviews(placeId).subscribe({
      next: (res: any) => {
        if (res.reviews && res.reviews.length > 0) {
          this.reviews = res.reviews.map((r: any) => ({
            user: r.authorAttribution?.displayName || 'Anonymous',
            comment: r.text?.text || 'No comment available',
            stars: r.rating
          }));
        } else {
          this.reviews = [];
        }
        this.reviewsDataSource = new MatTableDataSource(this.reviews);
        this.reviewsDataSource.paginator = this.paginator;
      },
      error: (err) => console.error('❌ Error fetching reviews:', err)
    });
  }
}
