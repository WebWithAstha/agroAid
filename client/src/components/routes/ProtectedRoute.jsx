import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLoading from '../loading/DashboardLoading';
import { fetchCurrentUser } from '../../store/Actions/authAction';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.authReducer);

    useEffect(() => {
        if (!user) {
            dispatch(fetchCurrentUser());
        }
    }, [user, dispatch]);

    if (loading) {
        return <DashboardLoading />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user && user.isCompleted === false) {
        return <Navigate to="/register" replace />;
    }

    return children;
};

export default ProtectedRoute;
