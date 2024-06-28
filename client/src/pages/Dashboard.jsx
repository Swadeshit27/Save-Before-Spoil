import {
    Badge,
    Button,
    Datepicker,
    Label,
    Select,
    Table,
    TextInput,
} from "flowbite-react";
import React from "react";
import { HiSearch } from "react-icons/hi";
import { FaFilter } from "react-icons/fa";
import Foods from "../data/product.json";
import { Link } from "react-router-dom/dist";
import { useState } from "react";

function daysLeft(expireDateString) {
    const expireDate = new Date(expireDateString);
    const currentDate = new Date();
    const timeDifference = expireDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
}

const Dashboard = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(7);

    return (
        <section className="w-full  h-screen bg-gray-200 flex items-center">
            <div className="w-1/4 h-full bg-gray-50 px-8 py-12">
                <div className=" ">
                    <Label htmlFor="search" value="Search food" />
                    <TextInput
                        type="search"
                        className="mt-1"
                        icon={HiSearch}
                        placeholder="Search food.."
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
                        <option value="">Price</option>
                        <option value="">Rating</option>
                    </Select>
                </div>
                <div className="space-y-3 mt-6">
                    <h1> Search in between range </h1>
                    <div>
                        <Label htmlFor="Sort by" className="mt-1" value="Start date" />
                        <Datepicker />
                    </div>
                    <div>
                        <Label htmlFor="Sort by" className="mt-1" value="Ending date" />
                        <Datepicker />
                    </div>
                </div>
            </div>
            <div className="w-3/4 h-[90vh] p-4">
                <div className="w-full h-full bg-white rounded-md mb-4">
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>Food name</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>
                                <Table.HeadCell>Expire Date</Table.HeadCell>
                                <Table.HeadCell>Days remaining</Table.HeadCell>
                                <Table.HeadCell>in stock</Table.HeadCell>
                                <Table.HeadCell>action </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {Foods.slice(start, end).map((food, index) => {
                                    const { name, price, expireDate, inStockQuantity } = food;
                                    return (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {name}
                                            </Table.Cell>
                                            <Table.Cell>{price}</Table.Cell>
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
                                            <Table.Cell>
                                                <Link to={"/"}>
                                                    <Button>Donate</Button>
                                                </Link>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
                <div className="flex items-center gap-x-6  justify-end">
                    <Button disabled={start == 0} onClick={() => (setStart(start - 5), setEnd(end - 5))}>Prev</Button>
                    <Button disabled={end >= Foods.length} onClick={() => (setStart(start + 5), setEnd(end + 5))}>Next</Button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
