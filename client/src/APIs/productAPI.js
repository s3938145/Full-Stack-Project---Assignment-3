// Get All Products
export async function getProducts() {
    var res = await axios.get('/products')
    console.log(res.data)
    return res.data
}