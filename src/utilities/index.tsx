export function areObjectsEqual<T extends {}>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export function formatCurrencyWithDots(number: number): string {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the string into parts based on the decimal point
  const parts = numberString.split(".");

  // Format the integer part with dots
  const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // If there is a decimal part, include it in the result
  const formattedNumber =
    parts.length > 1 ? `${formattedInteger}.${parts[1]}` : formattedInteger;

  return formattedNumber;
}
