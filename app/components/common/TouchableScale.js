import { useState } from "react";
import { TouchableOpacity } from "react-native";

export default function TouchableScale({
  children,
  style,
  activeOpacity = 0.8,
  scale = 0.93,
  ...props
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={activeOpacity}
      style={[{ transform: [{ scale: pressed ? scale : 1 }] }, style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
