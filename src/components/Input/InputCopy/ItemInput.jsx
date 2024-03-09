import { IconCopy } from "@tabler/icons-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Proptypes from "prop-types";
import { toast } from "sonner";
import clsx from "clsx";
function ItemInput({ Value, Message, className, Hide }) {
  return (
    <header
      className={clsx(
        "grid    rounded-md",
        className,
        Hide ?? "grid-cols-[1fr_40px] bg-black/40"
      )}
    >
      <input
        type="text"
        value={Value}
        readOnly
        hidden={Hide ?? false}
        className="w-full  focus:outline-none bg-transparent px-3  rounded-md"
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
ItemInput.propTypes = {
  Value: Proptypes.any,
  Message: Proptypes.string,
  className: Proptypes.string,
  Hide: Proptypes.bool,
};
