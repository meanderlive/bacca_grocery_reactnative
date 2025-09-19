import { BASE_URL, } from '.';
import { CreateOrderPayload, ApiResponse, OrderCreateResponse } from '../types';

export const api_orderCreate = async (payload: CreateOrderPayload): Promise<ApiResponse<OrderCreateResponse>> => {
  const uri = `${BASE_URL}/orders/create`;
  const response = await fetch(uri, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  }).then(res => res.json());
  if (!response.isSuccess) {
      throw new Error(response.error);
  }
  return response;
}


// GET USER BY ID
export const api_getallorders = async () => {
  const uri = `${BASE_URL}/order/getall?page_no=1&page_size=100`;
  // const uri = `${BASE_URL}/User/getall?page_no=${page_no}&page_size=${page_size}`;
  const response = await fetch(uri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
  if (!response.isSuccess) {
    // throw new Error(response.error);
  }
  return response;
}


export const api_orderById = async ( id: string) => {
    const uri = `${BASE_URL}/orders/getById/${id}`;
     
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());
      if (!response.isSuccess) {
        // throw new Error(response.error);
      }
      return response;
};



export const api_getAllOrdersByUserId = async (payload: any, id: string) => {
  // const uri = `${BASE_URL}/orders/updateOrder/${id}`;
  const uri = `${BASE_URL}/orders/getAllByUserId?userId=${id}&page_no=1&page_size=1000`;
  const response = await fetch(uri, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  }).then(res => res.json());
  if (!response.isSuccess) {
      throw new Error(response.error);
  }
  return response;
}


// export const api_orderDelete = async ( id: string) => {
//     const uri = `${BASE_URL}/orders/deleteOrder/${id}`;
//     const response = await fetch(uri, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
      
//     }).then(res => res.json());
//     if (!response.isSuccess) {
//         throw new Error(response.error);
//     }
//     return response;
//   }