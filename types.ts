
export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  wasteReductionTip: string;
  calories?: number;
}

export type AppState = 'initial' | 'detecting' | 'ingredients_review' | 'generating_recipes' | 'results';
