// ================================
// User Types
// ================================
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  role: 'user' | 'admin';
}

export interface EditUser {
  name: string;
  email: string;
  password: string;
  gender: string;
  role: 'user' | 'admin';
}

// ================================
// Product Types
// ================================
export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  gender?: string;
  image: string;
  rating: ProductRating;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ViewProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  gender?: string;
  image: string;
  rating: ProductRating;
}

// ================================
// Redux State Types
// ================================
export interface ProductsState {
  products: Product[];
  cart: CartItem[];
  loading: boolean;
  viewProduct: ViewProduct;
}

export interface ProfileState {
  loggedUser: User | null;
  logged: boolean;
  editLoggedUser: EditUser;
}

export interface ThemeState {
  theme: boolean; // true = light, false = dark
}

export interface UserState {
  user: EditUser;
  allUsers: User[];
}

export interface AdminAddState {
  product: Omit<Product, 'id'>;
}

export interface EditUserState {
  user: EditUser;
}

export interface FlagsState {
  productChanged: boolean;
  userChanged: boolean;
}

// ================================
// Root State Type
// ================================
export interface RootState {
  products: ProductsState;
  profile: ProfileState;
  theme: ThemeState;
  user: UserState;
  adminAdd: AdminAddState;
  editUser: EditUserState;
  flags: FlagsState;
}
