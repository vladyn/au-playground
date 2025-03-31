import { thousandsSeparator } from '../utils/thousands-separator';
import { inject } from 'aurelia-framework';
import { CurrencyService } from '../services/currency-service';

@inject(CurrencyService)
export class SumFormatValueConverter {
  constructor(currencyService) {
    this.currencyService = currencyService;
    this.defaultCurrency = this.currencyService.getDefaultCurrency();
    this.currency = this.currencyService.getCurrency();
    console.log(
      'SumFormatValueConverter initialized with default currency:',
      this.defaultCurrency
    );
    console.log(
      'SumFormatValueConverter getCurrency currency:',
      this.currency
    );
    console.log('CurrencyService:', this.currencyService);
  }

  toView(value) {
    const formattedValue = this._normalizeValue(value);
    if (!this._isValidFormattedValue(formattedValue)) {
      return;
    }

    this._formatAmount(formattedValue);

    if (!formattedValue.currency) {
      return '';
    }

    const currency = this._extractCurrency(formattedValue.currency);
    const secondaryCurrencyConverted = (formattedValue.amount / 1.95583).toFixed(2);
    return `${this._formatOutput(formattedValue.amount, currency)} (${this._formatOutput(secondaryCurrencyConverted, this.currency)})`;
  }

  _normalizeValue(value) {
    if (typeof value === 'number' || Number.isFinite(value)) {
      return { amount: value, currency: this.defaultCurrency };
    }
    return value;
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

  _extractCurrency(currency) {
    const index = currency.indexOf(':');
    return index !== -1 ? currency.substring(index + 2) : currency;
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
