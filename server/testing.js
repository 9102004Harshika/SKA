import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
    cloud_name: "dsnsi0ioz",
    api_key: "151826192584142",
    api_secret: "GVb2kmMNVYdTXdVkMt8NedfPpK8",
  });
cloudinary.uploader
.destroy('Ska/notes_coverImage/y6qcz0qnyie8ayxwnrqi')
.then(result=>console.log(result))