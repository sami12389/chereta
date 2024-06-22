import { auth } from "@/auth";
import {database} from "@/db/database"


export default async function Home() {
  const session = await auth()
  const allItems  = await database.query.items.findMany()
  return (
    <main className = "container mx-auto py-12 space-y-8">
      <h2 className = "text-2xl font-bold">Items for Sale</h2>
      <div className = "grid grid-cols-4 gap-8"> 
      {allItems.map((item)=>(
        <div
        className = "border p-8 rounded-xl"
        key = {item.id}>{item.name}
        Starting Price: {item.startingPrice / 100}
        </div>
      ))}
      </div>
    </main>
  );
}
