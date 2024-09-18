export function SignOut(){
    localStorage.removeItem("sessionToken")
    console.log("successfully logged out")
}