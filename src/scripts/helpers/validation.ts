import {
  EMAIL, PHONE, ADDRESS, NUMBER,
} from "../constants/regex";
import { TODAY, calculateDayNumber } from "./date";

// Check input cannot be empty
const isRequired = (value: string): Boolean => {
  if (value === "" || value === "0") {
    return false;
  }
  return true;
};

/**
 * The test() method is used to check
 * if a string contains a substring that matches the string pattern of the regular expression.

 * If yes, return true.
 * Otherwise, return false.
*/
const isFormatEmail = (value: string): Boolean => {
  if (!EMAIL.test(value)) {
    return false;
  }
  return true;
};

const isFormatPhone = (value: string): Boolean => {
  if (!PHONE.test(value)) {
    return false;
  }
  return true;
};

const isFormatAddress = (value: string): Boolean => {
  if (!ADDRESS.test(value)) {
    return false;
  }
  return true;
};

const isFormatNumber = (value: number): Boolean => {
  if (!NUMBER.test(value.toString())) {
    return false;
  }
  return true;
};

// Check if available is greater than total
const isCompareNumber = (value1: number, value2: number): Boolean => {
  if (value2 > value1) {
    return false;
  }
  return true;
};

// Check toDate not older than 10 days and before borrowing date
const isHireRequestUp10Date = (value1: string, value2: string): Boolean => {
  const days = calculateDayNumber(TODAY, value2);
  if (days > 10 || value2 < value1) {
    return false;
  }
  return true;
};

export {
  isRequired,
  isFormatEmail,
  isFormatPhone,
  isFormatAddress,
  isFormatNumber,
  isCompareNumber,
  isHireRequestUp10Date,
};
