
import { ShopItem } from '../types';

export const shopItems: ShopItem[] = [
  {
    id: 'plant1',
    name: 'Desk Plant',
    price: 50,
    description: 'A small plant to brighten up your workspace',
    image: '🪴',
    position: { x: 75, y: 70 }
  },
  {
    id: 'coffee',
    name: 'Coffee Machine',
    price: 100,
    description: 'For those late night coding sessions',
    image: '☕',
    position: { x: 20, y: 65 }
  },
  {
    id: 'poster1',
    name: 'Motivational Poster',
    price: 30,
    description: '"Keep Coding" poster for your wall',
    image: '🖼️',
    position: { x: 85, y: 30 }
  },
  {
    id: 'lamp',
    name: 'Desk Lamp',
    price: 40,
    description: 'A stylish lamp for your desk',
    image: '💡',
    position: { x: 15, y: 30 }
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    price: 120,
    description: 'Store your coding books',
    image: '📚',
    position: { x: 40, y: 20 }
  },
  {
    id: 'beanbag',
    name: 'Bean Bag',
    price: 80,
    description: 'Comfy seat for gaming breaks',
    image: '🧶',
    position: { x: 65, y: 80 }
  },
];
