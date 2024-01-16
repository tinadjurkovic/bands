import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BandsService } from '../bands.service';
import { Place } from '../models/place';
import { BandCreate } from '../models/band-create';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.css']
})
export class BandCreateComponent implements OnInit {

  createForm!: FormGroup;
  places: Place[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bandsService: BandsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      formed: [null, [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      country: [null, Validators.required],
      city: [null, Validators.required],
      genre: ['']
    });

    this.bandsService.getPlaces().subscribe(places => {
      this.places = places;
    });
  }

  saveBand() {
    if (this.createForm!.valid) {
      const newBand: BandCreate = {
        name: this.createForm!.get('name')?.value,
        formed: this.createForm!.get('formed')?.value,
        country: this.createForm!.get('country')?.value,
        city: this.createForm!.get('city')?.value,
        genre: this.createForm!.get('genre')?.value
      };
  
      this.bandsService.createBand(newBand).subscribe(() => {
        this.router.navigate(['/bands']);
      });
    }
  }
  
}
