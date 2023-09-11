import React from 'react'
import { getCategory, removeCategory } from '../../../APIs/categoryAPI'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Form as BsForm, Button, ButtonGroup, InputGroup, Table } from 'react-bootstrap';

export async function loadCategory({ params }) {
  const category = await getCategory(params.categoryName)
  return category
}

export async function deleteCategory({ request, params }) {
  await request.formData();
  await removeCategory(params.categoryName);
  return redirect("/admin/categories/")
}

export default function CategoryDelete() {
  const category = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <BsForm as={Form} method="post">

        <BsForm.Group className='mb-3' controlId='name'>
          <BsForm.Label>Deleting Category</BsForm.Label>
          <BsForm.Control 
            as='input'
            type='text'
            name='name'
            disabled={true}
            defaultValue={category.name}
            autoFocus
          />
          {/* <input key="name" type="text" name="name" disabled={true} defaultValue={category.name} /> */}
        </BsForm.Group>

        <ButtonGroup className='mb-3'>
          <Button variant="success" as="input" type="submit" value="Yes" disabled={category.products.length > 0}/>
          <Button variant="danger" as="input" type="button" value="No" onClick={() => navigate(-1)} />
        </ButtonGroup>
      </BsForm>
    </>
  )
}
