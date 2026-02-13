import homeImage from "@/assets/images/home.png";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

const Confirmation = () => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center py-11 min-h-[calc(100vh-72px)] w-full text-black">
      <Image
        src={homeImage.src}
        alt="Confirmation Image"
        className="w-full object-cover md:min-w-188.75 md:max-h-120 md:max-w-[70%] rounded-xl bg-white shadow-[2px_9px_20px_0px_#5E5F581A,7px_36px_37px_0px_#5E5F5817,16px_82px_50px_0px_#5E5F580D,28px_146px_59px_0px_#5E5F5803,43px_228px_65px_0px_#5E5F5800] border-12 border-white"
        height={300}
        width={300}
        priority
      />
      <div className="flex flex-col gap-3 justify-center items-center">
        <h2 className="text-2xl md:text-5xl"> Your story is safe here.</h2>
        <p className="md:text-xl">You may return whenever you're ready.</p>

          <Button href="/dashboard" variant="primary" className="min-w-full! md:w-80.25 h-12 mt-5">
            Return to My Museum
          </Button>
      </div>
    </div>
  );
};

export default Confirmation;
