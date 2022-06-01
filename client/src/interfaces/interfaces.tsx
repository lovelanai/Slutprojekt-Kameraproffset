export interface Product {
  _id: string | undefined;
  title: string;
  longinfo: string;
  info1: string;
  info2: string;
  info3: string;
  price: number;
  quantity: number;
  image: string;
  image2: string;
  image3: string;
  category: string[];
  cameratype: string[];
  specifications: Spec[];
}

export interface Category {
  category: string[];
}

export interface CameraType {
  cameratype: string[];
}

export interface Spec {
  title: string;
  value: string;
}

export interface Delivery {
  _id: string;
  title: string;
  price: number;
  info: string;
  image: string;
}

export interface ShipperSelection {
  shipper: Delivery;
  checked: boolean;
}

export interface Payment {
  _id: string;
  title: string;
  price: number;
  info: string;
  alt: string;
}

export interface PaySelection {
  paymethod: Payment;
  paychecked: boolean;
}

// export const mockedPay: Payment[] = [
//   {
//     _id: '30',
//     title: 'Kortbetalning',
//     price: 0,
//     info: 'Direktbetalning med kort',
//     alt: '(Visa, Mastercard...)',
//   },
//   {
//     _id: '31',
//     title: 'Swish',
//     price: 0,
//     info: 'Direktbetalning med Swish',
//     alt: '',
//   },
//   {
//     _id: '32',
//     title: 'Faktura',
//     price: 49,
//     info: 'Faktura',
//     alt: 'Betala inom 14 dagar',
//   },
// ];

export interface PersonalData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  postnr: string;
  street: string;
}

export interface Address {
  street: string;
  zipcode: string;
  firstname: string;
  lastname: string;
}

export interface OrderProduct {
  id: string;
  quantity: number;
}

export interface CreateOrderBody {
  email: string;
  phoneNumber: string;
  products: OrderProduct[];
  deliveryAddress: Address;
  payment: string;
  shipment: string;
}

export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Shipment {
  _id: string;
  title: string;
  price: number;
  info: string;
  image: string;
}

export interface Order {
  _id: string;
  user: User;
  email: string;
  phoneNumber: string;
  products: Product[];
  deliveryAddress: Address;
  payment: Payment;
  shipment: Shipment;
  orderDate: Date;
}
