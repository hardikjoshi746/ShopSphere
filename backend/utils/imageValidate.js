const imageValidate = (images) => {
  let imagesTable = []; // create an empty array
  if (Array.isArray(images)) {
    // check if the images are an array
    imagesTable = images;
  } else {
    imagesTable.push(images); // add the image to the array
  }
  if (imagesTable.length > 3) {
    // check if the images are more than 3
    return { error: "You can upload up to 3 images" };
  }
  for (let image of imagesTable) {
    // loop through the images
    if (image.size > 1048576) {
      // check if the image size is more than 1mb
      return { error: "Image size should be less than 1mb" };
    }
    const fileTypes = /jpeg|jpg|png|gif/; // check if the image is a jpeg, jpg, png, or gif
    const mimeTypes = fileTypes.test(image.mimetype); // check if the image mimetype is a jpeg, jpg, png, or gif
    if (!mimeTypes) {
      // check if the image is not a jpeg, jpg, png, or gif
      return { error: "Only images are allowed" };
    }
  }
  return { error: false }; // return false if there are no errors
};

module.exports = imageValidate;
