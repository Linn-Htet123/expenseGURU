import Image from "next/image";
import { faker } from "@faker-js/faker";

const Avatar = ({
  width = 120,
  height = 120,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      src={faker.image.avatar()}
      alt="profile"
      width={width}
      height={height}
      className="rounded-full"
    />
  );
};

export default Avatar;
