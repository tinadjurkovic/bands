import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  totalBands: number = 0;
  totalMembers: number = 0;
  totalGenres: number = 0;
  totalAlbums: number = 0;
  bandsPerGenre: { genre: string, count: number }[] = [];
  albumsPerGenre: { genre: string, count: number }[] = [];
  albumsPerDecade: { decade: string, count: number }[] = [];
  citiesWithoutBands: number = 0;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe((statistics) => {
      this.totalBands = statistics.totalBands;
      this.totalMembers = statistics.totalMembers;
      this.totalGenres = statistics.totalGenres;
      this.totalAlbums = statistics.totalAlbums;
      this.bandsPerGenre = statistics.bandsPerGenre;
      this.albumsPerGenre = statistics.albumsPerGenre;
      this.albumsPerDecade = statistics.albumsPerDecade;
      this.citiesWithoutBands = statistics.citiesWithoutBands;
    });
  }
}
