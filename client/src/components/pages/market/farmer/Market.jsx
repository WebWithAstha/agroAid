import { useEffect, useRef, useState } from "react";
import {
  Pencil,
  Trash2,
  Upload,
  X,
  Plus,
  Check,
  AlertCircle,
} from "lucide-react";
import { farmerData, initialCrops } from "../../../../data/farmerCrops";
import Header from "../../../Header";
import { useDispatch, useSelector } from "react-redux";
import { createCrop, fetchMyCrops } from "../../../../store/Actions/cropActions";

const FarmerDashboard = () => {
  const [crops, setCrops] = useState([]);
  const {myCrops}  = useSelector(store => store.cropReducer);
  console.log(myCrops);

  useEffect(()=>{
    if(myCrops?.length == 0) dispatch(fetchMyCrops())
  },[])
  
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteCrop = (cropId) => {
    if (confirm("Are you sure you want to remove this crop listing?")) {
      setCrops(crops.filter((crop) => crop.id !== cropId));
    }
  };

  const handleEditCrop = (crop) => {
    setEditingCrop({ ...crop });
    setShowUploadForm(true);
  };

  const handleAddNewCrop = () => {
    setEditingCrop(null);
    setShowUploadForm(true);
  };

  const handleSaveCrop = (updatedCrop) => {
    dispatch(createCrop(updatedCrop));
    setCrops([updatedCrop, ...crops]);
    setShowUploadForm(false);
  };

  return (
    <div className="bg-gray-50 h-screen">
      <div className=" relative mb-6">
        <Header
          title={"Farmer Dashboard"}
          des={"Manage your crops on FarmChain"}
        />
        <div className="bg-white p-4 absolute right-4 bottom-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="font-bold text-lg">{farmerData.name}</div>
              <div className="text-gray-600">{farmerData.farm}</div>
            </div>
            {farmerData.verified && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Verified Farmer
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl h-[73vh] mx-auto overflow-auto">
        {showUploadForm ? (
          <CropForm
            initialData={editingCrop}
            onSave={handleSaveCrop}
            onCancel={() => setShowUploadForm(false)}
          />
        ) : (
          <>
            <div className="flex justify-between sticky top-0 bg-gray-50 z-9 pb-2 items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Your Crop Listings
              </h2>
              <button
                onClick={handleAddNewCrop}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-300"
              >
                <Plus size={16} className="mr-2" />
                Add New Crop
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {myCrops.map((crop) => (
                <CropListingCard
                  key={crop._id}
                  crop={crop}
                  onEdit={() => handleEditCrop(crop)}
                  onDelete={() => handleDeleteCrop(crop._id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default FarmerDashboard;
const CropListingCard = ({ crop, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          <div className="relative h-full">
            <div className="h-48">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-48 md:h-full object-contain"
              />
            </div>
            {/* {crop.status === "low_stock" && (
              <div className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-1">
                Low Stock
              </div>
            )} */}
            {/* {crop.status === "pending" && (
              <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-1">
                Pending Verification
              </div>
            )} */}
          </div>
        </div>

        <div className="p-4 md:w-3/4 flex flex-col md:flex-row">
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-800">
                {crop.name}
              </h3>
              <div className="text-lg font-bold text-green-600">
                {crop.perQuintalPrice} ETH
              </div>
            </div>

            <p className="text-gray-600 text-sm my-2">{crop.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-xs text-gray-500">Available totalQuantity</div>
                <div className="font-medium">
                  {crop.totalQuantity} {crop.totalQuantityUnit}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Harvest Date</div>
                <div className="font-medium">
                  {new Date(crop.harvestDate).toLocaleDateString()}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Delivery Option</div>
                <div className="font-medium">
                  {crop.deliveryAvailable ? "Available" : "Pickup only"}
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col justify-end mt-4 md:mt-0 md:ml-4 space-x-2 md:space-x-0 md:space-y-2">
            <button
              onClick={onEdit}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors duration-300"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={onDelete}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition-colors duration-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CropForm = ({ initialData, onSave, onCancel }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(null);
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      perQuintalPrice: "",
      totalQuantity: "",
      location: farmerData.farm + ", " + farmerData.location,
      harvestDate: new Date().toISOString().split("T")[0],
      deliveryAvailable: true,
      image: imageFiles,
    }
  );

  const handleFileChange = (e) => {
    const files = e.target.files[0];

    const newPreviews = URL.createObjectURL(files);

    setImageFiles(files);
    setImagePreviews(newPreviews);
    setFormData((prev) => ({
      ...prev,
      image: files,
    }));

  };


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Crop name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.perQuintalPrice || isNaN(formData.perQuintalPrice) || formData.perQuintalPrice <= 0)
      newErrors.perQuintalPrice = "Valid perQuintalPrice is required";
    if (
      !formData.totalQuantity ||
      isNaN(formData.totalQuantity) ||
      formData.totalQuantity <= 0
    )
      newErrors.totalQuantity = "Valid totalQuantity is required";
    if (!formData.harvestDate)
      newErrors.harvestDate = "Harvest date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = {
        ...formData,
        perQuintalPrice: parseFloat(formData.perQuintalPrice),
        images: imageFiles,
        totalQuantity: parseInt(formData.totalQuantity),
      };
      console.log(formDataToSend);
      onSave(formDataToSend)
    }
  };



  const fileInputRef = useRef(null);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };



  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {initialData ? "Edit Crop Listing" : "Add New Crop"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop Image
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center w-full">
              {imagePreviews ?
                (<div className="flex gap-4 flex-wrap justify-center items-center mb-4">
                  <img
                    src={imagePreviews}
                    alt={imagePreviews}
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
                ) : (
              <button
                type="button"
                onClick={handleFileClick}
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-4 py-2 transition"
              >
                <Upload size={16} className="mr-2" />
                <span>Upload Image</span>
              </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <p className="mt-2 text-xs text-gray-500 text-center">
                {imagePreviews
                  ? "(You can upload multiple images)"
                  : "(Images uploaded successfully!)"}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="e.g., Organic Wheat"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harvest Date*
            </label>
            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.harvestDate ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.harvestDate && (
              <p className="mt-1 text-xs text-red-500">{errors.harvestDate}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full p-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Describe your crop, growing methods, and quality"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              perQuintalPrice (ETH)*
            </label>
            <input
              type="number"
              name="perQuintalPrice"
              value={formData.perQuintalPrice}
              onChange={handleChange}
              step="0.001"
              min="0.001"
              className={`w-full p-2 border rounded-md ${errors.perQuintalPrice ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="0.025"
            />
            {errors.perQuintalPrice && (
              <p className="mt-1 text-xs text-red-500">{errors.perQuintalPrice}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              totalQuantity Available*
            </label>
            <div className="flex">
              <input
                type="number"
                name="totalQuantity"
                value={formData.totalQuantity}
                onChange={handleChange}
                min="1"
                className={`w-full p-2 border rounded-l-md ${errors.totalQuantity ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="50"
              />
            </div>
            {errors.totalQuantity && (
              <p className="mt-1 text-xs text-red-500">{errors.totalQuantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md border-gray-300"
              placeholder="Farm location"
            />
          </div>

          <div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="deliveryAvailable"
                name="deliveryAvailable"
                checked={formData.deliveryAvailable}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 rounded"
              />
              <label
                htmlFor="deliveryAvailable"
                className="ml-2 text-sm text-gray-700"
              >
                Delivery Available
              </label>
            </div>
          </div>
        </div>

        {initialData && (
          <div className="mt-6 bg-blue-50 p-4 rounded-md flex items-start">
            <AlertCircle size={20} className="text-blue-500 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                Editing this crop will trigger a new verification process on the
                blockchain. Verification may take 24-48 hours to complete.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center"
          >
            <Check size={16} className="mr-2" />
            {initialData ? "Save Changes" : "List Crop"}
          </button>
        </div>
      </form>
    </div>
  );
};
