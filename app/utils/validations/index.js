/* eslint-disable arrow-body-style, no-shadow */

import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { List } from 'immutable';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const wrapMessage = (message, options) => <FormattedMessage {...message} values={options} />;

export const required = value => {
  if ((typeof value === 'string' && /^\s*$/.test(value)) || (Array.isArray(value) && value.length === 0)) {
    return wrapMessage(messages.requiredField);
  }

  if (value || value === 0) {
    return undefined;
  }

  return wrapMessage(messages.requiredField);
};

export const requiredIfCheckedField = checkedFieldName => (value, formValues) => {
  return formValues.get(checkedFieldName) ? required(value) : undefined;
};

export const requiredIfUncheckedField = checkedFieldName => (value, formValues) => {
  return formValues.get(checkedFieldName) ? undefined : required(value);
};

const isArrayEmpty = array => (array instanceof List ? array.size === 0 : _.isEmpty(array));

export const requiredAtLeastOneFromArrayFields = fieldNames => (value, formValues) => {
  return _.some(fieldNames, fieldName => !isArrayEmpty(formValues.get(fieldName)))
    ? undefined
    : wrapMessage(messages.requiredField);
};

export const requiredAtLeastOneFromFields = fieldNames => (value, formValues) => {
  return _.some(fieldNames, fieldName => formValues.get(fieldName)) ? undefined : required(value);
};

export const requiredByCallback = validationCallback => (value, formValues) => {
  return validationCallback(value, formValues) ? undefined : required(value);
};

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? wrapMessage(messages.invalidEmailAddress)
    : undefined;

export const onlyLatin = value => {
  if (value && !/^[a-zA-Z0-9 -]+$/.test(value)) {
    return wrapMessage(messages.onlyLatin);
  }
  return undefined;
};

export const onlyNumber = value => {
  if (value && !/^[0-9]+$/.test(value)) {
    return wrapMessage(messages.onlyNumber);
  }
  return undefined;
};

export const onlyNumberWithFloat = value => {
  if (value && !/^[0-9]+\.?[0-9]*$/.test(value)) {
    return wrapMessage(messages.onlyNumber);
  }
  return undefined;
};

export const onlyLatinWithoutDigits = value => {
  if (value && !/^[a-zA-Z- ]+$/.test(value)) {
    return wrapMessage(messages.onlyLatin);
  }

  return undefined;
};

export const onlyLatinWithoutSpace = value => {
  if (value && !/^([a-zA-Z0-9-])+$/.test(value)) {
    return wrapMessage(messages.onlyLatinWithoutSpace);
  }
  return undefined;
};

export const onlyLatinWithSpaceInMidle = value => {
  if (value && !/^([a-zA-Z-]+(([ ])[a-zA-Z-]+){0,4})$/.test(value)) {
    return wrapMessage(messages.onlyLatinWithSpaceInMidle);
  }
  return undefined;
};

export const onlyLatinForPassword = value => {
  if (value && !/^([^А-ЯЁа-яё\s])+$/.test(value)) {
    return wrapMessage(messages.onlyLatinForPassword);
  }
  return undefined;
};

export const onlyLatinAndNumber = value => {
  if (value && !/^([a-zA-Z0-9-]+(([ ])[a-zA-Z0-9-]+){0,4})$/.test(value)) {
    return wrapMessage(messages.onlyLatinAndNumber);
  }
  return undefined;
};

export const maxLength = maxLengthValue => value => {
  if (value && value.length > maxLengthValue) {
    return wrapMessage(messages.maxLength, { maxLengthValue });
  }

  return undefined;
};

export const minLength = (min, message) => value => (value && value.length < min ? wrapMessage(message) : undefined);

export const minLength8 = minLength(8, messages.minLength8);

const equalWithFields = (fields, value, formValues) => {
  for (let i = 0; i < fields.length; i += 1) {
    if (formValues.get(fields[i]) !== value) {
      return false;
    }
  }

  return true;
};

export const equalWithPassword = (value, formValues) => {
  return equalWithFields(['password'], value, formValues) ? undefined : wrapMessage(messages.passwordIsNotEqual);
};

export const mobilePhoneNumber = value => {
  if (value && !/^\+1 [2-9][0-9]{2}-[2-9][0-9]{2}-[0-9]{4}$/.test(value)) {
    return wrapMessage(messages.mobilePhoneNumber);
  }
  return undefined;
};

export const phoneNumber = value => {
  if (value && !/^[2-9][0-9]{2}-[2-9][0-9]{2}-[0-9]{4}$/.test(value)) {
    return wrapMessage(messages.phoneNumber);
  }
  return undefined;
};

const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

const getDateFromValue = value => {
  return moment(value, DATE_FORMAT).startOf('day');
};

export const dateIsValid = value => {
  if (!value || moment(value).isValid()) {
    return undefined;
  }
  return wrapMessage(messages.invalidDate);
};

export const dateNotInFuture = value => {
  if (!value) {
    return undefined;
  }

  const newDate = getDateFromValue(value);
  const currentDate = moment().startOf('day');

  if (newDate > currentDate) {
    return wrapMessage(messages.dateNotInFuture);
  }
  return undefined;
};

export const dateTooFarInPast = maxMonthAgo => value => {
  if (!value) {
    return undefined;
  }

  const newDate = getDateFromValue(value);
  const currentDate = moment().startOf('day');

  if (currentDate.diff(newDate, 'month', true) > maxMonthAgo) {
    return wrapMessage(messages.dateTooFarInPast);
  }
  return undefined;
};

export const dateNotInPast = value => {
  if (!value) {
    return undefined;
  }

  const newDate = getDateFromValue(value);
  const currentDate = moment().startOf('day');

  if (currentDate.diff(newDate, 'day', true) > 0) {
    return wrapMessage(messages.dateNotInPast);
  }
  return undefined;
};

const getFieldValue = (formValues, fieldName) => {
  if (!formValues) {
    return undefined;
  }

  let value = formValues;
  fieldName.split('.').forEach(name => {
    value = value && value.get(name);
  });
  return value;
};

export const dateNotMoreThenDateField = fieldName => (value, formValues) => {
  const limitValue = getFieldValue(formValues, fieldName);
  if (!value || !limitValue) {
    return undefined;
  }

  const limitDate = getDateFromValue(limitValue);
  const newDate = getDateFromValue(value);

  if (limitDate < newDate) {
    return wrapMessage(messages.dateInvalidRange);
  }
  return undefined;
};

export const dateNotLessThenDateField = fieldName => (value, formValues) => {
  const limitValue = getFieldValue(formValues, fieldName);
  if (!value || !limitValue) {
    return undefined;
  }

  const limitDate = getDateFromValue(limitValue);
  const newDate = getDateFromValue(value);

  if (limitDate > newDate) {
    return wrapMessage(messages.dateInvalidRange);
  }
  return undefined;
};
