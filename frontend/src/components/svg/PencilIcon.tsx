interface PencilIconProps {
  className?: string;
}

export const PencilIcon = ({ className }: PencilIconProps) => {
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
        d="M2.5 15.375V17.5H4.625L13.8417 8.28333L11.7167 6.15833L2.5 15.375ZM16.2583 6.86667C16.5833 6.54167 16.5833 6.01667 16.2583 5.69167L14.3083 3.74167C13.9833 3.41667 13.4583 3.41667 13.1333 3.74167L11.85 5.025L13.975 7.15L16.2583 6.86667Z"
        fill="currentColor"
      />
    </svg>
  );
};
