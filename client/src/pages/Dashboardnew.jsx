import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setAllItems } from "@/redux/slice/itemsSlice";
import { useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const items  = useSelector(state => state.items)
  console.log(items)
  const [error, setError] = useState(null);

  const fetchlistdata = () => {
    const dbRef = ref(database, "csvData");
    onValue(
      dbRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (childData) {
            dispatch(setAllItems(childData));
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
  };
  fetchlistdata();
  useEffect(() => {
  }, []);

  return (
    <div className="App">
      <h1>CSV Upload</h1>
      {/* <Button  className="">
        Fetch Data
      </Button> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {items.length > 0 && (
        <Table>
          <TableCaption>Fetched Data</TableCaption>
          <TableHeader>
            <TableRow>
              {Object.keys(items[0]).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
              <TableHead>Days Left</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value], i) => (
                  <TableCell key={i}>
                    {key.includes("Date") ? formatDate(value) : value}
                  </TableCell>
                ))}

                {daysLeft(formatDate(row["Date of Expire"])) > 0 ? (
                  <TableCell
                    className={`${daysLeft(formatDate(row["Date of Expire"])) > 30
                      ? "text-green-500 "
                      : "text-orange-600"
                      } text-sm font-medium`}
                  >
                    {daysLeft(formatDate(row["Date of Expire"]))} days left
                  </TableCell>
                ) : (
                  <TableCell>
                    <span className="inline-block rounded-full bg-red-500 text-white px-2 py-1">
                      Expired
                    </span>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default Dashboardnew;
