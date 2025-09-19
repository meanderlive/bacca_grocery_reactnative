import { BASE_URL, } from '.';



export const api_login = async (payload: any) => {
  const uri = `${BASE_URL}/User/login`

  const response = await fetch(uri, {
      method: "POST",
      headers: {
          "Content-Type": "application/json", 
      },
      body: JSON.stringify(payload)
  }).then((res) => res.json());
  if (!response.isSuccess) {
    throw new Error(response.error || 'something went wrong!');
  }
  return response;
};
export const api_Signup = async (payload: any) => {
  const uri = `${BASE_URL}/User/create`;

  const response = await fetch(uri, {
      method: "POST",
      headers: {
          "Content-Type": "application/json", 
      },
      body: JSON.stringify(payload)
  }).then((res) => res.json());
  if (!response.isSuccess) { 
      throw new Error(response.error);
  }
  return response;
};




// SET NEW PASSWORD -> POST

export const api_setNewPassword = async (token:any,newPassword:any ) => {
  const uri = `${BASE_URL}/User/resetPassword`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({newPassword,token }),
  }).then((res) => res.json());
  if (!response.isSuccess) {
    throw new Error(response.error || 'something went wrong!');
  }
  return response;
};


// SEND OTP -> POST

export const api_sendOTP = async (email: any) => {
  const uri = `${BASE_URL}/users/mobile/usersendOtp?email=${email}`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  if (!response.isSuccess) {
    throw new Error(response.error || 'something went wrong!');
  }
  return response;
};

// FORGOT PASSWORD


export const api_forgotpassword = async (payload: any) => {
  const uri =`${BASE_URL}/User/forgot-password`;
  // const uri ="http://38.242.230.126:8989/User/forgot-password";
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

  return response;
};



// VERIFY OTP -> POST

export const api_otpVerify = async (otp: any, token: any) => {
  const uri = `${BASE_URL}/User/verifyOTP`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp, token }),
  }).then((res) => res.json());
  if (!response.isSuccess) {
    throw new Error(response.error);
  }
  return response;
};



  // CHANGE PASSWORD -> POST
  export const api_changePassword = async ( email:any, newPassword:any) => {
    const uri = `${BASE_URL}/User/resetPassword`;
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email,newPassword}),
    }).then((res) => res.json());
    if(!response.isSuccess){
        throw new Error(response.error || 'something went wrong!')
    }
    return response;
  };


  // DELETE ACCOUNT
export const api_deleteAccount = async (userId: string) => {
  const uri = `${BASE_URL}/User/remove/${userId}`;
  try {
    const response = await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete account');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete Account Error:', error);
    throw error;
  }
};