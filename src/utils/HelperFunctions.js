import { isNullOrUndefined, isString } from "util";
import Moment from "moment/min/moment-with-locales";

export const parseDate = (date) => {
  let moment = Moment(date);
  moment.locale("es");
  return (
    moment.format("dddd, DD") +
    " de " +
    moment.format("MMMM") +
    " de " +
    moment.format("YYYY")
  );
};

export const parseDate2 = (date) => {
  let moment = Moment(date);
  moment.locale("es");
  return moment.format("LT") + " " + moment.format("L");
};

export const parseDate3 = (date) => {
  let moment = Moment(date);
  moment.locale("es");
  return moment.format("LT") + " " + moment.format("l");
};

export const justNumbers = (e) => {
  let keynum = window.event ? window.event.keyCode : e.which;
  if (keynum === 8 || keynum === 46) return true;
  return /\d/.test(String.fromCharCode(keynum));
};

export const isValueEmptyOrNull = (value) => {
  return isNullOrUndefined(value) || (isString(value) && value.trim() === "");
};

export const isEmailValid = (email) => {
  let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
  return !isValueEmptyOrNull(email) && re.test(email);
};

export const isEmailValid2 = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !isValueEmptyOrNull(email) && re.test(email);
};

export const isArrayEmptyOrNull = (array) => {
  return isNullOrUndefined(array) || array.length === 0;
};

export const camelize = (str) => {
  const string = str.charAt(0).toUpperCase() + str.slice(1);
  return string.replace(/\W+(.)/g, function (match, chr) {
    if (match !== "'s") return chr ? " " + chr.toUpperCase() : "";
    else return chr;
  });
};

export const camelize2 = (str) => {
  const string = str.charAt(0).toUpperCase() + str.slice(1);
  return string.replace(/\W+|_(.)/g, function (match, chr) {
    if (match !== "'s") return chr ? chr.toUpperCase() : "";
    else return chr;
  });
};

const HelperFunctions = {
  isValueEmptyOrNull,
  isEmailValid,
  parseDate,
  isArrayEmptyOrNull,
  camelize,
  camelize2,
  parseDate2,
  parseDate3,
  justNumbers,
};

export default HelperFunctions;
