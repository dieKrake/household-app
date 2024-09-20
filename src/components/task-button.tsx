type TaskButtonProps = {
  text: String;
};

export default function TaskButton({ text }: TaskButtonProps) {
  return (
    <div className="w-full h-12 dark:bg-dark bg-light flex items-center justify-center rounded-xl dark:text-light shadow-md cursor-pointer">
      {text}
    </div>
  );
}
