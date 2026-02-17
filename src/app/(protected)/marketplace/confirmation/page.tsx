import ConfirmedActionPage from "@/components/ConfirmedActionPage";
import Image from "next/image";
import homeImage from "@/assets/images/home.png";

const Confirmation = () => {
  return (
    <ConfirmedActionPage
      card={
        <div className="w-full min-h-100 md:h-full md:flex-1">
          <Image
            src={homeImage.src}
            alt="Image"
            className="object-cover h-86.5 sm:w-80.75 w-full rounded-t-md"
            height={300}
            width={300}
            priority
          />
          <div className="py-4 px-3 flex flex-col gap-2.5 bg-[#F8F7F4] rounded-b-md text-left">
            <h3 className="text-[20px] leading-[120%]">Across Generations</h3>
            <h1 className="text-[32px] leading-[120%]">$28.00</h1>
          </div>
        </div>
      }
      title="Your listing is now live."
      subtitle="You'll be notified if someone expresses interest."
      helperText="There’s nothing you need to do right now."
      buttonText="Return to My Museum"
      buttonHref="/museum"
    />
  );
};

export default Confirmation;
