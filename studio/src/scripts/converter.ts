import convert from "./baseconverter";
import { BigNumber } from "bignumber.js";

const Converter = {
  toChecksumAddress: function (address: string, space: number = 4) {
    return (
      address.substring(0, space) +
      "..." +
      address.substring(address.length - space, address.length)
    );
  },

  formatNumber: function (value: number) {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + "b";
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "m";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "k";
    } else {
      return value.toString();
    }
  },

  /**
   * Converts a value down to a smaller unit scale.
   * This is used to convert values into a more human-readable format (e.g., from smallest unit to a larger one).
   *
   * @param {bigint} value - The value to convert.
   * @param {number} decimals - The number of decimal places to round the result to.
   * @returns {string} - The converted value as a string.
   */
  down: function (value: BigNumber, decimals: number): BigNumber {
    try {
      // Return '0' if the value is 0, as there's nothing to convert
      if (value.eq(0)) return value;

      // Convert value down to the desired decimal scale using the 'convert' function
      return convert(value, "0", decimals);
    } catch (error) {
      // Log any error that occurs during the conversion process
      console.error("convert", error);

      // Return '0' if there's an error during conversion
      return new BigNumber(0);
    }
  },

  /**
   * Converts a value up to a larger unit scale.
   * This is used to convert smaller units into a larger unit scale (e.g., from smallest unit to a larger one).
   *
   * @param {bigint} value - The value to convert.
   * @param {number} decimals - The number of decimal places to round the result to.
   * @returns {string} - The converted value as a string.
   */
  up: function (value: BigNumber, decimals: number): BigNumber {
    try {
      // Return '0' if the value is 0, as there's nothing to convert
      if (value.eq(0)) return value;

      // Convert value up to the desired decimal scale using the 'convert' function
      return convert(value, decimals, "0");
    } catch (error) {
      // Log any error that occurs during the conversion process
      console.error("convert", error);

      // Return '0' if there's an error during conversion
      return new BigNumber(0);
    }
  },

  convert: function (
    value: BigNumber,
    decimals0: BigNumber,
    decimals1: number
  ): BigNumber {
    try {
      // Return '0' if the value is 0, as there's nothing to convert
      if (value.eq(0)) return value;

      // Convert value up to the desired decimal scale using the 'convert' function
      return convert(value, decimals0, decimals1);
    } catch (error) {
      // Log any error that occurs during the conversion process
      console.error("convert", error);

      // Return '0' if there's an error during conversion
      return new BigNumber(0);
    }
  },

  toMoney: function (amount: any, max = null) {
    let maxF = max ? max : 6;
    if (amount > 1) {
      maxF = 10;
    }
    if (amount > 10) {
      maxF = 8;
    }
    if (amount > 200) {
      maxF = 5;
    }
    if (amount > 1000) {
      maxF = 3;
    }

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: maxF,
    });
    return formatter.format(amount).replace("$", "");
  },
};

export default Converter;
