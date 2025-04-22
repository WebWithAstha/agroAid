import ImageKit from "imagekit";
import { config } from "../config/config.js";

const imagekit = new ImageKit({
    publicKey: config.imageKit.publicKey,
    privateKey: config.imageKit.privateKey,
    urlEndpoint: config.imageKit.urlEndpoint,
});

export const uploadFileToImageKit = async (data,) => {
    try {
        const response = await imagekit.upload({
            file: data.data,
            fileName: data.name,
            useUniqueFileName: true,
        });

        return response
    } catch (error) {
        console.error("Error uploading file to ImageKit:", error);
        throw error;
    }
};