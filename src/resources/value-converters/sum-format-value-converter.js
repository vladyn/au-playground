import { thousandsSeparator } from '../utils/thousands-separator';

export class SumFormatValueConverter {
  toView(value) {
    const formattedValue = (typeof value === 'number' || Number.isFinite(value)) && value !== null ? { amount: value, currency: 'EUR' } : value;
    if (formattedValue === undefined || formattedValue === null || formattedValue === '' || formattedValue.amount === undefined) {
      return;
    }

    // Format to proper type
    if (formattedValue.amount % 1 !== 0) {
      if (!Number.isNaN(formattedValue.amount)) {
        formattedValue.amount = Number.parseFloat(formattedValue.amount);
      }
      formattedValue.amount = formattedValue.amount.toFixed(2) / 1;
    } else {
      formattedValue.amount = Number.parseInt(formattedValue.amount);
    }

    if (!formattedValue.currency) {
      return '';
    }

    const index = formattedValue.currency.indexOf(':');
    let currency = formattedValue.currency;
    if (index !== -1) {
      currency = value.currency.substring(index + 2);
    }
    return `${thousandsSeparator(
      new Intl.NumberFormat('bg-BG', {
        style: 'currency',
        currency: currency
      })
      .format(formattedValue.amount)
    )}`;
  }
}
