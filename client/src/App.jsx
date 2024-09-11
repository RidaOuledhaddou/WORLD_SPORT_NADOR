import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import ProductDetails from "./Pages/productDetails/ProductPage";
import ProductsPage from "./Pages/products/ProductsPage";

import Add_product from "./Components/Dashboard_admin/components_admin/Admin/Add_Things/Add_product";
import Add_flavors from "./Components/Dashboard_admin/components_admin/Admin/Add_Things/Add_flavors";
import Add_categories from "./Components/Dashboard_admin/components_admin/Admin/Add_Things/Add_categories";
import Update_product from "./Components/Dashboard_admin/components_admin/Admin/Update_Things/Update_product";
import Delete_product from "./Components/Dashboard_admin/components_admin/Admin/Delete_Things/Delete_product";
import Login_Admin from "./Components/Dashboard_admin/components_admin/Admin/Login_Admin";
import Update from "./Components/Dashboard_admin/components_admin/Admin/Update_Things/Update";
import Login from "./Components/client/Login";
import Signin from "./Components/client/Signin";
import CartPage from "./Pages/CartPage";
import { CartProvider } from "./context/CartContext";
import OrdersPage from './Pages/orders/OrdersPage';
import CheckoutForm from "./Pages/CheckoutForm";
import OrderConfirmation from "./Pages/OrderConfirmation";
import NotFound from "./Pages/NotFound";
import Show_orders from "./Components/Dashboard_admin/components_admin/Admin/ShowOrder/Show_orders";
import Dashboard from "./Components/Dashboard_admin/Dashboard";
import Customer from "./Components/Dashboard_admin/components_admin/Customer/Customer";
import ProductsCustomer from "./Components/Dashboard_admin/components_admin/Admin/Products/ProductsCustomer";
import Detai_order from "./Components/Dashboard_admin/components_admin/Admin/ShowOrder/Detai_order";
import DealsAdmin from "./Components/Dashboard_admin/components_admin/Deals/DealsAdmin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  return (
    <BrowserRouter>
    <CartProvider>
      <QueryClientProvider client={queryClient}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product-brand/:brand" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/Not" element={<NotFound />} />

        </Routes>
      </QueryClientProvider>
        <Routes>         
          <Route path="/login_admin" element={<Login_Admin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard/Customers" element={<Customer />} />
          <Route path="/Dashboard/ProductsCustomer" element={<ProductsCustomer />} />
          <Route path="/Dashboard/add-product" element={<Add_product />} />
          <Route path="/update_product" element={<Update_product />} />
          <Route path="/delete_product" element={<Delete_product />} />
          <Route path="/update-product/:id" element={<Update />} />
          <Route path="/Dashboard/add_categories" element={<Add_categories />} />
          <Route path="/Dashboard/add_flavors" element={<Add_flavors />} />
          <Route path="/Dashboard/Show_orders" element={<Show_orders />} />
          <Route path="/Dashboard/DealsAdmin" element={<DealsAdmin />} />
          <Route path="/details/:id" element={<Detai_order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signin" element={<Signin />} />
        </Routes>
        </CartProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);