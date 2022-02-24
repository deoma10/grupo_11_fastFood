import ProductsList from '../productsList/productsList';
import UsersList from '../usersList/usersList';
import ProductDetail from '../productDetail/productDetail';
import UserDetail from '../userDetail/userDetail';
import { Route, Routes } from 'react-router-dom';

function ContentCenter() {
    return (
        <Routes>
            <Route path="products" element={<ProductsList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="users/:id" element={<UserDetail />} />
        </Routes>
    );
}

export default ContentCenter;