import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

export default function Loading() {
  return (
    <UseAnimations
      strokeColor="var(--primary-foreground)"
      animation={loading}
    />
  );
}
