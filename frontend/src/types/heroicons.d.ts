declare module '@heroicons/react/outline' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    title?: string;
    titleId?: string;
  }

  export const MenuIcon: FC<IconProps>;
  export const XIcon: FC<IconProps>;
  export const UserCircleIcon: FC<IconProps>;
  export const ChipIcon: FC<IconProps>;
  export const CloudUploadIcon: FC<IconProps>;
  export const CodeIcon: FC<IconProps>;
  export const LightningBoltIcon: FC<IconProps>;
  export const UserGroupIcon: FC<IconProps>;
  export const BeakerIcon: FC<IconProps>;
  export const CubeTransparentIcon: FC<IconProps>;
  export const SparklesIcon: FC<IconProps>;

  const ArrowDownIcon: FC<IconProps>;
  export default ArrowDownIcon;
}

declare module '@heroicons/react/outline/ArrowDownIcon' {
  import { FC } from 'react';
  import { IconProps } from '@heroicons/react/outline';
  
  const ArrowDownIcon: FC<IconProps>;
  export default ArrowDownIcon;
} 