import axios from "axios"

// Get All Sellers
export async function getSellers() {
    var res = await axios.get('/sellers')
    console.log(res.data)
    return res.data
}

// Update the status of 1 seller
export async function updateSeller(newData, email) {
    var res = await axios.patch(`/sellers/${email}`, newData)
    console.log(res.data)
}

// Get Sales Statistics by Seller ID
export async function getSaleStatistics(){
    var res = await axios.get('/sales-statistics/')
    console.log(res.data)
    return res.data
}