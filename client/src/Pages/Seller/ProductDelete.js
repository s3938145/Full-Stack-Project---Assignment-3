import React from 'react'
import { getProduct, removeProduct } from '../../APIs/productAPI'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

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
      <Form method='post'>
        <div>
          <label>Deleting Product</label>
          <input type='text' name='name' disabled={true} defaultValue={product.name} />
        </div>
        <ButtonGroup>
          <Button variant="success" as="input" type="submit" value="Yes" />
          <Button variant="danger" as="input" type="button" value="No" onClick={() => navigate(-1)} />
        </ButtonGroup>
      </Form>
    </div>
  )
}