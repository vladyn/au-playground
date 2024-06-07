import {bindable, inject} from 'aurelia-framework';
import { VideoService } from '../services/video-service';

@inject(Element)
@inject(VideoService)
export class Skills {
  @bindable value = 'Skills';
  message = 'Skills';
  static response = null;

  constructor(element) {
    this.element = element;
    this.service = new VideoService();
  }

  valueChanged(newValue, oldValue) {
    console.log('valueChanged', newValue, oldValue);
  }

  async attached() {
    this.response = await this.service.getVideos();
    console.log(this.response);
  }

  onChange(event) {
    console.log(event);
    console.log(this);
  }

  bind() {
    this.message = this.value + ' bound';	
    this.value = this.value + ' bound';
  }
}
