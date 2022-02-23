import ProductsList from '../productsList/productsList';
import UsersList from '../usersList/usersList';
import ProductDetail from '../productDetail/productDetail';
import UserDetail from '../userDetail/userDetail';
import { Route, Routes } from 'react-router-dom';

function ContentCenter() {
    const proddetail = <ProductDetail id="1" name="Crispy Onion" description="Pan artesanal, salsa de la casa y bbq, lechuga, tomate, 150gr. de carne de hambuguesa seleccionada, queso americano, tocineta y cebolla crispy" price="25900" imageName="burger-featured-1.png"/>
    const usrdetail = <UserDetail id="1" documentNumber="1020453678" Name="Seiumour" lastName="Skinner" email="admin@gmail.com" imageName="default-image.png"/>
    return (
        <Routes>
            <Route path="products" element={<ProductsList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="test" element={proddetail} />
            <Route path="usertest" element={usrdetail} />
        </Routes>
    );
}

export default ContentCenter;