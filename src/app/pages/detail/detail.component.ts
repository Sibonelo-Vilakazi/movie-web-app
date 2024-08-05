import { Component, OnInit } from '@angular/core';
import { DetailBannerComponent } from "../../components/detail-banner/detail-banner.component";
import { ActivatedRoute } from '@angular/router';
import { GenericHttpService } from '../../services/generic-http.service';
import { HttpClientModule } from '@angular/common/http';
import { Endpoints } from '../../endpoints/Endpoints';
import { DetailBannerConfig } from '../../interfaces/ui-config/detail-banner-config.interface';
import { RateChipComponent } from "../../components/rate-chip/rate-chip.component";
import { DetailConfig } from '../../interfaces/ui-config/detail-config.interface';
import { Genre, MovieDetailData } from '../../interfaces/models/movie-detail.interface';
import { CommonModule } from '@angular/common';
import { TVData } from '../../interfaces/models/tv.interface';
import { TVDetailData } from '../../interfaces/models/tv-detail.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  providers: [GenericHttpService],
  imports: [DetailBannerComponent, HttpClientModule, 
    RateChipComponent, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  bannerConfig!: DetailBannerConfig;

  config!: DetailConfig;

  constructor(private activatedRoute: ActivatedRoute, 
    private genericService: GenericHttpService) {}


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: any) => {
      
      if (paramMap.params.movie_id) {
        this.getMovieById(paramMap.params.movie_id)
      } else if (paramMap.params.series_id)  { 
        this.getTvShowById(paramMap.params.series_id)
      }
    })
  }


  getMovieById(id: string){
    this.genericService.httpGet(Endpoints.MOVIE_ID(id))
    .subscribe({
      next: (res: MovieDetailData) => {
        console.log(res);
        this.bannerConfig= {
          img: Endpoints.IMAGE_BASE+ `/w1280${res.backdrop_path}`,
          pageName: 'Movies',
          path: 'movies',
          title: res.original_title
        }

        let  result = '';
        res.genres.map((item: Genre, index: number) => {
          result += item.name + ' ' + 
          ( (index === res.genres.length - 1) ? '' : ',' ) 
        })
        this.config = {
          img: Endpoints.IMAGE_BASE + `w500${res.poster_path}`,
          subtitle: res.tagline,
          description: res.overview,
          rate: res.vote_average,
          isVertical: true,
          detailCards: [
            {
              title: 'Type',
              description: 'Movie'
            },
            {
              title: 'Release date',
              description: res.release_date
            },
            {
              title: 'Run time',
              description: res.runtime.toString()
            },
            {
              title: 'Genres',
              description: result
            },
          ]
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }


  getTvShowById(id: string){
    this.genericService.httpGet(Endpoints.TV_SHOW_ID(id))
    .subscribe({
      next: (res: TVDetailData) => {
        
        this.bannerConfig= {
          img: Endpoints.IMAGE_BASE+ `/w1280${res.backdrop_path}`,
          pageName: 'TV Shows',
          path: 'tvshows',
          title: res.name
        }

        let  result = '';
        res.genres.map((item: Genre, index: number) => {
          result += item.name + ' ' + 
          ( (index === res.genres.length - 1) ? '' : ',' ) 
        })
        this.config = {
          img: Endpoints.IMAGE_BASE + `w500${res.poster_path}`,
          subtitle: res.tagline,
          description: res.overview,
          rate: res.vote_average,
          isVertical: false,
          detailCards: [
            {
              title: 'Type',
              description: 'Movie'
            },
            {
              title: 'Status',
              description: res.status
            },
            {
              title: 'First air date',
              description: res.status
            },
            {
              title: 'Last air date',
              description: res.first_air_date
            },
            {
              title: 'No. of seasons',
              description: res.number_of_seasons.toString()
            },
            {
              title: 'No. of episodes',
              description: res.number_of_episodes.toString()
            },
            {
              title: 'Episode run time',
              description: res.last_air_date
            },
            {
              title: 'Genres',
              description: result
            },

          ]
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }


}
