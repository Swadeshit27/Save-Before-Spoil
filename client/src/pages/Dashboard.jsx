import {
    Badge,
    Button,
    Checkbox,
    Datepicker,
    Label,
    Select,
    Table,
    TextInput,
} from "flowbite-react";

import { HiSearch } from "react-icons/hi";
import { FaFilter } from "react-icons/fa";
import Foods from "../data/product.json";
import { Link } from "react-router-dom/dist";
import { useState, useEffect } from "react";
import { ref, set } from 'firebase/database';
import { database } from '../../firebase/firebase';
import { useDispatch } from "react-redux";
import { addIngredient } from "@/redux/slice/itemsSlice";
import { useNavigate } from "react-router-dom";
import { SlGraph } from "react-icons/sl";

function daysLeft(expireDateString) {
    const expireDate = new Date(expireDateString);
    const currentDate = new Date();
    const timeDifference = expireDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
}

const Dashboard = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);
    const [searchVal, setSearchVal] = useState('')
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const reducedPrice = (price, daysLeft) => {
        if (daysLeft < 30) {
            const discountFactor = Math.max(0.4, daysLeft / 30);
            let newPrice = price * discountFactor;
            return Math.round(newPrice);
        }
        return price;
    };

    const handelSelect = (checked, value) => {
        if (checked) {
            setSelected([...selected, value]);
        } else {
            setSelected(selected.filter((item) => item.name !== value.name));
        }
    }
    const handelSubmit = () => { 
        dispatch(addIngredient(selected));
        navigate('/donate-to-food-bank')
    }
 
    const performOperations = (products, options) => {
        let result = [...products];

        if (options.sortBy) {
            result.sort((a, b) => a[options.sortBy] > b[options.sortBy] ? 1 : -1);
        }

        if (options.range && options.range.field) {
            result = result.filter(product =>
                product[options.range.field] >= options.range.min &&
                product[options.range.field] <= options.range.max
            );
        }

        return result;
    };

    return (
        <section className="w-full min-h-screen bg-gray-200 flex  p-6">
            <div className="w-1/4 h-full bg-gray-50 p-6 rounded-md">
                <div className=" ">
                    <Label htmlFor="search" value="Search food" />
                    <TextInput
                        type="search"
                        className="mt-1"
                        icon={HiSearch}
                        placeholder="Search food.."
                        onChange={(e) => setSearchVal(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2  mt-6 mb-2 text-xl font-semibold text-gray-700">
                    <FaFilter size={18} />
                    <span>Filter</span>
                </div>
                <div>
                    <Label htmlFor="Sort by" value="Sort by foods" />
                    <Select className="mt-1 w-full">
                        <option value="">Sort by</option>
                        <option value="">Low to High</option>
                        <option value="">High to Low</option>
                    </Select>
                </div>
                <div className="space-y-3 mt-6">
                    <h1> Search in between date intervals </h1>
                    <div>
                        <Label htmlFor="Sort by" className="mt-1" value="Start date" />
                        <Datepicker onChange={(e) => console.log(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="Sort by" className="mt-1" value="Ending date" />
                        <Datepicker onChange={(e) => console.log(e.target.value)} />
                    </div>
                </div>
            </div>
            {/* {console.log(data)} */}
            <div className="w-3/4 h-[75vh] ps-6">
                <div className="w-full h-full bg-white rounded-md mb-4">
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell>Food name</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>
                                <Table.HeadCell>Expire Date</Table.HeadCell>
                                <Table.HeadCell>Days remaining</Table.HeadCell>
                                <Table.HeadCell>in stock</Table.HeadCell>
                                {/* <Table.HeadCell>action </Table.HeadCell> */}
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {Foods.filter(ele => ele.name.toLowerCase().includes(searchVal.toLowerCase())).slice(start, end).map((food, index) => {
                                    const { name, price, expireDate, inStockQuantity } = food;
                                    return (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell >
                                                <Checkbox onChange={(e) => handelSelect(e.target.checked, food)} />
                                            </Table.Cell>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="text-base font-medium text-gray-700">
                                                    {
                                                        price !== reducedPrice(price, daysLeft(expireDate)) ? (
                                                            <div className="flex items-center space-x-2">
                                                                <span className=" text-gray-400 line-through">{price} </span>
                                                                <span>
                                                                    {reducedPrice(price, daysLeft(expireDate))}
                                                                </span>
                                                                <SlGraph className={"rotate-90 text-red-500"} />
                                                            </div>):
                                                            <span>{price} </span>
                                                    }
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>{expireDate}</Table.Cell>
                                            {daysLeft(expireDate) > 0 ? (
                                                <Table.Cell className={`${daysLeft(expireDate) > 30 ? "text-green-500" : "text-orange-600"} text-sm font-medium`}>
                                                    {daysLeft(expireDate)}{" "}days left
                                                </Table.Cell>
                                            ) : (
                                                <Table.Cell>
                                                    <Badge className="inline-block rounded-full bg-red-500 text-white">Expired</Badge>
                                                </Table.Cell>
                                            )}
                                            <Table.Cell>{inStockQuantity}</Table.Cell>
                                            {/* <Table.Cell>
                                                <Link to={"/"}>
                                                    <Button>Donate</Button>
                                                </Link>
                                            </Table.Cell> */}
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
                {
                    selected.length > 0 && (
                        <div className="flex items-center my-4 justify-end">
                            <Button onClick={handelSubmit}>Donate</Button>
                        </div>
                    )
                }
                <div className="flex items-center gap-x-6  justify-end">
                    <Button disabled={start == 0} onClick={() => (setStart(start - 5), setEnd(end - 5))}>Prev</Button>
                    <Button disabled={end >= Foods.length} onClick={() => (setStart(start + 5), setEnd(end + 5))}>Next</Button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
