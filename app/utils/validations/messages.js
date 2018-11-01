import { defineMessages } from 'react-intl';

export default defineMessages({
  requiredField: {
    id: 'form.validations.errors.requiredField',
    defaultMessage: 'This field is required',
  },
  requiredAtLeastOneFromFields: {
    id: 'form.validations.errors.requiredAtLeastOneFromFields',
    defaultMessage: 'Required one from {fieldNames} fields',
  },
  invalidEmailAddress: {
    id: 'form.validations.errors.invalidEmailAddress',
    defaultMessage: 'Please, enter a valid email.',
  },
  emailExists: {
    id: 'form.validations.errors.emailExists',
    defaultMessage: 'This email has already used by another user.',
  },
  usernameExists: {
    id: 'form.validations.errors.usernameExists',
    defaultMessage: 'The user with such username has already registered.',
  },
  passwordIsNotEqual: {
    id: 'form.validations.errors.passwordIsNotEqual',
    defaultMessage: 'Passwords should be equals.',
  },
  noUserWithEmail: {
    id: 'form.validations.errors.noUserWithEmail',
    defaultMessage: 'No user with such email.',
  },
  noUserWithUsernameEmail: {
    id: 'form.validations.errors.noUserWithUsernameEmail',
    defaultMessage: 'No user with such username/email.',
  },
  minLength8: {
    id: 'form.validations.errors.minLength8',
    defaultMessage: 'Must be at least 8 characters.',
  },
  coordinatesRequired: {
    id: 'form.validations.errors.coordinatesRequired',
    defaultMessage: 'The field bounds are required.',
  },
  onlyLatin: {
    id: 'form.validations.errors.onlyLatin',
    defaultMessage: 'Only Latin letters are allowed',
  },
  onlyLatinWithoutSpace: {
    id: 'form.validations.errors.onlyLatinWithoutSpace',
    defaultMessage: 'Only Latin letters and numbers without spaces',
  },
  onlyLatinWithSpaceInMidle: {
    id: 'form.validations.errors.onlyLatinWithSpaceInMidle',
    defaultMessage: 'One or more words with spaces',
  },
  onlyLatinForPassword: {
    id: 'form.validations.errors.onlyLatinForPassword',
    defaultMessage: 'Only Latin letters, numbers and special characters are avaliable without spaces',
  },
  onlyLatinAndNumber: {
    id: 'form.validations.errors.onlyLatinAndNumber',
    defaultMessage: 'Only Latin letters, numbers with  spaces',
  },
  mobilePhoneNumber: {
    id: 'form.validations.errors.mobilePhoneNumber',
    defaultMessage: 'Format: +1 NXX-NXX-XXXX, where N=digits 2–9, X=digits 0–9',
  },
  phoneNumber: {
    id: 'form.validations.errors.phoneNumber',
    defaultMessage: 'Format: NXX-NXX-XXXX, where N=digits 2–9, X=digits 0–9',
  },
  maxLength: {
    id: 'form.validations.errors.maxLength',
    defaultMessage: 'The maximum length is {maxLengthValue} characters.',
  },
  fieldNameExists: {
    id: 'form.validations.errors.fieldNameExists',
    defaultMessage: 'Field with such name already exists',
  },
  polygonIntersectionsNotAllowed: {
    id: 'form.validations.errors.polygonIntersectionsNotAllowed',
    defaultMessage: 'Field borders intersections are not allowed.',
  },
  minCoordinatesRequired: {
    id: 'form.validations.errors.minCoordinatesRequired',
    defaultMessage: 'Field should have at least 3 points.',
  },
  invalidDate: {
    id: 'form.validations.errors.invalidDate',
    defaultMessage: 'Invalid date.',
  },
  dateNotInFuture: {
    id: 'form.validations.errors.dateNotInFuture',
    defaultMessage: 'Date should not be in future.',
  },
  dateTooFarInPast: {
    id: 'form.validations.errors.dateTooFarInPast',
    defaultMessage: 'Date should not be farther than 6 months ago.',
  },
  dateNotInPast: {
    id: 'form.validations.errors.dateNotInPast',
    defaultMessage: 'Date should not be in past.',
  },
  dateInvalidRange: {
    id: 'form.validations.errors.dateInvalidRange',
    defaultMessage: 'Invalid date range.',
  },
  onlyNumber: {
    id: 'form.validations.errors.onlyNumber',
    defaultMessage: 'Only numeric letters are allowed',
  },
});
