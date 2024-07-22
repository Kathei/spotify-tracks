import React from "react";

type ButtonProps<T> = {
  onClick: () => void;
  children: React.ReactNode;
};

function Button<T extends HTMLElement>({ onClick, children }: ButtonProps<T>) {
  return <button onClick={onClick}>{children}</button>;
}
export default Button;
