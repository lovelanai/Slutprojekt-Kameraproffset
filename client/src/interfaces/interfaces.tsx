export interface Product {
  _id: string | undefined;
  title: string;
  longinfo: string;
  info: string[];
  price: number;
  quantity: number;
  images: string[];
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
