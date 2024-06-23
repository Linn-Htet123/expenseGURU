import Image from "next/image";
import { Card } from "../ui/card";

interface Props {
  img: { src: string; alt: string };
  label: string;
  children: React.ReactNode;
  badgeClass?: string;
}

const FinanceCard = ({
  img: { src, alt },
  label,
  children,
  badgeClass = "bg-[#edf4f3]",
}: Props) => {
  return (
    <Card className="w-full p-5 flex justify-between items-start shadow-sm">
      <div>
        <span className="font-normal text-md mb-2">{label}</span>
        {children}
      </div>
      <div className={`rounded-full p-2 ${badgeClass}`}>
        <Image src={src} width={30} height={30} alt={alt} />
      </div>
    </Card>
  );
};

export default FinanceCard;
