import { thousandsSeparator } from '../utils/thousands-separator';
import { inject } from 'aurelia-framework';
import { CurrencyService } from '../services/currency-service';

@inject(CurrencyService)
export class SumFormatValueConverter {
  constructor(currencyService = new CurrencyService()) {
    this.currencyService = currencyService;
  }

  toView(value, ...args) {
    if (value === null || value === undefined) return;
    this.defaultCurrency = this.currencyService.getDefaultCurrency(); // EUR
    this.currency = this.currencyService.getCurrency(); // BNG
    this.config = Number(this.currencyService.getConfig()); // 0 EUR (BGN), 1 - EUR, -1 - BGN

    const formattedValue = this._normalizeValue(value);
    if (!this._isValidFormattedValue(formattedValue)) {
      return;
    }

    const primaryCurrency = this._formatAmount(formattedValue, 'amount');
    const secondaryCurrency = this._formatAmount(formattedValue, 'amountSecondary');

    // If there is no arguments, then force push the array with arguments depending on the currencyMode setting
    if(!args.length) {
      switch (this.config) {
        case -1:
          args.push('secondaryCurrency');
          break;
        case 1:
          args.push('primaryCurrency');
          break;
        default:
          args.length = 0;
          break;
      }
    }

    switch (true) {
      case args.includes('primaryCurrency'):
        return `${this._formatOutput(primaryCurrency, this.defaultCurrency)}`;
      case args.includes('secondaryCurrency'):
        return `${this._formatOutput(secondaryCurrency, this.currency)}`;
      default:
        return `${this._formatOutput(primaryCurrency, this.defaultCurrency)} (${this._formatOutput(secondaryCurrency, this.currency)})`;
    }
  }

  _normalizeValue(value) {
    switch (true) {
      case typeof value === 'number':
      case Number.isFinite(value):
        return { amount: value, currency: this.defaultCurrency, amountSecondary: value?.amountSecondary ?? value };
      case typeof value === 'string' && Number.isFinite(Number(value)):
        return { amount: Number(value), currency: this.defaultCurrency, amountSecondary: value?.amountSecondary ?? value };
      default:
        return { amount: value?.amount, currency: this.defaultCurrency, amountSecondary: value.amountSecondary };
    }
  }

  _isValidFormattedValue(formattedValue) {
    return (
      formattedValue &&
      formattedValue.amount !== undefined &&
      formattedValue.amountSecondary !== undefined &&
      formattedValue !== '' &&
      formattedValue !== null
    );
  }

  _formatAmount(formattedValue, amount) {
    if (formattedValue[amount] % 1 !== 0) {
      if (!Number.isNaN(formattedValue[amount])) {
        return Number.parseFloat(formattedValue[amount]);
      }
      return formattedValue[amount].toFixed(2) / 1;
    }
    return Number.parseInt(formattedValue[amount]);
  }

  _formatOutput(amount, currency) {
    return `${thousandsSeparator(
      new Intl.NumberFormat('bg-BG', {
        style: 'currency',
        currency: currency
      }).format(amount)
    )}`;
  }
}

