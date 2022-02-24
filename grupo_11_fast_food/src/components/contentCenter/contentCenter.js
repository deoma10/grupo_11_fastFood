import ProductsList from '../productsList/productsList';
import UsersList from '../usersList/usersList';
import ProductDetail from '../productDetail/productDetail';
import UserDetail from '../userDetail/userDetail';
import Error404 from '../error404/Error404'
import MainIndex from '../mainIndex/mainIndex';
import { Route, Routes} from 'react-router-dom';


function ContentCenter() {
    return (
        <Routes>
            <Route path="/" exact="true" element={<MainIndex/>} />
            <Route path="products" element={<ProductsList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="*" element={<Error404/>} />
        </Routes>
    );
}

export default ContentCenter;