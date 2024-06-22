import Image from "next/image"
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";
import Link from "next/link";
import { ModeToggle } from "./toggle-icon";

const Header = async () => {
const session = await auth()
  return (
    <div className = "bg-gray-200 p-2 dark:bg-gray-900">
        <div className = "container flex flex-row items-center justify-between">
            <div>
                <Link href = "/" className = "flex items-center gap-2">
                <Image src = "/logo.png" width = "50" height = "50" alt = "Logo" className="rounded-full"/>
                <h1 className="uppercase font-bold text-lg">Chereta-Bros</h1>
                </Link>
            </div>
            <div className = "flex flex-row items-center justify-center gap-4 text-gray-300">
              <Link href = "/items/create" className = "flex items-center gap-2 p-2 hover:underline">
                Create Items
              </Link>
              <Link href = "/" className = "flex items-center gap-2 hover:underline">
                Auction Items
              </Link>
            </div>
            <div className = "flex items-center justify-center gap-4">
              <ModeToggle/>
              {session ? <SignOut/> : <SignIn/> }
              {session ?  <img src = {session?.user?.image} alt = "Avatar" height = "40" width = "40" className = "rounded-full"/> :  ""}
              
            </div>
        </div>  
    </div>
  )
}

export default Header