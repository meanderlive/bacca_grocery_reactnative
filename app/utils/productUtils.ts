import { Product } from '../types';

/**
 * Normalizes product data from API to ensure consistent structure
 */
export const normalizeProduct = (apiProduct: any): Product => {
  if (!apiProduct) {
    throw new Error('Product data is required');
  }

  // Handle storeId which can be string or object
  const storeId = typeof apiProduct.storeId === 'object' 
    ? apiProduct.storeId._id 
    : apiProduct.storeId;
    
  const storeName = typeof apiProduct.storeId === 'object'
    ? apiProduct.storeId.name
    : apiProduct.storeName;

  // Handle image/avatar
  let image: any = apiProduct.image;
  if (!image && apiProduct.avatar) {
    image = { uri: apiProduct.avatar };
  } else if (typeof image === 'string') {
    image = { uri: image };
  }

  return {
    id: apiProduct._id || apiProduct.id,
    _id: apiProduct._id || apiProduct.id,
    name: apiProduct.name || 'Unnamed Product',
    description: apiProduct.description || '',
    price: Number(apiProduct.price) || 0,
    originalPrice: Number(apiProduct.originalPrice) || Number(apiProduct.price) || 0,
    image,
    images: apiProduct.images?.map((img: any) => ({
      uri: typeof img === 'string' ? img : img.uri,
      id: img?._id || Math.random().toString(),
      isDefault: img?.isDefault || false
    })) || [image].filter(Boolean),
    category: apiProduct.categoryId?.display_name || 
              apiProduct.categoryId?.name || 
              apiProduct.category ||
              'Uncategorized',
    categoryId: apiProduct.categoryId ? {
      _id: apiProduct.categoryId._id,
      name: apiProduct.categoryId.name,
      display_name: apiProduct.categoryId.display_name
    } : undefined,
    storeId,
    storeName: storeName || 'Unknown Store',
    rating: Number(apiProduct.rating) || 0,
    reviewCount: Number(apiProduct.reviewCount) || 0,
    isAvailable: apiProduct.is_activated !== undefined 
      ? apiProduct.is_activated 
      : apiProduct.isAvailable !== undefined 
        ? apiProduct.isAvailable 
        : true,
    isFavorite: Boolean(apiProduct.isFavorite),
    unit: apiProduct.unit || 'piece',
    discount: Number(apiProduct.discount) || 0,
    inStock: apiProduct.inStock !== undefined 
      ? apiProduct.inStock 
      : apiProduct.stockQuantity > 0,
    is_activated: apiProduct.is_activated !== undefined 
      ? apiProduct.is_activated 
      : true,
    avatar: apiProduct.avatar,
    createdAt: apiProduct.createdAt,
    updatedAt: apiProduct.updatedAt
  };
};

/**
 * Validates if a product has all required fields for checkout
 */
export const validateProductForCheckout = (product: Partial<Product>): { isValid: boolean; error?: string } => {
  const requiredFields: Array<keyof Product> = ['id', 'name', 'price', 'storeId'];
  const missingFields = requiredFields.filter(field => {
    const value = product[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  if (product.inStock === false) {
    return {
      isValid: false,
      error: 'This product is out of stock'
    };
  }

  return { isValid: true };
};

/**
 * Gets the display price of a product (after discount if any)
 */
export const getDisplayPrice = (product: Pick<Product, 'price' | 'originalPrice' | 'discount'>): {
  originalPrice: number;
  finalPrice: number;
  hasDiscount: boolean;
  discountAmount: number;
} => {
  const originalPrice = Number(product.originalPrice) || Number(product.price) || 0;
  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  
  const finalPrice = discount > 0 
    ? price - (price * discount / 100)
    : price;

  return {
    originalPrice,
    finalPrice,
    hasDiscount: discount > 0,
    discountAmount: discount > 0 ? price - finalPrice : 0
  };
};
