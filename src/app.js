import { inject } from 'aurelia-framework';
import { MenuRenderer } from './resources/renderers/menu-renderer';
import { MenuService } from "./resources/services/menu-service";
import { ToasterService } from './resources/services/toaster-service';
import { SumFormatValueConverter } from './resources/value-converters/sum-format-value-converter';
import { Logger } from './resources/services/logger';

@inject(MenuRenderer, MenuService, ToasterService, Logger)
export class App {
  message = 'Hello World!';
  viewModel = {};
  toastModel = {};
  isToasterVisible = false;
  isMenuVisible = true;
  currency = 'BGN';
  amount = 123456.789;
  currencyPayload = {
    amount: 123123,
    amountSecondary: 123213212,
    currency: 'EUR',
    currencyId: 'GUID'
  }
  nullAble = null;

  constructor(contextMenuRenderer, menuService, toasterService, logger) {
    this.contextMenuRenderer = contextMenuRenderer;
    this.menuService = menuService;
    this.toasterService = toasterService;
    this.logger = logger
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

    this.toastModel = {
      title: 'Toaster Title',
      message: 'This is a toaster message',
      visible: false
    };

    this.menuService.renderMenu(this.viewModel);
  }
  activate() {
    console.log(this.constructor.name);
  }

  bind() {
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

  showToasterClick() {
    this.toasterService.showToaster(this.toastModel);
  }

  hideToasterClick() {
    this.toasterService.hideToaster();
  }

  logMeIfYouCan() {
    this.logger.info({
      title: 'Blias!!!',
      message: 'Alabalala',
      timeout: '66600000',
      closeHtml: '<button type="button" class="toast-close-button" id="currency-error" aria-label="Close">×</button>'
    });
    console.log(this);
    this.logger.warn('This is a warning message');
    this.logger.error('This is an error message');
    this.logger.success('This is a success message');
  }
}
