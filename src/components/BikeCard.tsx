import React from 'react';
import { Bike } from '../types/bike';
import { Edit, Eye } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
  onEdit?: (bike: Bike) => void;
  onView?: (bike: Bike) => void;
}

export const BikeCard: React.FC<BikeCardProps> = ({ bike, onEdit, onView }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img 
        src={bike.imageUrl} 
        alt={`${bike.brand} ${bike.model}`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{bike.model}</h3>
            <p className="text-gray-600 dark:text-gray-400">{bike.brand}</p>
                       <p className="text-gray-600 dark:text-gray-400">{bike.id}</p>
          </div>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
            {typeof bike.type === 'string' ? bike.type : bike.type.value}
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{bike.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {bike.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${bike.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {bike.stock > 0 ? `${bike.stock} en stock` : 'Rupture de stock'}
            </span>
            {onView && (
              <button
                onClick={() => onView(bike)}
                className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Eye size={16} />
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(bike)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Edit size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};