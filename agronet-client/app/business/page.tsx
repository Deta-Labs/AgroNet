"use client"
import { useState } from "react"
import { GoogleAuth, IsVerified, LinkedinAuth } from "../middleware/middleware"
import QRCode from "react-qr-code"

export default function BusinessAuth() {
    const [isLogin, setIsLogin] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [qrUrl, setQrUrl] = useState("")
    const [statusUrl, setStatusUrl] = useState("")

    async function RegisterUser() {

        //TODO : Handle the case where the user is already logged in

        try {
            const { requestUrl, statusUrl } = await LinkedinAuth();
            setQrUrl(requestUrl)
            setStatusUrl(statusUrl)
            console.log("Request URL:", requestUrl);
            console.log("Status URL:", statusUrl);

            setIsSignUp(true);
        } catch (error) {
            console.error("Error in LinkedIn authentication:", error);
        }

        const res = await IsVerified(statusUrl)

        console.log("linkedIn successfully verified")
    }

    async function LoginUser() {

        //TODO : Handle the case where the user is already logged in

        try {
            const { requestUrl, statusUrl } = await GoogleAuth();
            setQrUrl(requestUrl)
            setStatusUrl(statusUrl)
            console.log("Request URL:", requestUrl);
            console.log("Status URL:", statusUrl);

            setIsLogin(true);

            const sessionId = await IsVerified(statusUrl)
            localStorage.setItem('sessionToken', sessionId);

            console.log("User successfully verified")

        } catch (error) {
            console.error("Error in user authentication:", error);
        }
    }

    return (
        <div>
            {!isLogin && !isSignUp && (
                <>
                    <button className=" bg-blue-400 m-8" onClick={() => { LoginUser() }}>
                        Login
                    </button>
                    <button className=" bg-blue-400 m-8" onClick={() => { RegisterUser() }}>
                        Register
                    </button>
                </>)
            }
            {isSignUp && (
                <>
                    <QRCode value={qrUrl} />
                </>
            )
            }
            {isLogin && (
                <>
                    <QRCode value={qrUrl} />
                </>
            )
            }
        </div>
    )
}