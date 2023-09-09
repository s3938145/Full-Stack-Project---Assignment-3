import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/Not-Found/NotFound";
import Admin from "../Pages/Admin/Admin";
import AdminIndex from "../Pages/Admin/Index/AdminIndex";
import Categories, {
  loadCategories,
} from "../Pages/Admin/Categories/Categories";
import Category, {
  loadCategory,
  saveCategory,
} from "../Pages/Admin/Categories/Category";
import CategoryDelete, {
  deleteCategory,
} from "../Pages/Admin/Categories/CategoryDelete";
import CategoryUpdateAttribute, {
  appendAttribute,
} from "../Pages/Admin/Categories/CategoryUpdateAttribute";
import CategoryAdd, {
  createCategory,
} from "../Pages/Admin/Categories/CategoryAdd";
import Login, { logInUser } from "../Pages/Login/Login";
import Register, { registerUser } from "../Pages/Register/Register";
import Sellers from "../Pages/Admin/Sellers/Sellers";
import ProductAdd, { createProduct } from "../Pages/Seller/ProductAdd";
import ProtectedRoutes from "./ProtectedRoutes";
import CartPage from "../Pages/Customer/Cart/CartPage";
import ShoppingCart from "../Pages/Customer/Cart/CartPage";
import ProductList from "../Pages/Customer/Customer dashboard/customerProduct";

import { updateSeller } from '../APIs/sellerAPI';
import SellerApproval from '../Pages/Admin/SellerApproval';

import { Logout } from '../Pages/Login/Logout';
// Pages

function Routes() {
  const publicRoutes = [
    { path: "/", element: <Home />, errorElement: <NotFound /> },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        { index: true, element: <AdminIndex /> },
        {
          path: "/admin/categories",
          element: <Categories />,
          id: "categories",
          loader: loadCategories,
          children: [
            { index: false },
            {
              path: ":categoryName",
              element: <Category />,
              loader: loadCategory,
              action: saveCategory,
            },
            {
              path: ":categoryName/delete",
              element: <CategoryDelete />,
              loader: loadCategory,
              action: deleteCategory,
            },
            {
              path: ":categoryName/update",
              element: <CategoryUpdateAttribute />,
              loader: loadCategory,
              action: appendAttribute,
            },
            {
              path: "/admin/categories/add",
              element: <CategoryAdd />,
              action: createCategory,
            },
          ],
        },
        { path: "/admin/sellers", element: <Sellers /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      action: logInUser,
    },
        {
          path: "/logout",
          element: <Logout />
        },
    {
      path: "/register",
      element: <Register />,
      action: registerUser,
    },
    {
      path: "/product/add",
      element: <ProductAdd />,
      loader: loadCategories,
    },
    {
      path: "/cart",
      element: <ShoppingCart/>
    },
    {
      path: "/customer",
      element: <ProductList/>
    },
    {
      path: "/cartpage",
      element: <CartPage/>
        },
        {
          path: "/sellerUpdate",
          element: <SellerApproval />,
          action: updateSeller
    }
  ];

  const authenticatedOnlyRoute = [
    {
      path: "/seller",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/seller",
          element: <div>Seller's Dashboard</div>,
        },
        {
          path: "/seller/productAdd",
          element: <ProductAdd />,
              loader: loadCategories,
              action: createProduct,
        },
        {
          path: "/seller/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...authenticatedOnlyRoute,
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
