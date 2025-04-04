// react
import { FC, ReactNode, useEffect, useState } from "react";

// styles
import "./modal.scss";

type modalPropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

const Modal: FC<modalPropsType> = ({ open, setOpen, children }) => {
  const [visible, setVisible] = useState(open);
  const [animationClass, setAnimationClass] = useState("");

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => {
        setAnimationClass("fade-in");
      }, 10);
    } else {
      setAnimationClass("fade-out");
      const timer = setTimeout(() => {
        setVisible(false);
        setAnimationClass("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className={`modal-container ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
