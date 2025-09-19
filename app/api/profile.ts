import { BASE_URL } from ".";

// export const uploadProfile = async (imageUri: string, id: string) => {
//     console.log('Starting profile picture upload...');
//     const uri = `${BASE_URL}/User/uploadProfile/${id}`;
    
//     try {
//         const formData = new FormData();
        
//         // Extract file extension from the URI
//         const fileExtension = imageUri.split('.').pop();
//         const fileName = `profile_${Date.now()}.${fileExtension || 'jpg'}`;
//         const fileType = `image/${fileExtension || 'jpeg'}`;
        
//         // @ts-ignore - TypeScript doesn't like the File type in React Native
//         formData.append('image', {
//             uri: imageUri,
//             name: fileName,
//             type: fileType,
//         });
        
//         console.log('Sending profile picture to server...');
//         const response = await fetch(uri, {
//             method: 'PUT',
//             body: formData,
//             headers: {
//                 'Accept': 'application/json',
//                 // Let the browser set the Content-Type with the correct boundary
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
        
//         const responseData = await response.json();
        
//         if (!responseData.isSuccess) {
//             console.error('Profile upload failed:', responseData.error);
//             throw new Error(responseData.error || 'Failed to upload profile picture');
//         }
        
//         console.log('Profile picture uploaded successfully!', responseData);
//         return responseData;
//     } catch (error) {
//         console.error('Error in uploadProfile:', error);
//         throw error;
//     }
// }


export const uploadProfile = async (imageUri: string, id: string) => {
    console.log('Starting profile picture upload...');
    const uri = `${BASE_URL}/User/uploadProfile/${id}`;

    try {
        const formData = new FormData();

        const fileExtension = imageUri.split('.').pop();
        const fileName = `profile_${Date.now()}.${fileExtension || 'jpg'}`;
        const fileType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;

        formData.append('image', {
            uri: imageUri,
            name: fileName,
            type: fileType,
        });

        console.log('Sending profile picture to server...');
        const response = await fetch(uri, {
            method: 'PUT',
            body: formData,
            headers: {
                'Accept': 'application/json',
                // Don't set Content-Type manually!
            },
        });

        const responseData = await response.json();

        if (!response.ok || !responseData?.isSuccess) {
            console.error('Profile upload failed:', responseData);
            throw new Error(responseData?.error || 'Failed to upload profile picture');
        }

        console.log('Profile picture uploaded successfully!', responseData);
        return responseData;
    } catch (error) {
        console.error('Error in uploadProfile:', error);
        throw error;
    }
}
