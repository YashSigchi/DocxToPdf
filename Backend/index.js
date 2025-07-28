const express = require("express");
const multer = require("multer");
const docxToPDF = require("docx-pdf");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Ensure 'uploads' and 'files' directories exist
const uploadsDir = path.join(__dirname, "uploads");
const filesDir = path.join(__dirname, "files");

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST route to convert .doc/.docx to .pdf
app.post("/convertFile", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const outputPath = path.join(filesDir, `${req.file.originalname}.pdf`);

    docxToPDF(inputPath, outputPath, (err, result) => {
      if (err) {
        console.error("Conversion Error:", err);
        return res.status(500).json({ message: "Error converting docx to pdf" });
      }

      res.download(outputPath, () => {
        console.log("File converted and sent successfully.");

        // Clean up uploaded and generated files
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Health check route (useful for Render)
app.get("/", (req, res) => {
  res.send("Word to PDF Converter Backend is running.");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
