import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  GetEmojiData(param: number): Observable<any> {
    return this.http.get<any>('http://localhost:5000/listEmoji/' + param);
  }
  SaveEmojiData(data: any[]):Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const wrapper = { emojis: data };

    const body=JSON.stringify(wrapper);
    return this.http.post('http://localhost:5000/save-big', body,{'headers':headers})
  }
  GetDummyData():Observable<any[]> {
    return this.http.get<any>('http://localhost:5000/dummy-data');
  }
}
