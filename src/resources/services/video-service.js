// import aurelia http
import { inject } from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
// import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class VideoService {
  constructor() {
    this.client = new HttpClient();
  }

  async getVideos() {
    const response = await this.client.get('https://api.com/videos');
    return response.content;
  }
}
