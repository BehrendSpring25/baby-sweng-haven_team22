
import { ShopItem } from '../types';

export const shopItems: ShopItem[] = [
  {
    id: 'plant1',
    name: 'Desk Plant',
    price: 50,
    description: 'A small plant to brighten up your workspace',
    image: '🪴',
    position: { x: 75, y: 70 },
    isRepeatable: false,
    effects: {sanity: 0.8},
  },
  {
    id: 'coffee',
    name: 'Coffee',
    price: 100,
    description: 'For those late night coding sessions',
    image: '☕',
    position: { x: 20, y: 65 },
    isRepeatable: false,
    effects: {sleepiness: 0.8}

  },
  {
    id: 'poster1',
    name: 'Motivational Poster',
    price: 30,
    description: '"Keep Coding" poster for your wall',
    image: '🖼️',
    position: { x: 85, y: 30 },
    isRepeatable: false,
    effects: {experience: 1.5}
  },
  {
    id: 'lamp',
    name: 'Desk Lamp',
    price: 40,
    description: 'A stylish lamp for your desk',
    image: '💡',
    position: { x: 15, y: 30 },
    isRepeatable: false,
    effects: {sanity: 0.9}
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    price: 120,
    description: 'Store your coding books',
    image: '📚',
    position: { x: 40, y: 20 },
    isRepeatable: false,
    effects: {experience: 1.2}
  },
  {
    id: 'beanbag',
    name: 'Bean Bag',
    price: 80,
    description: 'Comfy seat for gaming breaks',
    image: '🧶',
    position: { x: 65, y: 80 },
    isRepeatable: false,
    effects: {stress: 0.85}
  },
];
