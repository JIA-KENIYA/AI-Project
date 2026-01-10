
import React, { useState, useRef } from 'react';
import { Layout } from './components/Layout';
import { Ingredient, Recipe, AppState } from './types';
import { detectIngredients, generateRecipes } from './services/geminiService';
import { LoadingView } from './components/LoadingView';
import { IngredientSelector } from './components/IngredientSelector';
import { RecipeList } from './components/RecipeList';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('initial');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setState('detecting');
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const detected = await detectIngredients(base64);
        setIngredients(detected);
        setState('ingredients_review');
      };
      reader.onerror = () => {
        throw new Error("Failed to read image file");
      };
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong while analyzing your photo. Please try again.");
      setState('initial');
    }
  };

  const onConfirmIngredients = async (selected: string[]) => {
    setState('generating_recipes');
    setError(null);
    try {
      const suggested = await generateRecipes(selected);
      setRecipes(suggested);
      setState('results');
    } catch (err: any) {
      console.error(err);
      setError("Failed to cook up some recipes. Our chefs are taking a break. Please try again!");
      setState('ingredients_review');
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'initial':
        return (
          <div className="flex flex-col items-center justify-center py-12 space-y-12">
            <div className="text-center max-w-lg space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Turn your <span className="text-emerald-500 underline decoration-emerald-200 decoration-8">scraps</span> into <span className="text-orange-500 underline decoration-orange-200 decoration-8">meals</span>.
              </h2>
              <p className="text-gray-500 text-lg md:text-xl">
                Snap a photo of your fridge or pantry, and let AI suggest delicious recipes using what you already have.
              </p>
            </div>

            <div className="w-full max-w-md">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative cursor-pointer aspect-[4/3] bg-white border-4 border-dashed border-emerald-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all shadow-2xl shadow-emerald-100"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-3xl text-white shadow-xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-camera"></i>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-800">Upload Food Photo</p>
                  <p className="text-gray-400 text-sm">JPG or PNG supported</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
               {[
                 { icon: 'fa-recycle', title: 'Zero Waste', desc: 'Use every bit of your groceries.' },
                 { icon: 'fa-bolt', title: 'Instant Ideas', desc: 'No more searching for hours.' },
                 { icon: 'fa-magic', title: 'AI Powered', desc: 'Personalized to your pantry.' }
               ].map((feat, i) => (
                 <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                   <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
                     <i className={`fas ${feat.icon}`}></i>
                   </div>
                   <h4 className="font-bold text-gray-800 mb-1">{feat.title}</h4>
                   <p className="text-gray-400 text-xs">{feat.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        );

      case 'detecting':
        return <LoadingView type="detecting" />;

      case 'ingredients_review':
        return (
          <IngredientSelector 
            ingredients={ingredients} 
            onConfirm={onConfirmIngredients}
            onBack={() => setState('initial')}
          />
        );

      case 'generating_recipes':
        return <LoadingView type="generating" />;

      case 'results':
        return <RecipeList recipes={recipes} />;

      default:
        return null;
    }
  };

  return (
    <Layout>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600">
          <i className="fas fa-exclamation-circle mt-1"></i>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
      {renderContent()}
    </Layout>
  );
};

export default App;
