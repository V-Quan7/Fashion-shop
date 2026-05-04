const API_URL = "http://localhost:5001/api"

const getProducts = async () => {
    const res = await fetch(`${API_URL}/products`)
    return res.json()
}
export { getProducts }