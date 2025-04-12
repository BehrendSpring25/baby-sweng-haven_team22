import React, { useEffect, useRef } from 'react';
import { shopItems } from '@/data/shopItems';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderImage = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
    if (image.complete && image.naturalWidth > 0) {
      ctx.drawImage(image, x, y, width, height);
    } else {
      image.onload = () => {
        ctx.drawImage(image, x, y, width, height);
      };
      image.onerror = () => {
        console.error(`Failed to load image at position (${x}, ${y})`);
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each shop item on the canvas
    shopItems.forEach(item => {
      if (item.loadedImage) {
        renderImage(ctx, item.loadedImage, item.position.x, item.position.y, 50, 50); // Adjust size as needed
      } else {
        console.error(`Image not loaded for item: ${item.name}`);
      }
    });
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Canvas;
