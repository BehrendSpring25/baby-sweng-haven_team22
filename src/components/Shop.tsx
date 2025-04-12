
import React, { useState } from 'react';
import { ShopItem } from '@/types';
import { Button } from '@/components/ui/button';
import { shopItems } from '@/data/shopItems';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ShopProps {
  money: number;
  purchasedItems: ShopItem[];
  onBuyItem: (item: ShopItem) => void;
}

const Shop: React.FC<ShopProps> = ({ money, purchasedItems, onBuyItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleShop = () => setIsOpen(prev => !prev);
  
  const handleBuyItem = (item: ShopItem) => {
    if (!item.isRepeatable && purchasedItems.some((p) => p.id === item.id)) {
      toast({
        title: "Already Purchased",
        description: `You already bought the ${item.name}.`,
      });
      return;
    }
    onBuyItem(item);
  };
  
  const isItemPurchased = (itemId: string) => {
    return purchasedItems.some(item => item.id === itemId);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex flex-col items-end gap-3">
        {isOpen && (
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full mb-2 border animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Shop</h3>
              <div className="flex items-center">
                <span className="mr-1">💸</span>
                <span>{money}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shopItems.map(item => {
                const isPurchased = isItemPurchased(item.id);
                const canAfford = money >= item.price;
                
                return (
                  <div 
                    key={item.id}
                    className={cn(
                      "border rounded-lg p-3 flex flex-col",
                      isPurchased && "opacity-50"
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-3xl">{item.image}</div>
                      <div className="text-sm font-medium">${item.price}</div>
                    </div>
                    <div className="font-medium mb-1">{item.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{item.description}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBuyItem(item)}
                      disabled={isPurchased || !canAfford}
                      className="mt-auto"
                    >
                      {isPurchased ? 'Purchased' : canAfford ? 'Buy' : 'Not enough money'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <Button 
          onClick={toggleShop}
          variant="default"
          className={cn(
            "rounded-full h-14 w-14 flex items-center justify-center text-lg shadow-lg",
            isOpen ? "bg-gray-300" : "bg-game-money"
          )}
        >
          {isOpen ? '✕' : '🛒'}
        </Button>
      </div>
    </div>
  );
};

export default Shop;
