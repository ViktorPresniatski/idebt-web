import { VALID_IMAGE_TYPES } from './constants';

export const isImageTypeValid = image => !!VALID_IMAGE_TYPES.find(item => item.type === image.type);
