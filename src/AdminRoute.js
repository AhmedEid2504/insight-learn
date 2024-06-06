/* eslint-disable react/prop-types */

const ProtectedRoute = ({element}) => {
  const isSuperuser = localStorage.getItem('is_superuser') === 'true';

  if (isSuperuser) {
    return element;
  } else {
    return window.location.href = '/login';
  }
};

export default ProtectedRoute;
