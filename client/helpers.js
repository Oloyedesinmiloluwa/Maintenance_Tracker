export const setStatus = (status) => {
  if (status === 'approved') return 'fa fa-thumbs-up';
  else if (status === 'disapproved') return 'fa fa-thumbs-down';
  else if (status === 'resolved') return 'fa fa-check';
  else if (status === 'pending') return 'fa fa-pause';
};

export default (page) => {
  switch (page) {
    case 'signin':
      return [
        { text: 'Sign in', path: '/signin' }];
    case 'signup':
      return [
        { text: 'Sign up', path: '/signup' }
      ];
    case 'home':
      return [
        { text: 'Home', path: '/' }
      ];
    case 'welcome':
      return [
        { path: '/requests' }
      ];
    case 'new':
      return [
        { text: 'Add New', path: '/new-request' }
      ];
    case 'signout':
      return [
        { text: 'Sign out', path: '/' }
      ];
    case 'list':
      return [
        { text: 'View', path: '/requests' }
      ];
    default:
      return [{ text: '', path: '#' }];
  }
};
