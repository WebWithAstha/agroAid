import { useState } from "react";
import {
  Search,
  Filter,
  Building,
  Calendar,
  ChevronRight,
  Tag,
  Clock,
  Download,
  BookOpen,
  Bookmark,
  Award,
  TrendingUp,
  MapPin,
  Users,
  ChevronDown,
} from "lucide-react";

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    category: "All",
    region: "All",
    status: "All",
  });
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Sample data for demonstration
  const schemes = [
    {
      id: 1,
      title: "PM-KISAN Yojana",
      category: "Financial Support",
      description:
        "Direct income support of ₹6,000 per year to farmer families across the country in three equal installments.",
      eligibility:
        "All small and marginal farmers with landholding up to 2 hectares.",
      benefits: [
        "₹6,000 annual financial assistance in three installments of ₹2,000 each",
        "Direct transfer to bank accounts of eligible farmers",
        "No loan recovery from this amount",
      ],
      deadline: "2025-06-30",
      region: "National",
      status: "Active",
      applications: 84593,
      fundingAmount: "₹75,000 Crore",
      documentationRequired: [
        "Aadhaar Card",
        "Land Records",
        "Bank Account Details",
        "Passport Size Photo",
      ],
      applicationLink: "#",
      contactDetails: "Toll-Free: 1800-11-0001",
      lastUpdated: "2025-03-15",
      successRate: 92,
      popularityScore: 98,
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana",
      category: "Insurance",
      description:
        "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage due to unforeseen events.",
      eligibility:
        "All farmers including sharecroppers and tenant farmers growing notified crops.",
      benefits: [
        "Insurance coverage and financial support in case of crop failure",
        "Stabilizing farmers' income after crop losses",
        "Encouraging adoption of modern agricultural practices",
      ],
      deadline: "Kharif Season: July 31, 2025; Rabi Season: December 31, 2025",
      region: "National",
      status: "Active",
      applications: 56234,
      fundingAmount: "Premium subsidy shared by Central and State Governments",
      documentationRequired: [
        "Land Records",
        "Sowing Certificate",
        "Bank Account Details",
        "Aadhaar Card",
      ],
      applicationLink: "#",
      contactDetails: "Toll-Free: 1800-11-5444",
      lastUpdated: "2025-04-01",
      successRate: 87,
      popularityScore: 91,
    },
    {
      id: 3,
      title: "Agriculture Infrastructure Fund",
      category: "Infrastructure",
      description:
        "Financing facility for investment in post-harvest management infrastructure and community farming assets.",
      eligibility:
        "Farmers, FPOs, PACS, Marketing Cooperative Societies, Agri-entrepreneurs, Startups, and Central/State agencies.",
      benefits: [
        "₹1 lakh crore financing facility with interest subvention of 3%",
        "Credit guarantee for loans up to ₹2 crore",
        "Moratorium on repayment",
      ],
      deadline: "2025-10-31",
      region: "National",
      status: "Active",
      applications: 12453,
      fundingAmount: "₹1,00,000 Crore",
      documentationRequired: [
        "Project Proposal",
        "Land Documents",
        "Identity Proof",
        "Bank Statement",
        "Business Plan",
      ],
      applicationLink: "#",
      contactDetails: "Email: aif-support@gov.in",
      lastUpdated: "2025-02-20",
      successRate: 79,
      popularityScore: 85,
    },
    {
      id: 4,
      title: "Soil Health Card Scheme",
      category: "Technical Assistance",
      description:
        "Field-specific detailed report of soil fertility status and recommended doses of nutrients for crops.",
      eligibility: "All farmers who own agricultural land.",
      benefits: [
        "Soil health assessment every two years",
        "Recommendations for appropriate dosage of fertilizers",
        "Information on soil amendments required for improving soil health",
      ],
      deadline: "Ongoing",
      region: "National",
      status: "Active",
      applications: 112879,
      fundingAmount: "Free service provided by government",
      documentationRequired: [
        "Land Records",
        "Aadhaar Card",
        "Passport Size Photo",
      ],
      applicationLink: "#",
      contactDetails: "Local Agriculture Department Office",
      lastUpdated: "2025-01-15",
      successRate: 95,
      popularityScore: 88,
    },
    {
      id: 5,
      title: "Northeast Region Farming Innovation Scheme",
      category: "Research & Innovation",
      description:
        "Special funding for innovative agricultural practices adapted to Northeastern states' terrain and climate.",
      eligibility:
        "Farmers, researchers, and agri-startups in Northeast states.",
      benefits: [
        "Research grants up to ₹50 lakhs",
        "Technical support from agricultural universities",
        "Marketing assistance for innovative farm products",
      ],
      deadline: "2025-07-15",
      region: "Regional",
      status: "New",
      applications: 532,
      fundingAmount: "₹500 Crore",
      documentationRequired: [
        "Research Proposal",
        "Identity Proof",
        "Land Documents",
        "Previous Work Experience",
      ],
      applicationLink: "#",
      contactDetails: "Toll-Free: 1800-112-0240",
      lastUpdated: "2025-04-10",
      successRate: null,
      popularityScore: 72,
    },
    {
      id: 6,
      title: "Drip Irrigation Subsidy Program",
      category: "Water Management",
      description:
        "Subsidy for installation of water-efficient drip irrigation systems.",
      eligibility: "All farmers with focus on water-stressed regions.",
      benefits: [
        "Up to 55% subsidy on equipment cost",
        "Technical assistance for installation",
        "Training on efficient water management",
      ],
      deadline: "2025-09-30",
      region: "National",
      status: "Active",
      applications: 42781,
      fundingAmount: "₹5,000 Crore",
      documentationRequired: [
        "Land Records",
        "Water Source Verification",
        "Aadhaar Card",
        "Bank Details",
      ],
      applicationLink: "#",
      contactDetails: "State Agriculture Department",
      lastUpdated: "2025-03-22",
      successRate: 82,
      popularityScore: 90,
    },
    {
      id: 7,
      title: "Organic Farming Certification Support",
      category: "Sustainability",
      description:
        "Financial assistance for organic certification and marketing of organic products.",
      eligibility:
        "Individual farmers, farmer groups practicing organic farming.",
      benefits: [
        "Financial assistance up to ₹3 lakhs for three years",
        "Support for certification process",
        "Marketing assistance for organic produce",
      ],
      deadline: "2025-05-15",
      region: "National",
      status: "Active",
      applications: 8953,
      fundingAmount: "₹1,500 Crore",
      documentationRequired: [
        "Land Records",
        "No-Chemical-Use Declaration",
        "Farmer Group Registration (if applicable)",
      ],
      applicationLink: "#",
      contactDetails: "Email: organic-certification@gov.in",
      lastUpdated: "2025-01-30",
      successRate: 76,
      popularityScore: 83,
    },
    {
      id: 8,
      title: "Farmers' Solar Power Scheme",
      category: "Energy",
      description:
        "Installation of solar pumps and grid-connected solar power plants for farmers.",
      eligibility:
        "Farmers with grid-connected agricultural connections or diesel pumps.",
      benefits: [
        "Up to 90% subsidy on solar pump installation",
        "Income generation through excess power sold to grid",
        "Sustainable energy solution for irrigation",
      ],
      deadline: "2025-11-30",
      region: "National",
      status: "Active",
      applications: 35672,
      fundingAmount: "₹34,000 Crore",
      documentationRequired: [
        "Land Records",
        "Existing Pump Details",
        "Electricity Connection Bills",
        "Bank Account",
      ],
      applicationLink: "#",
      contactDetails: "Toll-Free: 1800-180-3333",
      lastUpdated: "2025-04-05",
      successRate: 88,
      popularityScore: 94,
    },
    {
      id: 9,
      title: "Youth Agri-Entrepreneurship Development Program",
      category: "Entrepreneurship",
      description:
        "Special scheme for young farmers and agriculture graduates to establish agri-enterprises.",
      eligibility:
        "Individuals aged 18-40 years with agriculture background or education.",
      benefits: [
        "Low-interest loans up to ₹1 crore",
        "Mentorship from established agri-businesses",
        "Special support for women entrepreneurs",
      ],
      deadline: "2025-08-31",
      region: "National",
      status: "New",
      applications: 2453,
      fundingAmount: "₹3,000 Crore",
      documentationRequired: [
        "Business Plan",
        "Educational Certificates",
        "ID Proof",
        "Banking History",
      ],
      applicationLink: "#",
      contactDetails: "Email: youth-agri@gov.in",
      lastUpdated: "2025-03-25",
      successRate: null,
      popularityScore: 78,
    },
    {
      id: 10,
      title: "Farm Mechanization Subsidy",
      category: "Equipment",
      description:
        "Financial assistance for purchase of agricultural machinery and equipment.",
      eligibility:
        "All farmers, with preference to small and marginal farmers.",
      benefits: [
        "35-50% subsidy on equipment cost",
        "Additional 10% subsidy for women farmers",
        "Custom hiring centers in rural areas",
      ],
      deadline: "2025-12-31",
      region: "National",
      status: "Active",
      applications: 67892,
      fundingAmount: "₹12,000 Crore",
      documentationRequired: [
        "Land Records",
        "Aadhaar Card",
        "Bank Account Details",
        "Quotation for Equipment",
      ],
      applicationLink: "#",
      contactDetails: "Local Agriculture Department",
      lastUpdated: "2025-02-15",
      successRate: 91,
      popularityScore: 96,
    },
  ];

  // Categories, regions, and status options for filtering
  const categories = [
    "All",
    "Financial Support",
    "Insurance",
    "Infrastructure",
    "Technical Assistance",
    "Research & Innovation",
    "Water Management",
    "Sustainability",
    "Energy",
    "Entrepreneurship",
    "Equipment",
  ];
  const regions = ["All", "National", "Regional"];
  const statuses = ["All", "Active", "New"];

  // Filter schemes based on search query and active filters
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeFilters.category === "All" ||
      scheme.category === activeFilters.category;
    const matchesRegion =
      activeFilters.region === "All" || scheme.region === activeFilters.region;
    const matchesStatus =
      activeFilters.status === "All" || scheme.status === activeFilters.status;

    return matchesSearch && matchesCategory && matchesRegion && matchesStatus;
  });

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Closing Soon":
        return "bg-yellow-100 text-yellow-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter handling
  const handleFilterChange = (filterType, value) => {
    setActiveFilters({
      ...activeFilters,
      [filterType]: value,
    });
  };

  // Toggle scheme details
  const toggleSchemeDetails = (id) => {
    if (expandedScheme === id) {
      setExpandedScheme(null);
    } else {
      setExpandedScheme(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 w-full max-w-5xl mx-auto font-sans">
      {/* Header with Government Building Pattern */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-6 overflow-hidden">
        {/* Pillars pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern
              id="pillarsPattern"
              patternUnits="userSpaceOnUse"
              width="60"
              height="100"
              patternTransform="rotate(0)"
            >
              <rect x="20" y="0" width="20" height="100" fill="#ffffff" />
              <rect x="0" y="0" width="10" height="100" fill="#ffffff" />
              <rect x="50" y="0" width="10" height="100" fill="#ffffff" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pillarsPattern)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Building size={28} className="text-indigo-300" />
              <h2 className="text-3xl font-bold tracking-tight">
                Government Schemes Portal
              </h2>
            </div>
            <div className="hidden md:block">
              <Award size={28} className="text-yellow-300" />
            </div>
          </div>

          <p className="text-blue-200 mb-6">
            Discover and apply for agricultural schemes and benefits available
            for farmers
          </p>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-blue-200 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for schemes, benefits, loans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="p-4 flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Filters</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="text-sm text-gray-500">
            Showing {filteredSchemes.length} of {schemes.length} schemes
          </div>
        </div>

        {showFilters && (
          <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={activeFilters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={activeFilters.region}
                onChange={(e) => handleFilterChange("region", e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={activeFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main Content - Schemes List */}
      <div className="divide-y divide-gray-200">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="p-4 hover:bg-blue-50 transition-colors"
            >
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => toggleSchemeDetails(scheme.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        scheme.status
                      )}`}
                    >
                      {scheme.status}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Tag size={14} />
                      {scheme.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900">
                    {scheme.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {scheme.description}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {scheme.applications.toLocaleString()} Applications
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Deadline: {scheme.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Updated: {scheme.lastUpdated}
                    </span>
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <ChevronRight
                    size={20}
                    className={`text-gray-400 transition-transform ${
                      expandedScheme === scheme.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedScheme === scheme.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Eligibility
                        </h4>
                        <p className="text-sm text-gray-700">
                          {scheme.eligibility}
                        </p>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Benefits
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {scheme.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-gray-700">
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Documentation Required
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {scheme.documentationRequired.map((doc, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                            >
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-1">
                          <TrendingUp size={16} />
                          Scheme Statistics
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-2 rounded-md shadow-sm">
                            <div className="text-xs text-gray-500">
                              Total Funding
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {scheme.fundingAmount}
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-md shadow-sm">
                            <div className="text-xs text-gray-500">
                              Applicants
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {scheme.applications.toLocaleString()}
                            </div>
                          </div>
                          {scheme.successRate && (
                            <div className="bg-white p-2 rounded-md shadow-sm">
                              <div className="text-xs text-gray-500">
                                Success Rate
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                {scheme.successRate}%
                              </div>
                            </div>
                          )}
                          <div className="bg-white p-2 rounded-md shadow-sm">
                            <div className="text-xs text-gray-500">
                              Popularity
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {scheme.popularityScore}/100
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Contact Information
                        </h4>
                        <p className="text-sm text-gray-700">
                          {scheme.contactDetails}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <a
                          href={scheme.applicationLink}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex justify-center items-center gap-2 transition-colors"
                        >
                          Apply Now
                        </a>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md flex items-center gap-1 transition-colors">
                          <Download size={16} />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-md flex items-center gap-1 transition-colors">
                          <Bookmark size={16} />
                          <span className="hidden sm:inline">Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No schemes found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find available government
              schemes.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin size={14} />
            Showing schemes relevant to your region
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Assistance Hotline
            </a>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              FAQs
            </a>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              How to Apply
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GovernmentSchemes;
