import { categoryNames } from "@/constants";
import { db } from ".";
import { categories } from "./schema";

async function main() {
    console.log("Seeding categories")
    try {
        const values = categoryNames.map((name) => ({
          name,
          description: `Videos related to ${name.toLowerCase()}`,
        }));   
        await db.insert(categories).values(values);
        console.log("Categories Seeded Correctly");
    } catch (error) {
        console.log("Error Seeding Categories",error)
        process.exit(1)
    }
}
main()