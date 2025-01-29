import { Bike, BikeType } from '../types/bike';

export const bikes: Bike[] = [
  {
    id: '1',
    model: 'Explorer Pro',
    brand: 'VéloTech',
    type: BikeType.MOUNTAIN,
    price: 1299.99,
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80&w=2048',
    description: 'VTT performant pour les sentiers difficiles',
    technicalSpecs: {
      frame: 'Aluminium 6061-T6 double butted',
      fork: 'RockShox Recon RL 130mm',
      groupset: 'Shimano Deore 12 vitesses',
      brakes: 'Shimano MT200 hydrauliques',
      wheels: 'WTB ST i25 TCS 2.0',
      tires: 'Maxxis Ardent 29x2.4',
      weight: 13.5,
      sizes: ['S', 'M', 'L', 'XL']
    },
    commercialDesc: {
      highlights: [
        'Géométrie moderne et agressive',
        'Transmission 12 vitesses haute performance',
        'Fourche suspendue premium'
      ],
      targetAudience: 'Vététistes passionnés cherchant un vélo polyvalent pour trails techniques',
      usage: 'All-mountain, sentiers techniques, randonnées sportives',
      advantages: [
        'Excellent rapport qualité-prix',
        'Composants fiables et durables',
        'Facile à upgrader'
      ]
    }
  },
  {
    id: '2',
    model: 'CityGlide',
    brand: 'UrbanRider',
    type: BikeType.CITY,
    price: 899.99,
    stock: 7,
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=2048',
    description: 'Vélo urbain confortable et élégant',
    technicalSpecs: {
      frame: 'Aluminium 6061 hydroformé',
      fork: 'Carbone monocoque',
      groupset: 'Shimano Nexus 8 vitesses',
      brakes: 'Shimano MT201 hydrauliques',
      wheels: 'Alex Rims DP23',
      tires: 'Schwalbe Marathon 700x35c',
      weight: 12.8,
      sizes: ['S', 'M', 'L']
    },
    commercialDesc: {
      highlights: [
        'Design élégant et urbain',
        'Moyeu à vitesses intégrées',
        'Équipement complet pour la ville'
      ],
      targetAudience: 'Cyclistes urbains à la recherche d\'un vélo fiable et stylé',
      usage: 'Déplacements quotidiens, balades urbaines',
      advantages: [
        'Entretien minimal',
        'Confort optimal',
        'Équipement complet'
      ]
    }
  },
  {
    id: '3',
    model: 'SpeedMaster',
    brand: 'VéloTech',
    type: BikeType.ROAD,
    price: 2499.99,
    stock: 3,
    imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=2048',
    description: 'Vélo de route haute performance',
    technicalSpecs: {
      frame: 'Carbone T700 monocoque',
      fork: 'Carbone T700',
      groupset: 'Shimano Ultegra R8000',
      brakes: 'Shimano Ultegra R8000',
      wheels: 'DT Swiss P1800',
      tires: 'Continental GP5000 700x25c',
      weight: 7.8,
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    commercialDesc: {
      highlights: [
        'Cadre carbone haute performance',
        'Groupe Ultegra complet',
        'Roues aérodynamiques'
      ],
      targetAudience: 'Cyclistes sur route passionnés et compétiteurs',
      usage: 'Compétition, sorties sportives, gran fondo',
      advantages: [
        'Performance exceptionnelle',
        'Légèreté',
        'Aérodynamisme optimisé'
      ]
    }
  }
];