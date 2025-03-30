import { inject } from 'aurelia-framework';
import { LocalStorage } from '../mocks/local-storage';

@inject(LocalStorage)
export class CurrencyService {
  constructor(storage) {
    this.defaultCurrency = 'EUR';
    this.storage = storage;
    this.storageKey = 'currency';
    this.storage.setItem(this.storageKey, this.defaultCurrency);
    console.log('CurrencyService initialized with default currency:', this.defaultCurrency);
    console.log('Storage:', this.storage);
  }

  getDefaultCurrency() {
    return this.defaultCurrency;
  }

  getCurrency() {
    return this.storage.getItem(this.storageKey);
  }

  setCurrency(currency) {
    this.storage.setItem(this.storageKey, currency);
  }
}
