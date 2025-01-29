import api from './api';
import { LoginCredentials, RegisterData, User, UserRole } from '../types/auth';

const USERS_TABLE_ID = import.meta.env.VITE_BASEROW_USERS_TABLE_ID;

// Helper to transform Baserow user data to our User type
const transformBaserowUser = (data: any): User => ({
  id: data.id.toString(),
  email: data.email,
  firstName: data.first_name,
  lastName: data.last_name,
  role: data.role as UserRole,
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.get(`/${USERS_TABLE_ID}/`, {
        params: {
          filter__email__equal: credentials.email,
          filter__password__equal: credentials.password,
          size: 1
        },
      });
      
      if (!response.data.results || response.data.results.length === 0) {
        throw new Error('Email ou mot de passe incorrect');
      }
      
      return transformBaserowUser(response.data.results[0]);
    } catch (error) {
      // Handle Baserow specific errors
      if (error instanceof Error) {
        if (error.message.includes('ERROR_USER_NOT_IN_GROUP') || 
            error.message.includes('ERROR_TABLE_DOES_NOT_EXIST')) {
          throw new Error('Erreur de configuration de la table utilisateurs');
        }
        throw error;
      }
      throw new Error('Erreur lors de la connexion');
    }
  },

  async register(data: RegisterData): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await api.get(`/${USERS_TABLE_ID}/`, {
        params: {
          filter__email__equal: data.email,
          size: 1
        },
      });

      if (existingUser.data.results && existingUser.data.results.length > 0) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }

      // Create new user
      const response = await api.post(`/${USERS_TABLE_ID}/`, {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        role: UserRole.USER,
      });
      
      return transformBaserowUser(response.data);
    } catch (error) {
      // Handle Baserow specific errors
      if (error instanceof Error) {
        if (error.message.includes('ERROR_USER_NOT_IN_GROUP') || 
            error.message.includes('ERROR_TABLE_DOES_NOT_EXIST')) {
          throw new Error('Erreur de configuration de la table utilisateurs');
        }
        if (error.message.includes('field') || error.message.includes('column')) {
          throw new Error('Erreur de structure de la table utilisateurs');
        }
        throw error;
      }
      throw new Error('Erreur lors de l\'inscription');
    }
  },

  async getCurrentUser(userId: string): Promise<User> {
    try {
      const response = await api.get(`/${USERS_TABLE_ID}/${userId}/`);
      return transformBaserowUser(response.data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('ERROR_USER_NOT_IN_GROUP') || 
            error.message.includes('ERROR_TABLE_DOES_NOT_EXIST')) {
          throw new Error('Erreur de configuration de la table utilisateurs');
        }
      }
      throw new Error('Erreur lors de la récupération des données utilisateur');
    }
  },
};