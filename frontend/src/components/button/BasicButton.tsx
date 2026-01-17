import { ButtonHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

type ButtonVariant = 'primary' | 'secondary' | 'destructive';

const button = tv({
  base:
    // 色以外の共通スタイルはbaseへ
    'flex items-center justify-center whitespace-pre-wrap rounded-[16px] font-bold text-white transition-all px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-primary hover:brightness-110',
      secondary: 'bg-gray-500 hover:bg-gray-600',
      destructive: 'bg-destructive hover:opacity-80',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  text?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
}

export const BasicButton = ({ text, children, variant = 'primary', className = '', ...props }: BasicButtonProps) => {
  return (
    <button className={button({ variant, className })} {...props}>
      {text ? <div className="flex text-base leading-[1.4]">{text}</div> : children}
    </button>
  );
};
