import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BandsService } from '../bands.service';
import { Band } from '../models/client';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.scss']
})
export class BandListComponent implements OnInit, OnDestroy {

  bands: Band[] = [];
  bandsSubscription$?: Subscription;
  selectedBand?: Band;
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>;

  constructor(private bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    this.bandsSubscription$ = this.bandsService.getBands().subscribe({
      next: bands => this.bands = bands,
      error: err => console.log(err)
    });
  }

  ngOnDestroy(): void {
    this.bandsSubscription$?.unsubscribe();
  }

  deleteBand(band: Band) {
    this.selectedBand = band;
    this.dialog?.nativeElement.showModal();
  }

  editBand(band: Band) {
    this.router.navigate(['/bands', band.id, 'edit']);
  }

  viewBand(band: Band) {
    this.router.navigate(['/bands', band.id]);
  }

  addBand() {
    this.router.navigate(['/bands', 'create']);
  }

  confirmModal() {
    if (this.selectedBand) {
      this.bandsService.deleteBand(this.selectedBand.id).subscribe({
        next: () => {
          this.bands = this.bands.filter(b => b.id !== this.selectedBand!.id);
          this.selectedBand = undefined;
        },
        error: err => console.log(err)
      });
      this.closeModal();
    }
  }

  closeModal() {
    this.selectedBand = undefined;
    this.dialog?.nativeElement.close();
  }
}
