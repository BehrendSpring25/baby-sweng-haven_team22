import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import StatBar from '@/components/StatBar';
import ActivityZone from '@/components/ActivityZone';
import Character from '@/components/Character';
import Shop from '@/components/Shop';
import GameOver from '@/components/GameOver';
import { ActivityType } from '@/types';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const { state, setActivity, setPosition, buyItem, restartGame } = useGameState();
  const { stats, characterActivity, characterPosition, purchasedItems, isGameOver } = state;

  // Check which zone the character is in to highlight it
  const isInZone = (zoneType: ActivityType) => characterActivity === zoneType;

  // Handle dropping the character on a zone
  const handleZoneDrop = (zoneType: ActivityType) => {
    setActivity(zoneType);
    
    // Show feedback toast
    const messages = {
      sleep: "Zzz... Getting some rest",
      gaming: "Gaming time! Reducing stress",
      work: "Working hard for the money",
    };
    
    toast({
      title: zoneType.charAt(0).toUpperCase() + zoneType.slice(1),
      description: messages[zoneType as keyof typeof messages],
      // Removed invalid 'position' property
    });
  };

  // Handle buying items from shop
  const handleBuyItem = (item) => {
    buyItem(item);
    toast({
      title: "Purchase successful!",
      description: `You bought: ${item.name}`,
    });
  };

  // Handle moving purchased items
  const handleItemPositionChange = (id: string, newPosition: { x: number; y: number }) => {
    const updatedItems = purchasedItems.map((item) =>
      item.id === id ? { ...item, position: newPosition } : item
    );
    // Update the state with the new positions
    state.purchasedItems = updatedItems;
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB] p-4">
      <div className="container mx-auto max-w-8xl">
        <h1 className="text-3xl font-bold text-center mb-2">BabySweng</h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="px-3 py-1 bg-white rounded-full text-sm flex items-center shadow-sm">
            <span className="mr-1">💸</span>
            <span className="font-medium">{Math.floor(stats.money)}</span>
          </div>
          <div className="px-3 py-1 bg-white rounded-full text-sm flex items-center shadow-sm">
            <span className="mr-1">⭐</span>
            <span className="font-medium">Level {stats.level}</span>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBar
            label="Sleepiness"
            icon="💤"
            value={stats.sleepiness}
            color="#9b87f5"
          />
          <StatBar
            label="Stress"
            icon="😵"
            value={stats.stress}
            color="#FEC6A1"
          />
          <StatBar
            label="Experience"
            icon="⭐"
            value={stats.experience}
            color="#F2FCE2"
          />
          <StatBar
            label="Sanity"
            icon="🧠"
            value={stats.sanity}
            color="#D3E4FD"
          />
        </div>

        {/* Game area */}
        <div
          className="relative mx-auto mb-4 game-container overflow-hidden flex items-center justify-center"
          style={{ width: '1080px', height: '479px' }}
        >
          {/* Room background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/images/Game_RoomL.jpg')", // Replace with your custom image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
            }}
          ></div>

          {/* Purchased items */}
          {purchasedItems.map((item) => (
            <img
              key={item.id}
              src={item.image} // Use the image property directly
              alt={item.name}
              className="absolute z-10 cursor-move"
              draggable
              onDragStart={(e) => e.dataTransfer.setData('type', 'decoration')}
              onDragEnd={(e) => {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                if (rect) {
                  const newX = ((e.clientX - rect.left) / rect.width) * 100;
                  const newY = ((e.clientY - rect.top) / rect.height) * 100;
                  handleItemPositionChange(item.id, { x: newX, y: newY });
                }
              }}
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                width: '50px', // Adjust size as needed
                height: '50px', // Adjust size as needed
              }}
            />
          ))}

          {/* Activity zones */}
          <ActivityZone
            type="sleep"
            icon="💤"
            label="Sleep"
            isActive={characterActivity === 'sleep'}
            onDrop={() => handleZoneDrop('sleep')}
            x={50}
            y={350}
            width={300}
            height={150}
            cPos={{ ...characterPosition, width: 200, height: 200 }}
            onCharacterEnter={(type) => setActivity(type)} // Ensure activity is updated
            onCharacterLeave={() => setActivity('idle')}
          />
          <ActivityZone
            type="gaming"
            icon="🎮"
            label="Gaming"
            isActive={characterActivity === 'gaming'}
            onDrop={() => handleZoneDrop('gaming')}
            x={450}
            y={150}
            width={200}
            height={200}
            cPos={{ ...characterPosition, width: 200, height: 200 }}
            onCharacterEnter={(type) => setActivity(type)} // Ensure activity is updated
            onCharacterLeave={() => setActivity('idle')}
          />
          <ActivityZone
            type="work"
            icon="👨‍💻"
            label="Work"
            isActive={characterActivity === 'work'}
            onDrop={() => handleZoneDrop('work')}
            x={800}
            y={260}
            width={200}
            height={200}
            cPos={{ ...characterPosition, width: 200, height: 200 }}
            onCharacterEnter={(type) => setActivity(type)} // Ensure activity is updated
            onCharacterLeave={() => setActivity('idle')}
          />

          {/* Character */}
          <Character
            activity={characterActivity}
            position={characterPosition}
            onPositionChange={setPosition}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('type', 'character')}
            width={200} // Set custom width
            height={200} // Set custom height
            stats={stats} // Pass stats to determine idle character image
          />
        </div>

        {/* Shop */}
        <Shop
          money={stats.money}
          purchasedItems={purchasedItems}
          onBuyItem={handleBuyItem}
        />

        {/* Game over screen */}
        {isGameOver && (
          <GameOver
            level={stats.level}
            onRestart={restartGame}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
