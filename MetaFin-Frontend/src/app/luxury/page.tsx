"use client";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChevronDown, ArrowUp, ArrowDown, DollarSign, Car, Gauge, Calendar } from 'lucide-react';

// Type definitions
interface PredictionPoint {
  month: string;
  price: number;
}

interface CarModel {
  name: string;
  price: number;
  prediction: PredictionPoint[];
  year: number;
  mileage: string;
  trend: 'up' | 'down';
}

interface CarBrand {
  brand: string;
  models: CarModel[];
}

interface SelectedCar {
  brand: string;
  model: CarModel;
}

interface MarketTrend {
  brand: string;
  value: number;
}

// Car data with models, prices, and predicted future prices
const luxuryCars: CarBrand[] = [
  {
    brand: 'Mercedes Benz',
    models: [
      { 
        name: 'S-Class', 
        price: 120000, 
        prediction: [
          { month: 'Jun', price: 122000 },
          { month: 'Jul', price: 123500 },
          { month: 'Aug', price: 125000 },
          { month: 'Sep', price: 127000 },
          { month: 'Oct', price: 128500 },
          { month: 'Nov', price: 130000 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      },
      { 
        name: 'E-Class', 
        price: 68000, 
        prediction: [
          { month: 'Jun', price: 68500 },
          { month: 'Jul', price: 69000 },
          { month: 'Aug', price: 69800 },
          { month: 'Sep', price: 70500 },
          { month: 'Oct', price: 71200 },
          { month: 'Nov', price: 72000 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'BMW',
    models: [
      { 
        name: '7 Series', 
        price: 115000, 
        prediction: [
          { month: 'Jun', price: 116000 },
          { month: 'Jul', price: 117200 },
          { month: 'Aug', price: 118500 },
          { month: 'Sep', price: 119800 },
          { month: 'Oct', price: 121000 },
          { month: 'Nov', price: 122500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      },
      { 
        name: '5 Series', 
        price: 65000, 
        prediction: [
          { month: 'Jun', price: 65800 },
          { month: 'Jul', price: 66500 },
          { month: 'Aug', price: 67200 },
          { month: 'Sep', price: 68000 },
          { month: 'Oct', price: 68700 },
          { month: 'Nov', price: 69500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Audi',
    models: [
      { 
        name: 'A8', 
        price: 110000, 
        prediction: [
          { month: 'Jun', price: 111000 },
          { month: 'Jul', price: 112500 },
          { month: 'Aug', price: 113800 },
          { month: 'Sep', price: 115000 },
          { month: 'Oct', price: 116200 },
          { month: 'Nov', price: 117500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      },
      { 
        name: 'Q7', 
        price: 72000, 
        prediction: [
          { month: 'Jun', price: 72800 },
          { month: 'Jul', price: 73500 },
          { month: 'Aug', price: 74200 },
          { month: 'Sep', price: 75000 },
          { month: 'Oct', price: 75800 },
          { month: 'Nov', price: 76500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Porsche',
    models: [
      { 
        name: '911', 
        price: 140000, 
        prediction: [
          { month: 'Jun', price: 142000 },
          { month: 'Jul', price: 144000 },
          { month: 'Aug', price: 146000 },
          { month: 'Sep', price: 148000 },
          { month: 'Oct', price: 150000 },
          { month: 'Nov', price: 152000 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      },
      { 
        name: 'Cayenne', 
        price: 85000, 
        prediction: [
          { month: 'Jun', price: 85800 },
          { month: 'Jul', price: 86500 },
          { month: 'Aug', price: 87200 },
          { month: 'Sep', price: 88000 },
          { month: 'Oct', price: 88800 },
          { month: 'Nov', price: 89500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Range Rover',
    models: [
      { 
        name: 'Sport', 
        price: 95000, 
        prediction: [
          { month: 'Jun', price: 96000 },
          { month: 'Jul', price: 97000 },
          { month: 'Aug', price: 98000 },
          { month: 'Sep', price: 99000 },
          { month: 'Oct', price: 100000 },
          { month: 'Nov', price: 101000 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      },
      { 
        name: 'Velar', 
        price: 78000, 
        prediction: [
          { month: 'Jun', price: 78800 },
          { month: 'Jul', price: 79500 },
          { month: 'Aug', price: 80200 },
          { month: 'Sep', price: 81000 },
          { month: 'Oct', price: 81800 },
          { month: 'Nov', price: 82500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Bentley',
    models: [
      { 
        name: 'Continental GT', 
        price: 220000, 
        prediction: [
          { month: 'Jun', price: 223000 },
          { month: 'Jul', price: 226000 },
          { month: 'Aug', price: 229000 },
          { month: 'Sep', price: 232000 },
          { month: 'Oct', price: 235000 },
          { month: 'Nov', price: 238000 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Rolls Royce',
    models: [
      { 
        name: 'Ghost', 
        price: 350000, 
        prediction: [
          { month: 'Jun', price: 355000 },
          { month: 'Jul', price: 360000 },
          { month: 'Aug', price: 365000 },
          { month: 'Sep', price: 370000 },
          { month: 'Oct', price: 375000 },
          { month: 'Nov', price: 380000 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Ferrari',
    models: [
      { 
        name: 'Roma', 
        price: 280000, 
        prediction: [
          { month: 'Jun', price: 284000 },
          { month: 'Jul', price: 288000 },
          { month: 'Aug', price: 292000 },
          { month: 'Sep', price: 296000 },
          { month: 'Oct', price: 300000 },
          { month: 'Nov', price: 304000 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Jaguar',
    models: [
      { 
        name: 'F-Type', 
        price: 82000, 
        prediction: [
          { month: 'Jun', price: 82800 },
          { month: 'Jul', price: 83500 },
          { month: 'Aug', price: 84200 },
          { month: 'Sep', price: 85000 },
          { month: 'Oct', price: 85800 },
          { month: 'Nov', price: 86500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  },
  {
    brand: 'Lexus',
    models: [
      { 
        name: 'LS', 
        price: 88000, 
        prediction: [
          { month: 'Jun', price: 88800 },
          { month: 'Jul', price: 89500 },
          { month: 'Aug', price: 90200 },
          { month: 'Sep', price: 91000 },
          { month: 'Oct', price: 91800 },
          { month: 'Nov', price: 92500 },
        ],
        year: 2025,
        mileage: '0',
        trend: 'up'
      }
    ]
  }
];

// Market trend data
const marketTrendData: MarketTrend[] = [
  { brand: 'Mercedes', value: 9.2 },
  { brand: 'BMW', value: 8.7 },
  { brand: 'Audi', value: 7.8 },
  { brand: 'Porsche', value: 12.3 },
  { brand: 'Range Rover', value: 6.4 },
  { brand: 'Bentley', value: 14.8 },
  { brand: 'Rolls Royce', value: 16.2 },
  { brand: 'Ferrari', value: 18.5 },
  { brand: 'Jaguar', value: 5.2 },
  { brand: 'Lexus', value: 6.8 },
];

// Format large numbers with commas
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function LuxuryCarsMarketplace() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All Brands');
  const [selectedCar, setSelectedCar] = useState<SelectedCar | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<string>('');

  // Filter cars based on selected brand
  const filteredCars = selectedBrand === 'All Brands' 
    ? luxuryCars 
    : luxuryCars.filter(car => car.brand === selectedBrand);

  // Handle buy or sell button click
  const handleAction = (car: CarBrand, model: CarModel, action: string): void => {
    setSelectedCar({ brand: car.brand, model });
    setModalAction(action);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-6 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Luxury Cars Marketplace</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                className="bg-gray-700 text-white px-4 py-2 rounded-lg appearance-none pr-10"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option>All Brands</option>
                {luxuryCars.map((car) => (
                  <option key={car.brand} value={car.brand}>{car.brand}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Market Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Market Trends */}
          <div className="bg-gray-800 rounded-xl p-6 col-span-2">
            <h2 className="text-lg font-semibold mb-4">Market Trends (% Growth Forecast)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="brand" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                    formatter={(value) => [`${value}%`, 'Growth Rate']}
                  />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Market Stats */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Market Statistics</h2>
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 mb-1">Average Price Increase (YoY)</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">9.8%</span>
                  <ArrowUp className="ml-2 text-green-500" size={20} />
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Most Appreciating Brand</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">Ferrari</span>
                  <span className="ml-2 text-green-500 font-medium">+18.5%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Most Popular Model</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">Porsche 911</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Car Listings */}
        <div className="space-y-8">
          {filteredCars.map((car) => (
            <div key={car.brand} className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="bg-gray-700 px-6 py-4">
                <h2 className="text-xl font-bold">{car.brand}</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {car.models.map((model) => (
                  <div key={`${car.brand}-${model.name}`} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold">{model.name}</h3>
                        <div className={`flex items-center ${model.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {model.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                          <span className="ml-1 text-sm">2.4%</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-gray-400 mb-1">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span className="text-sm">{model.year}</span>
                          </div>
                          <div className="flex items-center">
                            <Gauge size={14} className="mr-1" />
                            <span className="text-sm">{model.mileage} mi</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={18} className="text-blue-500" />
                          <span className="text-xl font-bold">{formatPrice(model.price)}</span>
                        </div>
                      </div>
                      
                      {/* Price Prediction Chart */}
                      <div className="mb-4 h-32">
                        <p className="text-xs text-gray-400 mb-1">6-Month Price Forecast</p>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={model.prediction}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                            <XAxis dataKey="month" stroke="#aaa" tick={{ fontSize: 10 }} />
                            <YAxis 
                              stroke="#aaa" 
                              tick={{ fontSize: 10 }}
                              tickFormatter={(tick) => `$${Math.round(tick/1000)}k`}
                              domain={['dataMin - 2000', 'dataMax + 2000']}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                              formatter={(value:any) => [`$${formatPrice(value)}`, 'Price']}
                              labelFormatter={(label) => `${label} 2025`}
                            />
                            <Line type="monotone" dataKey="price" stroke="#3b82f6" dot={false} strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                          onClick={() => handleAction(car, model, 'buy')}
                        >
                          Buy
                        </button>
                        <button 
                          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-colors"
                          onClick={() => handleAction(car, model, 'sell')}
                        >
                          Sell
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Buy/Sell Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {modalAction === 'buy' ? 'Purchase' : 'Sell'} Confirmation
              </h3>
              <p className="mb-6">
                {modalAction === 'buy' 
                  ? `Are you sure you want to purchase this ${selectedCar.brand} ${selectedCar.model.name}?` 
                  : `Are you sure you want to list your ${selectedCar.brand} ${selectedCar.model.name} for sale?`}
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  onClick={() => {
                    // Handle transaction logic here
                    setShowModal(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}