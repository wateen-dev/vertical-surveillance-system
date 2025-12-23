import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OutletDialogComponent } from '../outlet-dialog/outlet-dialog.component';
import { ViolationService } from '../services/violation.service';
import { MatDialog } from '@angular/material/dialog';
interface CompetitorOutlet {
  rank: number;
  placeId: string;
  name: string;
  address: string;
  rating: number;
  status: string;
  statusClass: string;
  userRatingCount: string;
  priceLevel: string;
}
@Component({
  selector: 'app-competitor-outlets',
  templateUrl: './competitor-outlets.component.html',
  styleUrl: './competitor-outlets.component.css'
})
export class CompetitorOutletsComponent implements OnInit {
  competitorOutlets: CompetitorOutlet[] = [];
  selectedOutlet: any = null;
  reviews: any[] = [];
  reviewsDataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['user', 'comment', 'stars'];
  isLoading: boolean = false; // 🔹 Loading state

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private violationService: ViolationService, private dialog: MatDialog) { }

  ngOnInit() {
    const latitude = 24.3661831;
    const longitude = 54.4898155;

    this.loadCompetitors(latitude, longitude);
  }
  // loadCompetitors(query: string) {
  //   this.isLoading = true;

  //   this.violationService.getCompetitorOutlets(query).subscribe({
  //     next: (res: any[]) => {
  //       this.competitorOutlets = res
  //         .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // ⭐ sort by rating
  //         .map((item, index) => ({
  //           rank: index + 1,
  //           placeId: item.placeId,
  //           name: item.name,
  //           address: item.address,
  //           rating: item.rating ?? 0,
  //           status: item.rating >= 4.5 ? 'Excellent'
  //             : item.rating >= 4 ? 'Great'
  //               : item.rating >= 3.5 ? 'Good'
  //                 : 'Needs Attention',
  //           statusClass: item.rating >= 4.5 ? 'status-excellent'
  //             : item.rating >= 4 ? 'status-great'
  //               : item.rating >= 3.5 ? 'status-good'
  //                 : 'status-attention'
  //         }));

  //       this.isLoading = false;
  //     },
  //     error: () => this.isLoading = false
  //   });
  // }
  loadCompetitors(latitude: number, longitude: number, radiusInMeters: number = 10000) {
    this.isLoading = true;

    // Call the new API
    this.violationService.getCompetitorOutletsByLocation(latitude, longitude, radiusInMeters).subscribe({
      next: (res: any[]) => {
      
        if (!res || res.length === 0) {
          this.competitorOutlets = [];
          this.isLoading = false;
          return;
        }

        // Sort by rating descending and map to your UI structure
        this.competitorOutlets = res
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .map((item, index) => ({
            rank: index + 1,
            placeId: item.placeId,
            name: item.name,
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
            rating: item.rating ?? 0,
            userRatingCount: item.userRatingCount ?? 0,
            priceLevel: item.priceLevel ?? 'N/A',
            status: item.rating >= 4.5 ? 'Excellent'
              : item.rating >= 4 ? 'Great'
                : item.rating >= 3.5 ? 'Good'
                  : 'Needs Attention',
            statusClass: item.rating >= 4.5 ? 'status-excellent'
              : item.rating >= 4 ? 'status-great'
                : item.rating >= 3.5 ? 'status-good'
                  : 'status-attention'
          }));

        this.isLoading = false;
      },
      error: () => {
        this.competitorOutlets = [];
        this.isLoading = false;
      }
    });
  }

  openCompetitorDialog(outlet: CompetitorOutlet) {
    this.isLoading = true;

    this.violationService.getPlaceReviews(outlet.placeId).subscribe({
      next: (reviewsRes: any) => {
        const reviews = reviewsRes.reviews?.map((r: any) => ({
          user: r.authorAttribution?.displayName || 'Anonymous',
          comment: r.text?.text || 'No comment available',
          stars: r.rating
        })) || [];
        const outletWithPhone = {
          ...outlet,
          internationalPhoneNumber: reviewsRes.internationalPhoneNumber || null
        };

        const dialogRef = this.dialog.open(OutletDialogComponent, {
          width: '100%',
          height: '100%',
          panelClass: 'full-screen-dialog',
          data: {
            selectedOutlet: outletWithPhone,
            reviews
          }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.isLoading = false;
        });
      },
      error: () => this.isLoading = false
    });
  }

  getPriceAndCuisine(outlet: any): string {
    let priceRange = '';

    switch (outlet.priceLevel) {
      case 'PRICE_LEVEL_INEXPENSIVE':
        priceRange = 'AED 1–100';
        break;
      case 'PRICE_LEVEL_MODERATE':
        priceRange = 'AED 101–200';
        break;
      case 'PRICE_LEVEL_EXPENSIVE':
        priceRange = 'AED 201–400';
        break;
      case 'PRICE_LEVEL_VERY_EXPENSIVE':
        priceRange = 'AED 401+';
        break;
      default:
        priceRange = 'Not available';
    }

    const cuisine = outlet.cuisine || '';

    return `${priceRange} · ${cuisine}`;
  }
}
