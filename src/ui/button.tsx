import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-semiDark dark:bg-dark px-4 text-sm font-medium text-white dark:hover:bg-gray-900 hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 active:bg-dark aria-disabled:cursor-not-allowed aria-disabled:opacity-50 duration-300 hover:scale-105 transition-all",
        className
      )}
    >
      {children}
    </button>
  );
}
