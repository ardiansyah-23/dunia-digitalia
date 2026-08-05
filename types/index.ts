export type OrderStatus = 'Pending' | 'Paid' | 'Expired' | 'Failed' | 'Cancelled' | 'Refunded';

export type PaymentMethodCode =
  | 'QRIS'
  | 'BCAVA'
  | 'BNIVA'
  | 'BRIVA'
  | 'MANDIRIVA'
  | 'PERMATAVA'
  | 'ALFAMART'
  | 'INDOMARET';

export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  version: string;
  demoUrl?: string;
  downloadUrl?: string;
  thumbnail: string;
  screenshots: string[];
  features: string[];
  salesCount: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  changelog?: { version: string; date: string; notes: string[] }[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  readTime: number;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  featured: boolean;
  createdAt: Date | string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productSlug: string;
  price: number;
  quantity: number;
  downloadUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethodCode;
  paymentMethodName: string;
  status: OrderStatus;
  tripayReference?: string;
  tripayPayCode?: string;
  tripayQrUrl?: string;
  tripayCheckoutUrl?: string;
  tripayExpiredAt?: number;
  paidAt?: Date | string;
  licenseKey?: string;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TripayCallbackPayload {
  reference: string;
  merchant_ref: string;
  payment_method: string;
  payment_method_code: PaymentMethodCode;
  total_amount: number;
  status: 'PAID' | 'EXPIRED' | 'FAILED' | 'REFUND';
  paid_at?: number;
  signature: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt: Date | string;
  active: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: Date | string;
}

export interface DownloadItem {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  version: string;
  downloadUrl: string;
  licenseKey: string;
  purchasedAt: Date | string;
}

export interface ServicePackage {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  startingPrice: number;
  estimatedDays: string;
  category: string;
  icon: string;
}
