import { useEffect, useState } from 'react';
import { Clock, MapPin, Truck, User, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCrop, connectWallet, fetchAllCrops } from '../../../../store/Actions/blockchainAction';




const DirectMarket = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const dispatch = useDispatch();
  const sampleCrops = useSelector(store => store.cropReducer.allCrops);
  const { account } = useSelector(store => store.blockchainReducer);

  const conWalletAndFetch = async () => {
    if (!account) await dispatch(connectWallet());
    if (!sampleCrops) await dispatch(fetchAllCrops(false))
  }

  useEffect(() => {
    conWalletAndFetch()
  }, []);

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">FarmChain Marketplace</h1>
          <p className="text-gray-600">Direct from farm to table, verified on blockchain</p>
        </header>

        {selectedCrop ? (
          <CropDetail crop={selectedCrop} onBack={() => setSelectedCrop(null)} setSelectedCrop={setSelectedCrop} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCrops && sampleCrops.map(crop => (
              <CropCard key={crop.id} crop={crop} onClick={() => setSelectedCrop(crop)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DirectMarket;

const CropCard = ({ crop, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className="h-48">

          <img
            src={crop.image[0]}
            alt={crop.name}
            className="w-full h-48 object-contain"
          />
        </div>
        {crop.verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1">
            Verified
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-gray-800">{crop.name}</h2>
          <div className="text-lg font-bold text-green-600">{crop.perQuintalPrice}$/quintal</div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{crop.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <User size={16} className="mr-1" />
          <span>{crop.user.phone}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{crop.location}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-1" />
          <span>Harvested: {new Date(crop.harvestDate).toLocaleDateString()}</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm font-medium">{crop.totalQuantity} available</div>
          {crop.deliveryAvailable && (
            <div className="flex items-center text-green-600 text-sm">
              <Truck size={16} className="mr-1" />
              <span>Delivery available</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        {/* <div className="text-xs text-gray-500">ID: {crop.id.substring(0, 8)}</div> */}
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors duration-300">
          <ShoppingCart size={16} className="mr-2" /> Purchase
        </button>
      </div>
    </div>
  );
}

const CropDetail = ({ crop, onBack ,setSelectedCrop}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handlePurchase = (e) => {
    e.preventDefault();
    console.log('Purchase initiated for', quantity, 'units of', crop.name);
    dispatch(buyCrop(crop.id, quantity,setSelectedCrop));
  };


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-green-700 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Crop Details</h2>
        <button
          onClick={onBack}
          className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-50 transition-colors duration-300"
        >
          Back to Marketplace
        </button>
      </div>

      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={crop.image[0]}
            alt={crop.name}
            className="w-full h-64 object-cover"
          />
        </div>

        <form onSubmit={handlePurchase} className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{crop.name}</h3>
              <div className="flex items-center mt-1">
                <User size={16} className="text-gray-500 mr-1" />
                <span className="text-gray-600 text-sm">By {crop.user}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">{crop.perQuintalPrice} ETH</div>
          </div>

          <p className="text-gray-700 mb-6">{crop.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Location</div>
              <div className="font-medium flex items-center">
                <MapPin size={16} className="mr-1 text-green-600" />
                {crop.location}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Harvest Date</div>
              <div className="font-medium flex items-center">
                <Clock size={16} className="mr-1 text-green-600" />
                {new Date(crop.harvestDate).toLocaleDateString()}
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Available Quantity</div>
              <div className="font-medium">{crop.totalQuantity}</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Delivery</div>
              <div className="font-medium flex items-center">
                <Truck size={16} className="mr-1 text-green-600" />
                {crop.deliveryAvailable ? 'Available' : 'Pickup only'}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="font-medium mb-2">Blockchain Verification</div>
            <div className="text-sm text-gray-600">
              <p>Verified: {crop.user ? 'Yes' : 'Pending'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
              type='button'
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="w-16 text-center border-l border-r p-2"
                value={quantity}
                max={crop.totalQuantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button
              type='button'
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium flex items-center transition-colors duration-300">
              <ShoppingCart size={18} className="mr-2" />
              Purchase Now ({(crop.perQuintalPrice * quantity).toFixed(3)} ETH)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}