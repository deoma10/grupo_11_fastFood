import ProductsList from '../productsList/productsList';
import UsersList from '../usersList/usersList';
import FindProduct from '../findProduct/findProduct';
import FindUser from '../findUser/findUser';
import Error404 from '../error404/Error404'
import MainIndex from '../mainIndex/mainIndex';
import { Route, Routes} from 'react-router-dom';


function ContentCenter() {
    return (
        <Routes>
            <Route path="/" exact="true" element={<MainIndex/>} />
            <Route path="products" element={<ProductsList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="products/:id" element={<FindProduct />} />
            <Route path="users/:id" element={<FindUser />} />
            <Route path="*" element={<Error404/>} />
        </Routes>
    );
}

export default ContentCenter;