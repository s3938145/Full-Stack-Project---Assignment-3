import { Form, Link, redirect, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom"
import { getCategory, updateCategory } from "../../../APIs/categoryAPI"
import { Form as BsForm, Button, ButtonGroup, InputGroup, Stack } from "react-bootstrap";
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

    const [attributes, setAttributes] = useState(category.additionalAttributes)
    const [attributeName, setAttributeName] = useState('')
    const [attributeValue, setAttributeValue] = useState('')
    const [required, setRequired] = useState(false)

    function handleAttributeName(e) {
        setAttributeName(e.target.value);
    }
    function handleAttributeValue(e) {
        setAttributeValue(e.target.value);
    }
    function handleNewAttributes() {
        setAttributes([
            ...attributes,
            { name: attributeName, value: attributeValue, required: required }
        ])
    }

    const attributeList = attributes.map((a, index) => 
            <li key={index}>
                {a.name}: {a.value} : {(a.required === true) ? " Required" : " Not Required"}
                <br />
            </li>
    )

    const categoryList = categories.map((c, _id) =>
        <option key={c._id} value={c._id}>{c.name}</option>
    )

    return (
        <div>
            <h3> {category.name} Category Details </h3>
            <BsForm as={Form} method="post">

                {/* Update Category Name */}
                <BsForm.Group className="mb-3" controlId="newName">
                    <BsForm.Label>Category Name</BsForm.Label>
                    <BsForm.Control 
                        as="input"
                        key="newName"
                        name="newName"
                        type="text"
                        placeholder={category.name}
                    />
                </BsForm.Group>

                {/* Update Parent Category */}
                <BsForm.Group className="mb-3" controlId="parent">
                    <BsForm.Label>Parent Category: {(category.parent === null) ? "None" : category.parent.name}</BsForm.Label>
                    <BsForm.Select
                        key="parent"
                        name="parent"
                    >
                        <option value={''}>None</option>
                        {categoryList}
                    </BsForm.Select>
                </BsForm.Group>

                {/* Update Attribute */}
                <BsForm.Group className="mb-3">
                    {/* Attribute Name and Value */}
                    <BsForm.Label> Attribute </BsForm.Label>
                    <InputGroup>
                        <InputGroup.Text>Name and Value of Attribute</InputGroup.Text>
                        <BsForm.Control 
                            value={attributeName}
                            onChange={handleAttributeName}
                        />
                        <BsForm.Control 
                            value={attributeValue}    
                            onChange={handleAttributeValue}
                        />
                    </InputGroup>
                    {/* Attribute is Required or Not */}
                    <BsForm.Select 
                    value={required}
                    onChange={e => setRequired(e.target.value)}
                    >
                        <option value={false}>Not Required</option>
                        <option value={true}>Required</option>
                    </BsForm.Select>
                </BsForm.Group>

                <BsForm.Group className="mb-3" controlId="additionalAttributes">
                    Adding the following attribute:
                    <p> {attributeName} : {attributeValue} </p>
                    <p> Required: {required}</p>

                    <p>
                        <ul>
                            {attributeList}
                        </ul>
                    </p>

                    <Button as="input" type="button" value="Add Attribute" onClick={handleNewAttributes}/>
                    <BsForm.Control 
                        as="input"
                        value={attributeList}
                    />
                </BsForm.Group>

                <hr />

                <Stack gap={2}>
                    <ButtonGroup className="mb-3">
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