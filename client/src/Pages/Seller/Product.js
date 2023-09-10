import React from 'react'
import { Form, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Form as BsForm, Button, ButtonGroup, Stack } from "react-bootstrap";

export async function loadProduct({ params }) {
    const product = await getProduc
}

export default function Product() { 
    const product = useLoaderData();
    const categories = useRouteLoaderData();
    const navigate = useNavigate();
 
  return (
    <div>
        <h3>{product.name}'s Details</h3>
        <BsForm as={Form} method='post'>

            {/* Update Product's Name */}
            <BsForm.Group className='mb-3' controlId='name'>
                <BsForm.Label> Product Name </BsForm.Label>
                <BsForm.Control 
                    as='input'
                    type='text'
                    placeholder={product.name}
                />
            </BsForm.Group>

            {/* Update Product's Category */}
            <BsForm.Group className='mb-3' controlId='category'>
                <BsForm.Label> Category </BsForm.Label>
                <BsForm.Select>
                
                </BsForm.Select>
            </BsForm.Group>

            {/* Update Product's Price */}
            <BsForm.Group className='mb-3' controlId='price'></BsForm.Group>


        </BsForm>
    </div>
  )
}
