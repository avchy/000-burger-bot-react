function changeSize(cloudinaryUrl) {
   const resizedUrl = cloudinaryUrl.replace('/upload/', '/upload/c_scale,h_100,w_150/');
  //  const resizedUrl = cloudinaryUrl.replace('/upload/', '/upload/w_150,h_100/');
  
  console.log(cloudinaryUrl);
  console.log(resizedUrl);
  return resizedUrl
}

// module.exports = { changeSize }
export default changeSize
