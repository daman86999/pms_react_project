import React from "react";

export function useSnackbar() {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [variant, setVariant] = React.useState();
  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 5000);
    }
  }, [isActive]);

  const openSnackBar = (msg = "Something went wrong...", variant) => {
    console.log(msg);
    setVariant(variant);
    setMessage(msg);
    setIsActive(true);
  };

  return { isActive, message, variant, openSnackBar };
}
