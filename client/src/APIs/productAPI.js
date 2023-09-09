import axios from "axios"

// Get All Products from a specific Seller
export async function getProductsSeller() {
    var res = await axios.get('/products')
    console.log(res.data)
    return res.data
}

// Add a new Product
export async function addProduct() {
    var res = await axios.post('/products')
    console.log(res.data)
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
