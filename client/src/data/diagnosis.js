// diagnosisData.js
const diagnosisResult = {
    cropType: "Tomato",
    disease: "Late Blight (Phytophthora infestans)",
    confidence: 96.7,
    severity: "Moderate",
    description:
      "Late blight is a potentially devastating disease of tomato and potato, infecting leaves, stems, and fruits. The disease spreads quickly in wet weather with cool nights and warm days.",
    symptoms: [
      "Brown/black lesions on leaves and stems",
      "White fungal growth on leaf undersides",
      "Rapid wilting and tissue death",
      "Fruits develop dark, firm lesions",
    ],
    solutions: [
      {
        type: "Organic",
        methods: [
          "Remove and destroy infected plants",
          "Apply copper-based fungicides",
          "Increase plant spacing for better air circulation",
          "Avoid overhead irrigation",
        ],
      },
      {
        type: "Chemical",
        methods: [
          "Chlorothalonil applications (7-10 day intervals)",
          "Mancozeb fungicide as preventive measure",
          "Metalaxyl-based fungicides for systemic control",
        ],
      },
    ],
    prevention: [
      "Plant resistant varieties",
      "Rotate crops every 2-3 years",
      "Ensure proper drainage in fields",
      "Avoid planting in locations with poor air circulation",
    ],
    similarCases: [
      {
        id: 1,
        image: "/api/placeholder/120/120",
        farmLocation: "Central Valley",
        severity: "High",
      },
      {
        id: 2,
        image: "/api/placeholder/120/120",
        farmLocation: "Eastern Highlands",
        severity: "Moderate",
      },
      {
        id: 3,
        image: "/api/placeholder/120/120",
        farmLocation: "Western Plains",
        severity: "Low",
      },
    ],
  };
  
  export default diagnosisResult;
  