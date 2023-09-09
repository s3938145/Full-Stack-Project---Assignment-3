import ListGroup from 'react-bootstrap/ListGroup';
import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { Button, Nav, NavItem } from 'react-bootstrap';
import { getCategories } from '../../../APIs/categoryAPI';

export async function loadCategories() {
  const categories = await getCategories();
  return categories;
}

export default function Categories() {
  const categories = useLoaderData();

  const categoryList = categories.map((c, _id) => 
  <NavItem key={c._id}>
    <NavLink
      as={Link}
      to={`${c.name}`}>
        <div className='list-items'>{ c.name } </div>
    </NavLink>
  </NavItem>
  )

  return (
    <div>
      <div>
        <Link to="/admin/categories/add">
          <Button>
            New Category
          </Button>
        </Link>
      </div>
      <Nav variant="tabs" className='flex-column'>
        {categoryList}
      </Nav>
      <Outlet />
    </div>
  )
}
