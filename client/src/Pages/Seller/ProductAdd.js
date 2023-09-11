import { Form as BsForm, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';

import { addProduct } from "../../APIs/productAPI";
import { getCategories } from '../../APIs/categoryAPI';

import '../../index.css';

export async function loadCategories() {
    const categories = await getCategories();
    return categories
  }

export async function createProduct({ request }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    await addProduct(newData)
    return redirect("/seller/products")
}

export default function ProductAdd() {
    const categories = useLoaderData()
    const navigate = useNavigate()

    const categoryList = categories.map((c, _id) =>
    <option key={c._id} value={c._id}>{c.name}</option>
  )

    return (
        <>
            <BsForm as={Form} method='post' className="login_container">
                <h2> Create new Product </h2>
                <BsForm.Group className="w-100 p-2" controlId='name'>
                    <BsForm.Label> Product Name </BsForm.Label>
                    <BsForm.Control
                        name='name'
                        as='input'
                        type='text'
                        autoFocus
                    />
                </BsForm.Group>

                <BsForm.Group className="w-100 p-2" controlId='category'>
                    <BsForm.Label> Category </BsForm.Label>
                    <BsForm.Select 
                    name='category'
                    >
                        <option> None </option>
                        {categoryList}
                    </BsForm.Select>
                </BsForm.Group>

                <BsForm.Group className="w-100 p-2" controlId='price'>
                    <BsForm.Label> Price </BsForm.Label>
                    <BsForm.Control 
                        as='input'
                        name='price'
                        type='text'
                    />
                </BsForm.Group>

                <br />

                <Stack gap={2}>
                    <Button variant="success" as="input" type="submit" value="Create Product" />
                    <Button variant="danger" as="input" type="button" value="Cancel" onClick={() => navigate(-1)} />
                </Stack>
            </BsForm>
        </>
    )
}