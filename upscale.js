const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Route to handle image uploads
app.post('/api/imageupscale', (req, res) => {
  const { image } = req.files; // Assuming you're using a middleware like express-fileupload to parse the form data

  if (!image) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  // Move the uploaded file to the 'uploads' directory
  const uploadDir = path.join(__dirname, 'uploads');
  const imageName = Date.now() + path.extname(image.name);
  const imagePath = path.join(uploadDir, imageName);

  image.mv(imagePath, (err) => {
    if (err) {
      console.error('Error moving file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ imageName });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
