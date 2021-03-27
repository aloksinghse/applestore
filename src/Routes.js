import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import NotFound from "./core/NotFound";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashboard from "./user/AdminDashBoard";
import UserDashboard from "./user/UserDashBoard";
import Profile from "./user/Profile";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageOrders from "./admin/Orders";
import ManageProducts from "./admin/ManageProducts";
import ManageCategories from "./admin/ManageCategories";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import Songs from "./core/Songs";
import UpdateCategory from "./admin/UpdateCategory";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signout" exact component={Signup} />

        <Route path="/songs" exact component={Songs} />

        {/* Admin Routes */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />

        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />

        <AdminRoute path="/admin/orders" exact component={ManageOrders} />

        {/* Private / User Routes */}
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/cart" exact component={Cart} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
