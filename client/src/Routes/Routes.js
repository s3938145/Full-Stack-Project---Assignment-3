import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Home 
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/Not-Found/NotFound";

// Admin
import Admin from "../Pages/Admin/Admin";
import AdminIndex from "../Pages/Admin/Index/AdminIndex";

// Authentication
import { updateSeller } from '../APIs/sellerAPI';
import SellerApproval from '../Pages/Admin/SellerApproval';

// Category 
import Categories, {loadCategories,} from "../Pages/Admin/Categories/Categories";
import Category, {loadCategory,saveCategory,} from "../Pages/Admin/Categories/Category";
import CategoryDelete, {deleteCategory,} from "../Pages/Admin/Categories/CategoryDelete";
import CategoryUpdateAttribute, {appendAttribute,} from "../Pages/Admin/Categories/CategoryUpdateAttribute";
import CategoryAdd, {createCategory,} from "../Pages/Admin/Categories/CategoryAdd";


// Authentication
import Login, { logInUser } from "../Pages/Login/Login";
import Register, { registerUser } from "../Pages/Register/Register";
import { Logout } from '../Pages/Login/Logout';

// Seller
import Sellers from "../Pages/Admin/Sellers/Sellers";
import ProductAdd, { createProduct } from "../Pages/Seller/ProductAdd";
import ProtectedRoutes from "./ProtectedRoutes";

// Customer
import CartPage from "../Pages/Customer/Cart/CartPage";
import ShoppingCart from "../Pages/Customer/Cart/CartPage";
import ProductList from "../Pages/Customer/Customer dashboard/customerProduct";
import Products, { loadProductsBySeller } from "../Pages/Seller/Products";
import ProductDelete, { deleteProduct } from "../Pages/Seller/ProductDelete";
import axios from "axios";
import { useAuth } from "../Components/Authentication/authProvider";
import Product, { loadProduct, saveProduct } from "../Pages/Seller/Product";
import SellerDashboard, { loadStatistics } from "../Pages/Admin/Sellers/SellerDashboard";
import UserProfile from "../Pages/Customer/UserProfile";
import Loginv2, { logInUserV2 } from "../Pages/Login/Loginv2";

// Pages

function Routes() {
  const { token } = useAuth();

  if(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }

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
      path: "/sellerUpdate",
      element: <SellerApproval />,
      action: updateSeller
    },
    {
      path: "/sellerUpdate",
      element: <SellerApproval />,
      action: updateSeller
    },
    {
      path: "/login",
      element: <Loginv2 />,
      action: logInUserV2,
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
  ];

  const authenticatedOnlyRoute = [
    {
      path: "/seller",
      element: <ProtectedRoutes />,
      loader: loadCategories,
      id: "productCategories",
      children: [
        { path:"/seller/dashboard", 
        element: <SellerDashboard /> , 
        loader: loadStatistics
      },
        {
          path: "/seller/products",
          element: <Products />,
          loader: loadProductsBySeller,
          children: [
            {
              path: "/seller/products/add",
              element: <ProductAdd />,
              loader: loadCategories,
              action: createProduct,
            },
            {
              path: ":productId",
              element: <Product />,
              loader: loadProduct,
              action: saveProduct,
            },
            {
              path: ":productId/delete",
              element: <ProductDelete />,
              loader: loadProduct,
              action: deleteProduct
            }
          ]
        },
        {
          path: "/seller/products/delete",
          element: <ProductDelete />
        },
        {
          path: "/seller/logout",
          element: <div>Logout</div>,
        },
      ],
    },
        {
          path: "/customer",
          element: <ProtectedRoutes />,
          children: [
            {
              path: "dashboard",
              element: <UserProfile />,
            },
            {
              path: "logout",
              element: <Logout />  // Handle logout properly
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
