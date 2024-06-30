
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { daysLeft } from "@/utils/CommonFn"
import { useEffect } from "react";
import { useState } from "react"

export default function RecipeTable({ products }) {
    const [price, setPrice] = useState(0);
    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i < products.length; i++)total += products[i].price;
        setPrice(total)
    }
    useEffect(() => {
        totalPrice();  
    },[])
    return (
        <Card className="max-w-[50%] ms-auto">
            <CardHeader>
                <CardTitle>Expiring Our Products</CardTitle>
                <CardDescription>
                    View details on products that will expire soon and what dishes they can be used for.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Days Remaining</TableHead> 
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{daysLeft(product.expireDate)}</TableCell> 
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <div className="flex items-center gap-x-4 px-4 pb-4">
                <h1>Total Price: </h1>
                <p> ₹{price}</p>
            </div>
            <button className="px-6 py-2.5 bg-black text-white  rounded-md cursor-pointer m-4 mt-0">Pay Now</button>
        </Card>
    )
}