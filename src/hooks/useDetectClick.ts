import { useEffect } from "react";

export function useDetectClick(
  nodeRef: React.MutableRefObject<HTMLDivElement | null>,
  nodeIsOpen: boolean,
  setNodeIsOpen: (isOpen: boolean) => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        setNodeIsOpen(false);
      }
    }

    if (nodeIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nodeIsOpen, nodeRef, setNodeIsOpen]);
}
