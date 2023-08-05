import { NumericFormat } from 'react-number-format';

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0"
      className="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
    />
  )
}
