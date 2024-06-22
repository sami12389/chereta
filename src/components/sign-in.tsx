import { signIn } from "@/auth"
import { Button } from "./ui/button"
import Image from "next/image"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit" className = "bg-black text-white hover:bg-gray-900">
      <Image src ="/google.png" alt = "Google Icon" width = "50" height = "50"/>
      Google Sign-In
      </Button>
    </form>
  )
} 