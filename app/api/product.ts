import { BASE_URL } from ".";




export const getallProducts = async (page_number: number, page_size: number) => {
    const uri = `${BASE_URL}/product/getAll?page_number=${page_number}&page_size=${page_size}`;
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    if (!response.isSuccess) {
        throw new Error(response.error);
    }
    return response;
}

export const getProductById = async (id: string) => {
    const uri = `${BASE_URL}/product/getById/${id}`;
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    if (!response.isSuccess) {
        throw new Error(response.error);
    }
    return response;
}



export const productGetAllByCategoryId = async (id: string
    , page_no: number, page_size: number
) => {
    const uri = `${BASE_URL}/product/getAllByCategoryId?categoryId=${id}&page_no=${page_no}&page_size=10`;
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    if (!response.isSuccess) {
        throw new Error(response.error);
    }
    return response;
}