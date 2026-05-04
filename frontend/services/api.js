const API_URL = "http://localhost:5001/api"

const getProducts = async (params = {}) => {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append('search', params.search);
    if (params.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params.subCategoryId) queryParams.append('subCategoryId', params.subCategoryId);

    const url = queryParams.toString()
        ? `${API_URL}/products?${queryParams.toString()}`
        : `${API_URL}/products`;

    const res = await fetch(url)
    return res.json()
}

export { getProducts }