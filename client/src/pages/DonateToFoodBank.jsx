
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { daysLeft } from "@/utils/CommonFn";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Component() {
    const [SearchVal, setSearchVal] = useState('');
    const { ingredients } = useSelector(state => state.items);
    const navigate = useNavigate();
    const sendEmail = async (email) => {
        const subject = "Recipe products list"
        const message = `
    <h2 style="text-align: center;">Product Table</h2>
    <table border="1" style="width: 60%; margin: auto; border-collapse: collapse; text-align: center;">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th style="padding: 10px;">Item Name</th>
                <th style="padding: 10px;">Price</th>
                <th style="padding: 10px;">Days Remaining</th>
            </tr>
        </thead>
        <tbody>
        ${ingredients.map((product, index) => (
            `<tr>
                <td style="padding: 10px;">${product.name}</td>
                <td style="padding: 10px;">${product.price}</td>
                <td style="padding: 10px;">${daysLeft(product.expireDate)}</td>
            </tr>`))}
        </tbody>
    </table>
      <div style="width: 60%; margin: 20px auto; text-align: center;">
        <p style="font-size: 18px;">Recipes that can be made using these products:</p>
         <a href="#" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Check Now</a>
    </div>

    <div style="width: 60%; margin: 20px auto; text-align: center;">
        <p style="font-size: 18px;">Total Amount to be Paid: <strong>₹1000</strong></p>
        <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Proceed to Payment</button>
    </div>  `
        try {
            const { data } = await axios.post('https://save-before-spoil.onrender.com/send-email', { email, subject, message })
            console.log(data);
            toast.success('Email sent successfully')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="w-full py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center gap-6 md:gap-8">
                    <div className="grid gap-2 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Find a Local Food Bank</h2>
                        <p className="max-w-[650px] text-muted-foreground md:text-lg">
                            Search for food banks in your area and learn how you can donate to support your local community.
                        </p>
                    </div>
                    <div className="w-full max-w-md">
                        <Input placeholder="Search by city, zip code, or name" onChange={e => setSearchVal(e.target.value)} className="h-10" />
                    </div>
                </div>
                <div className="grid gap-6 pt-8 md:pt-10 lg:pt-12">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Acme Food Bank</CardTitle>
                                <CardDescription>
                                    Serving the community for over 20 years, the Acme Food Bank provides nutritious food to families in
                                    need. They are currently in need of non-perishable items and volunteers.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <LocateIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>123 Main St, Anytown USA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>(123) 456-7890</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                                        <Link href="#" prefetch={false}>
                                            acmefoodbank.org
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => navigate(`/chat/${1}`)} variant="outline">Connect</Button>
                                <Button onClick={() => sendEmail('swadeshpal129@gmail.com')} variant="outline">Email Notification</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Hometown Food Pantry</CardTitle>
                                <CardDescription>
                                    The Hometown Food Pantry is a community-driven organization that provides food assistance to local
                                    families. They are in need of volunteers and monetary donations to continue their important work.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <LocateIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>456 Oak St, Smalltown USA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>(987) 654-3210</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                                        <Link href="#" prefetch={false}>
                                            hometownfoodpantry.org
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Donate</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>City Harvest</CardTitle>
                                <CardDescription>
                                    City Harvest is a leading food rescue organization that collects surplus food and distributes it to
                                    hundreds of food pantries, soup kitchens, and other community partners across the city.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <LocateIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>789 Elm St, Bigtown USA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>(555) 123-4567</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                                        <Link href="#" prefetch={false}>
                                            cityharvest.org
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Donate</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Community Food Bank</CardTitle>
                                <CardDescription>
                                    The Community Food Bank is a non-profit organization that provides food assistance to families in
                                    need. They are currently in need of non-perishable food items, personal care products, and monetary
                                    donations.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <LocateIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>321 Oak Rd, Smallville USA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>(456) 789-0123</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                                        <Link href="#" prefetch={false}>
                                            communityfoodbank.org
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Donate</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Helping Hands Food Pantry</CardTitle>
                                <CardDescription>
                                    Helping Hands Food Pantry is a faith-based organization that provides food, clothing, and other
                                    essential items to families in need. They are always in need of volunteers and non-perishable food
                                    donations.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <LocateIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>159 Maple St, Middletown USA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>(789) 012-3456</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                                        <Link href="#" prefetch={false}>
                                            helpinghandsfoodpantry.org
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Donate</Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Neighborhood Food Collective</CardTitle>
                                <CardDescription>
                                    The Neighborhood Food Collective is a grassroots organization that works to address food insecurity in
                                    the local community. They rely on donations and volunteers to distribute food to those in need.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <LocateIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>567 Elm St, Smalltown USA</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <p>(234) 567-8901</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                                        <Link href="#" prefetch={false}>
                                            neighborhoodfoodcollective.org
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline">Donate</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

function GlobeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    )
}


function LocateIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="2" x2="5" y1="12" y2="12" />
            <line x1="19" x2="22" y1="12" y2="12" />
            <line x1="12" x2="12" y1="2" y2="5" />
            <line x1="12" x2="12" y1="19" y2="22" />
            <circle cx="12" cy="12" r="7" />
        </svg>
    )
}


function PhoneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}