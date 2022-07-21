import Home from '../pages/Home';
import Login from '../pages/Login';
import Manage from '../pages/Manage';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/manage', component: Manage },
    { path: '/login', component: Login }
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}