import { FC, MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  readonly key?: number;
  readonly value?: string;
  readonly btnStyle?: string;
  readonly type: "submit" | "reset" | "button";
  readonly children: ReactNode;
  readonly handler?: MouseEventHandler<HTMLButtonElement>;
  readonly className?: string;
};

export const Button: FC<ButtonProps> = ({
  key,
  value,
  btnStyle,
  type,
  children,
  handler,
  className,
}) => {
  return (
    <>
      {btnStyle === "primary" && (
        <button
          key={key}
          value={value}
          className="mt-5 w-full bg-transparent text-white-700 font-semibold py-2 px-4 border border-blue-500 hover:bg-blue-500"
          type={type}
          onClick={handler}
        >
          {children}
        </button>
      )}
    </>
  );
};
