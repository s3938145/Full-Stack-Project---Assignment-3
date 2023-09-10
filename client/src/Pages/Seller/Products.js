import React from 'react'
import { Button, Nav, NavItem } from 'react-bootstrap'
import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { getProductsSeller } from '../../APIs/productAPI'

export async function loadProductsBySeller() {
    const productsSeller = await getProductsSeller();
    return productsSeller;
}

export default function Products() {
    const productsSeller = useLoaderData()

    const productList = productsSeller.map((p, _id) => 
    <NavItem key={p._id}>
        <NavLink
            as={Link}
            to={`${p._id}`}>
            <div className='list-items'> {p.name} </div>
        </NavLink>
    </NavItem>
    )

  return (
    <div>
        <div>
            <Link to="/">
                <Button>
                    New Product
                </Button>
            </Link>
        </div>
        <Nav variant='tabs' className='flex-column'>
            {productList}
        </Nav>
        <Outlet />
    </div>
  )
}
