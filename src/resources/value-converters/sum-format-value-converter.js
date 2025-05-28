import { thousandsSeparator } from '../utils/thousands-separator';
import { inject } from 'aurelia-framework';
import { CurrencyService } from '../services/currency-service';
import { currencyModes } from '../enums/currency-modes';
import { systemAreaNamespaces } from '../enums/system-area-namespaces';

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
    const { euro, lv, euroLv, euroSpecialFields } = currencyModes;

    const formattedValue = this._normalizeValue(value);
    if (!this._isValidFormattedValue(formattedValue)) {
      return;
    }

    const primaryCurrency = this._formatAmount(formattedValue, 'amount');
    const secondaryCurrency = this._formatAmount(formattedValue, 'amountSecondary');

    if(!args.length) {
      switch (this.config) {
        case lv:
          args.push('secondaryCurrency');
          break;
        case euro:
          args.push('primaryCurrency');
          break;
        default:
          args.length = 0;
          break;
      }
    }

    switch (true) {
      // the special fields exception
      case args.includes('twoCurrencies') && this.config === euroSpecialFields:
        return `${this._formatOutput(primaryCurrency, this.defaultCurrency)} (${this._formatOutput(secondaryCurrency, this.currency)})`;
      // Enforce Special currencies to have only EUR. All others are EUR.
      case args.includes('primaryCurrency'):
      case args.includes('twoCurrencies') && this.config === euro:
      case !args.length && this.config === euroSpecialFields:
        return `${this._formatOutput(primaryCurrency, this.defaultCurrency)}`;
      // When currency moe is BGN - special fields are BGN. All others are BGN by specification.
      case args.includes('secondaryCurrency'):
      case args.includes('twoCurrencies') && this.config === lv:
        return `${this._formatOutput(secondaryCurrency, this.currency)}`;
      // All other - this is when the currency mode is 0. Displaying two currencies.
      default:
        return `${this._formatOutput(primaryCurrency, this.defaultCurrency)} (${this._formatOutput(secondaryCurrency, this.currency)})`;
    }
  }

  _normalizeValue(value) {
    const amountSecondary = value?.amountSecondary ?? 0;
    const currency = this.defaultCurrency;

    switch (true) {
      case typeof value === 'number':
      case Number.isFinite(value):
        console.trace(value, 'is not a valid value');
        const callStack = new Error().stack?.split("@webpack-internal:///");
        const componentReference = callStack.filter(namespace => {
          return systemAreaNamespaces.some(name => namespace.startsWith(name) && namespace);
        });

        console.log(componentReference);

        return { amount: value, currency, amountSecondary };
      case typeof value === 'string' && Number.isFinite(Number(value)):
        return { amount: Number(value), currency, amountSecondary };
      default:
        return { amount: value?.amount, currency, amountSecondary };
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

