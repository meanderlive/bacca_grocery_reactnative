import { BASE_URL } from ".";



export const getallCategories = async (page_number: number, page_size: number) => {
    const uri = `${BASE_URL}/categorys/getall?page_number=${page_number}&page_size=${page_size}`;
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

export const getCategoryById = async (id: string) => {
    const uri = `${BASE_URL}/categorys/getById/${id}`;
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


