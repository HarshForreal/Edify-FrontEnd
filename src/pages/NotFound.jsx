import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function NotFoundPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Array of colorful block elements to create the 404 digits
  const blockColors = [
    "bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-400", 
    "bg-purple-500", "bg-pink-400", "bg-indigo-500", "bg-orange-500",
    "bg-teal-400", "bg-cyan-500", "bg-emerald-500", "bg-lime-500",
    "bg-rose-500", "bg-amber-500", "bg-sky-500", "bg-fuchsia-500"
  ];
  
  // Function to get a random color from our palette
  const getRandomColor = () => {
    return blockColors[Math.floor(Math.random() * blockColors.length)];
  };
  
  // Generate blocks for each digit in 404
  const createBlocksForDigit = (digit, index) => {
    // Different patterns for each digit
    const patterns = {
      '4': [
        [0,0,0,1,0],
        [0,0,1,1,0],
        [0,1,0,1,0],
        [1,1,1,1,1],
        [0,0,0,1,0],
        [0,0,0,1,0],
      ],
      '0': [
        [0,1,1,1,0],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [1,0,0,0,1],
        [0,1,1,1,0],
      ]
    };
    
    const pattern = patterns[digit];
    
    return (
      <div key={index} className="mx-1 md:mx-4 inline-block">
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, cellIndex) => (
              cell === 1 ? (
                <div 
                  key={cellIndex}
                  className={`${getRandomColor()} w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 m-0.5 rounded-sm shadow-md transform transition-all duration-300 ${isLoaded ? 'scale-100' : 'scale-0'}`}
                  style={{ transitionDelay: `${(rowIndex * 5 + cellIndex) * 20 + index * 100}ms` }}
                />
              ) : (
                <div key={cellIndex} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 m-0.5" />
              )
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="font-bold mb-4 sm:mb-6 text-center">
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
            {['4', '0', '4'].map((digit, index) => createBlocksForDigit(digit, index))}
          </div>
        </h1>
      </div>
      
      <div className={`text-center transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-4 md:px-0`} 
           style={{ transitionDelay: '800ms' }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Oops! This page doesn't exist.</h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6 md:mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
        
        <a href="/" className="inline-flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300 group">
          <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          Home page
        </a>
      </div>
    </div>
  );
}