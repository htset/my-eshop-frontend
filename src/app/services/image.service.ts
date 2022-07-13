import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  public upload(image: Image): Observable<HttpEvent<Response>> {
    const formData = new FormData();

    formData.append('image', image.fileContent, image.fileName);
    formData.append('id', image.itemId.toString());
    return this.http.post<Response>(`${environment.apiUrl}/image`, formData, {reportProgress: true, observe: 'events'});
  }

  public getImage(itemId:number): Observable<Image> {
    return this.http.get<Image>(`${environment.apiUrl}/image/${itemId}`);
  }
}
