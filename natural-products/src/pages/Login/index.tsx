import { useAuth } from "@clerk/nextjs";
import LoginComponent from "../../components/Login/LoginComponent";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = () => {
    const { isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            router.push("/dashboard");
        }
    }, [isSignedIn, router]);

    return (
        <LoginComponent />
    );
}

export default Login;