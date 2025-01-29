import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '../layout/Header';
import { BikeList } from '../BikeList';
import { BikeForm } from '../BikeForm';
import { StockStats } from '../StockStats';
import { useBikes } from '../../context/BikeContext';
import { Bike } from '../../types/bike';
import { SearchFilters } from './SearchFilters';
import { useFilters } from './hooks/useFilters';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export const BikeManagement = () => {
  const { bikes, loading, error, addBike, updateBike } = useBikes();
  const [showAddForm, setShowAddForm] = useState(false);
  const [bikeToEdit, setBikeToEdit] = useState<Bike | null>(null);
  const { filteredBikes, ...filterProps } = useFilters(bikes);

  const handleAddBike = () => {
    setBikeToEdit(null);
    setShowAddForm(true);
  };

  const handleEditBike = (bike: Bike) => {
    setBikeToEdit(bike);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setBikeToEdit(null);
    setShowAddForm(false);
  };

  const handleSubmitBike = async (bike: Omit<Bike, 'id'> | Bike) => {
    try {
      if ('id' in bike) {
        await updateBike(bike);
      } else {
        await addBike(bike);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Failed to save bike:', error);
      // You might want to show an error message to the user here
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des Vélos
            </h1>
            <button
              onClick={handleAddBike}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} />
              Ajouter un vélo
            </button>
          </div>

          <StockStats />
          
          <SearchFilters {...filterProps} />

          <BikeList 
            bikes={filteredBikes} 
            onEditBike={handleEditBike}
          />

          {(showAddForm || bikeToEdit) && (
            <BikeForm
              bike={bikeToEdit}
              onClose={handleCloseForm}
              onSubmit={handleSubmitBike}
            />
          )}
        </div>
      </main>
    </div>
  );
};