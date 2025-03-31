import { CurrencyService } from "../../../../src/resources/services/currency-service";

describe('Currency Service', () => {
  let service;
  const store = {};
  beforeEach(() => {
    service = new CurrencyService(store);
  })
  
  it('creates a store', () => {
    const result = service.getDefaultCurrency();
    expect(result).toEqual({});
  })

});
