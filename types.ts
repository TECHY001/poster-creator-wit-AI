export enum Step {
  Welcome,
  Content,
  Style,
  Platform,
  Generation,
}

export interface ContentData {
  headline: string;
  subtitle: string;
  cta: string;
  brandName: string;
  additionalText: string;
}

export interface StyleData {
  colorScheme: string;
  stylePreference: string;
  imageRequirements: string;
  backgroundImage: string;
  brandColors: string;
  fontPreference: string;
  logoPlacement: string;
  logoImage: string | null;
}

export interface Format {
  name: string;
  width: number;
  height: number;
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:5' | '1.91:1';
}

export interface Platform {
  name: string;
  icon: React.FC<{ className?: string }>;
  formats: Format[];
}

export interface PlatformData {
  platformName: string;
  format: Format | null;
}

export interface FormData {
  content: ContentData;
  style: StyleData;
  platform: PlatformData;
}