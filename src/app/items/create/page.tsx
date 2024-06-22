import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";


const CreateBidPage = async () => {
  return (
    <main className = "container mx-auto py-12 space-y-8">
      <h1 className = "text-4xl font-bold">
        Post an Item
      </h1>
      <form 
      className = "flex flex-col border border-gray-300 p-8 rounded-xl space-y-4 max-w-lg"
      action={createItemAction}>
        <Input className = "max-w-md border border-gray-300" name = "name" type = "text" placeholder = "Item Name"/>
        <Input className = "max-w-md border border-gray-300" name = "startingPrice" type = "number" placeholder = "Auction start price"/>
        <Button className = "self-end" type = "submit">Post Item</Button>
      </form>
    </main>
  )
}

export default CreateBidPage