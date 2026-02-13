interface FormLabelProps {
  children: React.ReactNode;
}

export default function FormLabel({ children }: FormLabelProps) {
  return (
    <span className="text-base font-medium leading-[1.5] tracking-normal">
      {children}
    </span>
  );
}
