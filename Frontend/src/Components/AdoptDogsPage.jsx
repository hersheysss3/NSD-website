import React, { useState, useEffect } from 'react';
import { Search, MapPin, Heart, Filter, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdoptDogsPage = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    breed: '',
    size: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const naviagate=useNavigate();
  const handleClicknaviageton=()=>{
    naviagate('/adopt-form');
  }
  
  useEffect(() => {
    fetchDogs();
  }, [filters, currentPage]);
 useEffect(() => {
    fetchDogs();
  }, []);
  const fetchDogs = async () => {
    try {
      setLoading(true);
      
      // Build query parameters only if filters are not empty
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      
      // Only add filter parameters if they have values
      if (filters.city && filters.city.trim()) {
        queryParams.append('city', filters.city.trim());
      }
      if (filters.breed && filters.breed.trim()) {
        queryParams.append('breed', filters.breed.trim());
      }
      if (filters.size && filters.size.trim()) {
        queryParams.append('size', filters.size.trim());
      }
      
      const queryString = queryParams.toString();
      const url = queryString ? `/api/dog/dogs?${queryString}` : `/api/dog/dogs?page=${currentPage}`;
      
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}${url}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setDogs(data.dogs);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching dogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ city: '', breed: '', size: '' });
    setCurrentPage(1);
  };

  const getAgeString = (ageInMonths) => {
    if (ageInMonths < 12) {
      return `${ageInMonths} month${ageInMonths > 1 ? 's' : ''}`;
    }
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;
    return months > 0 ? `${years}y ${months}m` : `${years} year${years > 1 ? 's' : ''}`;
  };

  const DogCard = ({ dog }) => (
    <div className="glass-solid overflow-hidden hover:shadow-lg transition-shadow border border-orange-100">
      <div className="relative">
        <img
          src={dog.images[0] || '/api/placeholder/300/200'}
          alt={dog.name}
          className="w-full h-48 object-cover"
        />
        {dog.urgent && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Urgent
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{dog.name}</h3>
          <span className="text-sm text-orange-600 font-medium">{getAgeString(dog.age)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1 text-orange-500" />
          <span className="text-sm">{dog.location.city}, {dog.location.state}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
            {dog.breed}
          </span>
          <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs border border-orange-200">
            {dog.size}
          </span>
          <span className="bg-orange-200 text-orange-900 px-2 py-1 rounded-full text-xs">
            {dog.gender}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{dog.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {dog.healthStatus.vaccinated && (
              <span className="text-orange-600 text-xs">✓ Vaccinated</span>
            )}
            {dog.healthStatus.neutered && (
              <span className="text-orange-500 text-xs">✓ Neutered</span>
            )}
          </div>
          
          <button 
            onClick={() => naviagate('/adopt-form')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100 px-4 py-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
    
    {/* Left Section: Title and Subtitle */}
    <div className="mb-4 md:mb-0">
      <h1 className="text-3xl font-bold text-gray-900">Adopt a Street Dog</h1>
      <p className="text-orange-700 mt-1">Give a loving home to a dog in need</p>
    </div>

    {/* Right Section: Button */}
    <div>
      <button
        onClick={handleClicknaviageton}
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow transition duration-200"
      >
        Find a Home for the Needy
      </button>
    </div>

  </div>
</div>


      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="glass-solid p-4 mb-6 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center text-gray-800">
              <Filter className="w-5 h-5 mr-2 text-orange-500" />
              Filters
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
              <input
                type="text"
                placeholder="Enter breed"
                value={filters.breed}
                onChange={(e) => handleFilterChange('breed', e.target.value)}
                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-orange-300 hover:bg-orange-400 text-orange-800 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Dogs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-solid overflow-hidden animate-pulse border border-orange-100">
                <div className="h-48 bg-orange-100"></div>
                <div className="p-4">
                  <div className="h-4 bg-orange-100 rounded mb-2"></div>
                  <div className="h-3 bg-orange-50 rounded mb-2"></div>
                  <div className="h-3 bg-orange-50 rounded mb-3"></div>
                  <div className="h-8 bg-orange-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : dogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-orange-100">
            <div className="text-orange-300 mb-4">
              <Heart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No dogs found</h3>
            <p className="text-orange-600">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {dogs.map((dog) => (
                <DogCard key={dog._id} dog={dog} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-orange-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 text-gray-700"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 text-orange-700 bg-orange-50 rounded-lg border border-orange-200">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-orange-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 text-gray-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdoptDogsPage;
