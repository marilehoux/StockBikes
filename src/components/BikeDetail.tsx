import React, { useState } from 'react';
import { X, Edit2, Save } from 'lucide-react';
import { Bike } from '../types/bike';

interface BikeDetailProps {
  bike: Bike;
  onClose: () => void;
  onUpdate: (updatedBike: Bike) => void;
}

type TabType = 'commercial' | 'technical';

export const BikeDetail: React.FC<BikeDetailProps> = ({ bike, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('commercial');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBike, setEditedBike] = useState<Bike>(bike);

  const handleInputChange = (
    field: keyof Bike | keyof TechnicalSpecs | keyof CommercialDesc,
    value: any,
    section?: 'technicalSpecs' | 'commercialDesc'
  ) => {
    if (section) {
      setEditedBike((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setEditedBike((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayInputChange = (
    field: 'highlights' | 'advantages' | 'sizes',
    value: string,
    index: number,
    section: 'technicalSpecs' | 'commercialDesc'
  ) => {
    setEditedBike((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item: string, i: number) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const handleSave = () => {
    onUpdate(editedBike);
    setIsEditing(false);
  };

  const renderCommercialTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Points forts</h3>
        {isEditing ? (
          <div className="space-y-2">
            {editedBike.commercialDesc.highlights.map((highlight, index) => (
              <input
                key={index}
                type="text"
                value={highlight}
                onChange={(e) =>
                  handleArrayInputChange(
                    'highlights',
                    e.target.value,
                    index,
                    'commercialDesc'
                  )
                }
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {bike.commercialDesc.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Public cible</h3>
        {isEditing ? (
          <textarea
            value={editedBike.commercialDesc.targetAudience}
            onChange={(e) =>
              handleInputChange('targetAudience', e.target.value, 'commercialDesc')
            }
            className="w-full p-2 border rounded"
            rows={3}
          />
        ) : (
          <p>{bike.commercialDesc.targetAudience}</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Usage recommandé</h3>
        {isEditing ? (
          <textarea
            value={editedBike.commercialDesc.usage}
            onChange={(e) =>
              handleInputChange('usage', e.target.value, 'commercialDesc')
            }
            className="w-full p-2 border rounded"
            rows={3}
          />
        ) : (
          <p>{bike.commercialDesc.usage}</p>
        )}
      </div>
    </div>
  );

  const renderTechnicalTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Cadre</h3>
          {isEditing ? (
            <input
              type="text"
              value={editedBike.technicalSpecs.frame}
              onChange={(e) =>
                handleInputChange('frame', e.target.value, 'technicalSpecs')
              }
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{bike.technicalSpecs.frame}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Fourche</h3>
          {isEditing ? (
            <input
              type="text"
              value={editedBike.technicalSpecs.fork}
              onChange={(e) =>
                handleInputChange('fork', e.target.value, 'technicalSpecs')
              }
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{bike.technicalSpecs.fork}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Transmission</h3>
          {isEditing ? (
            <input
              type="text"
              value={editedBike.technicalSpecs.groupset}
              onChange={(e) =>
                handleInputChange('groupset', e.target.value, 'technicalSpecs')
              }
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{bike.technicalSpecs.groupset}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Freins</h3>
          {isEditing ? (
            <input
              type="text"
              value={editedBike.technicalSpecs.brakes}
              onChange={(e) =>
                handleInputChange('brakes', e.target.value, 'technicalSpecs')
              }
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{bike.technicalSpecs.brakes}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Roues</h3>
          {isEditing ? (
            <input
              type="text"
              value={editedBike.technicalSpecs.wheels}
              onChange={(e) =>
                handleInputChange('wheels', e.target.value, 'technicalSpecs')
              }
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{bike.technicalSpecs.wheels}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Pneus</h3>
          {isEditing ? (
            <input
              type="text"
              value={editedBike.technicalSpecs.tires}
              onChange={(e) =>
                handleInputChange('tires', e.target.value, 'technicalSpecs')
              }
              className="w-full p-2 border rounded"
            />
          ) : (
            <p>{bike.technicalSpecs.tires}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Poids</h3>
          {isEditing ? (
            <input
              type="number"
              value={editedBike.technicalSpecs.weight}
              onChange={(e) =>
                handleInputChange('weight', Number(e.target.value), 'technicalSpecs')
              }
              className="w-full p-2 border rounded"
              step="0.1"
            />
          ) : (
            <p>{bike.technicalSpecs.weight} kg</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Tailles disponibles</h3>
          {isEditing ? (
            <div className="space-y-2">
              {editedBike.technicalSpecs.sizes.map((size, index) => (
                <input
                  key={index}
                  type="text"
                  value={size}
                  onChange={(e) =>
                    handleArrayInputChange(
                      'sizes',
                      e.target.value,
                      index,
                      'technicalSpecs'
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              ))}
            </div>
          ) : (
            <p>{bike.technicalSpecs.sizes.join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold dark:text-white">
              {bike.brand} - {bike.model}
            </h2>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <Edit2 size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                >
                  <Save size={20} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'commercial'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              Description commerciale
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'technical'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              Caractéristiques techniques
            </button>
          </div>
        </div>

        <div className="p-6 dark:text-white">
          {activeTab === 'commercial' ? renderCommercialTab() : renderTechnicalTab()}
        </div>
      </div>
    </div>
  );
};