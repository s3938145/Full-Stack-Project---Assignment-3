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

// Get A Product by ID
export async function getProduct(productId) {
    try {
        console.log(productId)
        var res = await axios.get(`/getProduct/${productId}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        alert(Object.values(error.response) + ".")  
        return null
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
export async function updateProduct(id, newData) {
    var res = await axios.put(`/products/${id}`, newData)
    console.log(res.data)
}

// Delete a Product by ID
export async function removeProduct(id) {
    var res = await axios.delete(`/products/${id}`)
    console.log(res.data)
}

// Search a product by name
// Search a product by name
export async function searchProduct(query) {
    try {
        const res = await axios.get('/searchProduct', { params: { query: query } });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching products:', error.response.data);
        alert('Error fetching products.');
    }
}
