import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLoading from '../components/loading/DashboardLoading';
import { fetchCurrentUser } from '../store/Actions/authAction';
import DiagnosisLoading from '../components/loading/diagnosis/DiagnosisLoading';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    let { user, loading } = useSelector((state) => state.authReducer);
    const { pathname } = useLocation();
    console.log(pathname)

    useEffect(() => {
        if (!user) {
            dispatch(fetchCurrentUser());
        }
    }, [user, dispatch]);

    if (loading) {
        if(pathname == '/diagnosis')
            return <DiagnosisLoading />;
        return <DashboardLoading />;
        
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user && user.isCompleted == false && pathname !== '/register') {
        return <Navigate to="/register" replace />;
    }

    return (<>
        <GoogleTranslate lang={user.language}/>
        {children}
    </>);
};

const GoogleTranslate = ({lang}) => {
    useEffect(() => {
        const addTranslateScript = () => {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi',
                autoDisplay: false,
            }, 'google_translate_element');

            // Translate to Hindi on first load
            setTimeout(() => handleTranslate(lang), 500);
        };

        addTranslateScript();
    }, []);

    const handleTranslate = (lang) => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
        }
    };

    return (
        <div>
            <div id="google_translate_element" style={{ display: 'none' }}></div>
        </div>
    );
};


export default ProtectedRoute;
