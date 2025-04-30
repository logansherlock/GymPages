import Link from 'next/link';

interface MyButtonProps {
  href: string;
  children: React.ReactNode;
}
const baseLinkClass = "cursor-pointer hover:scale-[1.1] transition-transform text-center font-bold";

export default function MyButton({ href, children }: MyButtonProps) {
  return (
    <Link href={href}>
      <button className={`${baseLinkClass} text-stone-800 text-center text-stone-100 p-1`}>
        {children}
      </button>
    </Link>
  );
}
