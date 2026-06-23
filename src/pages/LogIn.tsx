import React from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Form} from "@heroui/react";
import {Input} from "@heroui/input";
import useUserStore from "@/stores/useUserStore.ts";
import {useNavigate} from "react-router-dom";

const LogIn: React.FC = () => {
    const [errors, setErrors] = React.useState({});
    const [passwordCorrect, setPasswordCorrect] = React.useState(true)
    const [pce, setPCE] = React.useState("") // Password Check from Server Error
    const nav = useNavigate();

    const {login, setUsername, setPassword} = useUserStore()

    const onSubmit = async (e:any) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        setErrors({});

        setUsername(data.username)
        setPassword(data.password)

        const res = await login()

        if (res === true) {
            console.log(":)")
            setPasswordCorrect(true)
            nav("/")
        } else {
            console.log(res)
            //setSubmitted(data);
            // @ts-ignore
            setPCE(res)
            setPasswordCorrect(false)
        }


    };

    return (
        <div className="relative flex flex-col h-screen justify-center items-center">

            <Card className={"w-2/5"}>
                <CardHeader className={"text-3xl items-center justify-center"}><p>Welcome Back</p></CardHeader>
                <CardBody>
                    <Form
                        className="w-full justify-center items-center space-y-4"
                        validationErrors={errors}
                        onSubmit={onSubmit}
                    >
                        <div className="flex flex-col gap-4 w-full">
                            <Input
                                isRequired
                                errorMessage={({validationDetails}) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your name";
                                    }

                                    return errors.name;
                                }}
                                label="Username"
                                labelPlacement="inside"
                                name="username"
                            />
                            <Input
                                isRequired
                                label="Password"
                                labelPlacement="inside"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                            />

                            <div className="flex gap-4">
                                <Button className="w-full" color="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                        </div>

                        {!passwordCorrect && (
                            <div className="text-small text-red-700 mt-4">
                                <p>{pce}</p>
                            </div>
                        )}
                    </Form>
                </CardBody>
                <CardFooter className={"justify-center"}>
                    <p className={"text-default-500"}>Dont`t have an account yet? <a className={"text-default-900"} href={"/signup"}>Sign Up</a></p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LogIn;