import clsx from "clsx";

const CustomButton = ({ onClick, children, className, icon:Icon }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-10 py-4 text-[14px] leading-[16px] rounded-md tracking-wider border",
        className
      )}
    >
      {children}
      {Icon && <Icon className= "" />}
    </button>
  );
};

export default CustomButton;
