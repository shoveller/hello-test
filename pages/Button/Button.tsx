import clsx from "clsx";
import { IconContext } from "react-icons";
import { HiMail } from "react-icons/hi";
import buttonStyles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: {
    type: "Leading" | "Only" | "False";
    element: JSX.Element;
  };
  size?: "xxs" | "xs" | "sm" | "base" | "l" | "xl";
  color?: "Primary" | "White" | "Outline" | "Disabled";
}

/* --------------------------------- 스타일 상수 --------------------------------- */
const styleByColor = {
  Primary: buttonStyles.Primary,
  White: buttonStyles.White,
  Outline: buttonStyles.Outline,
  Disabled: buttonStyles.Disabled
};

const styleBySize = {
  xxs: buttonStyles.StyleXxs,
  xs: buttonStyles.StyleXs,
  sm: buttonStyles.StyleSm,
  base: buttonStyles.StyleBase,
  l: buttonStyles.StyleL,
  xl: buttonStyles.StyleXl
};

const paddingBySize = {
  xxs: buttonStyles.PaddingXxs,
  xs: buttonStyles.PaddingXs,
  sm: buttonStyles.PaddingSm,
  base: buttonStyles.PaddingBase,
  l: buttonStyles.PaddingL,
  xl: buttonStyles.PaddingXl
};

const onlyIconSize = {
  xxs: "12px",
  xs: "16px",
  sm: "20px",
  base: "24px",
  l: "32px",
  xl: "40px"
};

const leadingIconSize = {
  xxs: "12px",
  xs: "16px",
  sm: "16px",
  base: "20px",
  l: "20px",
  xl: "20px"
};

export const Button = ({
  className,
  color = "Primary",
  size = "base",
  icon = {
    type: "False",
    element: <HiMail />
  },
  children,
  ...props
}: ButtonProps): JSX.Element => {
  const buttonClass = clsx(
    buttonStyles.Button,
    styleByColor[color],
    styleBySize[size],
    icon.type === "Only" ? buttonStyles.IconOnlyPadding : paddingBySize[size],
    className
  );
  const textClass = clsx(
    icon.type === "Only" && "sr-only",
    buttonStyles.TextStyle
  );

  return (
    <button type="button" className={buttonClass} {...props}>
      {icon.type !== "False" && (
        <IconContext.Provider
          value={{
            size:
              icon.type === "Only" ? onlyIconSize[size] : leadingIconSize[size]
          }}
        >
          {icon.element}
        </IconContext.Provider>
      )}
      <span className={textClass}>{children}</span>
    </button>
  );
};
