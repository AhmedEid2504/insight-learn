/* eslint-disable react/prop-types */

const ProtectedRoute = ({ element }) => {
    const isStaff = localStorage.getItem('is_staff') === 'true';

    if (isStaff) {
        return element;
    } else {
        return  window.location.href = '/login';
    }
};

export default ProtectedRoute;
