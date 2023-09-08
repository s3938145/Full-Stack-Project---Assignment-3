import axios from "axios"

// Sign up user
export async function register(newData) {
    var res = await axios.post('/register', newData)
    console.log(res.data)
}

// Log in user
export async function signIn(newData) {
    var res = await axios.post('/login', newData)
    console.log(res.data)
}