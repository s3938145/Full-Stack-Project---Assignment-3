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

