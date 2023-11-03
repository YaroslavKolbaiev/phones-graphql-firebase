import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';
import { ProductsProvider } from './context/ProductsContext';
import { Footer } from './components/Footer';
import { ProductPage } from './Pages/ProductPage';
import { MainNav } from './components/MainNav';
import { ProductDetails } from './components/ProductDetails';
import { CartPage } from './Pages/CartPage';
import { Favourites } from './Pages/Favourites';
import { AuthPage } from './Pages/Auth';
import { UserPage } from './Pages/UserPage';
import { NotAuth } from './middleware/notAuth';
import { IsAuth } from './middleware/isAuth';

export const App = () => {
  return (
    <ProductsProvider>
      <div className="App">
        <MainNav />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="phones">
            <Route index element={<ProductPage type="phone" />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="tablets">
            <Route index element={<ProductPage type="tablet" />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="accessories">
            <Route index element={<ProductPage type="accessories" />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route
            path="favourites"
            element={
              <NotAuth>
                <Favourites />
              </NotAuth>
            }
          />
          <Route
            path="cart"
            element={
              <NotAuth>
                <CartPage />
              </NotAuth>
            }
          />
          <Route
            path="auth"
            element={
              <IsAuth>
                <AuthPage />
              </IsAuth>
            }
          />
          <Route
            path="userPage"
            element={
              <NotAuth>
                <UserPage />
              </NotAuth>
            }
          />
        </Routes>
        <Footer />
      </div>
    </ProductsProvider>
  );
};
