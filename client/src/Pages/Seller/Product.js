import React from 'react'
import { Form, Link, redirect, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Form as BsForm, Button, ButtonGroup, Stack } from "react-bootstrap";
import { getProduct, updateProduct } from '../../APIs/productAPI';

import '../../index.css';

export async function loadProduct({ params }) {
    const product = await getProduct(params.productId)
    return product
}

export async function saveProduct({ request, params }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    await updateProduct(params.productId, newData);
    return redirect('/seller/products')
}

export default function Product() { 
    const product = useLoaderData();
    const categories = useRouteLoaderData("productCategories")
    const navigate = useNavigate()

    const categoryList = categories.map((cat, _id) => 
    <option value={(cat._id === product.category._id) ? '' : cat._id}>{(cat.name === product.category.name) ? 'None' : cat.name}</option>
    )
  return (
    <div>
        
        <BsForm as={Form} method='post' className="login_container">
        <h3>{product.name}'s Details</h3>
            {/* Update Product's Name */}
            <BsForm.Group className="w-100 p-2" controlId='name'>
                <BsForm.Label> Product Name </BsForm.Label>
                <BsForm.Control 
                    as='input'
                    name='name'
                    type='text'
                    placeholder={product.name}
                    required
                />
            </BsForm.Group>

            {/* Update Product's Category */}
            <BsForm.Group className="w-100 p-2" controlId='category'>
                <BsForm.Label> Category</BsForm.Label>
                <BsForm.Select name='category' required>
                    <option value={product.category}>{product.category.name}</option>
                    {categoryList}
                </BsForm.Select>
            </BsForm.Group>

            {/* Update Product's Price */}
            <BsForm.Group className="w-100 p-2" controlId='price'>
                <BsForm.Label> Price </BsForm.Label>
                <BsForm.Control 
                    as='input'
                    name='price'
                    type='text'
                    placeholder={product.price}
                    required
                />
            </BsForm.Group>

            <ButtonGroup className="w-100 p-2">
                <Button variant="success" as="input" type="submit" value="Save" />
                <Button variant="danger" as="input" type="button" value="Cancel" onClick={() => navigate(-1)} />
            </ButtonGroup>
            <Link
            to={"delete"}>
                <Button variant="warning" type="button">
                    Delete    
                </Button>        
            </Link>
        </BsForm>
    </div>
  )
}