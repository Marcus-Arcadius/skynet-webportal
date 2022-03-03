import cn from "classnames";

import { CircledCheckmarkIcon, CircledErrorIcon, CircledProgressIcon, CircledArrowUpIcon } from "../Icons";

export default function UploaderItemIcon({ status }) {
  switch (status) {
    case "enqueued":
    case "retrying":
    case "uploading":
      return <CircledArrowUpIcon className={cn({ "text-palette-300": status === "enqueued" })} />;
    case "processing":
      return <CircledProgressIcon className="animate-[spin_3s_linear_infinite]" />;
    case "complete":
      return <CircledCheckmarkIcon />;
    case "error":
      return <CircledErrorIcon className="text-error" />;
    default:
      return null;
  }
}
