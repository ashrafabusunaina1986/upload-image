"use client";
import { addImageAction } from "@/action";
import { PutBlobResult } from "@vercel/blob";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import React, { useState } from "react";

function Upload() {
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [selectImage, setSelectImage] = useState<Url>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectImage(url);
      setSelectFile(file);
    }
  };
  const handlesubmitUpload = async (formData: FormData) => {
    const file = formData.get("file") as File;
    if (file) {
      await addImageAction(formData, "/");
    }
  };

  return (
    <div className="">
      <div>
        <form action={handlesubmitUpload}>
          <label
            htmlFor="file"
            className="w-[150px] h-[70px] md:w-[250px] md:h-[150px] lg:w-[250px] lg:h-[150px] border-2 border-gray-800 border-dashed aspect-video rounded-lg flex items-center justify-center cursor-pointer"
          >
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChangeFile}
              hidden
            />
            {selectImage ? (
              <Image
                src={selectImage?.toString()}
                width={300}
                height={200}
                className="w-full h-full shadow-xl shadow-gray-200 transition duration-300 hover:shadow-gray-500"
                alt=""
              />
            ) : (
              <p>Select File</p>
            )}
          </label>
          <button
            type="submit"
            className="w-[150px] md:w-[250px]  lg:w-[250px]  border-2 border-purple-700 bg-purple-300 text-purple-900 text-xl font-extrabold rounded-lg px-5 py-3 mt-10 shrink-0 shadow-sm shadow-gray-300 hover:shadow-xl hover:shadow-purple-500 "
          >
            {loading ? "Uploading" : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
