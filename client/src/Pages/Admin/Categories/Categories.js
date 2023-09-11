import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { Button, Nav, NavItem, Table } from 'react-bootstrap';
import { getCategories } from '../../../APIs/categoryAPI';

export async function loadCategories() {
  const categories = await getCategories();
  return categories;
}

export default function Categories() {
  const categories = useLoaderData();

  const categoryList = categories.map((c, _id) => 
  <tr>
    <th>
      <NavItem key={c._id}>
        <NavLink
          as={Link}
          to={`${c.name}`}>
            <div className='list-items'>{ c.name } </div>
        </NavLink>
      </NavItem>
    </th>
    <th> {(c.parent === null) ? 'None' : c.parent.name} </th>
  </tr>

  )

  return (
    <div>
      <div>
        <Link to="/admin/categories/add">
          <Button>
            New Category
          </Button>
        </Link>

        <Table>
          <thead>
            <tr>
              <th> Category Name </th>
              <th> Parent Category </th>
            </tr>
          </thead>
          <tbody>
            {categoryList}
          </tbody>
        </Table>
      </div>
      <Outlet />
    </div>
  )
}
