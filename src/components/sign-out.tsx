import { signOut } from "@/auth"
import { Button } from "./ui/button"
import Image from "next/image"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit" className = "bg-black text-white hover:bg-gray-900">
        <Image src ="/google.png" alt = "Google Icon" width = "50" height = "50"/>
        Sign Out
      </Button>
    </form>
  )
}