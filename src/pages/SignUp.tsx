import React from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Form} from "@heroui/react";
import {Input} from "@heroui/input";
import useUserStore from "@/stores/useUserStore.ts";
import {useNavigate} from "react-router-dom";

const SignUp: React.FC = () => {
    const [password, setInputPassword] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [signupError, setSignupError] = React.useState("")
    const nav = useNavigate();

    const {signup, setUsername, setPassword, setEmail, setFirstName, setSetLastName} = useUserStore()

    const getPasswordError = (value: any) => {
        if (value.length < 8) return "Password must be 8–32 characters";
        if (value.length > 32) return "Password must be 8–32 characters";
        if (!/[A-Z]/.test(value)) return "Password needs at least 1 uppercase letter";
        if (!/[a-z]/.test(value)) return "Password needs at least 1 lowercase letter";
        if (!/[0-9]/.test(value)) return "Password needs at least 1 number";
        if (!/[^a-zA-Z0-9]/.test(value)) return "Password needs at least 1 special character";
        return null;
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        const newErrors = {};

        const passwordError = getPasswordError(data.password);
        if (passwordError) {
            // @ts-ignore
            newErrors.password = passwordError;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        setUsername(data.username as string);
        setPassword(data.password as string);
        setEmail(data.email as string);
        setFirstName(data.firstName as string);
        setSetLastName(data.lastName as string);

        try {
            await signup();
            nav("/");
        } catch (err: any) {
            setSignupError(err?.message || "Signup fehlgeschlagen");
        }
    };

    return (
        <div className="relative flex flex-col h-screen justify-center items-center">
            <Card className={"w-2/5"}>
                <CardHeader className={"text-3xl items-center justify-center"}><p>Create Account</p></CardHeader>
                <CardBody>
                    <Form
                        className="w-full justify-center items-center space-y-4"
                        validationErrors={errors}
                        onSubmit={onSubmit}
                    >
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex gap-4">
                                <Input
                                    isRequired
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your first name";
                                        }
                                    }}
                                    label="First Name"
                                    labelPlacement="inside"
                                    name="firstName"
                                />
                                <Input
                                    isRequired
                                    errorMessage={({validationDetails}) => {
                                        if (validationDetails.valueMissing) {
                                            return "Please enter your last name";
                                        }
                                    }}
                                    label="Last Name"
                                    labelPlacement="inside"
                                    name="lastName"
                                />
                            </div>
                            <Input
                                isRequired
                                errorMessage={({validationDetails}) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter a username";
                                    }
                                    if (validationDetails.patternMismatch) {
                                        return "Only lowercase letters, digits, . _ - allowed";
                                    }
                                }}
                                label="Username"
                                labelPlacement="inside"
                                name="username"
                                pattern="^[a-z0-9._\-]+$"
                            />
                            <Input
                                isRequired
                                errorMessage={({validationDetails}) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your email";
                                    }
                                    if (validationDetails.typeMismatch) {
                                        return "Please enter a valid email";
                                    }
                                }}
                                label="Email"
                                labelPlacement="inside"
                                name="email"
                                type="email"
                            />
                            <Input
                                isRequired
                                errorMessage={getPasswordError(password)}
                                isInvalid={getPasswordError(password) !== null}
                                label="Password"
                                labelPlacement="inside"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onValueChange={setInputPassword}
                            />

                            <Button className="w-full" color="primary" type="submit">
                                Sign Up
                            </Button>
                        </div>

                        {signupError && (
                            <div className="text-small text-red-700 mt-4">
                                <p>{signupError}</p>
                            </div>
                        )}
                    </Form>
                </CardBody>
                <CardFooter className={"justify-center"}>
                    <p className={"text-default-500"}>Already have an account? <a className={"text-default-900"} href={"/login"}>Log In</a></p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SignUp;