import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getGameList(
    ordering:string,
    search?:string
  ): Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering',ordering).set('key', 'b055fee05ba1494b85236d1889eaf33f');

    if(search){
      params = new HttpParams().set('ordering',ordering).set('search',search).set('key', 'b055fee05ba1494b85236d1889eaf33f');
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
      params:params,
    })
  }

  getGameDetails(id:string): Observable<Game>{
    let params = new HttpParams().set('key', 'b055fee05ba1494b85236d1889eaf33f');
    const gameInfoRequest=this.http.get(`${env.BASE_URL}/games/${id}`,{
      params:params,
    });
    const gameTrailersRequest=this.http.get(
      `${env.BASE_URL}/games/${id}/movies`,{
        params:params,
      }
    );
    const gameScreenShotsRequest=this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`,{
        params:params,
      }
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenShotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp:any)=>{
        return {
          ...resp['gameInfoRequest'],
          screenshots:resp['gameScreenshotsRequest']?.results,
          trailers:resp['gameTrailersRequest']?.results,

        };
      })
    );
  }
}
