import "dotenv/config";
import { prisma } from "./lib/prisma";

async function testConnection() {
  try {
    console.log("Checking DB connection with Prisma...");
    const userCount = await prisma.user.count();
    console.log("Connection successful! Total users in DB:", userCount);
    
    const result = await prisma.$queryRawUnsafe("SELECT 1 as connected");
    console.log("QueryRaw result:", result);
    
    console.log("SUCCESS: Database connection is working perfectly!");
  } catch (error) {
    console.error("FAILED to connect to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
