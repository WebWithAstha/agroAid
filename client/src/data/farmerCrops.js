// Sample farmer data
export const farmerData = {
  id: '0x7d8e9f0a',
  name: 'John Doe',
  farm: 'Midwest Farms',
  location: 'Iowa',
  joined: '2024-01-15',
  verified: true
};

// Sample crops data (crops uploaded by this farmer)
export const initialCrops = [
  {
    id: '0x1a2b3c4d',
    name: 'Organic Wheat',
    description: 'Freshly harvested organic wheat, grown without pesticides',
    price: 0.025,
    quantity: 50,
    quantityUnit: 'kg',
    location: 'Midwest Farms, Iowa',
    harvestDate: '2025-04-10',
    deliveryAvailable: true,
    verified: true,
    imageUrl: 'https://browfarmonlinestore.co.uk/wp-content/uploads/2024/09/New-Wheat-Grains1.png',
    status: 'active'
  },
  {
    id: '0xab23cd45',
    name: 'Heritage Corn',
    description: 'Traditional heirloom variety with exceptional flavor profile',
    price: 0.035,
    quantity: 30,
    quantityUnit: 'kg',
    location: 'Midwest Farms, Iowa',
    harvestDate: '2025-04-05',
    deliveryAvailable: true,
    verified: true,
    imageUrl: 'https://png.pngtree.com/png-clipart/20220823/original/pngtree-green-gram-or-golden-png-image_8470868.png',
    status: 'active'
  },
  {
    id: '0x9876fe54',
    name: 'Organic Soybeans',
    description: 'Non-GMO soybeans grown using sustainable farming practices',
    price: 0.042,
    quantity: 75,
    quantityUnit: 'kg',
    location: 'Midwest Farms, Iowa',
    harvestDate: '2025-03-28',
    deliveryAvailable: false,
    verified: true,
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/062/980/small_2x/ai-generated-wheat-grains-free-png.png',
    status: 'low_stock'
  }
];
