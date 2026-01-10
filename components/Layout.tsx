
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-200">
              <i className="fas fa-utensils"></i>
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-800 leading-none">PantryPal</h1>
              <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider">AI Kitchen Assistant</span>
            </div>
          </div>
          <nav className="flex items-center gap-4">
             <button onClick={() => window.location.reload()} className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
               <i className="fas fa-redo mr-1"></i> Start Over
             </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">Made with 💚 to reduce global food waste.</p>
        </div>
      </footer>
    </div>
  );
};
