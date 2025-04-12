import { ShopItem } from '../types';

export const shopItems: ShopItem[] = [
  {
    id: 'plant1',
    name: 'Desk Plant',
    price: 50,
    description: 'A small plant to brighten up your workspace',
    image: '/assets/images/desk_plant.png',
    loadedImage: (() => {
      const img = new Image();
      img.src = '/assets/images/desk_plant.png';
      return img;
    })(),
    position: { x: 75, y: 70 },
    isRepeatable: false,
    effects: {sanity: 0.8},
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 100,
    description: 'For those late night coding sessions',
    image: '/assets/images/coffee.png',
    loadedImage: (() => {
      const img = new Image();
      img.src = '/assets/images/coffee.png';
      return img;
    })(),
    position: { x: 20, y: 65 },
    isRepeatable: false,
    effects: {sleepiness: 0.8}
  },
  {
    id: 'poster1',
    name: 'Motivational Poster',
    price: 30,
    description: '"Keep Coding" poster for your wall',
    image: '/assets/images/Poster.png',
    loadedImage: (() => {
      const img = new Image();
      img.src = '/assets/images/Poster.png';
      return img;
    })(),
    position: { x: 85, y: 30 },
    isRepeatable: false,
    effects: {experience: 1.5}
  },
  {
    id: 'lamp',
    name: 'Desk Lamp',
    price: 40,
    description: 'A stylish lamp for your desk',
    image: '/assets/images/desk_lamp.png',
    loadedImage: (() => {
      const img = new Image();
      img.src = '/assets/images/desk_lamp.png';
      return img;
    })(),
    position: { x: 15, y: 30 },
    isRepeatable: false,
    effects: {sanity: 0.9}
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    price: 120,
    description: 'Store your coding books',
    image: '/assets/images/bookshelf.png',
    loadedImage: (() => {
      const img = new Image();
      img.src = '/assets/images/bookshelf.png';
      return img;
    })(),
    position: { x: 40, y: 20 },
    isRepeatable: false,
    effects: {experience: 1.2}
  },
  {
    id: 'beanbag',
    name: 'Bean Bag',
    price: 80,
    description: 'Comfy seat for gaming breaks',
    image: '/assets/images/bean_bag.png',
    loadedImage: (() => {
      const img = new Image();
      img.src = '/assets/images/bean_bag.png';
      return img;
    })(),
    position: { x: 65, y: 80 },
    isRepeatable: false,
    effects: {stress: 0.85}
  },
  {
    id: 'bodyPillow',
    name: 'Body Pillow',
    price: 300,
    description: 'For those who need a hug',
    image: '/assets/images/BodyPillow.png',
    loadedImage: (() => {
      const img = new Image();
      img.src = '/assets/images/BodyPillow.png';
      return img;
    })(),
    position: { x: 50, y: 50 },
    isRepeatable: false,
    effects: {stress: 0.8}
  }
];
