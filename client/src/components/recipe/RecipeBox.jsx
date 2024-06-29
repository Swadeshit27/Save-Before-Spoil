

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function Component() {
    const [ingredients, setIngredients] = useState([])
    const [recipes, setRecipes] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const handleIngredientInput = (event) => {
        if (event.key === "Enter") {
            setIngredients([...ingredients, event.target.value.trim()])
            event.target.value = ""
        }
    }
    const handleGetRecipes = () => {
        const mockRecipes = [
            {
                id: 1,
                name: "Grilled Chicken with Roasted Vegetables",
                description: "A healthy and flavorful meal made with chicken, bell peppers, zucchini, and a balsamic glaze.",
                ingredients: ["chicken", "bell peppers", "zucchini", "balsamic vinegar"],
                image: "/placeholder.svg",
            },
            {
                id: 2,
                name: "Vegetarian Stir-Fry",
                description: "A quick and easy stir-fry with tofu, broccoli, mushrooms, and a savory sauce.",
                ingredients: ["tofu", "broccoli", "mushrooms", "soy sauce", "garlic"],
                image: "/placeholder.svg",
            },
            {
                id: 3,
                name: "Spaghetti Bolognese",
                description: "A classic Italian dish with a rich, meaty tomato sauce and tender spaghetti.",
                ingredients: ["ground beef", "tomatoes", "onion", "garlic", "spaghetti"],
                image: "/placeholder.svg",
            },
        ]
        setRecipes(mockRecipes)
    }
    const handleRecipeSelect = (recipe) => {
        setSelectedRecipe(recipe)
    }
    const handleSaveRecipe = () => {
        console.log("Saved recipe:", selectedRecipe)
    }
    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center gap-4">
                <h1 className="text-2xl font-bold">Recipe Finder</h1>
            </header>
            <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-medium">Your Ingredients</h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="bg-muted rounded-full px-3 py-1 text-sm font-medium">
                                    {ingredient}
                                </div>
                            ))}
                            <Input
                                type="text"
                                placeholder="Add an ingredient"
                                onKeyDown={handleIngredientInput}
                                className="flex-1 min-w-0"
                            />
                        </div>
                    </div>
                    <Button onClick={handleGetRecipes}>Get Recipe Suggestions</Button>
                    {recipes.length > 0 && (
                        <div>
                            <h2 className="text-lg font-medium">Recipe Suggestions</h2>
                            <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {recipes.map((recipe) => (
                                    <Card
                                        key={recipe.id}
                                        onClick={() => handleRecipeSelect(recipe)}
                                        className={`cursor-pointer ${selectedRecipe?.id === recipe.id ? "bg-accent text-accent-foreground" : ""
                                            }`}
                                    >
                                        <CardHeader>
                                            <CardTitle>{recipe.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">{recipe.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedRecipe && (
                        <div>
                            <h2 className="text-lg font-medium">Selected Recipe</h2>
                            <Card className="mt-2">
                                <CardHeader>
                                    <CardTitle>{selectedRecipe.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p>{selectedRecipe.description}</p>
                                        <div>
                                            <h3 className="font-medium">Ingredients:</h3>
                                            <ul className="list-disc pl-4">
                                                {selectedRecipe.ingredients.map((ingredient, index) => (
                                                    <li key={index}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={handleSaveRecipe}>Save Recipe</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}