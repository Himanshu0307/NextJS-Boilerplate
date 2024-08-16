import { AlertCircle } from "lucide-react";

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="bg-destructive/40 text-secondary-foreground p-3 flex gap-3  items-center text-center my-2">
      <AlertCircle className="w-4 h-4"></AlertCircle>
      <p>{message}</p>
    </div>
  );
}
