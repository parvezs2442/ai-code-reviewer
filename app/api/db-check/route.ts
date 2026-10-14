import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const rawResult = await prisma.$queryRawUnsafe("SELECT NOW() as current_time, current_database() as db_name");

    return NextResponse.json({
      status: "success",
      message: "Database connection successful!",
      database: rawResult,
      totalUsers: userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database connection check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
