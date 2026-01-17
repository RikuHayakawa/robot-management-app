interface TrashIconProps {
  className?: string;
}

export const TrashIcon = ({ className }: TrashIconProps) => {
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
        d="M5 15.8333C5 16.75 5.75 17.5 6.66667 17.5H13.3333C14.25 17.5 15 16.75 15 15.8333V6.66667H5V15.8333ZM6.66667 8.33333H13.3333V15.8333H6.66667V8.33333ZM12.9167 3.33333L12.0833 2.5H7.91667L7.08333 3.33333H3.33333V5H16.6667V3.33333H12.9167Z"
        fill="currentColor"
      />
    </svg>
  );
};
