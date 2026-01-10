
import React from 'react';
import { Recipe } from '../types';

interface RecipeListProps {
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-800">Your AI Suggestions</h2>
        <p className="text-gray-500">Delicious meals using what you have.</p>
      </div>

      <div className="grid gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="md:flex">
              <div className="md:w-1/3 bg-emerald-50 flex flex-col items-center justify-center p-8 text-center border-b md:border-b-0 md:border-r border-gray-100">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl text-emerald-500 mb-4 shadow-sm group-hover:scale-110 transition-transform">
                   <i className="fas fa-mortar-pestle"></i>
                 </div>
                 <h3 className="text-xl font-bold text-gray-800 leading-tight">{recipe.title}</h3>
                 <div className="mt-4 flex flex-wrap justify-center gap-2">
                   <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-emerald-600 border border-emerald-100 flex items-center gap-1">
                     <i className="fas fa-clock"></i> {recipe.time}
                   </span>
                   <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-blue-600 border border-blue-100 flex items-center gap-1">
                     <i className="fas fa-signal"></i> {recipe.difficulty}
                   </span>
                 </div>
              </div>
              
              <div className="md:w-2/3 p-8 flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 mb-6 italic">"{recipe.description}"</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-sm uppercase text-gray-400 tracking-widest mb-3 flex items-center gap-2">
                        <i className="fas fa-shopping-basket text-emerald-500"></i> Ingredients
                      </h4>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 mt-1.5 flex-shrink-0"></span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase text-gray-400 tracking-widest mb-3 flex items-center gap-2">
                        <i className="fas fa-list-ol text-emerald-500"></i> Instructions
                      </h4>
                      <ol className="space-y-3">
                        {recipe.instructions.map((step, i) => (
                          <li key={i} className="text-sm text-gray-600 leading-relaxed">
                            <span className="font-bold text-emerald-500 mr-2">{i + 1}.</span> {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 bg-amber-50/50 -mx-8 -mb-8 p-8 flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-amber-800 text-sm">Waste Reduction Tip</h5>
                    <p className="text-amber-700 text-sm leading-relaxed">{recipe.wasteReductionTip}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
