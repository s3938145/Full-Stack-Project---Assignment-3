import axios from "axios"

// Get All Products
export async function getProducts() {
    var res = await axios.get('/products')
    console.log(res.data)
    return res.data
}

// Create new Product
export async function addProduct() {
    var res = await axios.post('/products')
    console.log(res.data)
}