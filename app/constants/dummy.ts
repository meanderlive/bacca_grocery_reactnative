import { Product, Store, Category, Banner, RecentOrder, Location } from '../types';

// Categories Data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Fruits & Vegetables',
    icon: require('../../assets/images/FoodItems/img2.png'),
    color: '#4CAF50',
    productCount: 45
  },
  {
    id: '2',
    name: 'Dairy & Eggs',
    icon: require('../../assets/images/FoodItems/img1.png'),
    color: '#FFC107',
    productCount: 32
  },
  {
    id: '3',
    name: 'Bread & Bakery',
    icon: require('../../assets/images/FoodItems/img8.png'),
    color: '#FF9800',
    productCount: 28
  },
  {
    id: '4',
    name: 'Meat & Fish',
    icon: require('../../assets/images/FoodItems/img3.png'),
    color: '#F44336',
    productCount: 25
  },
  {
    id: '5',
    name: 'Snacks & Beverages',
    icon: require('../../assets/images/FoodItems/img4.png'),
    color: '#9C27B0',
    productCount: 38
  },
  {
    id: '6',
    name: 'Baby Care',
    icon: require('../../assets/images/FoodItems/img5.png'),
    color: '#2196F3',
    productCount: 15
  },
  {
    id: '7',
    name: 'Home Care',
    icon: require('../../assets/images/FoodItems/img7.png'),
    color: '#607D8B',
    productCount: 22
  },
  {
    id: '8',
    name: 'Beverages',
    icon: require('../../assets/images/FoodItems/img6.png'),
    color: '#795548',
    productCount: 30
  }
];

// Stores Data
export const stores: Store[] = [
  {
    id: '1',
    name: 'FreshMart Supermarket',
    logo: require('../../assets/images/ResLogos/img1.png'),
    banner: require('../../assets/images/Storebanner.png'),
    rating: 4.8,
    reviewCount: 1247,
    distance: 0.8,
    deliveryTime: 15,
    address: '123 Main Street, Downtown',
    isOpen: true,
    categories: ['Fruits & Vegetables', 'Dairy & Eggs', 'Bread & Bakery'],
    featuredProducts: ['1', '2', '3', '4']
  },
  {
    id: '2',
    name: 'Organic Valley Market',
    logo: require('../../assets/images/ResLogos/img2.png'),
    banner: require('../../assets/images/Storebanner.png'),
    rating: 4.6,
    reviewCount: 892,
    distance: 1.2,
    deliveryTime: 20,
    address: '456 Oak Avenue, Midtown',
    isOpen: true,
    categories: ['Fruits & Vegetables', 'Dairy & Eggs', 'Meat & Fish'],
    featuredProducts: ['5', '6', '7', '8']
  },
  {
    id: '3',
    name: 'Quick Stop Convenience',
    logo: require('../../assets/images/ResLogos/img3.png'),
    banner: require('../../assets/images/Storebanner.png'),
    rating: 4.3,
    reviewCount: 567,
    distance: 0.5,
    deliveryTime: 10,
    address: '789 Pine Street, Uptown',
    isOpen: true,
    categories: ['Snacks & Beverages', 'Bread & Bakery', 'Home Care'],
    featuredProducts: ['9', '10', '11', '12']
  },
  {
    id: '4',
    name: 'Premium Grocers',
    logo: require('../../assets/images/ResLogos/img4.png'),
    banner: require('../../assets/images/Storebanner.png'),
    rating: 4.9,
    reviewCount: 2034,
    distance: 1.8,
    deliveryTime: 25,
    address: '321 Elm Street, Westside',
    isOpen: true,
    categories: ['Fruits & Vegetables', 'Meat & Fish', 'Dairy & Eggs'],
    featuredProducts: ['13', '14', '15', '16']
  }
];

