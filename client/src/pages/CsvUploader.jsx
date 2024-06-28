// src/App.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { ref, set } from 'firebase/database';
import { database } from '../../firebase/firebase';

function CsvUploader() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

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

    const saveToFirebase = () => {
        if (data.length === 0) {
            setError("No data to save. Please upload a CSV file first.");
            return;
        }

        const dataRef = ref(database, 'csvData');
        set(dataRef, data)
            .then(() => {
                alert('Data saved to Firebase');
                setError(null);
            })
            .catch((error) => {
                console.error('Error saving data to Firebase', error);
                setError(error.message);
            });
    };

    return (
        <div className="App">
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <button onClick={saveToFirebase} className=' border px-3 mt-4 py-2'>Save to Firebase</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
        </div>
    );
}

export default CsvUploader;
