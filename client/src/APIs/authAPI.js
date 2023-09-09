import axios from "axios"

// Register user
// export async function register(newData) {
//     try {
//         var res = await axios.post('/register', newData)
//         console.log(res.data)
//     } catch (error) {
//         alert(Object.values(error.response.data) + ".")
//     }
// }

export async function registerNewUser(newData) {
    var res = await axios.post('/register', newData)
    console.log(res.data)
}

// Log in user
export async function signIn(newData) {
    try {
        var res = await axios.post('/login', newData)
        console.log(res.data.token)
        return res.data.token
    } catch (error) {
        alert(Object.values(error.response.data) + ".")
    }

}