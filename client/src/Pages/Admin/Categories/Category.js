import { Form, Link, redirect, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom"
import { getCategory, updateCategory } from "../../../APIs/categoryAPI"
import { Form as BsForm, Button, ButtonGroup, Stack } from "react-bootstrap";
import { useState } from "react";

export async function loadCategory({ params }) {
    const category = await getCategory(params.categoryName)
    return category
}

export async function saveCategory({ request, params }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    await updateCategory(params.categoryName, newData);
    return redirect('/admin/categories')
}

export default function Category() {
    const category = useLoaderData();
    const categories = useRouteLoaderData("categories")
    const navigate = useNavigate();

    const categoryList = categories.map((c, _id) =>
        <option key={c._id} value={c}>{c.name}</option>
    )
    const attributeList = category.additionalAttributes.map((attribute) => (
        <li key={attribute._id} >
            <p>Name: {attribute.name}</p>
            <p>Type: {attribute.type}</p>
            {(attribute.required === true) ? (
                 <p>Required</p> 
            ) : (
                <p> Not Required </p>
            )}
            <hr />
        </li>
    ))

    return (
        <div>
            <h3> {category.name} Category Details </h3>
            <BsForm as={Form} method="post">
                <BsForm.Group controlId="newName">
                    <BsForm.Label>Category Name</BsForm.Label>
                    <BsForm.Control 
                        as="input"
                        key="newName"
                        name="newName"
                        type="text"
                        placeholder={category.name}
                    />
                </BsForm.Group>

                <BsForm.Group controlId="parent">
                    <BsForm.Label>Parent Category</BsForm.Label>
                    <BsForm.Select>
                        <option value={null}>None</option>
                        {categoryList}
                    </BsForm.Select>
                </BsForm.Group>
                <ul>
                    {attributeList}
                </ul>
                <Stack gap={2}>
                    <ButtonGroup>
                        <Button variant="success" as="input" type="submit" value="Save" />
                        <Button variant="danger" as="input" type="button" value="Cancel" onClick={() => navigate(-1)} />
                    </ButtonGroup>
                    <Link
                    to={"delete"}>
                        <Button variant="warning" type="button">
                            Delete    
                        </Button>        
                    </Link>
                </Stack>
            </BsForm>
            <br />
            <div>
  
            </div>
        </div>
    );
}