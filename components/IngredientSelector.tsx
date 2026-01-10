
import React, { useState } from 'react';
import { Ingredient } from '../types';

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  onConfirm: (selected: string[]) => void;
  onBack: () => void;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({ ingredients, onConfirm, onBack }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(ingredients.map(i => i.id)));
  const [newItem, setNewItem] = useState('');

  const toggleIngredient = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    // Just for the UI session, we add it to the list
    const newId = `custom-${Date.now()}`;
    // We treat this as a "virtual" addition for this view
    // In a real app we'd update parent state, but let's keep it simple
    // We can just manually trigger a selection for now
    setNewItem('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Review Ingredients</h2>
          <p className="text-gray-500">Is everything here? You can unselect items you don't want to use.</p>
        </div>
        <button 
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ingredients.map((ing) => (
          <button
            key={ing.id}
            onClick={() => toggleIngredient(ing.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
              selectedIds.has(ing.id) 
                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' 
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
              selectedIds.has(ing.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'
            }`}>
              {selectedIds.has(ing.id) && <i className="fas fa-check text-[10px]"></i>}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 truncate">{ing.name}</p>
              <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tight">{ing.category}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gray-100/50 p-6 rounded-2xl border border-gray-100">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fas fa-plus-circle text-emerald-500"></i> Missing something?
        </h4>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add manually (e.g., Salt, Flour...)"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <button 
            onClick={() => {
              if (newItem.trim()) {
                onConfirm([...ingredients.filter(i => selectedIds.has(i.id)).map(i => i.name), newItem.trim()]);
              }
            }}
            className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Add & Cook
          </button>
        </div>
      </div>

      <button
        onClick={() => onConfirm(ingredients.filter(i => selectedIds.has(i.id)).map(i => i.name))}
        disabled={selectedIds.size === 0}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i className="fas fa-magic"></i>
        Generate Recipes
      </button>
    </div>
  );
};
