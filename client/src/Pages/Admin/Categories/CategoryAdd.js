
import { Form as BsForm, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { addCategory } from '../../../APIs/categoryAPI';
import { Form, redirect, useNavigate, useRouteLoaderData } from 'react-router-dom';

export async function createCategory({ request }) {
  const formData = await request.formData();
  const newData = Object.fromEntries(formData);
  await addCategory(newData);
  return redirect("/admin/categories/")
}

function CategoryAdd() {
  const categories = useRouteLoaderData("categories")

  const categoryList = categories.map((c, _id) =>
    <option key={c._id} value={c._id}>{c.name}</option>
  )

  const navigate = useNavigate();
  return (
    <>
    <h2> Create new Category </h2>
      <BsForm as={Form} method='post'>
        <BsForm.Group controlId='name'>
          <BsForm.Label>Category Name</BsForm.Label>
          <BsForm.Control 
            as="input"
            key="name"
            name="name"
            type="text"
          />
        </BsForm.Group>

        <BsForm.Group controlId="parent">
          <BsForm.Label>Parent Category</BsForm.Label>
           <BsForm.Select
            >
              <option value={null}>None</option>
              {categoryList}
          </BsForm.Select>
        </BsForm.Group>
        <br />
        <Stack gap={2}>
          <Button variant="success" as="input" type="submit" value="Create Category" />
          <Button variant="danger" as="input" type="button" value="Cancel" onClick={() => navigate(-1)} />
        </Stack>
      </BsForm>
    </>
  )
}

export default CategoryAdd