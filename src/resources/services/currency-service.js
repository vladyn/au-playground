import { inject } from 'aurelia-framework';
import { LocalStorage } from '../mocks/local-storage';

@inject(LocalStorage)
export class CurrencyService {
  constructor(storage) {
    this.defaultCurrency = 'EUR';
    this.primaryCurrency = this.defaultCurrency;
    this.secondaryCurrency = 'BGN';
    this.storage = storage;
    console.log(this.storage);
    this.storageKey = 'currency';
    this.defaultStorageKey = 'defaultCurrency';
    this.storage.setItem(this.storageKey, this.secondaryCurrency);
    this.storage.setItem(this.defaultStorageKey, this.defaultCurrency);
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
