import { SumFormatValueConverter } from '../../../../src/resources/value-converters/sum-format-value-converter';

describe('SumFormatValueConverter', () => {
  let converter;

  describe('Currency config is -1', () => {
    const currencyServiceMock = {
      getDefaultCurrency: jest.fn(() => 'EUR'),
      getCurrency: jest.fn(() => 'BGN'),
      getConfig: jest.fn(() => -1),
    };
  
    beforeEach(() => {
      converter = new SumFormatValueConverter();
      // Removed unnecessary assignment to currencyService
      converter.currencyService = currencyServiceMock;
    });
  
    it('should format a number to a string with thousands separator and currency', () => {
      const result = converter.toView(1234567.89);
      const resultRemoveSpaces = result.replace(/\s/g, '');
      expect(resultRemoveSpaces).toEqual('0,00лв.');
    });
  
      it('should format a number with secondary currency', () => {
      const result = converter.toView({ amount: 1234567.89, amountSecondary: 987654.32 });
      const resultRemoveSpaces = result.replace(/\s/g, '');
      expect(resultRemoveSpaces).toEqual('987654,32лв.');  
    });
    it('should format a string with secondary currency', () => {
      const result = converter.toView({ amount: '1234567.89', amountSecondary: '987654.32' }, 'primaryCurrencySpecial');
      const resultRemoveSpaces = result.replace(/\s/g, '');
      expect(resultRemoveSpaces).toEqual('1234567,89€(987654,32лв.)');
    });
  });

  describe('Currency config is 0', () => {
    const currencyServiceMock = {
      getDefaultCurrency: jest.fn(() => 'EUR'),
      getCurrency: jest.fn(() => 'BGN'),
      getConfig: jest.fn(() => 0),
    };
  
    beforeEach(() => {
      converter = new SumFormatValueConverter();
      // Removed unnecessary assignment to currencyService
      converter.currencyService = currencyServiceMock;
    });
  
    it('should format a number to a string with thousands separator and both currencies', () => {
      const result = converter.toView(1234567.89);
      const resultRemoveSpaces = result.replace(/\s/g, '');
      expect(resultRemoveSpaces).toEqual('1234567,89€(0,00лв.)');
    });
  
    it('should format a number with secondary currency', () => {
      const result = converter.toView({ amount: 1234567.89, amountSecondary: 987654.32 });
      const resultRemoveSpaces = result.replace(/\s/g, '');
      expect(resultRemoveSpaces).toEqual('1234567,89€(987654,32лв.)');  
    });
  });

  describe('Currency config is 1', () => {
    const currencyServiceMock = {
      getDefaultCurrency: jest.fn(() => 'EUR'),
      getCurrency: jest.fn(() => 'BGN'),
      getConfig: jest.fn(() => 1),
    };
  
    beforeEach(() => {
      converter = new SumFormatValueConverter();
      // Removed unnecessary assignment to currencyService
      converter.currencyService = currencyServiceMock;
    });
  
    it('should format a number to a string with thousands separator and primary currency', () => {
      const result = converter.toView(1234567.89);
      const resultRemoveSpaces = result.replace(/\s/g, '');
      expect(resultRemoveSpaces).toEqual('1234567,89€');
    });
  
    it('should format a number with secondary currency', () => {
      const result = converter.toView({ amount: 1234567.89, amountSecondary: 987654.32 });
      const resultRemoveSpaces = result.replace(/\s/g, '');
      expect(resultRemoveSpaces).toEqual('1234567,89€');  
    });
  });

  it('should return undefined for null or undefined values', () => {
    expect(converter.toView(null)).toBeUndefined();
    expect(converter.toView(undefined)).toBeUndefined();
  });
  it('should return undefined for invalid values', () => {
    expect(converter.toView({})).toBeUndefined();
    expect(converter.toView([])).toBeUndefined();
    expect(converter.toView(true)).toBeUndefined();
  });
});
