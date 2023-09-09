import { Form as BsForm, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { Form, redirect, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';

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
    return redirect("/")
}

export default function ProductAdd() {
    const categories = useLoaderData()
    const navigate = useNavigate()

    const categoryList = categories.map((c, _id) =>
    <option key={c._id} value={c._id}>{c.name}</option>
  )

    return (
        <>
            <h2> Create new Product </h2>
            <BsForm as={Form} method='post' className="login_container">

                <BsForm.Group controlId='name'>
                    <BsForm.Label> Product Name </BsForm.Label>
                    <BsForm.Control
                        as='input'
                        name='name'
                        type='text'
                    />
                </BsForm.Group>

                <BsForm.Group controlId='category'>
                    <BsForm.Label> Category </BsForm.Label>
                    <BsForm.Select>
                        <option> None </option>
                        {categoryList}
                    </BsForm.Select>
                </BsForm.Group>

                <BsForm.Group controlId='sellerId'>
                    <BsForm.Label> Seller: </BsForm.Label>
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