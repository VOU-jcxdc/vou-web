import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function extractFirstTwoWordInitials(name: string) {
  // Split the name into words
  const words = name.trim().split(/\s+/);

  // Extract initials from the first two words (or just the first if only one word exists)
  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials;
}

function stringAvatar(name: string) {
  return {
    style: {
      backgroundColor: stringToColor(name),
      color: "#fff",
    },
    children: extractFirstTwoWordInitials(name),
  };
}

type GeneratedAvatarProps = {
  className?: string;
  name?: string;
};

const GeneratedAvatar = ({ className, name }: GeneratedAvatarProps) => {
  return (
    <Avatar className={cn("w-8 h-8 rounded-md", className)}>
      <AvatarFallback
        className="rounded-md"
        {...stringAvatar(name || "Unknown User")}
      />
    </Avatar>
  );
};

export default GeneratedAvatar;
