// import aurelia http
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";
// import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class VideoService {
  constructor() {
    this.client = new HttpClient();
  }

  async getVideos() {
    try {
      const response = await this.client.get("https://api.com/videos");
      return response.content;
    } catch {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            endpoints: ["https://niobe3-dev.com"],
            videos: [
              {
                id: 123,
                dateAdded: "",
                src: "video_day_1.mp4",
                metaData: {
                  title: "Blias!",
                  description: "bla bla",
                  cueTrack: "video_day1_cue.vtt",
                  subtitleTrack: "video_day1_subtitle.srt",
                },
                sticky: false,
              },
              {
                id: 321,
                dateAdded: "",
                src: "video_day_2.mp4",
                metaData: {
                  title: "Blias!2",
                  description: "bla2 bla2",
                  cueTrack: "video_day2_cue.vtt",
                  subtitleTrack: "ideo_day2_subtitle.srt",
                },
                sticky: true,
              },
            ],
          });
        }, 2000);
      });
    }
  }
}
