# Dynamic Payment Flow with Payment Intent ID

## Overview
This document explains the complete payment flow in the JustSkipline app, where each order creation generates a unique payment intent ID that is used throughout the payment process.

## Flow Diagram
```
Order Creation → Payment Intent ID Generation → Order Confirmation → Payment Processing → Payment Success
```

## Detailed Flow

### 1. Order Creation (CheckoutScreen)
- User confirms order in checkout screen
- `api_orderCreate()` is called with order payload
- Backend generates unique `paymentIntentId` for the order
- Response structure:
```json
{
  "isSuccess": true,
  "data": {
    "userId": "68692e19fea480499e670852",
    "name": "string",
    "display_name": "string",
    "description": "string",
    "products": [
      {
        "productId": "6878d8d1df56ecded9de940a",
        "quantity": 50,
        "_id": "688de63286ad7a5677ee3e5c"
      }
    ],
    "total_price": 4950,
    "slot": "string",
    "paymentIntentId": "pi_3RrcXGF6t61ArRga2QzQTneJ",
    "note": "string",
    "admin_note": "string",
    "is_activated": false,
    "is_deleted": false,
    "created_at": "2025-08-02T10:19:30.810Z",
    "updated_at": "2025-08-02T10:19:30.810Z",
    "_id": "688de63286ad7a5677ee3e5b",
    "__v": 0
  },
  "statusCode": 201,
  "message": "order created."
}
```

### 2. Order Details Creation
- Payment intent ID from API response is extracted
- Order details object is created with all API response data
- Navigation to OrderConfirmation screen with order details

### 3. Order Confirmation Screen
- Displays order summary with payment intent ID
- Shows order items, cost breakdown, and payment button
- Payment intent ID is displayed: `Payment ID: {last 8 characters}`

### 4. Payment Processing (PaymentScreen)
- Uses the dynamic `paymentIntentId` from order details
- Calls `api_getPaymentIntent(paymentIntentId)` to get client secret
- Processes payment using Stripe
- On success, navigates to ThankYou screen

### 5. Payment Success
- Payment is processed through Stripe
- Order status is managed by the backend
- User is redirected to ThankYou screen

## Key Components

### API Functions
- `api_orderCreate()`: Creates order and returns payment intent ID
- `api_getPaymentIntent()`: Gets client secret for payment intent ID

### Hooks
- `useStripePayment()`: Manages payment intent client secret fetching

### Screens
- `CheckoutScreen`: Order creation and payment intent ID extraction
- `OrderConfirmationScreen`: Order summary with payment intent ID display
- `PaymentScreen`: Payment processing using dynamic payment intent ID

## Type Safety
All API responses are properly typed with TypeScript interfaces:
- `OrderCreateResponse`: API response structure
- `ApiResponse<T>`: Generic API response wrapper
- `OrderDetails`: Extended order details with payment intent ID

## Error Handling
- Payment intent ID validation before payment processing
- Fallback data for debugging when API calls fail
- Proper error messages for missing payment intent ID
- Console logging for debugging payment flow

## Benefits
1. **Dynamic**: Each order gets a unique payment intent ID
2. **Secure**: Payment intent ID is generated server-side
3. **Traceable**: Payment intent ID links order to payment
4. **Type Safe**: Full TypeScript support for API responses
5. **Debuggable**: Comprehensive logging throughout the flow
6. **Simplified**: Clean API structure with only necessary endpoints 