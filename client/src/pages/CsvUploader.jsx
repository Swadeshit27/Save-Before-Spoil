import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { database } from "../../firebase/firebase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CsvUploader() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [csvlist, setCsvList] = useState([]);
  const [tableheader, setTableHeader] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    }
  };

  const fetchlistdata = () => {
    const dbRef = ref(database, "csvData");
    onValue(
      dbRef,
      (snapshot) => {
        const listData = [];

        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childData) {
            setCsvList((prev) => [...prev, childData]);
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
  };

  const saveToFirebase = () => {
    if (data.length === 0) {
      setError("No data to save. Please upload a CSV file first.");
      return;
    }
    const writeUserData = (data) => {
      try {
        const postListRef = ref(database, "csvData");
        const newPostRef = push(postListRef);
        set(newPostRef, data);
      } catch (e) {
        console.log(e);
      }
    };
    writeUserData(data);
  };

  return (
    <div className="App">
      <h1>CSV Upload</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={saveToFirebase} className="border px-3 mt-4 py-2">
        Save to Firebase
      </button>
      <button onClick={fetchlistdata} className="border px-3 mt-4 py-2">
        Fetch Data
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {csvlist.length > 0 && (
        <Table>
          <TableCaption>Fetched Data</TableCaption>
          <TableHeader>
            <TableRow>
              {Object.keys(csvlist[0]).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {csvlist.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default CsvUploader;
