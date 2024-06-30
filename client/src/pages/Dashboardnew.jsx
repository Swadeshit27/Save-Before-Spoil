import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase/firebase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Wrapper from "../layout/Wrapper";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Helper function to format date to dd/mm/yyyy
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Function to calculate days left based on dd/mm/yyyy format
function daysLeft(expireDateString) {
  const [day, month, year] = expireDateString.split("/").map(Number);
  const expireDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const timeDifference = expireDate.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}

function Dashboardnew() {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [error, setError] = useState(null);
  const [csvList, setCsvList] = useState([]);

  useEffect(() => {
    const fetchListData = () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const dbRef = ref(database, user.uid);
        onValue(
          dbRef,
          (snapshot) => {
            const listData = [];
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              if (childData) {
                listData.push(childData);
              }
            });
            setCsvList(listData);
          },
          {
            onlyOnce: true,
          }
        );
      }
    };
    fetchListData();
  }, []);

  const getCurrentUserData = async () => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(database, "users", user.uid));
          if (userDoc.exists()) {
            setUserid(user.uid);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("User is not logged in.");
        }
      });
    } catch (error) {
      console.error("Error fetching current user data: ", error);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex space-x-4 py-4">
          <Button onClick={() => navigate("/upload")}>Upload CSV</Button>
          <Button>Add new Item +</Button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {csvList.length === 0 ? (
          <p className="text-center">
            No data to display. Please upload a CSV file of your product
            database first with these fields: Product Name, Date of Manufacture,
            Date of Expire, Price, Quantity, unit.
          </p>
        ) : (
          <Table>
            <TableCaption>Fetched Data</TableCaption>
            <TableHeader>
              <TableRow>
                {Object.keys(csvList[0] || {}).map((key) => (
                  <TableHead key={key}>{key}</TableHead>
                ))}
                <TableHead>Days Left</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {csvList.map((row, index) => (
                <TableRow key={index}>
                  {Object.entries(row).map(([key, value], i) => (
                    <TableCell key={i}>
                      {key.includes("date")
                        ? formatDate(value)
                        : typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </TableCell>
                  ))}
                  <TableCell>
                    {daysLeft(formatDate(row["date_of_expire"])) > 0 ? (
                      <span
                        className={`${
                          daysLeft(formatDate(row["date_of_expire"])) > 30
                            ? "text-green-500"
                            : "text-orange-600"
                        } text-sm font-medium`}
                      >
                        {daysLeft(formatDate(row["date_of_expire"]))} days left
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-red-500 px-2 py-1 text-white">
                        Expired
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Wrapper>
  );
}

export default Dashboardnew;
