import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
// Pages
import Home from './Pages/Home/Home';
import NotFound from './Pages/Not-Found/NotFound';
import Admin from './Pages/Admin/Admin';
import AdminIndex from './Pages/Admin/Index/AdminIndex';
import Categories, { loadCategories } from './Pages/Admin/Categories/Categories';
import Sellers from './Pages/Admin/Sellers/Sellers';
import Category, { loadCategory, saveCategory } from './Pages/Admin/Categories/Category';
import CategoryAdd, { createCategory } from './Pages/Admin/Categories/CategoryAdd';
import CategoryDelete, { deleteCategory } from './Pages/Admin/Categories/CategoryDelete';
import Login from './Pages/Login/Login';

const router = createBrowserRouter([
  { path: "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  { path: "/admin",
    element: <Admin />,
    children: [
      { index: true,
        element: <AdminIndex />
      },
      { path: "/admin/categories", 
        element: <Categories />, 
        id: "categories",
        loader: loadCategories,
        children: [
          { index: false },
          { path: ":categoryName", 
            element: <Category />,
            loader: loadCategory,
            action: saveCategory
          },
          {
            path:":categoryName/delete",
            element: <CategoryDelete />,
            loader: loadCategory,
            action: deleteCategory
          },
          { path: "/admin/categories/add", 
            element: <CategoryAdd />,
            action: createCategory
          }          
        ]
      },
      { path: "/admin/sellers",
        element: <Sellers /> 
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register"
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