// Products Data
export const products: Product[] = [
  // FreshMart Products
  {
    id: '1',
    name: 'Fresh Organic Bananas',
    description: 'Sweet and ripe organic bananas, perfect for smoothies or snacking',
    price: 2.99,
    originalPrice: 3.99,
    image: require('../../assets/images/Fruits/Banana.png'),
    category: 'Fruits & Vegetables',
    storeId: '1',
    storeName: 'FreshMart Supermarket',
    rating: 4.7,
    reviewCount: 234,
    isAvailable: true,
    isFavorite: false,
    unit: '1 kg',
    discount: 25,
    inStock: true
  },
  {
    id: '2',
    name: 'Whole Milk',
    description: 'Fresh whole milk from local dairy farms',
    price: 3.49,
    image: require('../../assets/images/FoodItems/img1.png'),
    category: 'Dairy & Eggs',
    storeId: '1',
    storeName: 'FreshMart Supermarket',
    rating: 4.5,
    reviewCount: 189,
    isAvailable: true,
    isFavorite: true,
    unit: '1 liter',
    inStock: true
  },
  {
    id: '3',
    name: 'Artisan Sourdough Bread',
    description: 'Freshly baked sourdough bread with crispy crust',
    price: 4.99,
    image: require('../../assets/images/FoodItems/img8.png'),
    category: 'Bread & Bakery',
    storeId: '1',
    storeName: 'FreshMart Supermarket',
    rating: 4.8,
    reviewCount: 156,
    isAvailable: true,
    isFavorite: false,
    unit: '1 loaf',
    inStock: true
  },
  {
    id: '4',
    name: 'Organic Strawberries',
    description: 'Sweet and juicy organic strawberries',
    price: 5.99,
    originalPrice: 7.99,
    image: require('../../assets/images/Fruits/Strawberry.png'),
    category: 'Fruits & Vegetables',
    storeId: '1',
    storeName: 'FreshMart Supermarket',
    rating: 4.6,
    reviewCount: 298,
    isAvailable: true,
    isFavorite: true,
    unit: '250g',
    discount: 25,
    inStock: true
  },
  // Organic Valley Products
  {
    id: '5',
    name: 'Fresh Organic Tomatoes',
    description: 'Ripe and juicy organic tomatoes',
    price: 3.99,
    image: require('../../assets/images/AllItems/img2.png'),
    category: 'Fruits & Vegetables',
    storeId: '2',
    storeName: 'Organic Valley Market',
    rating: 4.4,
    reviewCount: 167,
    isAvailable: true,
    isFavorite: false,
    unit: '500g',
    inStock: true
  },
  {
    id: '6',
    name: 'Free Range Eggs',
    description: 'Fresh eggs from free-range chickens',
    price: 4.99,
    image: require('../../assets/images/FoodItems/img1.png'),
    category: 'Dairy & Eggs',
    storeId: '2',
    storeName: 'Organic Valley Market',
    rating: 4.7,
    reviewCount: 203,
    isAvailable: true,
    isFavorite: true,
    unit: '12 pieces',
    inStock: true
  },
  {
    id: '7',
    name: 'Organic Chicken Breast',
    description: 'Fresh organic chicken breast, antibiotic-free',
    price: 12.99,
    image: require('../../assets/images/FoodItems/img3.png'),
    category: 'Meat & Fish',
    storeId: '2',
    storeName: 'Organic Valley Market',
    rating: 4.8,
    reviewCount: 145,
    isAvailable: true,
    isFavorite: false,
    unit: '500g',
    inStock: true
  },
  {
    id: '8',
    name: 'Fresh Orange Juice',
    description: '100% pure orange juice, no added sugar',
    price: 3.99,
    image: require('../../assets/images/Fruits/Orange.png'),
    category: 'Beverages',
    storeId: '2',
    storeName: 'Organic Valley Market',
    rating: 4.5,
    reviewCount: 178,
    isAvailable: true,
    isFavorite: false,
    unit: '1 liter',
    inStock: true
  },
  // Quick Stop Products
  {
    id: '9',
    name: 'Potato Chips',
    description: 'Crispy potato chips with sea salt',
    price: 2.49,
    image: require('../../assets/images/AllItems/img4.png'),
    category: 'Snacks & Beverages',
    storeId: '3',
    storeName: 'Quick Stop Convenience',
    rating: 4.2,
    reviewCount: 89,
    isAvailable: true,
    isFavorite: false,
    unit: '150g',
    inStock: true
  },
  {
    id: '10',
    name: 'Chocolate Cookies',
    description: 'Delicious chocolate chip cookies',
    price: 3.99,
    image: require('../../assets/images/WishlistImg/img3.png'),
    category: 'Bread & Bakery',
    storeId: '3',
    storeName: 'Quick Stop Convenience',
    rating: 4.3,
    reviewCount: 67,
    isAvailable: true,
    isFavorite: true,
    unit: '200g',
    inStock: true
  },
  {
    id: '11',
    name: 'Laundry Detergent',
    description: 'Gentle laundry detergent for all fabrics',
    price: 8.99,
    image: require('../../assets/images/FoodItems/img7.png'),
    category: 'Home Care',
    storeId: '3',
    storeName: 'Quick Stop Convenience',
    rating: 4.1,
    reviewCount: 45,
    isAvailable: true,
    isFavorite: false,
    unit: '2 liters',
    inStock: true
  },
  {
    id: '12',
    name: 'Energy Drink',
    description: 'High-energy drink with vitamins',
    price: 2.99,
    image: require('../../assets/images/FoodItems/img6.png'),
    category: 'Beverages',
    storeId: '3',
    storeName: 'Quick Stop Convenience',
    rating: 4.0,
    reviewCount: 123,
    isAvailable: true,
    isFavorite: false,
    unit: '250ml',
    inStock: true
  },
  // Premium Grocers Products
  {
    id: '13',
    name: 'Fresh Avocados',
    description: 'Perfectly ripe Hass avocados',
    price: 4.99,
    image: require('../../assets/images/FruitsAndVeggies/Broccoli.png'),
    category: 'Fruits & Vegetables',
    storeId: '4',
    storeName: 'Premium Grocers',
    rating: 4.9,
    reviewCount: 312,
    isAvailable: true,
    isFavorite: true,
    unit: '3 pieces',
    inStock: true
  },
  {
    id: '14',
    name: 'Salmon Fillet',
    description: 'Fresh Atlantic salmon fillet',
    price: 18.99,
    image: require('../../assets/images/FoodItems/img3.png'),
    category: 'Meat & Fish',
    storeId: '4',
    storeName: 'Premium Grocers',
    rating: 4.8,
    reviewCount: 198,
    isAvailable: true,
    isFavorite: false,
    unit: '300g',
    inStock: true
  },
  {
    id: '15',
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt with live cultures',
    price: 5.99,
    image: require('../../assets/images/FoodItems/img1.png'),
    category: 'Dairy & Eggs',
    storeId: '4',
    storeName: 'Premium Grocers',
    rating: 4.7,
    reviewCount: 167,
    isAvailable: true,
    isFavorite: true,
    unit: '500g',
    inStock: true
  },
  {
    id: '16',
    name: 'Organic Honey',
    description: 'Pure organic honey from local beekeepers',
    price: 7.99,
    image: require('../../assets/images/WishlistImg/img5.png'),
    category: 'Bread & Bakery',
    storeId: '4',
    storeName: 'Premium Grocers',
    rating: 4.9,
    reviewCount: 234,
    isAvailable: true,
    isFavorite: false,
    unit: '250g',
    inStock: true
  },
  // Additional products for better search
  {
    id: '17',
    name: 'Fresh Spinach',
    description: 'Organic baby spinach leaves',
    price: 3.49,
    image: require('../../assets/images/FruitsAndVeggies/Carrot.png'),
    category: 'Fruits & Vegetables',
    storeId: '1',
    storeName: 'FreshMart Supermarket',
    rating: 4.6,
    reviewCount: 156,
    isAvailable: true,
    isFavorite: false,
    unit: '200g',
    inStock: true
  },
  {
    id: '18',
    name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese, sharp and flavorful',
    price: 6.99,
    image: require('../../assets/images/FoodItems/img1.png'),
    category: 'Dairy & Eggs',
    storeId: '1',
    storeName: 'FreshMart Supermarket',
    rating: 4.5,
    reviewCount: 189,
    isAvailable: true,
    isFavorite: true,
    unit: '250g',
    inStock: true
  },
  {
    id: '19',
    name: 'Whole Wheat Bread',
    description: 'Healthy whole wheat bread with seeds',
    price: 3.99,
    image: require('../../assets/images/FoodItems/img8.png'),
    category: 'Bread & Bakery',
    storeId: '2',
    storeName: 'Organic Valley Market',
    rating: 4.4,
    reviewCount: 134,
    isAvailable: true,
    isFavorite: false,
    unit: '1 loaf',
    inStock: true
  },
  {
    id: '20',
    name: 'Fresh Apples',
    description: 'Crisp and juicy red apples',
    price: 4.49,
    image: require('../../assets/images/Fruits/Apricot.png'),
    category: 'Fruits & Vegetables',
    storeId: '2',
    storeName: 'Organic Valley Market',
    rating: 4.7,
    reviewCount: 245,
    isAvailable: true,
    isFavorite: true,
    unit: '1 kg',
    inStock: true
  },
  {
    id: '21',
    name: 'Beef Steak',
    description: 'Premium beef steak, tender and juicy',
    price: 24.99,
    image: require('../../assets/images/FoodItems/img3.png'),
    category: 'Meat & Fish',
    storeId: '4',
    storeName: 'Premium Grocers',
    rating: 4.9,
    reviewCount: 178,
    isAvailable: true,
    isFavorite: false,
    unit: '400g',
    inStock: true
  },
  {
    id: '22',
    name: 'Baby Formula',
    description: 'Nutritious baby formula for infants',
    price: 15.99,
    image: require('../../assets/images/FoodItems/img5.png'),
    category: 'Baby Care',
    storeId: '1',
    storeName: 'FreshMart Supermarket',
    rating: 4.8,
    reviewCount: 89,
    isAvailable: true,
    isFavorite: false,
    unit: '400g',
    inStock: true
  },
  {
    id: '23',
    name: 'Dish Soap',
    description: 'Gentle dish soap for all dishes',
    price: 2.99,
    image: require('../../assets/images/FoodItems/img7.png'),
    category: 'Home Care',
    storeId: '3',
    storeName: 'Quick Stop Convenience',
    rating: 4.2,
    reviewCount: 67,
    isAvailable: true,
    isFavorite: false,
    unit: '500ml',
    inStock: true
  },
  {
    id: '24',
    name: 'Orange Soda',
    description: 'Refreshing orange flavored soda',
    price: 1.99,
    image: require('../../assets/images/FoodItems/img6.png'),
    category: 'Beverages',
    storeId: '3',
    storeName: 'Quick Stop Convenience',
    rating: 4.1,
    reviewCount: 45,
    isAvailable: true,
    isFavorite: false,
    unit: '330ml',
    inStock: true
  }
];

