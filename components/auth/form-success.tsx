import { AlertCircle } from "lucide-react";

export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-teal-400/25 text-secondary-foreground p-3 flex gap-3 items-center text-center my-2">
      <AlertCircle className="w-4 h-4 " />
      <p>{message}</p>
    </div>
  );
}
