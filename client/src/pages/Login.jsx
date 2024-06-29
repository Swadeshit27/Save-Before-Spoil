import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import login from "../redux/slice/authslice"; // Update the path as necessary
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../firebase/firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch(login({ userData: user }));
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch(login({ userData: user }));
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            });
    };


    return (
        <section className="w-full h-screen flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log In</CardTitle>
                    <CardDescription>Create Account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <CardFooter className="flex justify-between">
                            <Button onClick={handleLogin}>Login</Button>
                            <Button onClick={handleSignup}>Signup</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
