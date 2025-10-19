import { Star } from "lucide-react";
import { useState } from "react";

export default function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => onChange({ target: { name: "rating", value: star } })}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`w-8 h-8 cursor-pointer transition-transform duration-200 ${
            star <= (hovered || value)
              ? "text-yellow-400 fill-yellow-400 scale-110"
              : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
