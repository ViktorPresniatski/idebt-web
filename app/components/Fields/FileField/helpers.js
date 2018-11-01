import React from 'react';
import { List } from 'immutable';
import mime from 'mime-types';
import { FormattedMessage } from 'react-intl';

import { VALID_TYPES, LIMIT_SIZE_MB } from './constants';
import messages from './messages';

export const isTypeValid = file => !!VALID_TYPES.find(item => item.type === mime.lookup(file.name));
export const isFileSizeValid = file => file.size / 1024 / 1024 < LIMIT_SIZE_MB;

export const isFileLimitReached = (value, limit) => {
  if (Array.isArray(value)) {
    return value.length >= limit;
  }
  if (value instanceof List) {
    return value.size >= limit;
  }
  return value && limit <= 1;
};

export const validateFile = file => {
  const errors = [];

  if (!file) {
    return null;
  }

  if (!isTypeValid(file)) {
    errors.push({
      message: <FormattedMessage {...messages.contentTypeError} />,
    });
  }

  return errors;
};
