export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  salePrice?: number;
  stock: number;
  category: string;
  coverImage: string;
  description: string;
  rating: number;
  reviews: Review[];
  inStock: boolean;
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
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orders: Order[];
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
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
  description: string;
  startDate: string;
  endDate: string;
  discountPercentage: number;
  books: string[]; // Array of book IDs
  theme: 'default' | 'christmas' | 'summer' | 'festival';
  isActive: boolean;
}

// Mock data
export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    price: 15.99,
    stock: 50,
    category: 'Fiction',
    coverImage: 'https://example.com/gatsby.jpg',
    description: 'A story of the fabulously wealthy Jay Gatsby...',
    rating: 4.5,
    reviews: [],
    inStock: true,
  },
  // Add more mock books...
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    orders: [],
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Add more mock customers...
];

export const mockSales: Sale[] = [
  {
    id: '1',
    name: 'Summer Reading Sale',
    description: 'Get 20% off on selected books',
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z',
    discountPercentage: 20,
    books: ['1', '2', '3'],
    theme: 'summer',
    isActive: true,
  },
  {
    id: '2',
    name: 'Christmas Special',
    description: 'Holiday discounts on bestsellers',
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-25T23:59:59Z',
    discountPercentage: 30,
    books: ['4', '5', '6'],
    theme: 'christmas',
    isActive: false,
  },
  // Add more mock sales...
]; 