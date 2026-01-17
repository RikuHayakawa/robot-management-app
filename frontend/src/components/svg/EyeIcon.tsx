interface EyeIconProps {
  className?: string;
}

export const EyeIcon = ({ className }: EyeIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M10 3C5.5 3 1.73 6.11 0 10.5C1.73 14.89 5.5 18 10 18C14.5 18 18.27 14.89 20 10.5C18.27 6.11 14.5 3 10 3ZM10 15.5C7.24 15.5 5 13.26 5 10.5C5 7.74 7.24 5.5 10 5.5C12.76 5.5 15 7.74 15 10.5C15 13.26 12.76 15.5 10 15.5ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7Z"
        fill="currentColor"
      />
    </svg>
  );
};
