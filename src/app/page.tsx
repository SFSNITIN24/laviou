import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import homeImage from '@/assets/images/home.png';

export default function HomePage() {
  return (
    <AppLayout variant="default" footerText='Nothing is shared unless you choose to'>
      <div className="flex flex-col items-center justify-center min-h-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-3 text-center mb-8 max-w-[778px] mx-auto">
          <h2 className="font-heading font-normal text-2xl leading-[1.2] tracking-normal text-center text-[#1A1A1A] md:text-[29px]">
            Your life is shaped by moments worth carrying forward
          </h2>

          <p className="font-body font-normal text-sm leading-[1.5] tracking-normal text-center text-[#4D4D4D] md:text-base">
            Laviou creates space to capture the meaning behind what you keep—preserving it with care, clarity, and intention
          </p>

        </div>

        <div className="mb-12 max-w-[778px] mx-auto">
          <img
            src={homeImage.src}
            
            alt="Home image"
            className="rounded-lg shadow-lg max-w-full h-auto"
            style={{ maxHeight: '400px' }}
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center">
          <Button
            variant="primary"
            className='!w-[342px] !h-[48px] p-[12px]'
          >
            Begin with one story
          </Button>
          <Button
            variant="secondary"
            className='!w-[342px] !h-[48px] p-[12px]'
          >
            View a museum shared
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
