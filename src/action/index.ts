"use server";

import db from "@/db";
import Images from "@/models";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

//add image

export async function addImageAction(fd: FormData, revalidatePathURL: string) {
  const file = fd.get("file") as File;
  // const file = new File([b], name, { type: "text/plain" });
  const url=URL.createObjectURL(file)
  const blob = await put(file.name, file, {
    access: "public",
  });
  // const buffer=await file.arrayBuffer()
  // try {
  //   await writeFile(`./files/${name}`, Buffer.from(b));
  // } catch (error) {
  //   await mkdir("./files");
  // }
  db();
  await Images.create({ filename: blob.pathname, url: blob.url });
  revalidatePath(revalidatePathURL);
  return { success: true ,url};
}

//get images
export const fetchImagesAction = async (path: string) => {
  db();
  const images = await Images.find({});
  return images;
};
