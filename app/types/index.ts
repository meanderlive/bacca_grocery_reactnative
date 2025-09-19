// Common types used throughout the application

// API Response Types
export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  error?: string;
  message?: string;
}

// Product Types
export interface ProductImage {
  uri: string;
  id?: string;
  isDefault?: boolean;
}

export interface Product {
  id: string;
  _id?: string; // For API compatibility
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: ProductImage | number | string;
  images?: ProductImage[];
  category: string;
  categoryId?: {
    _id: string;
    name: string;
    display_name?: string;
  };
  storeId: string | {
    _id: string;
    name: string;
    address?: string;
  };
  storeName?: string;
  rating?: number;
  reviewCount?: number;
  isAvailable?: boolean;
  isFavorite?: boolean;
  unit: string;
  discount?: number;
  inStock: boolean;
  is_activated?: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Order Types
export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  userId: string;
  name: string;
  display_name: string;
  description: string;
  products: OrderProduct[];
  slot: string;
  note: string;
  admin_note: string;
  deliveryAddress: string;
  paymentMethod: 'cod' | 'online';
  totalAmount: number;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  isBuyNow?: boolean;
}

export interface Order extends Omit<CreateOrderPayload, 'products'> {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface OrderCreateResponse {
  order: Order;
  data?: {
    order: Order;
    paymentUrl?: string; // For online payments
  };
  message?: string;
  isSuccess: boolean;
}

// Cart Types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  storeId: string;
  storeName?: string;
  price: number;
  total: number;
}

export interface TemporaryCartItem {
  product: Product;
  quantity: number;
  isBuyNow: boolean;
}

// Store Types
export interface Store {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  address: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  contactNumber: string;
  email?: string;
  isActive: boolean;
  openingHours?: string;
  rating?: number;
  image?: string;
  categories?: string[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  productCount: number;
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  description: string;
  image: any;
  actionType: 'product' | 'category' | 'store' | 'promo';
  actionId?: string;
  isActive: boolean;
}

// Recent Order Types
export interface RecentOrder {
  id: string;
  orderNumber: string;
  storeName: string;
  storeLogo: any;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  orderDate: string;
  pickupTime: string;
  status: 'completed' | 'cancelled' | 'pending';
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// Navigation Types
export interface RootStackParams {
  Home: undefined;
  Search: undefined;
  ProductDetail: { productId: string };
  StoreDetail: { storeId: string };
  CategoryProducts: { categoryId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderDetails: Order };
  Payment: { orderDetails: Order };
  Profile: undefined;
  Orders: undefined;
  Wishlist: undefined;
  Settings: undefined;
}