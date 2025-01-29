import React from 'react';
import { useBikes } from '../context/BikeContext';
import { BarChart3, Package, AlertTriangle } from 'lucide-react';

export const StockStats = () => {
  const { bikes } = useBikes();

  const totalBikes = bikes.reduce((acc, bike) => acc + bike.stock, 0);
  const totalValue = bikes.reduce((acc, bike) => acc + (bike.price * bike.stock), 0);
  const lowStockThreshold = 5;
  const lowStockBikes = bikes.filter(bike => bike.stock < lowStockThreshold);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stock Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalBikes} vélos</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Valeur du Stock</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalValue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stock Faible</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowStockBikes.length} modèles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stock par Modèle</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Modèle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Marque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Valeur
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {bikes.map((bike) => (
                <tr key={bike.id} className="text-gray-900 dark:text-white">
                  <td className="px-6 py-4 whitespace-nowrap">{bike.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bike.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {typeof bike.type === 'string' ? bike.type : bike.type.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bike.stock < lowStockThreshold 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {bike.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(bike.price * bike.stock).toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};