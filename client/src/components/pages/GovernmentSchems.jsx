import { useEffect, useState } from "react";
import { getSchemeList, getSchemeDetails } from "../../Services/farmerScheme.service.js"; // Import the service functions
import Header from "../partials/Header";
import { Search, Filter, ChevronDown, ChevronRight, Tag, BookOpen, Loader } from "lucide-react";

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    type: "All",
    region: "All",
    status: "All",
  });
  const [schemes, setSchemes] = useState([]); // State to hold schemes
  const [expandedScheme, setExpandedScheme] = useState(null); // State for expanded scheme
  const [expandedSchemeDetails, setExpandedSchemeDetails] = useState(null); // State for expanded scheme details
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch schemes data
  useEffect(() => {
    const fetchSchemes = async () => {
      if (sessionStorage.getItem("schemes")) {
        setSchemes(JSON.parse(sessionStorage.getItem("schemes")));
        setLoading(false);
      } else {
        try {
          const { message: data } = await getSchemeList();
          if (data) {
            setSchemes(data); // Set fetched schemes to state
            sessionStorage.setItem("schemes", JSON.stringify(data)); // Save data to sessionStorage
          } else {
            setError("No schemes available");
          }
        } catch (err) {
          setError("Failed to fetch schemes. Please try again later.");
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      }
    };
    fetchSchemes();
  }, []);

  const handleSchemeClick = async (schemeName) => {
    // Check if the scheme is already expanded
    if (expandedScheme === schemeName) {
      setExpandedScheme(null); // Toggle the expanded state
      setExpandedSchemeDetails(null); // Reset the details
    } else {
      // Check if the details are already in sessionStorage
      const cachedDetails = sessionStorage.getItem(schemeName);
  
      if (cachedDetails) {
        // If details are found in sessionStorage, parse and use them
        setExpandedSchemeDetails(JSON.parse(cachedDetails));
        setExpandedScheme(schemeName);
      } else {
        try {
          // If not in sessionStorage, fetch the details from the server
          const { message: details } = await getSchemeDetails(schemeName);
  
          if (details) {
            // Store the fetched details in sessionStorage for future use
            sessionStorage.setItem(schemeName, JSON.stringify(details));
  
            setExpandedSchemeDetails(details); // Store the details in state
            setExpandedScheme(schemeName); // Set the scheme as expanded
          } else {
            setError("Failed to fetch scheme details.");
          }
        } catch (err) {
          setError("Error while fetching scheme details. Please try again.");
        }
      }
    }
  };
  
  
  // Filter schemes based on search and active filters
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchestype = activeFilters.type === "All" || scheme.type === activeFilters.type;
    const matchesRegion = activeFilters.region === "All" || scheme.region === activeFilters.region;
    const matchesStatus = activeFilters.status === "All" || scheme.status === activeFilters.status;

    return matchesSearch && matchestype && matchesRegion && matchesStatus;
  });

  return (
    <div className="bg-white overflow-hidden w-full font-sans">
      <Header title={"Government Schemes Portal"} des={"Discover and apply for agricultural schemes and benefits available for farmers"} />

      {/* Search Bar */}
      <div className="p-4 md:px-20">
        <div className="relative flex justify-center">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search size={20} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full md:w-1/2 py-3 pl-10 pr-4 rounded-full bg-gray-100 border-2 border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none text-lg"
            placeholder="Search for schemes, benefits, loans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="border-b md:mx-20 border-gray-200 bg-gray-50">
        <div className="p-4 flex justify-between items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors"
          >
            <Filter size={18} />
            <span className="font-medium">Filters</span>
            <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          <div className="text-sm text-gray-500">
            Showing {filteredSchemes.length} of {schemes.length} schemes
          </div>
        </div>

        {showFilters && (
          <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter Inputs */}
            {/* You can add filter options like dropdowns or radio buttons here */}
          </div>
        )}
      </div>

      {/* Main Content - Schemes List */}
      <div className="divide-y p-4 md:px-20 divide-gray-200">
        {loading ? (
          <div className="p-8 text-center animate-pulse">
            <Loader size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg text-gray-600">Twinkling schemes...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Error: {error}</h3>
          </div>
        ) : filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white shadow-lg rounded-lg mb-4 p-6 hover:shadow-xl transition-shadow duration-300">
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => handleSchemeClick(scheme.name)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${scheme.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {scheme.status}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Tag size={14} />
                      {scheme.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{scheme.short_description}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <ChevronRight size={20} className={`text-gray-400 transition-transform ${expandedScheme === scheme.name ? "rotate-90" : ""}`} />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedScheme === scheme.name && expandedSchemeDetails && (
  <div className="mt-4 pt-4 border-t border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Details of {expandedSchemeDetails.name}</h3>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700"><strong>Eligibility:</strong> {expandedSchemeDetails.eligibility}</p>
        <p className="text-sm font-medium text-gray-700"><strong>Benefits:</strong> {expandedSchemeDetails.benefits}</p>
        <p className="text-sm font-medium text-gray-700"><strong>Application Process:</strong> {expandedSchemeDetails.application_process}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700"><strong>Start Date:</strong> {expandedSchemeDetails.start_date}</p>
        <p className="text-sm font-medium text-gray-700"><strong>End Date:</strong> {expandedSchemeDetails.end_date || "N/A"}</p>
        <p className="text-sm font-medium text-gray-700"><strong>Number of Applicants:</strong> {expandedSchemeDetails.number_of_applicants || "N/A"}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700"><strong>Official Link:</strong></p>
        <a
          href={expandedSchemeDetails.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline text-sm"
        >
          Visit Official Website
        </a>
      </div>
    </div>
  </div>
)}

            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No schemes found matching your filters</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
