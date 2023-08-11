/**
 * @description Formatting currency country wise
 * @param currency
 * @param amount
 * @returns
 */
export const getCurrency = (currency: string, amount: number) => {
  switch (currency) {
    case "AED":
      return amount.toLocaleString("en-SA", {
        style: "currency",
        currency: "AED",
      });

    case "USD":
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

    case "INR":
      return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });

    case "EUR":
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "EUR",
      });

    default:
      return currency + amount;
  }
};
