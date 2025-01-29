import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bike } from '../types/bike';
import { bikeService } from '../services/bikeService';

interface BikeContextType {
  bikes: Bike[];
  loading: boolean;
  error: string | null;
  addBike: (bike: Omit<Bike, 'id'>) => Promise<void>;
  updateBike: (bike: Bike) => Promise<void>;
  deleteBike: (id: string) => Promise<void>;
  refreshBikes: () => Promise<void>;
}

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export const useBikes = () => {
  const context = useContext(BikeContext);
  if (!context) {
    throw new Error('useBikes must be used within a BikeProvider');
  }
  return context;
};

export const BikeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshBikes = async () => {
    // Skip bike fetching if the table ID is not configured
    if (!import.meta.env.VITE_BASEROW_BIKES_TABLE_ID || 
        import.meta.env.VITE_BASEROW_BIKES_TABLE_ID === 'your_bikes_table_id_here') {
      setLoading(false);
      setBikes([]);
      return;
    }

    try {
      setLoading(true);
      const fetchedBikes = await bikeService.getAllBikes();
      setBikes(fetchedBikes);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des vélos';
      setError(errorMessage);
      console.error('Error refreshing bikes:', errorMessage);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBikes();
  }, []);

  const addBike = async (newBike: Omit<Bike, 'id'>) => {
    try {
      await bikeService.createBike(newBike);
      await refreshBikes();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'ajout du vélo';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateBike = async (updatedBike: Bike) => {
    try {
      await bikeService.updateBike(updatedBike);
      await refreshBikes();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour du vélo';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteBike = async (id: string) => {
    try {
      await bikeService.deleteBike(id);
      await refreshBikes();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du vélo';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <BikeContext.Provider
      value={{
        bikes,
        loading,
        error,
        addBike,
        updateBike,
        deleteBike,
        refreshBikes,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};