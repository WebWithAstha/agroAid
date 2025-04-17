export const formatCrops = (crops)=>{
    const formattedCrops = crops.map((crop) => {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
        return {
            name: crop.commodity,
            max_price: crop.max_price,
            min_price: crop.min_price,
            market: crop.market,
            date:formattedDate
        };
    });
    return formattedCrops;
    
}