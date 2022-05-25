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

// export const mockedShipping: Delivery[] = [
//   {
//     _id: '20',
//     title: 'Postnord',
//     price: 49,
//     info: 'Leveranst_id: "1"-3 Dagar',
//     image:
//       'https://www.cigge.se/dokument/bibliotek/Image/Cigge%20Media%20blogg/postnord-stor-logo-blogg.jpg',
//   },
//   {
//     _id: '21',
//     title: 'Schenker',
//     price: 0,
//     info: 'Leveranst_id: "4"-7 Dagar',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Logo_DB_Schenker.svg/2560px-Logo_DB_Schenker.svg.png',
//   },
//   {
//     _id: '22',
//     title: 'Dhl',
//     price: 55,
//     info: 'Leveranst_id: "2"-4 Dagar',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/2560px-DHL_Logo.svg.png',
//   },
//   {
//     _id: '23',
//     title: 'UPS',
//     price: 149,
//     info: 'Hemleverans: 1-2 dagar',
//     image:
//       'https://cutewallpaper.org/24/ups-logo-png/ups-logo-logos-de-marcas.png',
//   },
// ];

export interface payment {
  _id: string;
  title: string;
  price: number;
  info: string;
  alt: string;
}

export interface PaySelection {
  paymethod: payment;
  paychecked: boolean;
}

export const mockedPay: payment[] = [
  {
    _id: '30',
    title: 'Kortbetalning',
    price: 0,
    info: 'Direktbetalning med kort',
    alt: '(Visa, Mastercard...)',
  },
  {
    _id: '31',
    title: 'Swish',
    price: 0,
    info: 'Direktbetalning med Swish',
    alt: '',
  },
  {
    _id: '32',
    title: 'Faktura',
    price: 49,
    info: 'Faktura',
    alt: 'Betala inom 14 dagar',
  },
];

export interface PersonalData {
  email: string;
  name: string;
  phone: string;
  postnr: string;
  street: string;
}
