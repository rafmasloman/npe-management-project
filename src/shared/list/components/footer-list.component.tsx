import Link from 'next/link';



const FooterList = ({ text, href }: IFooterList) => {
  return (
    <Link href={href!} className="text-gray-300">
      {text}
    </Link>
  );
};

export default FooterList;
