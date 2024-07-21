import { fetchImagesAction } from "@/action";
import Upload from "@/components/upload";
import Image from "next/image";

export default async function Home() {
  const imgs = await fetchImagesAction("/");
  console.log(imgs);
  return (
    <div className="w-11/12 p-10 mt-10 m-auto flex flex-col gap-5 ">
      <Upload />
      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 space-y-2" >
        {imgs && imgs?.length > 0
          ? imgs.map((i: any) => (
              <Image
                key={i?._id}
                src={i?.url}
                alt={i?.filename}
                width={540}
                height={540}
                className="w-[150px] h-[150px] shadow-xl shadow-purple-400 transition-all duration-300 hover:shadow-blue-600 hover:scale-[1.05] mx-auto rounded-full"
              />
            ))
          : null}
      </div>
    </div>
  );
}
