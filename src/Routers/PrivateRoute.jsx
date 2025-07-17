
import { Navigate, useLocation } from 'react-router';

import { useContext } from 'react';
import { AuthContext } from '../Contex/AuthProvider';
import Loader from '../Components/Loader';



const PrivateRoute = ({ children }) => {
    
    const { user , loading   } = useContext(AuthContext);

    const location = useLocation();
    if(loading){
        return <Loader></Loader>
   }
    if(user){
        return children ;
    }
     return <Navigate state={location.pathname} to="/signin"></Navigate>

};

export default PrivateRoute;