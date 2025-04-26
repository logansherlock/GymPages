import Link from 'next/link';

interface MyButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function MyButton({ href, children }: MyButtonProps) {
  return (
    <Link href={href}>
      <button>
        {children}
      </button>
    </Link>
  );
}
