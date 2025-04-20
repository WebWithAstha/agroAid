// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CropMarketplace {
    struct Crop {
        uint256 id;
        address payable user;
        string name;
        string image;
        string location;
        uint256 harvestDate;
        bool deliveryAvailable;
        uint256 totalQuantity;
        uint256 perQuintalPrice;
        string description;
        bool listed;
    }

    uint256 public cropCounter;
    mapping(uint256 => Crop) public crops;

    // 🔔 Events
    event CropListed(
        uint256 id,
        address payable user,
        string name,
        string image,
        string location,
        uint256 harvestDate,
        bool deliveryAvailable,
        uint256 totalQuantity,
        uint256 perQuintalPrice,
        string description
    );

    event CropPurchased(
        uint256 cropId,
        address buyer,
        uint256 quantity,
        uint256 totalPrice
    );

    event CropUpdated(
        uint256 cropId,
        string name,
        string image,
        string location,
        uint256 harvestDate,
        bool deliveryAvailable,
        uint256 totalQuantity,
        uint256 perQuintalPrice,
        string description
    );

    event CropDelisted(uint256 cropId);
    event Log(uint256 msgValue, uint256 totalCost);

    // ✅ List a crop
    function listCrop(
        string memory _name,
        string memory _image,
        string memory _location,
        uint256 _harvestDate,
        bool _deliveryAvailable,
        uint256 _totalQuantity,
        uint256 _perQuintalPrice,
        string memory _description
    ) public {
        cropCounter++;

        crops[cropCounter] = Crop({
            id: cropCounter,
            user: payable(msg.sender),
            name: _name,
            image: _image,
            location: _location,
            harvestDate: _harvestDate,
            deliveryAvailable: _deliveryAvailable,
            totalQuantity: _totalQuantity,
            perQuintalPrice: _perQuintalPrice,
            description: _description,
            listed: true
        });

        emit CropListed(
            cropCounter,
            payable(msg.sender),
            _name,
            _image,
            _location,
            _harvestDate,
            _deliveryAvailable,
            _totalQuantity,
            _perQuintalPrice,
            _description
        );
    }

    // ✅ Get all crops
    function getAllCrops() public view returns (Crop[] memory) {
        Crop[] memory allCrops = new Crop[](cropCounter);
        for (uint256 i = 1; i <= cropCounter; i++) {
            allCrops[i - 1] = crops[i];
        }
        return allCrops;
    }

    // ✅ Get single crop
    function getCropById(uint256 _cropId) public view returns (Crop memory) {
        require(_cropId > 0 && _cropId <= cropCounter, "Invalid crop ID");
        return crops[_cropId];
    }

    // ✅ Get user balance
    function getBalance(address _addr) public view returns (uint256) {
        return _addr.balance;
    }

    // ✅ Buy a crop
    function buyCrop(uint256 _cropId, uint256 _quantity) external payable {
        Crop storage crop = crops[_cropId];
        require(crop.listed, "Crop is not listed");
        require(_quantity > 0, "Invalid quantity");
        require(crop.totalQuantity >= _quantity, "Not enough quantity available");

        uint256 totalCost = crop.perQuintalPrice * _quantity;

        emit Log(msg.value, totalCost); // Debug

        require(msg.value >= totalCost, "Insufficient ETH sent");

        // Update quantity
        crop.totalQuantity -= _quantity;

        // Transfer payment to seller
        crop.user.transfer(totalCost);

        // Refund excess ETH
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }

        emit CropPurchased(_cropId, msg.sender, _quantity, totalCost);
    }

    // 🔁 Optional: Update crop (if needed in future)
    function updateCrop(
        uint256 _cropId,
        string memory _name,
        string memory _image,
        string memory _location,
        uint256 _harvestDate,
        bool _deliveryAvailable,
        uint256 _totalQuantity,
        uint256 _perQuintalPrice,
        string memory _description
    ) public {
        Crop storage crop = crops[_cropId];
        require(crop.user == msg.sender, "Unauthorized");

        crop.name = _name;
        crop.image = _image;
        crop.location = _location;
        crop.harvestDate = _harvestDate;
        crop.deliveryAvailable = _deliveryAvailable;
        crop.totalQuantity = _totalQuantity;
        crop.perQuintalPrice = _perQuintalPrice;
        crop.description = _description;

        emit CropUpdated(
            _cropId,
            _name,
            _image,
            _location,
            _harvestDate,
            _deliveryAvailable,
            _totalQuantity,
            _perQuintalPrice,
            _description
        );
    }

    // 🛑 Optional: Delist a crop
    function delistCrop(uint256 _cropId) public {
        Crop storage crop = crops[_cropId];
        require(crop.user == msg.sender, "Unauthorized");
        require(crop.listed, "Already delisted");

        crop.listed = false;

        emit CropDelisted(_cropId);
    }
}
