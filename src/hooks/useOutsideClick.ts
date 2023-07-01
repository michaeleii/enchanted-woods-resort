import { useRef, useEffect } from "react";

function useOutsideClick<T>(handler: () => void, listenCapturing = true) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        ref.current instanceof Node &&
        !ref.current.contains(e.target)
      )
        handler();
    };
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref;
}
export { useOutsideClick };
