import {cloudinary} from "../utils/cloudinary.js"
cloudinary.config({
  cloud_name: "dsnsi0ioz",
  api_key: "151826192584142",
  api_secret: "GVb2kmMNVYdTXdVkMt8NedfPpK8",
});
const getUrl=(link)=>{
   const urlArray=link.split('/')
   const image=urlArray[urlArray.length-1]
   const imageName=image.split('.')[0]
   const url=`${urlArray[urlArray.length-3]}/${urlArray[urlArray.length-2]}/${imageName}`
   return url
}

// Delete from Cloudinary
export const deleteFile = async (req, res) => {
  try {
    const { coverImageUrl, pdfUrl } = req.body;
    const image = getUrl(coverImageUrl);
    const pdf = getUrl(pdfUrl);

    const imageResult = await cloudinary.uploader.destroy(image);
    console.log(imageResult);

    const pdfResult = await cloudinary.uploader.destroy(pdf);
    console.log(pdfResult);

    res.status(200).json({ message: "Files deleted successfully", imageResult, pdfResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting files", error });
  }
};


