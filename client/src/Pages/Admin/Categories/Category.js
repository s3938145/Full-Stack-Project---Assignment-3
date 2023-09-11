import { Form, Link, redirect, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom"
import { getCategory, updateCategory } from "../../../APIs/categoryAPI"
import { Form as BsForm, Button, ButtonGroup, Stack } from "react-bootstrap";

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
        <option key={c._id} value={(c._id === category._id) ? {} : c._id}>{(c.name === category.name) ? "None" : c.name}</option>
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
                        autoFocus
                    />
                </BsForm.Group>

                {/* Update Parent Category */}
                <BsForm.Group className="mb-3" controlId="parent">
                    <BsForm.Label>Parent Category: {(category.parent === null) ? "None" : category.parent.name}</BsForm.Label>
                    <BsForm.Select
                        key="parent"
                        name="parent"
                    >
                        <option value={(category.parent === null) ? '' : category.parent._id}>Select a parent Category</option>
                        {categoryList}
                    </BsForm.Select>
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
                    <Link
                    to={"update"}
                    >
                        <Button variant="secondary" type="button">
                            Add Attributes
                        </Button>
                    </Link>
                </Stack>
            </BsForm>
            <br />
        </div>
    );
}