// Banners Data
export const banners: Banner[] = [
  {
    id: '1',
    title: 'Fresh Produce Sale',
    description: 'Get 20% off on all fruits and vegetables',
    image: require('../../assets/images/SpecialOffers/img1.png'),
    actionType: 'category',
    actionId: '1',
    isActive: true
  },
  {
    id: '2',
    title: 'New Store Opening',
    description: 'Welcome to FreshMart Supermarket',
    image: require('../../assets/images/SpecialOffers/img2.png'),
    actionType: 'store',
    actionId: '1',
    isActive: true
  },
  {
    id: '3',
    title: 'Weekend Special',
    description: 'Buy 2 Get 1 Free on dairy products',
    image: require('../../assets/images/SpecialOffers/img3.png'),
    actionType: 'category',
    actionId: '2',
    isActive: true
  }
];

// Recent Orders Data
export const recentOrders: RecentOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    storeName: 'FreshMart Supermarket',
    storeLogo: require('../../assets/images/ResLogos/img1.png'),
    items: [
      {
        productId: '1',
        productName: 'Fresh Organic Bananas',
        quantity: 2,
        price: 2.99
      },
      {
        productId: '2',
        productName: 'Whole Milk',
        quantity: 1,
        price: 3.49
      }
    ],
    totalAmount: 9.47,
    orderDate: '2024-01-15',
    pickupTime: '6:00 PM',
    status: 'completed'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    storeName: 'Organic Valley Market',
    storeLogo: require('../../assets/images/ResLogos/img2.png'),
    items: [
      {
        productId: '5',
        productName: 'Fresh Organic Tomatoes',
        quantity: 1,
        price: 3.99
      },
      {
        productId: '6',
        productName: 'Free Range Eggs',
        quantity: 1,
        price: 4.99
      }
    ],
    totalAmount: 8.98,
    orderDate: '2024-01-14',
    pickupTime: '5:30 PM',
    status: 'completed'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    storeName: 'Quick Stop Convenience',
    storeLogo: require('../../assets/images/ResLogos/img3.png'),
    items: [
      {
        productId: '9',
        productName: 'Potato Chips',
        quantity: 2,
        price: 2.49
      },
      {
        productId: '12',
        productName: 'Energy Drink',
        quantity: 1,
        price: 2.99
      }
    ],
    totalAmount: 7.97,
    orderDate: '2024-01-13',
    pickupTime: '7:00 PM',
    status: 'completed'
  }
];

// Featured Products (combination of products from different stores)
export const featuredProducts: Product[] = [
  products[0], // Fresh Organic Bananas
  products[4], // Fresh Organic Tomatoes
  products[8], // Potato Chips
  products[12], // Fresh Avocados
  products[1], // Whole Milk
  products[6], // Organic Chicken Breast
  products[10], // Chocolate Cookies
  products[14] // Salmon Fillet
];

// Default Location
export const defaultLocation: Location = {
  latitude: 40.7128,
  longitude: -74.0060,
  address: '123 Main Street, Downtown',
  city: 'New York',
  state: 'NY',
  zipCode: '10001'
};