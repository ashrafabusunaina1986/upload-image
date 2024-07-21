"use server";

import db from "@/db";
import Images from "@/models";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

//add image

export async function addImageAction(fd: FormData, revalidatePathURL: string) {
  const file = fd.get("file") as File;
  const res = await fetch(
    `http://localhost:3001/api/avatar/upload?filename=${file.name}`,
    {
      method: "POST",
      body: file,
    }
  );
  const result = await res.json();
  // const file = new File([b], name, { type: "text/plain" });
  // const url=URL.createObjectURL(file)
  // const blob = await put(file.name, file, {
  //   access: "public",
  // });
  // const buffer=await file.arrayBuffer()
  // try {
  //   await writeFile(`./files/${name}`, Buffer.from(b));
  // } catch (error) {
  //   await mkdir("./files");
  // }
  db();
  await Images.create({ filename: result?.pathname, url: result?.url });
  revalidatePath(revalidatePathURL);
  return { success: true, result };
}

//get images
export const fetchImagesAction = async (path: string) => {
  db();
  const images = await Images.find({});
  return images;
};
