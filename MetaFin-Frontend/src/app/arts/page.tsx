"use client";
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Calendar, Clock, ArrowUpRight, ArrowDownRight, DollarSign, Brush } from "lucide-react";

const FineArtsPage = () => {
  const [selectedTab, setSelectedTab] = useState("trending");

  const paintings = [
    {
      id: 1,
      name: "The Starry Night",
      artist: "Vincent van Gogh",
      year: 1889,
      currentPrice: 134500000,
      predictedPrice: 155200000,
      trend: "up",
      trendPercentage: 15.4,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuXRsUi_vW5fZKRvlB41OoexUjhckdOrURQ&s",
      priceHistory: [
        { month: "Dec", price: 120000000 },
        { month: "Jan", price: 125000000 },
        { month: "Feb", price: 127500000 },
        { month: "Mar", price: 130000000 },
        { month: "Apr", price: 134500000 },
        { month: "May", price: 138000000, predicted: true },
        { month: "Jun", price: 142500000, predicted: true },
        { month: "Jul", price: 147000000, predicted: true },
        { month: "Aug", price: 151000000, predicted: true },
        { month: "Sep", price: 155200000, predicted: true },
      ],
      rarity: "Extremely Rare",
      condition: "Excellent",
    },
    {
      id: 2,
      name: "Mona Lisa (Replica)",
      artist: "After Leonardo da Vinci",
      year: 1800,
      currentPrice: 89750000,
      predictedPrice: 82300000,
      trend: "down",
      trendPercentage: 8.3,
      image: "https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg",
      priceHistory: [
        { month: "Dec", price: 95000000 },
        { month: "Jan", price: 94200000 },
        { month: "Feb", price: 92800000 },
        { month: "Mar", price: 91000000 },
        { month: "Apr", price: 89750000 },
        { month: "May", price: 88200000, predicted: true },
        { month: "Jun", price: 86500000, predicted: true },
        { month: "Jul", price: 85000000, predicted: true },
        { month: "Aug", price: 83600000, predicted: true },
        { month: "Sep", price: 82300000, predicted: true },
      ],
      rarity: "Rare Replica",
      condition: "Very Good",
    },
    {
      id: 3,
      name: "Water Lilies",
      artist: "Claude Monet",
      year: 1919,
      currentPrice: 76200000,
      predictedPrice: 91500000,
      trend: "up",
      trendPercentage: 20.1,
      image: "https://www.artic.edu/iiif/2/3c27b499-af56-f0d5-93b5-a7f2f1ad5813/full/843,/0/default.jpg",
      priceHistory: [
        { month: "Dec", price: 68000000 },
        { month: "Jan", price: 70500000 },
        { month: "Feb", price: 72800000 },
        { month: "Mar", price: 74500000 },
        { month: "Apr", price: 76200000 },
        { month: "May", price: 79000000, predicted: true },
        { month: "Jun", price: 82500000, predicted: true },
        { month: "Jul", price: 85800000, predicted: true },
        { month: "Aug", price: 88700000, predicted: true },
        { month: "Sep", price: 91500000, predicted: true },
      ],
      rarity: "Extremely Rare",
      condition: "Good",
    },
    {
      id: 4,
      name: "The Scream",
      artist: "Edvard Munch",
      year: 1893,
      currentPrice: 124800000,
      predictedPrice: 139200000,
      trend: "up",
      trendPercentage: 11.5,
      image: "https://media.npr.org/assets/img/2012/04/30/scream_custom-9ef574d2014bd441734274f9b8a242ecb0f756dd-s1100-c50.jpg",
      priceHistory: [
        { month: "Dec", price: 115000000 },
        { month: "Jan", price: 118200000 },
        { month: "Feb", price: 120500000 },
        { month: "Mar", price: 122700000 },
        { month: "Apr", price: 124800000 },
        { month: "May", price: 127500000, predicted: true },
        { month: "Jun", price: 130800000, predicted: true },
        { month: "Jul", price: 133500000, predicted: true },
        { month: "Aug", price: 136800000, predicted: true },
        { month: "Sep", price: 139200000, predicted: true },
      ],
      rarity: "Extremely Rare",
      condition: "Excellent",
    },
    {
      id: 5,
      name: "The Persistence of Memory",
      artist: "Salvador Dalí",
      year: 1931,
      currentPrice: 65300000,
      predictedPrice: 59700000,
      trend: "down",
      trendPercentage: 8.6,
      image: "https://www.moma.org/media/W1siZiIsIjM4NjQ3MCJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=4c0635a9ee70d63f",
      priceHistory: [
        { month: "Dec", price: 68500000 },
        { month: "Jan", price: 67800000 },
        { month: "Feb", price: 67000000 },
        { month: "Mar", price: 66100000 },
        { month: "Apr", price: 65300000 },
        { month: "May", price: 64200000, predicted: true },
        { month: "Jun", price: 63000000, predicted: true },
        { month: "Jul", price: 61800000, predicted: true },
        { month: "Aug", price: 60700000, predicted: true },
        { month: "Sep", price: 59700000, predicted: true },
      ],
      rarity: "Rare",
      condition: "Very Good",
    }
  ];

  const artMarketMetrics = [
    { id: 1, name: "Impressionist", value: 243, change: "+12% YoY" },
    { id: 2, name: "Modern", value: 387, change: "+8.3% YoY" },
    { id: 3, name: "Contemporary", value: 521, change: "+24.7% YoY" },
    { id: 4, name: "Renaissance", value: 98, change: "+3.1% YoY" }
  ];

  const marketTrends = [
    { name: "Impressionist", Q1: 120, Q2: 135, Q3: 142, Q4: 158 },
    { name: "Modern", Q1: 230, Q2: 248, Q3: 265, Q4: 282 },
    { name: "Contemporary", Q1: 310, Q2: 345, Q3: 390, Q4: 430 },
    { name: "Renaissance", Q1: 90, Q2: 92, Q3: 96, Q4: 99 }
  ];
  
  const formatCurrency = (value:any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const tabs = [
    { id: "trending", label: "Trending" },
    { id: "impressionist", label: "Impressionist" },
    { id: "modern", label: "Modern" },
    { id: "contemporary", label: "Contemporary" },
    { id: "renaissance", label: "Renaissance" }
  ];

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Fine Arts Marketplace</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 px-4 py-2 rounded-md flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">May 21, 2025</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-md flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">Market Opens: 4h 22m</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Market Volume</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">$2.87B</span>
              <span className="ml-2 text-green-400 text-sm flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +12.4%
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-2">Compared to last month</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Active Auctions</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">873</span>
              <span className="ml-2 text-green-400 text-sm flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +7.9%
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-2">Compared to last month</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Average Price Increase</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">9.7%</span>
              <span className="ml-2 text-red-400 text-sm flex items-center">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                -2.3%
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-2">Year-over-year change</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-gray-400 text-sm mb-2">Market Sentiment</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">Bullish</span>
              <span className="ml-2 text-green-400 text-sm flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Positive
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-2">Based on expert analysis</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-4 mb-6 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                selectedTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Paintings */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Premium Artworks</h2>
              <div className="space-y-6">
                {paintings.map((painting) => (
                  <div key={painting.id} className="flex flex-col sm:flex-row bg-gray-900 rounded-lg overflow-hidden">
                    <div className="sm:w-56 h-auto">
                      <img
                        src={painting.image}
                        alt={painting.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{painting.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {painting.artist}, {painting.year}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 mr-2">
                              {painting.rarity}
                            </div>
                            <div className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300">
                              {painting.condition}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {formatCurrency(painting.currentPrice)}
                          </div>
                          <div className={`flex items-center justify-end text-sm ${
                            painting.trend === "up" ? "text-green-400" : "text-red-400"
                          }`}>
                            {painting.trend === "up" ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {painting.trendPercentage}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm text-gray-400 mb-1">Price Forecast (6 months)</div>
                        <div className="h-16">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={painting.priceHistory}
                              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                              <XAxis 
                                dataKey="month" 
                                tick={{ fontSize: 10, fill: '#999' }}
                                axisLine={{ stroke: '#444' }}
                              />
                              <Tooltip 
                                formatter={(value) => [formatCurrency(value), "Price"]}
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                                labelStyle={{ color: '#e5e7eb' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke={painting.trend === "up" ? "#4ade80" : "#f87171"} 
                                dot={false}
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <div className="text-sm text-gray-400">Forecast</div>
                          <div className="font-bold">
                            {formatCurrency(painting.predictedPrice)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Buy
                          </button>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center">
                            <Brush className="h-4 w-4 mr-1" />
                            Sell
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Charts and Analysis */}
          <div className="lg:col-span-1">
            {/* Market Trends */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Market Trends</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketTrends} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10, fill: '#999' }}
                      axisLine={{ stroke: '#444' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: '#999' }}
                      axisLine={{ stroke: '#444' }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                      labelStyle={{ color: '#e5e7eb' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10, color: '#999' }} />
                    <Bar dataKey="Q1" name="Q1 2025" fill="#3b82f6" />
                    <Bar dataKey="Q2" name="Q2 2025" fill="#8b5cf6" />
                    <Bar dataKey="Q3" name="Q3 2025" fill="#ec4899" />
                    <Bar dataKey="Q4" name="Q4 2025" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Art Market Index */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-6">Art Market Index</h2>
              <div className="space-y-4">
                {artMarketMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                    <div>
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-green-400 text-sm">{metric.change}</div>
                    </div>
                    <div className="text-xl font-bold">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Latest News</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-700">
                  <h3 className="font-medium">Monet's "Water Lilies" Expected to Break Records</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Art experts predict unprecedented growth in Impressionist works...
                  </p>
                  <div className="text-blue-400 text-xs mt-2">May 20, 2025</div>
                </div>
                <div className="pb-4 border-b border-gray-700">
                  <h3 className="font-medium">Digital Art Market Sees 300% Growth</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    The market for digital fine art continues to expand rapidly...
                  </p>
                  <div className="text-blue-400 text-xs mt-2">May 19, 2025</div>
                </div>
                <div>
                  <h3 className="font-medium">Van Gogh Museum Launches NFT Collection</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Amsterdam's famous museum partners with blockchain platform...
                  </p>
                  <div className="text-blue-400 text-xs mt-2">May 18, 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineArtsPage;