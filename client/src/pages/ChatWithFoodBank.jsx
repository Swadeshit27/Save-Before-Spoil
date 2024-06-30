
import { Avatar } from "flowbite-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RecipeTable from "@/components/recipe/RecipeSenderTabel"
import Markdown from "markdown-to-jsx"
import { useSelector } from "react-redux"
import GenRecipe from "@/components/recipe/GenRecipe"

export default function ChatWithFoodBank() {
    const { ingredients } = useSelector(state => state.items) 
    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center px-4 py-3 border-b bg-background">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8" rounded />
                    <div className="grid gap-0.5">
                        <div className="font-medium">John Doe</div>
                        <div className="text-xs text-muted-foreground">Online</div>
                    </div>
                </div>
            </header>
            <div className="w-full overflow-visible h-auto p-4 bg-gray-200">
                <div className="grid gap-4">
                    {/* <div className="flex items-start gap-3 text-sm">
                        <Avatar className="h-8 w-8" rounded />
                        <div className="grid gap-1 bg-white p-3 rounded-lg max-w-[75%]">
                            <div>Hey there! How's it going?</div>
                            <div className="text-xs text-muted-foreground">3:45 PM</div>
                        </div>
                    </div> */}
                    <div className="flex items-start gap-3 text-sm justify-end">
                        <div className="grid gap-1 bg-white text-gray-800 p-3 rounded-lg max-w-[75%]">
                            <div>Hi Swadesh from this side, Nice to meet you !</div>
                            {/* <div className="text-xs text-primary-foreground"></div> */}
                        </div>
                        <Avatar className="h-8 w-8" rounded />
                    </div> 
                    <RecipeTable products={ingredients}/>
                    <div className="flex items-start gap-3 text-sm justify-end">
                        <div className="grid gap-1 bg-white text-gray-800 p-3 rounded-lg max-w-[50%] text-wrap">
                            <h1 className="text-base font-medium">Here is types of recipes you can make</h1>
                            <GenRecipe data={ingredients} />
                        </div>
                        <Avatar className="h-8 w-8" rounded />
                    </div> 
                </div>
            </div>
            <div className="border-t bg-background p-4">
                <form className="flex items-center gap-2">
                    <Input
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 text-sm bg-transparent rounded-lg focus-visible:ring-0 ring-0 focus-visible:ring-offset-0"
                    />
                    <Button type="submit" variant="ghost" size="icon" className="rounded-full">
                        <SendIcon className="w-5 h-5" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

function SendIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    )
}