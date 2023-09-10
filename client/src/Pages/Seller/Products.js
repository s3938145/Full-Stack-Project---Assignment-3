import React from 'react'
import { Button, Nav, NavItem, Table } from 'react-bootstrap'
import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { getProductsSeller } from '../../APIs/productAPI'
import SellerHeader from '../../Components/Header/SellerHeader';

export async function loadProductsBySeller() {
    const productsSeller = await getProductsSeller();
    return productsSeller;
}

export default function Products() {
    const productsSeller = useLoaderData()

    const productList = productsSeller.map((p, _id) =>
    <tr>
        <th>
            <NavItem key={p._id}>
                <NavLink
                    as={Link}
                    to={`${p._id}`}>
                    <div className='list-items'> {p.name} </div>
                </NavLink>
            </NavItem>
        </th>
        <th>{p.category}</th> 
        <th>{p.price}</th>
        <th>{p.dateAdded}</th>
    </tr>

    )

  return (
    <div>
        <SellerHeader />
        <div className='container-body'>
            <Link to="/seller/products/add">
                <Button>
                    New Product
                </Button>
            </Link>

            <Table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Category </th>
                        <th> Price </th>
                        <th> Date Added </th>
                    </tr>
                </thead>
                <tbody>
                    {productList}
                </tbody>
            </Table>
        </div>
        <Outlet />
    </div>
  )
}
