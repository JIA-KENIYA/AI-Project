
import React, { useState, useEffect } from 'react';

interface LoadingViewProps {
  type: 'detecting' | 'generating';
}

const detectingMessages = [
  "Peeking into your fridge...",
  "Identifying that half-empty jar of pickles...",
  "Counting your onions...",
  "Organizing your pantry shelves...",
  "Looking for hidden treasures..."
];

const generatingMessages = [
  "Consulting the master chefs...",
  "Dreaming up delicious recipes...",
  "Checking for the perfect balance of flavors...",
  "Optimizing for minimum food waste...",
  "Sprinkling some culinary magic..."
];

export const LoadingView: React.FC<LoadingViewProps> = ({ type }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = type === 'detecting' ? detectingMessages : generatingMessages;

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl text-emerald-500">
           <i className={type === 'detecting' ? "fas fa-search" : "fas fa-magic"}></i>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{messages[msgIndex]}</h3>
      <p className="text-gray-500 max-w-xs mx-auto">Please wait while we process your request...</p>
    </div>
  );
};
