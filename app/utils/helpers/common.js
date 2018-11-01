export const replaceElementInArray = (array, newElement, identifier) => {
  const index = array.findIndex(item => item[identifier] === newElement[identifier]);

  if (index === -1) {
    return [...array, newElement];
  }

  return [...array.slice(0, index), newElement, ...array.slice(index + 1)];
};

export const isIE10 = () => navigator.appVersion.indexOf('MSIE 10') !== -1;

export const isIE = () => navigator.userAgent.indexOf('MSIE ') > -1 || navigator.userAgent.indexOf('Trident/') > -1;

export const processErrors = data => {
  data._error = data.non_field_errors;
  delete data.non_field_errors;
  return data;
};
