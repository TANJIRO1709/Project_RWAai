"use client";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Home, 
  Map, 
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  TooltipProps
} from 'recharts';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import cn from 'clsx';

// Define interfaces for data structures
interface TradeData {
  date: string;
  buy: number;
  sell: number;
  transactions: number;
}

interface PriceData {
  region: string;
  price: number;
  size: number;
  growth: number;
}

interface PredictionData {
  month: string;
  price: number;
  trend: string;
}

interface PropertyTypeData {
  name: string;
  value: number;
}

interface Listing {
  id: number;
  address: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  sqm: number;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

// Enhanced data with more realistic values and details
const tradeData: TradeData[] = [
  { date: 'Apr 1', buy: 45000000, sell: 52000000, transactions: 342 },
  { date: 'Apr 2', buy: 48000000, sell: 51000000, transactions: 287 },
  { date: 'Apr 3', buy: 50000000, sell: 49000000, transactions: 310 },
  { date: 'Apr 4', buy: 47000000, sell: 53000000, transactions: 295 },
  { date: 'Apr 5', buy: 51000000, sell: 50000000, transactions: 330 },
  { date: 'Apr 6', buy: 53000000, sell: 48000000, transactions: 275 },
  { date: 'Apr 7', buy: 49000000, sell: 51500000, transactions: 318 },
];

const priceData: PriceData[] = [
  { region: 'Yogyakarta', price: 12320, size: 12320, growth: 5.2 },
  { region: 'Bandung', price: 9260, size: 9260, growth: 3.8 },
  { region: 'Jakarta', price: 18320, size: 18320, growth: 7.2 },
  { region: 'Surabaya', price: 7150, size: 7150, growth: 2.9 },
  { region: 'Bali', price: 15200, size: 15200, growth: 8.4 },
];

const predictionData: PredictionData[] = [
  { month: 'May', price: 50000000, trend: 'stable' },
  { month: 'Jun', price: 52000000, trend: 'up' },
  { month: 'Jul', price: 51000000, trend: 'down' },
  { month: 'Aug', price: 53000000, trend: 'up' },
  { month: 'Sep', price: 55000000, trend: 'up' },
  { month: 'Oct', price: 57500000, trend: 'up' },
];

const propertyTypeData: PropertyTypeData[] = [
  { name: 'Apartments', value: 35 },
  { name: 'Houses', value: 40 },
  { name: 'Villas', value: 15 },
  { name: 'Land', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentListings: Listing[] = [
  { id: 1, address: "123 Palm Ave, Jakarta", price: 750000000, type: "Apartment", beds: 3, baths: 2, sqm: 120 },
  { id: 2, address: "45 Sunset Blvd, Bali", price: 1250000000, type: "Villa", beds: 4, baths: 3, sqm: 210 },
  { id: 3, address: "78 Mountain View, Bandung", price: 450000000, type: "House", beds: 2, baths: 1, sqm: 85 },
];

// Custom number formatter for currency
const formatCurrency = (value: number): string => {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(1)}K`;
  }
  return `Rp ${value}`;
};

// Custom tooltip for charts
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-4 rounded-md shadow-lg">
        <p className="text-gray-300 font-medium">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${formatCurrency(entry.value as number)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RealEstateDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 7),
  });
  
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [listingsView, setListingsView] = useState<string>('grid');
  
  // Effect to simulate data loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate metrics based on data
  const totalBuy = tradeData.reduce((sum, item) => sum + item.buy, 0);
  const totalSell = tradeData.reduce((sum, item) => sum + item.sell, 0);
  const avgPrice = totalSell / tradeData.reduce((sum, item) => sum + item.transactions, 0);
  const marketTrend = totalSell > totalBuy ? 'up' : 'down';
  const percentChange = ((totalSell - totalBuy) / totalBuy * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with navigation */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Home className="h-6 w-6 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold">RealEstateInsight</h1>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'overview' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'analytics' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('properties')}
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'properties' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Properties
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'map' ? 'bg-gray-700 text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Map
            </button>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Date Range & Filter controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Real Estate Market Dashboard</h2>
            <p className="text-gray-400">Comprehensive analytics and insights for the Indonesian property market</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Regions</option>
                {priceData.map(item => (
                  <option key={item.region}>{item.region}</option>
                ))}
              </select>
              <Map className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center space-x-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg text-sm">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <span>
                    {dateRange.from && dateRange.to
                      ? `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
                      : 'Select Date Range'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-gray-800 text-white border border-gray-700 rounded-lg p-4 shadow-xl z-20">
                <DayPicker
                 mode="range"
                 selected={dateRange}
                 onSelect={(range) => setDateRange({ from: range?.from ?? new Date(2025, 3, 1), to: range?.to ?? new Date(2025, 3, 7) })}
                 className="text-blue-600"
                 classNames={{
                   day_selected: 'bg-blue-600 text-white rounded',
                   day_today: 'text-red-500 font-bold',
                 }}
               />
              </PopoverContent>
            </Popover>
            
            <button className="flex items-center space-x-2 bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg text-sm">
              <Filter className="h-4 w-4 text-gray-400" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Listings

                </p>
                <h3 className="text-2xl font-bold">24,208</h3>
              </div>
              <div className="h-10 w-10 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Home className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-red-500 flex items-center text-sm">
                <ArrowDownRight className="h-3 w-3 mr-1" /> 5.2%
              </span>
              <span className="text-gray-400 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-400">Average Price</p>
                <h3 className="text-2xl font-bold">{formatCurrency(avgPrice)}</h3>
              </div>
              <div className="h-10 w-10 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-green-500 flex items-center text-sm">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 3.8%
              </span>
              <span className="text-gray-400 text-sm ml-2">vs last month</span>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-400">Market Trend</p>
                <h3 className="text-2xl font-bold">{marketTrend === 'up' ? 'Bullish' : 'Bearish'}</h3>
              </div>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${marketTrend === 'up' ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'}`}>
                {marketTrend === 'up' ? 
                  <TrendingUp className="h-5 w-5 text-green-500" /> : 
                  <TrendingDown className="h-5 w-5 text-red-500" />
                }
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`flex items-center text-sm ${marketTrend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {marketTrend === 'up' ? 
                  <><ArrowUpRight className="h-3 w-3 mr-1" /> +{percentChange}%</> : 
                  <><ArrowDownRight className="h-3 w-3 mr-1" /> {percentChange}%</>
                }
              </span>
              <span className="text-gray-400 text-sm ml-2">Buy vs Sell volume</span>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Buyers</p>
                <h3 className="text-2xl font-bold">17,220</h3>
              </div>
              <div className="h-10 w-10 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-green-500 flex items-center text-sm">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 2.4%
              </span>
              <span className="text-gray-400 text-sm ml-2">vs last month</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trade Volume Chart */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Transaction Volume</h2>
              <select className="bg-gray-700 border border-gray-600 rounded text-sm px-2 py-1">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Total Buy</p>
                <p className="text-xl font-semibold">{formatCurrency(totalBuy)}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Total Sell</p>
                <p className="text-xl font-semibold">{formatCurrency(totalSell)}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Transactions</p>
                <p className="text-xl font-semibold">{tradeData.reduce((sum, item) => sum + item.transactions, 0)}</p>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Bar name="Buy Volume" dataKey="buy" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar name="Sell Volume" dataKey="sell" fill="#60A5FA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Property Type Distribution */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Property Distribution</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {propertyTypeData.map((entry, index) => (
                <div key={entry.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Predictions */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Price Trend Forecast</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis tickFormatter={formatCurrency} stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  name="Predicted Price"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-300">
                <span className="font-semibold">Forecast:</span> Prices expected to rise by 15% over the next 6 months with significant growth in Jakarta and Bali regions.
              </p>
            </div>
          </div>

          {/* Regional Price Map */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Regional Price Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-64 bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Interactive Map Placeholder</p>
                <div className="absolute inset-0 flex items-center justify-center">
                  {priceData.map((item, index) => (
                    <div
                      key={item.region}
                      className={cn(
                        'absolute rounded-full flex items-center justify-center text-xs font-medium border-2 border-gray-800',
                        index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'
                      )}
                      style={{
                        width: `${Math.max(item.size / 800, 30)}px`,
                        height: `${Math.max(item.size / 800, 30)}px`,
                        top: `${20 + (index * 15)}%`,
                        left: `${20 + (index * 15)}%`,
                      }}
                      onClick={() => setSelectedRegion(item.region)}
                    >
                      <span className="whitespace-nowrap">{item.region}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Price Growth by Region</h3>
                <div className="space-y-4">
                  {priceData.map((item) => (
                    <div key={item.region} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.region}</span>
                        <span className={item.growth > 5 ? 'text-green-500' : 'text-blue-500'}>
                          +{item.growth}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            item.growth > 7 ? 'bg-green-500' : 
                            item.growth > 5 ? 'bg-blue-500' : 
                            item.growth > 3 ? 'bg-yellow-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${(item.growth/10) * 100}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-gray-400 flex justify-between">
                        <span>{formatCurrency(item.price * 1000000)} avg/property</span>
                        <span>{item.size} properties</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Listings */}
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Listings</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setListingsView('grid')}
                  className={`p-1 rounded ${listingsView === 'grid' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button 
                  onClick={() => setListingsView('list')}
                  className={`p-1 rounded ${listingsView === 'list' ? 'bg-blue-600' : 'bg-gray-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {isLoading ? (
                // Loading skeleton
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-700 h-20 rounded-lg"></div>
                  ))}
                </div>
              ) : (
                recentListings.map(listing => (
                  <div key={listing.id} className="bg-gray-700 rounded-lg p-3 hover:bg-gray-650 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">{listing.address}</h3>
                      <span className="text-blue-400 text-sm">{listing.type}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-lg font-semibold">{formatCurrency(listing.price)}</span>
                      <div className="text-xs text-gray-400">
                        {listing.beds} bd | {listing.baths} ba | {listing.sqm} m²
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium transition-colors">
              View All Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}