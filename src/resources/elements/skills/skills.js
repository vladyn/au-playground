import {bindable, inject} from 'aurelia-framework';
import { Solar } from '../../../lib/third-parties/learning-hub/solar.js';

@inject(Element)
export class Skills {
  @bindable value = 'Skills';
  message = 'Skills';

  constructor(element) {
    this.solar = new Solar({status: 'loading'});
    this.element = element;
  }

  valueChanged(newValue, oldValue) {
    console.log('valueChanged', newValue, oldValue);
  }

  attached() {
    this.element.appendChild(this.solar.render());
    this.solar.iframe.addEventListener('load', () => {
      setTimeout(() => {
        this.solar.iframe.contentWindow.postMessage([
          {
            media_url: 'assets/video/pexels-cottonbro-5532774 (2160p)',
            title: 'Hello from Aurelia'
          }
      ], this.solar.iframe.baseURI);
      }, 1000);
    });
  }

  bind() {
    this.message = this.solar.message;
    this.value = this.solar.message + ' bound';
    this.iFrame = this.solar.iframe;
  }
}
