import {inject} from 'aurelia-framework';
import {MenuRenderer} from '../rederers/menu-renderer';

@inject(MenuRenderer)
export class MenuController {
  constructor(menuRenderer) {
    this.visible = false;
    this.renderer = menuRenderer;
  }
}
