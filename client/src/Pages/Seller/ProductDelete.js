import React from 'react'
import { getProduct, removeProduct } from '../../APIs/productAPI'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Form as BsForm, Button, ButtonGroup, Stack } from "react-bootstrap";

export async function loadProduct({ params }) {
  const product = await getProduct(params.productId)
  return product
}

export async function deleteProduct({ request, params }) {
  await request.formData();
  await removeProduct(params.productId);
  return redirect("/seller/products")
}

export default function ProductDelete() {
  const product = useLoaderData()
  const navigate = useNavigate()
  return (
    <div>
      <BsForm as={Form} method='post' className="login_container">
        <BsForm.Group className="w-100 p-2" controlId='name'>
            <BsForm.Label> Deleting Product </BsForm.Label>
            <BsForm.Control 
                as='input'
                name='name'
                type='text'
                disabled={true}
                defaultValue={product.name}
            />
        </BsForm.Group>
        <ButtonGroup>
          <Button variant="success" as="input" type="submit" value="Yes" />
          <Button variant="danger" as="input" type="button" value="No" onClick={() => navigate(-1)} />
        </ButtonGroup>
      </BsForm>
    </div>
  )
}