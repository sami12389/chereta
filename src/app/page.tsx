import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {database} from "@/db/database"
import {bids as bidsSchema} from "@/db/schema"
import { revalidatePath } from "next/cache";

export default async function Home() {
  const session = await auth()
  const bids  = await database.query.bids.findMany()
  return (
    <main className = "container mx-auto py-12">
      {session ? <SignOut/> : <SignIn/> }
      <form action={async(formData: FormData)=>{
        "use server"
        await database?.insert(bidsSchema).values({})
        revalidatePath("/")
      }}>
        <Input name = "bid" type = "number" placeholder = "Bid"/>
        <Button type = "submit">Place Bid</Button>
      </form>
      {bids.map((bid)=>(
        <div key = {bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
