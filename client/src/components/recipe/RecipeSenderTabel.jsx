
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function Component() {
    const products = [
        {
            name: "Whole Wheat Bread",
            price: "$2.99",
            daysRemaining: 7,
            usedFor: "Sandwiches, toast, breadcrumbs",
        },
        {
            name: "Canned Tomatoes",
            price: "$1.50",
            daysRemaining: 14,
            usedFor: "Pasta sauces, soups, stews",
        },
        {
            name: "Chicken Breasts",
            price: "$4.99/lb",
            daysRemaining: 5,
            usedFor: "Grilled chicken, chicken salad, chicken noodle soup",
        },
        {
            name: "Broccoli",
            price: "$2.99/lb",
            daysRemaining: 3,
            usedFor: "Steamed broccoli, broccoli casserole, broccoli salad",
        },
        {
            name: "Brown Rice",
            price: "$1.99",
            daysRemaining: 21,
            usedFor: "Rice bowls, fried rice, rice pilaf",
        },
        {
            name: "Canned Beans",
            price: "$0.99",
            daysRemaining: 30,
            usedFor: "Chili, burritos, bean salads",
        },
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Expiring Products</CardTitle>
                <CardDescription>
                    View details on products that will expire soon and what dishes they can be used for.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Days Remaining</TableHead>
                            <TableHead>Used For</TableHead>
                            <TableHead>
                                <span className="sr-only">Contact</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.daysRemaining}</TableCell>
                                <TableCell>{product.usedFor}</TableCell>
                                <TableCell>
                                    <Button size="sm">Contact</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}