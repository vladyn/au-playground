export class CurrencyService {
  constructor() {
    this.defaultCurrency = 'EUR';
    this.primaryCurrency = this.defaultCurrency;
    this.secondaryCurrency = 'BGN';
    this.storage = localStorage;
    this.storageKey = 'currency';
    this.defaultStorageKey = 'defaultCurrency';
    this.storage.setItem(this.storageKey, this.secondaryCurrency);
    this.storage.setItem(this.defaultStorageKey, this.defaultCurrency);
  }

  getDefaultCurrency() {
    return this.storage.getItem(this.defaultStorageKey);
  }

  getCurrency() {
    return this.storage.getItem(this.storageKey);
  }

  setCurrency(currency) {
    this.storage.setItem(this.storageKey, currency);
  }
}
