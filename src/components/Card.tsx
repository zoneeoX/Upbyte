import { CgClose } from "react-icons/cg";
import { FaFile } from "react-icons/fa";
import { formatToByte } from "../utils";
const Card = ({ item, removeFile }: any) => {
  return (
    <div className="w-full h-[80px] outline outline-black/50 outline-[1px] rounded-xl px-4 py-1 flex flex-row items-center gap-4">
      <div className="p-4 outline-black/50 rounded-lg outline-[1px] outline">
        <i className="">
          <FaFile />
        </i>
      </div>
      <div className="w-full">
        <h1 className="text-lg">{item.name}</h1>
        <span className="text-sm opacity-50">{formatToByte(item.size)}</span>
        {/* <div className="flex flex-row gap-2 items-center justify-between">
          <div className="w-full h-[10px] rounded-full bg-purple-600" />{" "}
          <span className="text-sm opacity-50">40%</span>
        </div> */}
      </div>
      <div
        className="p-4 hover:text-red-600 hover:rotate-180 cursor-pointer transition-all"
        onClick={() => removeFile(item)}
      >
        <i className="">
          <CgClose />
        </i>
      </div>
    </div>
  );
};

export default Card;
