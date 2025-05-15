import React, { useState } from 'react';

interface ProductIconGalleryProps {
  icons: string[];
  productName: string;
}

const ProductIconGallery: React.FC<ProductIconGalleryProps> = ({ icons, productName }) => {
  const [mainIcon, setMainIcon] = useState<string>(icons[0] || '📦');

  if (!icons || icons.length === 0) {
    return (
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
        <span className="text-6xl md:text-8xl" role="img" aria-label={`Ícone padrão para ${productName}`}>📦</span>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Nenhuma imagem disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/5 flex flex-col items-center p-4">
      {/* Main Icon */}
      <div
        className="w-full flex items-center justify-center mb-4 bg-gray-100 dark:bg-zinc-700 rounded-lg shadow-inner aspect-square max-w-xs md:max-w-sm lg:max-w-md"
        style={{ minHeight: '200px' }}
      >
        <span
          className="text-8xl sm:text-9xl md:text-[120px] lg:text-[150px] transition-all duration-300 ease-in-out"
          role="img"
          aria-label={`Ícone principal de ${productName}: ${mainIcon}`}
        >
          {mainIcon}
        </span>
      </div>

      {/* Thumbnails */}
      {icons.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {icons.map((icon, idx) => (
            <button
              key={idx}
              onClick={() => setMainIcon(icon)}
              className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gray-200 dark:bg-zinc-600 rounded-md shadow hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-orange-400 ${mainIcon === icon ? 'ring-2 ring-brand-blue dark:ring-orange-500 scale-105' : 'opacity-75 hover:opacity-100'}`}
              aria-label={`Mudar para ícone ${idx + 1} de ${productName}: ${icon}`}
            >
              <span className="text-3xl md:text-4xl">{icon}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductIconGallery;