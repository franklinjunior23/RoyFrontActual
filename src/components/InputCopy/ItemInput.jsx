import { IconCopy } from "@tabler/icons-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
function ItemInput({ Value, Message,className }) {
  return (
    <header className={`${className} grid grid-cols-[1fr_40px] w-full bg-black/40 rounded-md` }>
      <input
        type="text"
        value={Value}
        readOnly
        className="w-full focus:outline-none bg-transparent px-3  rounded-md"
      />
      <button className="p-1 ">
        <CopyToClipboard text={Value} onCopy={() => toast.success(Message)}>
          <IconCopy size={30} className="bg-white text-black rounded-lg p-1" />
        </CopyToClipboard>
      </button>
    </header>
  );
}

export default ItemInput;
