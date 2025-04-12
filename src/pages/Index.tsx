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

  return (
    <div className="min-h-screen bg-[#F1F0FB] p-4">
      <div className="container mx-auto max-w-4xl">
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
        <div className="relative bg-white rounded-xl shadow-md h-[400px] md:h-[500px] mb-4 game-container overflow-hidden">
          {/* Room background with a subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/images/Game_Room.png')", // Replace with your custom image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          {/* Purchased items */}
          {purchasedItems.map((item) => (
            <div
              key={item.id}
              className="absolute text-4xl md:text-5xl z-10"
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
              }}
            >
              {item.image}
            </div>
          ))}

          {/* Activity zones */}
          <ActivityZone
            type="sleep"
            icon="💤"
            label="Sleep"
            isActive={isInZone('sleep')}
            onDrop={() => handleZoneDrop('sleep')}
            x={100}
            y={370}
            width={300}
            height={150}
            cPos={characterPosition}
            onCharacterEnter={(type) => setActivity(type)}
            onCharacterLeave={() => setActivity('idle')}
          />
          <ActivityZone
            type="gaming"
            icon="🎮"
            label="Gaming"
            isActive={isInZone('gaming')}
            onDrop={() => handleZoneDrop('gaming')}
            x={120}
            y={180}
            width={200}
            height={200}
            cPos={characterPosition}
            onCharacterEnter={(type) => setActivity(type)}
            onCharacterLeave={() => setActivity('idle')}
          />
          <ActivityZone
            type="work"
            icon="👨‍💻"
            label="Work"
            isActive={isInZone('work')}
            onDrop={() => handleZoneDrop('work')}
            x={500}
            y={200}
            width={200}
            height={200}
            cPos={characterPosition}
            onCharacterEnter={(type) => setActivity(type)}
            onCharacterLeave={() => setActivity('idle')}
          />

          {/* Character */}
          <Character
            activity={characterActivity}
            position={characterPosition}
            onPositionChange={setPosition}
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
