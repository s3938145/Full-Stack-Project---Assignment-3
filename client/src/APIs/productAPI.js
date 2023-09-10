import axios from "axios"

// Get All Products from a specific Seller
export async function getProductsSeller() {
    try {
        var res = await axios.get('/products')
        console.log(res.data)
        return res.data
    } catch(error) {
        alert(Object.values(error.response.data) + ".")   
    }
}

// Add a new Product
export async function addProduct(newData) {
    try {
        var res = await axios.post('/products', newData)
        alert(Object.values(res.data) + ".")
        console.log(res.data)
    } catch(error) {
        alert(Object.values(error.response.data) + ".")    
    }
}

// Update a Product by ID
export async function updateProduct(id) {
    var res = await axios.put(`/products/${id}`)
    console.log(res.data)
}

// Delete a Product by ID
export async function deleteProduct(id) {
    var res = await axios.delete(`products/${id}`)
    console.log(res.data)
}
