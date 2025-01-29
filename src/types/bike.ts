export interface Bike {
  id: string;
  model: string;
  brand: string;
  type: BikeType;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
  technicalSpecs: TechnicalSpecs;
  commercialDesc: CommercialDesc;
}

export interface TechnicalSpecs {
  frame: string;
  fork: string;
  groupset: string;
  brakes: string;
  wheels: string;
  tires: string;
  weight: number;
  sizes: string[];
}

export interface CommercialDesc {
  highlights: string[];
  targetAudience: string;
  usage: string;
  advantages: string[];
}

export enum BikeType {
  ROAD = 'ROUTE',
  MOUNTAIN = 'VTT',
  ELECTRIC = 'ÉLECTRIQUE',
  CITY = 'VILLE',
  HYBRID = 'HYBRIDE'
}