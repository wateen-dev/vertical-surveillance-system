import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-outlet-dialog',
  templateUrl: './outlet-dialog.component.html',
  styleUrl: './outlet-dialog.component.css'
})
export class OutletDialogComponent {
  displayedColumns: string[] = ['user', 'comment', 'stars'];
  reviewsDataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<OutletDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.reviews) {
      this.reviewsDataSource = new MatTableDataSource(data.reviews);
    }
  }

  ngAfterViewInit() {
    if (this.paginator) this.reviewsDataSource.paginator = this.paginator;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  getStars(rating: number): string[] {
  const stars: string[] = [];
  const fullStars = Math.floor(rating); // full stars
  const halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75; // half star logic
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }

  // Add half star if needed
  if (halfStar) {
    stars.push('half');
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push('empty');
  }

  return stars;
}

}
