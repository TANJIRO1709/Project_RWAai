"use client";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, BarChart2, TrendingUp, Calendar } from 'lucide-react';

export default function GoldPage() {
  const [buyAmount, setBuyAmount] = useState(1);
  const [sellAmount, setSellAmount] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  // Current date for display
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Gold price data by country (USD per troy ounce)
  const goldRatesByCountry = [
    { country: 'USA', price: 2480.50, change: 1.2, currency: 'USD' },
    { country: 'India', price: 73400.35, change: -0.5, currency: 'INR' },
    { country: 'China', price: 17850.75, change: 0.8, currency: 'CNY' },
    { country: 'UAE', price: 9115.20, change: 1.5, currency: 'AED' },
    { country: 'UK', price: 1965.80, change: -0.3, currency: 'GBP' },
    { country: 'Japan', price: 386450.60, change: 0.7, currency: 'JPY' },
  ];

  // Gold price historical data for chart
  const historicalData = [
    { date: 'Apr 15', price: 2345.20 },
    { date: 'Apr 16', price: 2360.80 },
    { date: 'Apr 17', price: 2390.50 },
    { date: 'Apr 18', price: 2410.30 },
    { date: 'Apr 19', price: 2395.60 },
    { date: 'Apr 20', price: 2420.40 },
    { date: 'Apr 21', price: 2450.10 },
    { date: 'Apr 22', price: 2455.80 },
    { date: 'Apr 23', price: 2470.25 },
    { date: 'Apr 24', price: 2465.70 },
    { date: 'Apr 25', price: 2480.50 },
  ];

  // Gold price forecast data for chart
  const forecastData = [
    { date: 'May 21', price: 2480.50, forecast: 2480.50 },
    { date: 'Jun 21', price: null, forecast: 2520.30 },
    { date: 'Jul 21', price: null, forecast: 2545.80 },
    { date: 'Aug 21', price: null, forecast: 2590.40 },
    { date: 'Sep 21', price: null, forecast: 2610.70 },
    { date: 'Oct 21', price: null, forecast: 2650.20 },
  ];

  // Gold price by weight
  const goldPriceByWeight = [
    { weight: '1 gram', price: 79.75 },
    { weight: '10 gram', price: 797.50 },
    { weight: '1 tola (11.66g)', price: 930.00 },
    { weight: '1 ounce (31.1g)', price: 2480.50 },
    { weight: '1 kilogram', price: 79750.00 },
  ];

  // Select relevant currency price for buy/sell operations
  const currentPrice = goldRatesByCountry.find(rate => rate.currency === selectedCurrency)?.price || 2480.50;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Gold Investment</h1>
        
        {/* Top stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400">Current Gold Price</p>
                <h2 className="text-2xl font-bold">${goldRatesByCountry[0].price.toFixed(2)}</h2>
              </div>
              <div className={`px-2 py-1 rounded ${goldRatesByCountry[0].change > 0 ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                <span className="flex items-center">
                  {goldRatesByCountry[0].change > 0 ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                  {Math.abs(goldRatesByCountry[0].change)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-400">24 Hour High</p>
            <h2 className="text-2xl font-bold">${(goldRatesByCountry[0].price * 1.015).toFixed(2)}</h2>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-400">24 Hour Low</p>
            <h2 className="text-2xl font-bold">${(goldRatesByCountry[0].price * 0.985).toFixed(2)}</h2>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-400">Market Cap</p>
            <h2 className="text-2xl font-bold">$12.7T</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Gold rates by country */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Gold Rates by Country</h2>
              <div className="flex items-center text-sm text-gray-400">
                <Calendar size={14} className="mr-1" /> {currentDate}
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-800">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Country</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {goldRatesByCountry.map((rate, index) => (
                    <tr key={index} className="hover:bg-gray-800">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{rate.country}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                        {rate.currency} {rate.price.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-right text-sm ${rate.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <span className="flex items-center justify-end">
                          {rate.change > 0 ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                          {Math.abs(rate.change)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Gold Price by Weight</h3>
              <div className="overflow-hidden rounded-lg border border-gray-800">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Weight</th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">USD Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {goldPriceByWeight.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{item.weight}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm">${item.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Middle column - Price chart and forecast */}
          <div className="bg-gray-900 p-6 rounded-lg col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Gold Price Chart</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedTimeframe('1D')}
                  className={`px-3 py-1 ${selectedTimeframe === '1D' ? 'bg-blue-600' : 'bg-gray-800'} text-white rounded-md text-sm hover:bg-blue-700`}
                >
                  1D
                </button>
                <button 
                  onClick={() => setSelectedTimeframe('1W')}
                  className={`px-3 py-1 ${selectedTimeframe === '1W' ? 'bg-blue-600' : 'bg-gray-800'} text-white rounded-md text-sm hover:bg-blue-700`}
                >
                  1W
                </button>
                <button 
                  onClick={() => setSelectedTimeframe('1M')}
                  className={`px-3 py-1 ${selectedTimeframe === '1M' ? 'bg-blue-600' : 'bg-gray-800'} text-white rounded-md text-sm hover:bg-blue-700`}
                >
                  1M
                </button>
                <button 
                  onClick={() => setSelectedTimeframe('3M')}
                  className={`px-3 py-1 ${selectedTimeframe === '3M' ? 'bg-blue-600' : 'bg-gray-800'} text-white rounded-md text-sm hover:bg-blue-700`}
                >
                  3M
                </button>
                <button 
                  onClick={() => setSelectedTimeframe('1Y')}
                  className={`px-3 py-1 ${selectedTimeframe === '1Y' ? 'bg-blue-600' : 'bg-gray-800'} text-white rounded-md text-sm hover:bg-blue-700`}
                >
                  1Y
                </button>
              </div>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis domain={['dataMin - 50', 'dataMax + 50']} stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Gold Price Forecast</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis domain={['dataMin - 50', 'dataMax + 50']} stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563' }} />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} name="Actual Price" />
                    <Line type="monotone" dataKey="forecast" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Forecast" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">30 Days Forecast</p>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-lg font-bold">${forecastData[1].forecast}</h3>
                    <span className="text-green-400 flex items-center text-sm">
                      <TrendingUp size={14} className="mr-1" /> +1.6%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">90 Days Forecast</p>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-lg font-bold">${forecastData[3].forecast}</h3>
                    <span className="text-green-400 flex items-center text-sm">
                      <TrendingUp size={14} className="mr-1" /> +4.4%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">180 Days Forecast</p>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-lg font-bold">${forecastData[5].forecast}</h3>
                    <span className="text-green-400 flex items-center text-sm">
                      <TrendingUp size={14} className="mr-1" /> +6.8%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buy/Sell Panel */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Buy Gold</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Amount (oz)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(parseFloat(e.target.value) || 0)}
                      className="bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full pl-3 pr-12 py-2 sm:text-sm border border-gray-700 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-4/5 py-0 pl-2 pr-2 mr-2 border-transparent text-white sm:text-sm rounded-md"
                      >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="CNY">CNY</option>
                        <option value="AED">AED</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Total Cost</label>
                  <div className="text-lg font-bold">{selectedCurrency} {(buyAmount * currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">Buy Now</button>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Sell Gold</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Amount (oz)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(parseFloat(e.target.value) || 0)}
                      className="bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full pl-3 pr-12 py-2 sm:text-sm border border-gray-700 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <select
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 h-4/5 py-0 pl-2 pr-2 mr-2 border-transparent text-white sm:text-sm rounded-md"
                      >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="CNY">CNY</option>
                        <option value="AED">AED</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Total Value</label>
                  <div className="text-lg font-bold">{selectedCurrency} {(sellAmount * currentPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                </div>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md">Sell Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}