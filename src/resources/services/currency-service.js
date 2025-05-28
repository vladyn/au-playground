import { currencyList } from "../enums/currencies";
export class CurrencyService {
  constructor() {
    this.defaultCurrency = currencyList.defaultCurrency; // EUR
    this.secondaryCurrency = currencyList.secondaryCurrency; // BGN
    this.storage = localStorage;
    // Currency sequence is the way displaying the currencies in the system
    // 0 - displays both EUR (BGN) side by side
    // 1 - displays the new currency - EUR
    // -1 - displays the legacy currency - BGN
    this.currencyConfig = 'currencyMode';
  }

  getDefaultCurrency() {
    return this.defaultCurrency;
  }

  getCurrency() {
    return this.secondaryCurrency
  }

  getConfig() {
    const appData = JSON.parse(this.storage.getItem('appData'));
    return appData[this.currencyConfig] ?? -1; // Fallback to a temporary: EUR (BGN)
  }
}
