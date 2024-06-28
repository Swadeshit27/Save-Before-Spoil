// src/components/CsvUploader.js
import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const CsvUploader = () => {
  const [data, setData] = useState([]);
  console.log(data);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        uploadToFirebase(results.data);
      },
    });
  };

  const uploadToFirebase = async (parsedData) => {
    const collectionRef = collection(db, "your-collection-name");
    for (const item of parsedData) {
      try {
        await addDoc(collectionRef, item);
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  };

  return (
    <div>
      <h1>Please choose your CSv file</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default CsvUploader;
