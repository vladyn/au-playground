import { SumFormatValueConverter } from "./value-converters/sum-format-value-converter";

// example usage
 const output = new SumFormatValueConverter().toView(1234567.89);
console.log(output); // Output: "1,234,567.89"
// example usage
 const output2 = new SumFormatValueConverter().toView(1234567.5);
console.log(output2); // Output: "1,234,567.00"
