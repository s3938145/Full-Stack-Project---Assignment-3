import React from 'react'
import { getCategory, removeCategory } from '../../../APIs/categoryAPI'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

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
      <Form method="post">
        <div>
          <label>Deleting Category</label>
          <input key="name" type="text" name="name" disabled={true} defaultValue={category.name} />
        </div>
        <ButtonGroup>
          <Button variant="success" as="input" type="submit" value="Yes" disabled={category.products.length > 0}/>
          <Button variant="danger" as="input" type="button" value="No" onClick={() => navigate(-1)} />
        </ButtonGroup>
      </Form>
    </>

  )
}
