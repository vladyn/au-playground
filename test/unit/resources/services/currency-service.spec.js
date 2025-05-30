import { CurrencyService } from "../../../../src/resources/services/currency-service";

describe('Currency Service', () => {
  let service;
  let storage;
  const store = {};
  beforeEach(() => {
    service = new CurrencyService(store);
  })
  
  it('creates a store', () => {
    const result = service.getDefaultCurrency();
    expect(result).toEqual('EUR');
  });
  it('creates a store', () => {
    const result = service.getCurrency();
    expect(result).toEqual('BGN');
  });
  it('creates a store', () => {
    const result = service.getConfig();
    expect(result).toEqual(-1);
  });
});
