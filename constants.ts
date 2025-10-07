
import { Platform } from './types';
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon, TikTokIcon, MultiPlatformIcon } from './components/icons/PlatformIcons';

export const PLATFORMS: Platform[] = [
  {
    name: 'Facebook',
    icon: FacebookIcon,
    formats: [
      { name: 'Stories', width: 1080, height: 1920, aspectRatio: '9:16' },
      { name: 'Feed Post Square', width: 1080, height: 1080, aspectRatio: '1:1' },
      { name: 'Feed Post Landscape', width: 1080, height: 566, aspectRatio: '1.91:1' },
      { name: 'Feed Post Portrait', width: 1080, height: 1350, aspectRatio: '4:5' },
    ],
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    formats: [
      { name: 'Stories', width: 1080, height: 1920, aspectRatio: '9:16' },
      { name: 'Feed Square', width: 1080, height: 1080, aspectRatio: '1:1' },
      { name: 'Feed Portrait', width: 1080, height: 1350, aspectRatio: '4:5' },
      { name: 'Reels', width: 1080, height: 1920, aspectRatio: '9:16' },
    ],
  },
  {
    name: 'X (Twitter)',
    icon: XIcon,
    formats: [
      { name: 'Feed Post', width: 1200, height: 675, aspectRatio: '16:9' },
      { name: 'Square Post', width: 1200, height: 1200, aspectRatio: '1:1' },
      { name: 'Portrait Post', width: 1080, height: 1350, aspectRatio: '4:5' },
    ],
  },
  {
    name: 'LinkedIn',
    icon: LinkedInIcon,
    formats: [
      { name: 'Feed Square', width: 1200, height: 1200, aspectRatio: '1:1' },
      { name: 'Feed Landscape', width: 1200, height: 627, aspectRatio: '1.91:1' },
      { name: 'Article Cover', width: 1920, height: 1080, aspectRatio: '16:9' },
    ],
  },
  {
    name: 'TikTok',
    icon: TikTokIcon,
    formats: [{ name: 'Video/Story', width: 1080, height: 1920, aspectRatio: '9:16' }],
  },
  {
    name: 'Multi-Platform',
    icon: MultiPlatformIcon,
    formats: [
      { name: 'Universal Square', width: 1080, height: 1080, aspectRatio: '1:1' },
      { name: 'Universal Story', width: 1080, height: 1920, aspectRatio: '9:16' },
    ],
  },
];

export const STYLE_PREFERENCES = ['Modern', 'Vintage', 'Corporate', 'Creative', 'Minimalist', 'Futuristic'];
export const COLOR_SCHEMES = [
  'Professional blue & gray',
  'Vibrant & energetic',
  'Minimalist black & white',
  'Earthy & natural tones',
  'Luxurious gold & black',
  'Playful pastels'
];
export const BACKGROUND_OPTIONS = [
    'Clean Solid Color',
    'Subtle Gradient',
    'Abstract Texture',
    'Geometric Pattern',
    'Nature Inspired',
    'Tech/Circuitry'
];