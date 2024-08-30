import { Label } from "@/components/ui/label";

export default function EventLabel({ htmlFor, children, className }) {
  return <Label htmlFor={htmlFor} className={className}>{children}</Label>;
}
