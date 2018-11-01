import { VALID_IMAGE_TYPES, VALID_VIDEO_TYPES, VIDEO_LIMIT_SIZE_MB } from './constants';

export const isImageTypeValid = file => !!VALID_IMAGE_TYPES.find(item => item.type === file.type);

export const isVideoTypeValid = file => !!VALID_VIDEO_TYPES.find(item => item.type === file.type);

export const getMediaType = (media, initialType = null) => {
  if (!media) {
    return null;
  }

  if (typeof media === 'string') {
    return ['image', 'video'].includes(initialType) ? initialType : null;
  } else if (isImageTypeValid(media)) {
    return 'image';
  } else if (isVideoTypeValid(media)) {
    return 'video';
  }
  return null;
};

export const isVideoSizeValid = file => file.size / 1024 / 1024 < VIDEO_LIMIT_SIZE_MB;
