import { Customer, Sale } from "../types/mockTypes";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}
export const getRandomBookImage = (index: number) => {
    const images = [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60',
    ]}
export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 15.99,
    image: 'https://source.unsplash.com/random/300x400?book,novel',
    category: 'Fiction',
    description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    rating: 4.5,
    reviewCount: 1200,
    inStock: true,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 14.99,
    image: 'https://source.unsplash.com/random/300x400?book,classic',
    category: 'Fiction',
    description: 'The story of racial injustice and the loss of innocence in the American South.',
    rating: 4.8,
    reviewCount: 1500,
    inStock: true,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    price: 12.99,
    image: 'https://source.unsplash.com/random/300x400?book,dystopian',
    category: 'Science Fiction',
    description: 'A dystopian social science fiction novel and cautionary tale.',
    rating: 4.6,
    reviewCount: 1800,
    inStock: true,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 11.99,
    image: 'https://source.unsplash.com/random/300x400?book,romance',
    category: 'Romance',
    description: 'A romantic novel of manners.',
    rating: 4.7,
    reviewCount: 2000,
    inStock: true,
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 16.99,
    image: 'https://source.unsplash.com/random/300x400?book,fantasy',
    category: 'Fantasy',
    description: 'A fantasy novel and children\'s book by English author J. R. R. Tolkien.',
    rating: 4.9,
    reviewCount: 2500,
    inStock: true,
  },
  {
    id: '6',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 13.99,
    image: 'https://source.unsplash.com/random/300x400?book,coming-of-age',
    category: 'Fiction',
    description: 'A classic coming-of-age story.',
    rating: 4.4,
    reviewCount: 1600,
    inStock: true,
  },
  {
    id: '7',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 14.99,
    image: 'https://source.unsplash.com/random/300x400?book,philosophy',
    category: 'Philosophy',
    description: 'A philosophical novel.',
    rating: 4.5,
    reviewCount: 2200,
    inStock: true,
  },
  {
    id: '8',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    price: 10.99,
    image: 'https://source.unsplash.com/random/300x400?book,children',
    category: 'Children',
    description: 'A poetic tale about a young prince who visits various planets in space.',
    rating: 4.8,
    reviewCount: 1900,
    inStock: true,
  },
  {
    id: '9',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    price: 15.99,
    image: 'https://source.unsplash.com/random/300x400?book,thriller',
    category: 'Thriller',
    description: 'A mystery thriller novel.',
    rating: 4.3,
    reviewCount: 1700,
    inStock: true,
  },
  {
    id: '10',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    price: 13.99,
    image: 'https://source.unsplash.com/random/300x400?book,drama',
    category: 'Drama',
    description: 'A story of friendship, betrayal, and redemption.',
    rating: 4.7,
    reviewCount: 2100,
    inStock: true,
  },
  {
    id: '11',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    price: 14.99,
    image: 'https://source.unsplash.com/random/300x400?book,historical',
    category: 'Historical Fiction',
    description: 'A story of a young girl living in Nazi Germany.',
    rating: 4.6,
    reviewCount: 1800,
    inStock: true,
  },
  {
    id: '12',
    title: 'The Giver',
    author: 'Lois Lowry',
    price: 12.99,
    image: 'https://source.unsplash.com/random/300x400?book,young-adult',
    category: 'Young Adult',
    description: 'A dystopian children\'s novel.',
    rating: 4.5,
    reviewCount: 1600,
    inStock: true,
  },
  {
    id: '13',
    title: 'The Fault in Our Stars',
    author: 'John Green',
    price: 13.99,
    image: 'https://source.unsplash.com/random/300x400?book,romance',
    category: 'Romance',
    description: 'A story about two teenagers who meet at a cancer support group.',
    rating: 4.4,
    reviewCount: 1900,
    inStock: true,
  },
  {
    id: '14',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    price: 15.99,
    image: 'https://source.unsplash.com/random/300x400?book,dystopian',
    category: 'Science Fiction',
    description: 'A dystopian novel set in a post-apocalyptic world.',
    rating: 4.7,
    reviewCount: 2300,
    inStock: true,
  },
  {
    id: '15',
    title: 'The Help',
    author: 'Kathryn Stockett',
    price: 14.99,
    image: 'https://source.unsplash.com/random/300x400?book,historical',
    category: 'Historical Fiction',
    description: 'A story about African American maids working in white households.',
    rating: 4.6,
    reviewCount: 2000,
    inStock: true,
  },
];

export const categories = [
  {
    id: 'cat1',
    name: 'Fiction',
    description: 'Explore our collection of fiction books',
    image: getRandomBookImage(17)
  },
  {
    id: 'cat2',
    name: 'Science Fiction',
    description: 'Journey through space and time',
    image: getRandomBookImage(27)
  },
  {
    id: 'cat3',
    name: 'Romance',
    description: 'Stories of love and relationships',
    image: getRandomBookImage(37)
  },
  {
    id: 'cat4',
    name: 'Fantasy',
    description: 'Enter magical worlds and epic adventures',
    image: getRandomBookImage(47)
  },
  {
    id: 'cat5',
    name: 'Mystery',
    description: 'Solve intriguing puzzles and crimes',
    image: getRandomBookImage(57)
  }
];

export const features = [
  {
    id: 'feat1',
    title: 'eBooks',
    description: 'Access your books anywhere with our digital library',
    icon: '📱'
  },
  {
    id: 'feat2',
    title: 'Kindle Support',
    description: 'Read on your Kindle device with our compatible format',
    icon: '📖'
  },
  {
    id: 'feat3',
    title: 'Fast Delivery',
    description: 'Get your physical books delivered within 2-3 business days',
    icon: '🚚'
  },
  {
    id: 'feat4',
    title: '24/7 Support',
    description: 'Our customer service team is always here to help',
    icon: '💬'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'Alice Smith',
    email: 'alice.smith@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, CA 91234',
    orders: [],
  },
  {
    id: 'CUST002',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '987-654-3210',
    address: '456 Oak Ave, Somewhere, TX 75001',
    orders: [],
  },
  // Add more mock customers...
];

export const mockSales: Sale[] = [
  {
    id: 'SALE001',
    name: 'Summer Reading Sale',
    description: 'Get great books for your summer vacation!',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    discountPercentage: 20,
    books: ['BK001', 'BK002'],
    theme: 'Summer',
    isActive: true,
  },
  {
    id: 'SALE002',
    name: 'Holiday Special',
    description: 'Perfect gifts for the holiday season.',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    discountPercentage: 25,
    books: ['BK003', 'BK004'],
    theme: 'Christmas',
    isActive: false,
  }
]; 