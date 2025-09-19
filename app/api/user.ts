import { BASE_URL } from '.';

// GET USER BY ID
export const api_userById = async (id: string) => {
  const uri = `${BASE_URL}/User/getById/${id}`;

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

export const api_getallusers = async () => {
  const uri = `${BASE_URL}/User/getall?page_no=1&page_size=100`;
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
};

/**
 * Update user profile with image upload
 * @param {FormData} formData - FormData containing the image file
 * @param {string} id - User ID
 * @returns {Promise<any>} - Response from the server
 */
export const updateProfile = async (
  formData: FormData,
  id: string,
): Promise<{ isSuccess: boolean; message?: string }> => {
  const uri = `${BASE_URL}/User/uploadProfile/${id}`;

  console.log('Sending request to:', uri);
  console.log('FormData contents:', formData);
  
  try {
    // Log headers for debugging
    const headers = new Headers();
    // Don't set Content-Type header, let the browser set it with the correct boundary
    
    // Log the actual request being sent
    console.log('Request details:', {
      method: 'PUT',
      url: uri,
      headers: Object.fromEntries(headers.entries()),
      body: formData,
    });

    const response = await fetch(uri, {
      method: 'PUT',
      headers,
      body: formData,
    });

    console.log('Response status:', response.status);
    
    // Check if response is JSON before trying to parse
    const contentType = response.headers.get('content-type');
    let responseData;
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON response, got: ${text}`);
    }
    
    console.log('Response data:', responseData);
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    
    if (!responseData.isSuccess) {
      throw new Error(responseData.message || 'Failed to update profile');
    }

    return responseData;
  } catch (error: any) {
    console.error('Profile update error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      isNetworkError: error.message === 'Network request failed',
    });
    
    if (error.message === 'Network request failed') {
      // Check if the server is reachable
      try {
        const testResponse = await fetch(BASE_URL, { method: 'HEAD' });
        console.log('Server reachable, status:', testResponse.status);
      } catch (testError) {
        console.error('Server is not reachable:', testError);
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
    }
    
    throw new Error(error.message || 'An error occurred while updating the profile');
  }
};


// UPDATE USER
export const api_updateUser = async (payload: any, userId: string) => {
  const uri = `${BASE_URL}/User/update/${userId}`;

  const response = await fetch(uri, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
  if (!response.isSuccess) {
    throw new Error(response.error || 'something went wrong!');
  }
  return response;
};

