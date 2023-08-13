//your JS code here. If required.
function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Helper function to check if two images have the same class
    function isIdentical(img1, img2) {
      return img1.className === img2.className;
    }

    // Get the image elements
    const imageContainer = document.getElementById("image-container");
    const images = imageContainer.getElementsByTagName("img");
  
    // Create an array of class names for the images
    const classNames = ["img1", "img2", "img3", "img4", "img5"];
  
    // Shuffle the class names and assign them to the images
    const shuffledClassNames = shuffleArray([...classNames, ...classNames]);
    for (let i = 0; i < images.length; i++) {
      images[i].className = shuffledClassNames[i];
    }
  
    // Store the selected images
    let selectedImages = [];
  
    // Store the current state
    let state = 1;
  
    // Function to handle image click
    function handleImageClick(event) {
      const clickedImage = event.target;
  
      // Ignore clicks on already selected images
      if (selectedImages.includes(clickedImage)) {
        return;
      }
  
      // Reset the previous selection if more than two images are selected
      if (selectedImages.length >= 2) {
        selectedImages.forEach((image) => image.classList.remove("selected"));
        selectedImages = [];
      }
  
      // Add the clicked image to the selection
      clickedImage.classList.add("selected");
      selectedImages.push(clickedImage);
  
      // Change state based on the number of selected images
      if (selectedImages.length === 1) {
        state = 2;
        document.getElementById("reset").style.display = "block";
      } else if (selectedImages.length === 2) {
        state = 3;
        document.getElementById("verify").style.display = "block";
      }
    }
  
    // Function to handle reset button click
    function handleResetClick() {
      selectedImages.forEach((image) => image.classList.remove("selected"));
      selectedImages = [];
  
      state = 1;
      document.getElementById("reset").style.display = "none";
      document.getElementById("verify").style.display = "none";
      document.getElementById("para").innerHTML = "";
    }
  
    // Function to handle verify button click
    function handleVerifyClick() {
      const img1 = selectedImages[0];
      const img2 = selectedImages[1];
  
      if (isIdentical(img1, img2)) {
        document.getElementById("para").innerHTML = "You are a human. Congratulations!";
      } else {
        document.getElementById("para").innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
      }
  
      state = 4;
      document.getElementById("verify").style.display = "none";
    }
  
    // Attach click event listeners to the images
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", handleImageClick);
    }
  
    // Attach click event listener to the reset button
    document.getElementById("reset").addEventListener("click", handleResetClick);
  
    // Attach click event listener to the verify button
    document.getElementById("verify").addEventListener("click", handleVerifyClick);