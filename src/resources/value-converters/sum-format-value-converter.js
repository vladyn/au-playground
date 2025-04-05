import { thousandsSeparator } from '../utils/thousands-separator';
import { inject } from 'aurelia-framework';
import { CurrencyService } from '../services/currency-service';

@inject(CurrencyService)
export class SumFormatValueConverter {
  constructor(currencyService = new CurrencyService()) {
    this.currencyService = currencyService;
    this.defaultCurrency = this.currencyService.getDefaultCurrency(); // EUR
    this.currency = this.currencyService.getCurrency(); // BNG
  }

  toView(value, ...args) {
    const formattedValue = this._normalizeValue(value);
    if (!this._isValidFormattedValue(formattedValue)) {
      return;
    }

    this._formatAmount(formattedValue);

    if (!formattedValue.currency) {
      return '';
    }
    
    const currencyConverted = (formattedValue.amount / 1.95583).toFixed(2);
    if (args.includes('primaryCurrency')) {
      return `${this._formatOutput(currencyConverted, this.defaultCurrency)}`;
    }

    switch (true) {
      case args.includes('primaryCurrency'):
        return `${this._formatOutput(currencyConverted, this.defaultCurrency)}`;
      case args.includes('secondaryCurrency'):
        return `(${this._formatOutput(formattedValue.amount, this.currency)})`;
      default:
        return `${this._formatOutput(currencyConverted, this.defaultCurrency)} (${this._formatOutput(formattedValue.amount, this.currency)})`;
    }
  }

  _normalizeValue(value) {
    if (typeof value === 'number' || Number.isFinite(value)) {
      return { amount: value, currency: this.defaultCurrency };
    }

    return { amount: value?.amount, currency: this.defaultCurrency };
  }

  _isValidFormattedValue(formattedValue) {
    return (
      formattedValue &&
      formattedValue.amount !== undefined &&
      formattedValue !== '' &&
      formattedValue !== null
    );
  }

  _formatAmount(formattedValue) {
    if (formattedValue.amount % 1 !== 0) {
      if (!Number.isNaN(formattedValue.amount)) {
        formattedValue.amount = Number.parseFloat(formattedValue.amount);
      }
      formattedValue.amount = formattedValue.amount.toFixed(2) / 1;
    } else {
      formattedValue.amount = Number.parseInt(formattedValue.amount);
    }
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
