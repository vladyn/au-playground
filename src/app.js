import { inject } from 'aurelia-framework';
import { MenuRenderer } from './resources/rederers/menu-renderer';
import { MenuService } from "./resources/services/menu-service";
import { SumFormatValueConverter } from './resources/value-converters/sum-format-value-converter';

@inject(MenuRenderer, MenuService)
export class App {
  message = 'Hello World!';
  viewModel = {};
  isMenuVisible = true;
  currency = 'BGN';
  amount = 123456.789;
  currencyPayload = {
    amount: 123123123,
    currency: 'EUR',
    currencyId: 'GUID'
  }
  nullAble = 12312;

  constructor(contextMenuRenderer, menuService) {
    this.contextMenuRenderer = contextMenuRenderer;
    this.menuService = menuService;
  }

  attached() {
    this.viewModel = {
      message: 'hello world',
      visible: true,
      itemsModel: [
        {
          "label": "Copy",
          "link": "https://copy.com"
        },
        {
          "label": "Cut",
          "link": "https://cut.com"
        },
        {
          "label": "Paste",
          "link": "https://paste.com"
        },
        {
          "label": "Delete",
          "link": "https://delete.com"
        }
      ],
    };
    this.menuService.renderMenu(this.viewModel);
  }

  bind(bindingContext, parentContext) {
    this.nullAble = new SumFormatValueConverter().toView('123');
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  closeMenuClick() {
    this.menuService.controller.closeMenu();
    this.toggleMenu();
  }

  openMenuClick() {
    this.menuService.controller.openMenu(this.viewModel);
    this.toggleMenu();
  }
}
