export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: string;
  coverImage?: string;
  description?: string;
  rating?: number;
  reviews?: Review[];
  inStock: boolean;
  format: 'eBook' | 'Paperback';
  publishedDate: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  orders?: Order[];
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  bookId: string;
  quantity: number;
  price: number;
  salePrice?: number;
}

export interface Sale {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  books: string[]; // Array of book IDs included in the sale
  theme?: string; // e.g., "Christmas", "Summer"
  isActive: boolean;
} 