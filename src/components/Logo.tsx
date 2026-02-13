
import { LogoIcon } from '@/utils/svg';

interface LogoProps {
  width?: string;
  height?: string;
  color?: string;
}

const Logo = ({ width = '40px', height = '40px', color }: LogoProps) => {
  const numericWidth = parseInt(width.replace('px', '')) || 40;
  const numericHeight = parseInt(height.replace('px', '')) || 40;

  return (
    <LogoIcon
      width={numericWidth}
      height={numericHeight}
      color={color}
      />
  );
};

export default Logo;
