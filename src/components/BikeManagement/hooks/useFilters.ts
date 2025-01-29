import { useState, useMemo } from 'react';
import { Bike, BikeType } from '../../../types/bike';

export const useFilters = (bikes: Bike[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<BikeType | ''>('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const matchesSearch = 
        searchTerm === '' ||
        bike.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = 
        selectedType === '' || 
        bike.type === selectedType;

      const matchesMinPrice = 
        minPrice === '' || 
        bike.price >= parseFloat(minPrice);

      const matchesMaxPrice = 
        maxPrice === '' || 
        bike.price <= parseFloat(maxPrice);

      return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice;
    });
  }, [bikes, searchTerm, selectedType, minPrice, maxPrice]);

  return {
    filteredBikes,
    searchTerm,
    selectedType,
    minPrice,
    maxPrice,
    onSearchChange: setSearchTerm,
    onTypeChange: setSelectedType,
    onMinPriceChange: setMinPrice,
    onMaxPriceChange: setMaxPrice,
  };
};