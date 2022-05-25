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
  specifications: Spec[];
}

export interface Category {
  category: string[];
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
  name: string;
  phone: string;
  postnr: string;
  street: string;
}
