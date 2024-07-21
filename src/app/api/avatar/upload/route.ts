import db from "@/db";
import Images from "@/models";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename") as string;
  const blob = await put(filename, req.body as ReadableStream, {
    access: "public",
  });

  // db();
  // await Images.create({ filename: blob.pathname, url: blob.url });
  return NextResponse.json(blob);
}
export const GET = async (req: Request) => {
  db();
  return NextResponse.json(await Images.find({}));
};
