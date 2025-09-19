export const BASE_URL: string = "https://backend.justskipline.com";
// export const SOCKET_URL: string = 'http://38.242.230.126:5090'; 




//Image url

export const getImageUrl = (path: string): string => {
    if (!path || typeof path !== 'string') {
        console.warn('getImageUrl: Invalid path provided:', path);
        return '';
    }
    
    // If it's already a full URL, return it as is
    if (path.startsWith('http')) {
        return path;
    }
    
    // If it starts with a slash, it's an absolute path on the server
    if (path.startsWith('/')) {
        return `https://backend.justskipline.com${path}`;
    }
    
    // Otherwise, assume it's a relative path to the images directory
    return `https://backend.justskipline.com/assets/images/${path}`;
};
 
 