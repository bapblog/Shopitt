// Slice data props
export type userSliceProp =  {
  name: string;
  number: number;
  email: string;
  gender?: string;
  password: string;
  role: string;
  createdAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: string;
}
// dummy json product prop
// export type ProductsProps = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: string[];
// };
export interface productSliceProp {
  name: string;
  description: string;
  price: number;
  cuttedPrice: number;
  imgaes: string[];
  brand: string;
  category: string;
  stock: number;
  warranty?: number;
  createdAt: Date;
}

export type IconProps = {
  route: string;
  src: React.ReactNode;
  img: boolean;
};


// Product Sliders Offers - Product List
export type productsListProps = {
  image: string;
  name: string;
  offer: string;
  tag: string;
};
// Product Category Props
export type prdCatProps = {
  src: string;
  title: string;
  route: string;
};
export type ftrLinks = {
  name: string;
  redirect: string;
};
// Footer Links Props
export type footerLinksProps = {
  title: string;
  links: ftrLinks[];
};
