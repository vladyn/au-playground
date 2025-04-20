import { SumFormatValueConverter } from "../value-converters/sum-format-value-converter";
import { CurrencyService } from "../services/currency-service";

// function to act as a class
export function SumRenderer() { }

// gets called once before the renderer is used
SumRenderer.prototype.init = function(params) {
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.classList.add('text-right');
  this.eGui.innerHTML = this.getRenderedValue(params);
};

// gets called once when grid ready to insert the element
SumRenderer.prototype.getGui = function() {
  return this.eGui;
};

// gets called whenever the user gets the cell to refresh
SumRenderer.prototype.refresh = function(params) {
  this.eGui.innerHTML = this.getRenderedValue(params);
  // return true to tell the grid we refreshed successfully
  return true;
};

SumRenderer.prototype.getRenderedValue = (params) => {
  const currencyConfig = new CurrencyService().getConfig();
  if (params.value !== undefined && params.value !== null) {
    if (params.max !== undefined && params.max !== null) {
      params.value = Math.min(params.value, params.max);
    }


    // If params contains property format, pass it to the SumFormatValueConverter
    // AND only if the currency service is configured to display two currencies
    switch (true) {
    case (params?.format === 'twoRows' && Number(currencyConfig) === 1):
      // Display only EUR
      return `${new SumFormatValueConverter().toView(params.value, 'primaryCurrency')}`;
    case (params?.format === 'twoRows' && Number(currencyConfig) === -1):
      // Display only BGN
      return `${new SumFormatValueConverter().toView(params.value, 'secondaryCurrency')}`;
    case (params?.format === 'twoRows' && Number(currencyConfig) === 0):
    case (params?.format === 'twoCurrencies'):
      // Display both currencies
      // this.config is 0 - both currencies
      return `${new SumFormatValueConverter().toView(params.value, 'primaryCurrency')} <br/> ${new SumFormatValueConverter().toView(params.value, 'secondaryCurrency')}`;
    case (params?.format === 'twoCurrenciesInline'):
      return `${new SumFormatValueConverter().toView(params.value, params.format)}`;
    default:
      // If params doesn't contain property format, use the default currency config - EUR - BGN
      return `${new SumFormatValueConverter().toView(params.value)}`;
    }
  }

  return '';
};
