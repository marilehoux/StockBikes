import api from './api';
import { Bike, BikeType } from '../types/bike';

const BIKES_TABLE_ID = import.meta.env.VITE_BASEROW_BIKES_TABLE_ID;

const safeArrayFromString = (str: string | null | undefined, separator: string = ',') => {
  if (!str) return [];
  try {
    return str.split(separator).map(item => item.trim()).filter(Boolean);
  } catch (error) {
    console.error('Error parsing array from string:', error);
    return [];
  }
};

export const bikeService = {
  async getAllBikes(): Promise<Bike[]> {
    try {
      console.log('Fetching bikes from table:', BIKES_TABLE_ID);
      const response = await api.get(`/${BIKES_TABLE_ID}/`);
      console.log('Raw API response:', response.data);

      if (!response.data.results) {
        console.error('No results found in API response');
        return [];
      }

      return response.data.results.map((bike: any) => ({
        id: bike.id.toString(),
        model: bike.model || '',
        brand: bike.brand || '',
        type: bike.type || BikeType.ROAD,
        price: Number(bike.price) || 0,
        stock: Number(bike.stock) || 0,
        imageUrl: bike.image_url || '',
        description: bike.description || '',
        technicalSpecs: {
          frame: bike.frame || '',
          fork: bike.fork || '',
          groupset: bike.groupset || '',
          brakes: bike.brakes || '',
          wheels: bike.wheels || '',
          tires: bike.tires || '',
          weight: Number(bike.weight) || 0,
          sizes: safeArrayFromString(bike.sizes),
        },
        commercialDesc: {
          highlights: safeArrayFromString(bike.highlights, '\n'),
          targetAudience: bike.target_audience || '',
          usage: bike.usage || '',
          advantages: safeArrayFromString(bike.advantages, '\n'),
        },
      }));
    } catch (error) {
      console.error('Error fetching bikes:', error);
      throw new Error('Impossible de récupérer les vélos. Vérifiez votre connexion et les identifiants Baserow.');
    }
  },

  async createBike(bike: Omit<Bike, 'id'>): Promise<Bike> {
    try {
      console.log('Creating new bike with data:', bike);
      const response = await api.post(`/${BIKES_TABLE_ID}/`, {
        model: bike.model,
        brand: bike.brand,
        type: bike.type,
        price: bike.price,
        stock: bike.stock,
        image_url: bike.imageUrl,
        description: bike.description,
        //frame: bike.technicalSpecs.frame,
        //fork: bike.technicalSpecs.fork,
        //groupset: bike.technicalSpecs.groupset,
        //brakes: bike.technicalSpecs.brakes,
        //wheels: bike.technicalSpecs.wheels,
        //tires: bike.technicalSpecs.tires,
        //weight: bike.technicalSpecs.weight,
        //sizes: bike.technicalSpecs.sizes.join(', '),
        //highlights: bike.commercialDesc.highlights.join('\n'),
        //target_audience: bike.commercialDesc.targetAudience,
        //usage: bike.commercialDesc.usage,
        //advantages: bike.commercialDesc.advantages.join('\n'),
      });

      console.log('Create bike response:', response.data);
      return this.transformBikeResponse(response.data);
    } catch (error) {
      console.error('Error creating bike:', error);
      throw new Error('Impossible de créer le vélo. Vérifiez votre connexion et les identifiants Baserow.');
    }
  },

  async updateBike(bike: Bike): Promise<Bike> {
    try {
      console.log('Updating bike with ID:', bike.id, 'Data:', bike);
      const response = await api.patch(`/${BIKES_TABLE_ID}/0/move`, {
        //${bike.id}
        model: bike.model,
        brand: bike.brand,
        type: bike.type,
        price: bike.price,
        stock: bike.stock,
        image_url: bike.imageUrl,
        description: bike.description,
        frame: bike.technicalSpecs.frame,
        fork: bike.technicalSpecs.fork,
        groupset: bike.technicalSpecs.groupset,
        brakes: bike.technicalSpecs.brakes,
        wheels: bike.technicalSpecs.wheels,
        tires: bike.technicalSpecs.tires,
        weight: bike.technicalSpecs.weight,
        sizes: bike.technicalSpecs.sizes.join(', '),
        highlights: bike.commercialDesc.highlights.join('\n'),
        target_audience: bike.commercialDesc.targetAudience,
        usage: bike.commercialDesc.usage,
        advantages: bike.commercialDesc.advantages.join('\n'),
      });

      console.log('Update bike response:', response.data);
      return this.transformBikeResponse(response.data);
    } catch (error) {
      console.error('Error updating bike:', error);
      throw new Error('Impossible de mettre à jour le vélo. Vérifiez votre connexion et les identifiants Baserow.');
    }
  },

  async deleteBike(id: string): Promise<void> {
    try {
      console.log('Deleting bike with ID:', id);
      await api.delete(`/${BIKES_TABLE_ID}/${id}/`);
      console.log('Bike deleted successfully');
    } catch (error) {
      console.error('Error deleting bike:', error);
      throw new Error('Impossible de supprimer le vélo. Vérifiez votre connexion et les identifiants Baserow.');
    }
  },

  transformBikeResponse(data: any): Bike {
    try {
      return {
        id: data.id.toString(),
        model: data.model || '',
        brand: data.brand || '',
        type: data.type || BikeType.ROAD,
        price: Number(data.price) || 0,
        stock: Number(data.stock) || 0,
        imageUrl: data.image_url || '',
        description: data.description || '',
        technicalSpecs: {
          frame: data.frame || '',
          fork: data.fork || '',
          groupset: data.groupset || '',
          brakes: data.brakes || '',
          wheels: data.wheels || '',
          tires: data.tires || '',
          weight: Number(data.weight) || 0,
          sizes: safeArrayFromString(data.sizes),
        },
        commercialDesc: {
          highlights: safeArrayFromString(data.highlights, '\n'),
          targetAudience: data.target_audience || '',
          usage: data.usage || '',
          advantages: safeArrayFromString(data.advantages, '\n'),
        },
      };
    } catch (error) {
      console.error('Error transforming bike response:', error);
      throw new Error('Erreur lors de la transformation des données du vélo');
    }
  },
};