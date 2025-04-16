// cropData.js

export const crops = [
    { name: "Wheat", color: "#059669" },
    { name: "Barley", color: "#d97706" },
    { name: "Mustard", color: "#7c3aed" },
    { name: "Gram", color: "#2563eb" },
    { name: "Rice", color: "#dc2626" },
    { name: "Cotton", color: "#0891b2" }
  ];
  
  export const marketData = {
    Wheat: [
      { month: "Nov", price: 2100, volume: 1200 },
      { month: "Dec", price: 2150, volume: 1250 },
      { month: "Jan", price: 2200, volume: 1300 },
      { month: "Feb", price: 2300, volume: 1420 },
      { month: "Mar", price: 2450, volume: 1500 },
      { month: "Apr", price: 2500, volume: 1550 }
    ],
    Barley: [
      { month: "Nov", price: 1700, volume: 950 },
      { month: "Dec", price: 1750, volume: 980 },
      { month: "Jan", price: 1800, volume: 1020 },
      { month: "Feb", price: 1900, volume: 1150 },
      { month: "Mar", price: 2100, volume: 1250 },
      { month: "Apr", price: 2000, volume: 1200 }
    ],
    Mustard: [
      { month: "Nov", price: 4800, volume: 850 },
      { month: "Dec", price: 4900, volume: 880 },
      { month: "Jan", price: 5000, volume: 900 },
      { month: "Feb", price: 5200, volume: 930 },
      { month: "Mar", price: 5100, volume: 910 },
      { month: "Apr", price: 5300, volume: 950 }
    ],
    Gram: [
      { month: "Nov", price: 4300, volume: 780 },
      { month: "Dec", price: 4350, volume: 820 },
      { month: "Jan", price: 4400, volume: 850 },
      { month: "Feb", price: 4550, volume: 880 },
      { month: "Mar", price: 4700, volume: 910 },
      { month: "Apr", price: 4600, volume: 890 }
    ],
    Rice: [
      { month: "Nov", price: 3200, volume: 1500 },
      { month: "Dec", price: 3250, volume: 1550 },
      { month: "Jan", price: 3300, volume: 1600 },
      { month: "Feb", price: 3400, volume: 1650 },
      { month: "Mar", price: 3450, volume: 1700 },
      { month: "Apr", price: 3500, volume: 1750 }
    ],
    Cotton: [
      { month: "Nov", price: 6000, volume: 700 },
      { month: "Dec", price: 6100, volume: 720 },
      { month: "Jan", price: 6200, volume: 750 },
      { month: "Feb", price: 6300, volume: 780 },
      { month: "Mar", price: 6250, volume: 760 },
      { month: "Apr", price: 6400, volume: 800 }
    ]
  };
  
  export const marketTrends = {
    Wheat: { trend: "rising", forecast: 2600, change: 4.0 },
    Barley: { trend: "steady", forecast: 2050, change: 2.5 },
    Mustard: { trend: "rising", forecast: 5450, change: 2.8 },
    Gram: { trend: "falling", forecast: 4550, change: -1.1 },
    Rice: { trend: "rising", forecast: 3600, change: 2.9 },
    Cotton: { trend: "rising", forecast: 6550, change: 2.3 }
  };
  