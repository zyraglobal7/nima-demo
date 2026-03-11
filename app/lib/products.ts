export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Crimson Rose Gothic Gown',
    price: '$289',
    category: 'dresses',
    image: '/download (3).jpg',
  },
  {
    id: 'prod_002',
    name: 'Black Leather Crop Moto Vest',
    price: '$495',
    category: 'outerwear',
    image: '/download (4).jpg',
  },
  {
    id: 'prod_003',
    name: 'Black Satin Ruched Mini Dress',
    price: '$79',
    category: 'dresses',
    image: '/download (5).jpg',
  },
  {
    id: 'prod_004',
    name: 'Burgundy Satin Wrap Mini Dress',
    price: '$64',
    category: 'dresses',
    image: '/download (6).jpg',
  },
  {
    id: 'prod_005',
    name: 'Gold Strapless Mermaid Gown',
    price: '$320',
    category: 'dresses',
    image: '/download (7).jpg',
  },
  {
    id: 'prod_006',
    name: 'White Monogram Utility Vest',
    price: '$1,250',
    category: 'outerwear',
    image: '/download (8).jpg',
  },
  {
    id: 'prod_007',
    name: 'Bronze Sport Shield Sunglasses',
    price: '$185',
    category: 'accessories',
    image: '/download (9).jpg',
  },
  {
    id: 'prod_008',
    name: 'White Strapless Cutout Mini Dress',
    price: '$88',
    category: 'dresses',
    image: '/download (10).jpg',
  },
  {
    id: 'prod_009',
    name: 'Black Red-Sole Chelsea Boots',
    price: '$640',
    category: 'shoes',
    image: '/download (11).jpg',
  },
  {
    id: 'prod_010',
    name: 'Verdusa Sweetheart Lantern Sleeve Mini Dress',
    price: '$52',
    category: 'dresses',
    image: "/Verdusa Women's Long Sleeve Sweetheart Neck Lantern Sleeve Ruched Bust Ruffle Trim Mini Dress.jpg",
  },
  {
    id: 'prod_011',
    name: 'Plus Size Zipper Puff Hem Mini Dress',
    price: '$46',
    category: 'dresses',
    image: '/Plus Size Zipper Puff Hem Sleeveless Mini Dress.jpg',
  },
  {
    id: 'prod_012',
    name: 'ASPHALT White Cargo Pants',
    price: '$135',
    category: 'bottoms',
    image: '/asphalt-cargo-pants.jpg',
  },
];

export const categories = ['all', 'dresses', 'outerwear', 'bottoms', 'shoes', 'accessories'];
