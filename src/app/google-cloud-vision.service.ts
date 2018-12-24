import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleCloudVisionService {

  constructor(public http: Http) { }

  getText(base64Image) {

    const body = {
      'requests': [
        {
          'image': {
            'content': base64Image
          },

          'features': [
            {
              'type': 'TEXT_DETECTION',
              'maxResults': 1
            }
          ]
        }
      ]
    };
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body);
  }
}
