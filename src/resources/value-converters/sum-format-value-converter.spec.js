import { SumFormatValueConverter } from './sum-format-value-converter';

describe('SumFormatValueConverter', () => {
  let converter;

  beforeEach(() => {
    converter = new SumFormatValueConverter();
  });

  it('should format a number to a string with thousands separator and currency', () => {
    const result = converter.toView(1234567.89);
    expect(result).toBe('1 234 567,89 лв.');
  }
  );
});
