import React, { useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom';
import { getCategory, updateAttributeAppend } from '../../../APIs/categoryAPI';
import { Form as BsForm, Button, InputGroup, Table } from 'react-bootstrap';

export async function loadCategory({ params }) {
    const category = await getCategory(params.categoryName)
    return category
}

export async function appendAttribute({ request, params }) {
  const formData = await request.formData();
  const newData = Object.fromEntries(formData);
  await updateAttributeAppend(params.categoryName, newData);
  return null
}

export default function CategoryUpdateAttribute() {
    const category = useLoaderData();
    const [operationType, setOperationType] = useState('append')

    function handleChange(event) {
      setOperationType(event.target.value);
    }

    const attributeList = category.additionalAttributes.map((attribute) => {
      return (
          <option value={attribute.id}> 
            {attribute.attributeName} : {attribute.attributeValue} : {attribute.required} 
          </option>
      )
    })

    const attributes = category.additionalAttributes.map((a, index) => {
      return (
        <tr key={index}>
          <th> {a.attributeName}</th>
          <td> {a.attributeValue} </td>
          <td> {(a.required) ? 'Required' : 'Optional'}</td>
          <td></td>
        </tr>
      )
    })

  return (
    <div>
      <br/>
      <h3> {category.name}'s current attributes</h3>
      <Table>
        <thead>
            {attributes}
        </thead>
      </Table>
      <h3> Updating {category.name}'s Attributes</h3>
      <BsForm as={Form} method='post'>

        {/* Select operation */}
        <BsForm.Group className='mb-3' controlId="operationType">
          <BsForm.Select
            key="operationType"
            name="operationType"
            onChange={handleChange}
          >
            <option value="append"> Add Attribute </option>
            <option value="delete"> Delete Attribute </option>
          </BsForm.Select>
        </BsForm.Group>

        {(operationType === "append") ? 

          <InputGroup className='mb-3'>
          <InputGroup.Text>ID, Name and Value of new Attribute</InputGroup.Text>
          <BsForm.Control name="id" value={category.additionalAttributes.length + 1}/>
          <BsForm.Control as='input' name="name"/>
          <BsForm.Control as='input' name="value"/>
          <BsForm.Select name="required" autoFocus>
            <option value="Required">Required</option>
            <option value="Optional">Optional</option>
          </BsForm.Select>
        </InputGroup>

        :

        <BsForm.Group className='mb-3'>
          <BsForm.Select name='id'>
            {attributeList}
          </BsForm.Select>
        </BsForm.Group>
        }

      {(operationType === "append") ? 
        <Button variant="success" as="input" type="submit" value="Add" disabled={category.products.length > 0}/>
      :
        <Button variant="danger" as="input" type="submit" value="Delete" disabled={category.products.length > 0}/>
      }
      </BsForm>
    </div>
  )
}
