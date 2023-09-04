import axios from "axios";

// Get All Categories
export async function getCategories() {
    var res = await axios.get('/getCategories')
    console.log(res.data)
    return res.data
}

// Get A Category by Name
export async function getCategory(name) {
    var res = await axios.get(`/getCategoryByName/${name}`)
    console.log(res.data)
    return res.data
}

export async function addCategory(newData) {
    var res = await axios.post('/addCategory', newData)
    console.log(res.data)
}

export async function updateCategory(name, newData) {
    var res = await axios.put(`/updateCategoryByName/${name}`, newData)
    console.log(res.data)
}

export async function removeCategory(name) {
    var res = await axios.delete(`/deleteCategoryByName/${name}`)
    console.log(res.data)
}

// export async function updateAttributeAppend(name, newData) {
//     var res = await axios.put(`/updateCategoryAttribute/${name}`, newData)
//     console.log(res.data)
// }

export async function updateAttributeAppend(name, newData) {
    var res = await axios({
        method: 'put',
        url: `/updateCategoryAttribute/${name}`,
        data: {
            operationType: newData.operationType,
            fieldName: 'additionalAttributes',
            id: newData.id,
            value: 
            {
                id: newData.id,
                attributeName: newData.name,
                attributeValue: newData.value,
                required: newData.required
            }
        }
    })
    console.log(res.data)
}