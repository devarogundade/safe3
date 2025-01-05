import BigNumber from "bignumber.js";

BigNumber.config({ DECIMAL_PLACES: 18 });

const Units: any = {};

const rawUnits: any = {
  "0": "1",
  "1": "10",
  "2": "100",
  "3": "1000",
  "4": "10000",
  "5": "100000",
  "6": "1000000",
  "7": "10000000",
  "8": "100000000",
  "9": "1000000000",
  "10": "10000000000",
  "11": "100000000000",
  "12": "1000000000000",
  "13": "10000000000000",
  "14": "100000000000000",
  "15": "1000000000000000",
  "16": "10000000000000000",
  "17": "100000000000000000",
  "18": "1000000000000000000",
};

const units: any = {};

Object.keys(rawUnits).map(function (unit: any) {
  units[unit] = new BigNumber(rawUnits[unit], 10);
});

Units.units = rawUnits;

function convert(value: BigNumber, from: any, to: any): BigNumber {
  return value.div(units[to]).times(units[from]);
}

export default convert;
