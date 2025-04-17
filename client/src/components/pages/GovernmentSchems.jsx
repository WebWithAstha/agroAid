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
import Header from "../Header";
import { schemes,categories,regions,statuses } from "../../data/govSchemes";

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    category: "All",
    region: "All",
    status: "All",
  });
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

 
  
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
    <div className="bg-white  overflow-hidden w-full font-sans">
      {/* Header with Government Building Pattern */}
      <Header title={"Government Schemes Portal"} des={"Discover and apply for agricultural schemes and benefits available for farmers"}/>

      
 {/* Search Bar */}
 <div className="p-4">
 <div className="relative ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-700" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-green-800 border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search for schemes, benefits, loans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
