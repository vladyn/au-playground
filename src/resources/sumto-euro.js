import { SumFormatValueConverter } from "./value-converters/sum-format-value-converter";

// example usage
 const output = new SumFormatValueConverter().toView(1234567.89);
console.log(output); // ?
// example usage
 const output2 = new SumFormatValueConverter().toView(1234567.511);
console.log(output2); // ?
