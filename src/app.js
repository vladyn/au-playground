import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { MenuRenderer } from './resources/renderers/menu-renderer';
import { MenuService } from "./resources/services/menu-service";
import { ToasterService } from './resources/services/toaster-service';
import { SumFormatValueConverter } from './resources/value-converters/sum-format-value-converter';
import { Logger } from './resources/services/logger';
import { warningAlert } from './resources/utils/warning-alert';

@inject(MenuRenderer, MenuService, ToasterService, Logger, I18N)
export class App {
  message = 'Hello World!';
  viewModel = {};
  toastModel = {};
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

  constructor(contextMenuRenderer, menuService, toasterService, logger, i18n) {
    this.contextMenuRenderer = contextMenuRenderer;
    this.menuService = menuService;
    this.toasterService = toasterService;
    this.logger = logger;
    this.i18n = i18n;
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

    this.i18n.setLocale('bg');

    this.toastModel = {
      title: 'Toaster Title23234',
      message: 'This is a toaster message12312312',
      close: true
    };

    this.menuService.renderMenu(this.viewModel);
  }

  bind() {
    this.nullAble = new SumFormatValueConverter().toView('123');
    this.gridOptions = this.#setGridOptions();
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

  showInfoClick() {
    this.toasterService.showToaster(this.toastModel);
  }

  showSuccessClick() {
    const patched = { ...this.toastModel, message: 'This is a SUCCESS toaster message', type: 'success' };
    this.toasterService.showToaster(patched);
  }

  showWarningClick() {
    const patched = { ...this.toastModel, message: 'This is a WARNING toaster message', type: 'warning' };
    this.toasterService.showToaster(patched);
  }

  showErrorClick() {
    const patched = { ...this.toastModel, message: 'This is an ERROR toaster message', type: 'error' };
    this.toasterService.showToaster(patched);
  }

  showAndHideWithDelayClick() {
    const patched = { ...this.toastModel, message: 'This toaster will close after 3 seconds', type: 'info', delay: 3000 };
    this.toasterService.showToaster(patched);
  }

  hideAllToasters () {
    this.toasterService.hideAllToasters();
  }

  logMeIfYouCan() {
    this.logger.info({
      title: 'Blias!!!',
      message: 'Alabalala',
      timeout: '66600000',
      closeHtml: '<button type="button" class="toast-close-button" id="currency-error" aria-label="Close">×</button>'
    });

    this.logger.warn('This is a warning message');
    this.logger.error('This is an error message');
    this.logger.success('This is a success message');
  }

  #setGridOptions() {
    // Grid Options: Contains all of the Data Grid configurations
    const gridOptions = {
        // Row Data: The data to be displayed.
        rowData: [
            // { make: "Tesla", model: "Model Y", price: 64950, electric: true },
            // { make: "Ford", model: "F-Series", price: 33850, electric: false },
            // { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        ],
        // Column Definitions: Defines the columns to be displayed.
        columnDefs: [
            { field: "make" },
            { field: "model" },
            { field: "price" },
            { field: "electric" }
        ],
        localeText: { noRowsToShow: warningAlert(this.i18n.tr('noResults')) },
    }

    return gridOptions;
  }
}
