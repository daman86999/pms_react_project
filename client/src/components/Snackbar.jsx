import React from "react";
import Styles from "./styles/snackbar.module.css";

export default function Snackbar({
  isActive = false,
  message,
  variant = "success",
}) {
  const styleVariant = variant === "success" ? Styles.success : Styles.error;

  return (
    <div
      className={
        isActive
          ? [Styles.snackbar, styleVariant, Styles.fadeIn].join(" ")
          : [Styles.snackbar, styleVariant, Styles.fadeOut].join(" ")
      }
    >
      {message}
    </div>
  );
}
