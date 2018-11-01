import { ROLES } from 'globalConstants';

export const isAdmin = user => user && [ROLES.companyAdmin, ROLES.segmentAdmin].includes(user.role);
export const isSparkxAdmin = user => user && user.role === ROLES.sparkxAdmin;
export const isCompanyAdmin = user => user && user.role === ROLES.companyAdmin;
export const isSegmentAdmin = user => user && user.role === ROLES.segmentAdmin;
export const isIndividualUser = user => user && user.role === ROLES.individualUser;
export const isEmployee = user => user && user.role === ROLES.employee;

export const isCompanyOrSegmentAdmin = user => isCompanyAdmin(user) || isSegmentAdmin(user);

export const getOrganizationByRole = user => user && user.role.replace('_admin', '');

export const isActive = user => user && user.status === 'active';

export const getAvaluableLanguages = user =>
  (user.segment && user.segment.avaliable_languages) || (user.company && user.company.available_languages);

export const getUserGroup = user => user.segment || user.company || null;

export const getUserInitials = fullName => {
  if (!fullName) {
    return '';
  }

  let initials = fullName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

export const getUserIdentity = currentUser => {
  if (!currentUser) {
    return '';
  }

  return currentUser.full_name || currentUser.email || currentUser.username || '';
};
