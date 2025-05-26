import { ethers } from "ethers";
import {
    setAccount,
    setBalance,
    setLoading,
    resetBlockchain,
} from "../slices/blockChainSlice";
import { setallCrops, setMyCrops } from "../slices/cropSlice";
import { toast } from "sonner";

import CROP_MARKETPLACE_ABI from "../../artifacts/contracts/CropMarketplace.sol/CropMarketplace.json";
const CROP_MARKETPLACE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const getContract = (withSigner = false) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signerOrProvider = withSigner ? provider.getSigner() : provider;
    return new ethers.Contract(
        CROP_MARKETPLACE_ADDRESS,
        CROP_MARKETPLACE_ABI.abi,
        signerOrProvider
    );
};

export const connectWallet = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const account = await signer.getAddress();
            const balanceBigNumber = await provider.getBalance(account);
            const balance = ethers.utils.formatEther(balanceBigNumber);

            dispatch(setAccount(account));
            dispatch(setBalance(balance));
            toast.success("Wallet connected");
        } else {
            throw new Error("MetaMask not found");
        }

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        toast.error("Failed to connect wallet: " + error.message);
    }
};

export const checkIfWalletIsConnected = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();

            if (accounts.length > 0) {
                const account = accounts[0];
                const balanceBigNumber = await provider.getBalance(account);
                const balance = ethers.utils.formatEther(balanceBigNumber);

                dispatch(setAccount(account));
                dispatch(setBalance(balance));
            } else {
                await dispatch(connectWallet());
            }
        }

        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        toast.error("Error checking wallet connection: " + error.message);
    }
};

export const disconnectWallet = () => async (dispatch) => {
    dispatch(resetBlockchain());
    toast.success("Wallet disconnected");
};

export const listCrop = (
    {
        name,
        image,
        location,
        harvestDate,
        deliveryAvailable,
        totalQuantity,
        perQuintalPrice,
        description,
    },
    setShowUploadForm
) => async (dispatch, getState) => {
    try {
        const { account } = getState().blockchainReducer;
        if (!account) {
            toast.info("Connecting wallet...");
            await dispatch(connectWallet());
        }

        const contract = getContract(true);
        const timestamp = Math.floor(new Date(harvestDate).getTime());
        const tx = await contract.listCrop(
            name,
            image,
            location,
            timestamp,
            deliveryAvailable,
            totalQuantity,
            perQuintalPrice,
            description,
        );
        await tx.wait();
        dispatch(fetchAllCrops(true));
        setShowUploadForm(false);
    } catch (error) {
        toast.error("Error listing crop: " + error.message);
    }
};

export const buyCrop = (cropId, quantity, setSelectedCrop) => async (dispatch, getState) => {
    try {
        const { account } = getState().blockchainReducer;
        if (!account) {
            toast.info("Connecting wallet...");
            await dispatch(connectWallet());
        }

        const contract = getContract(true);
        const crop = await contract.crops(cropId);
        const totalCost = crop.perQuintalPrice * quantity;

        const tx = await contract.buyCrop(cropId, quantity, {
            value: ethers.utils.parseEther(totalCost.toString()),
        });
        await tx.wait();

        dispatch(fetchAllCrops(false));
        toast.success("Crop purchased successfully");
        setSelectedCrop(null);
    } catch (error) {
        toast.error("Error purchasing crop: " + error.message);
    }
};

export const fetchAllCrops = (filter = false) => async (dispatch, getState) => {
    try {
        const { account } = getState().blockchainReducer;
        if (!account) {
            toast.info("Connecting wallet...");
            await dispatch(connectWallet());
        }

        const contract = getContract();
        const crops = await contract.getAllCrops();

        let formattedCrops = crops.map((crop) => ({
            id: crop[0].toNumber(),
            user: crop[1],
            name: crop[2],
            image: crop[3],
            location: crop[4],
            harvestDate: crop[5].toNumber(),
            deliveryAvailable: crop[6],
            totalQuantity: crop[7].toNumber(),
            perQuintalPrice: crop[8].toNumber(),
            description: crop[9],
            listed: crop[10],
        }));

        if (filter) {
            const lowerAcc = account.toLowerCase();
            formattedCrops = formattedCrops.filter(
                (crop) => crop.user.toLowerCase() === lowerAcc
            );
            dispatch(setMyCrops(formattedCrops));
        } else {
            dispatch(setallCrops(formattedCrops));
        }
    } catch (error) {
        toast.error("Error fetching crops: " + error.message);
    }
};
