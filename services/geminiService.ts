import { GoogleGenAI } from "@google/genai";
import { FormData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function createPrompt(formData: FormData): string {
  const { content, style, platform } = formData;
  const isStory = platform.format?.aspectRatio === '9:16';
  const hasLogo = !!style.logoImage;

  return `
Create a high-resolution, professional social media poster with the following specifications. The poster must be visually striking, well-composed, and adhere strictly to all requirements.

**1. Core Content:**
- **Main Headline:** "${content.headline}" (This must be the most prominent text element).
- **Subtitle/Description:** "${content.subtitle || 'N/A'}"
- **Key Message / Call-to-Action:** "${content.cta}"
${!hasLogo ? `- **Brand Name / Logo Text:** "${content.brandName}"` : ''}
- **Additional Text Elements:** "${content.additionalText || 'N/A'}"

**2. Visual & Style Direction:**
- **Overall Style:** ${style.stylePreference}.
- **Color Scheme:** ${style.colorScheme}.
- **Background:** ${style.backgroundImage}.
- **Image/Graphic Requirements:** ${style.imageRequirements}. (This should complement the background style).

**3. Brand Guidelines (if provided):**
- **Brand Colors:** "${style.brandColors || 'Use the primary color scheme.'}"
- **Font Preferences:** "${style.fontPreference || 'Choose a font that matches the overall style.'}"
${hasLogo 
  ? `- **Logo Placement:** A visual logo will be added later. IMPORTANT: Leave a suitable amount of negative space in the ${style.logoPlacement} area of the poster to accommodate a logo. The design should feel balanced with this space reserved.` 
  : `- **Logo Placement:** "${style.logoPlacement || 'Place the brand name in a subtle but visible corner.'}"`
}

**4. Layout & Composition Rules:**
- **Hierarchy:** The text hierarchy is critical. Headline > Subtitle > CTA > Brand Name.
- **Readability:** All text must be highly legible, even at thumbnail size on mobile devices.
- **White Space:** Use adequate margins and white space to avoid a cluttered look.
- **Resolution:** The output must be high-resolution and sharp.
- **Format:** The final image must be clean, with no artifacts or watermarks.

**5. Platform-Specific Constraints:**
${isStory ? `- **CRITICAL: This is a Story format (9:16 ratio).** Keep all critical text and elements within a central "safe zone," avoiding the top and bottom 250 pixels to prevent being obscured by social media UI elements.` : ''}

Generate the poster based *only* on these instructions.
`;
}

export const generatePoster = async (formData: FormData): Promise<string> => {
  if (!formData.platform.format) {
    throw new Error("Platform format not selected.");
  }

  const prompt = createPrompt(formData);
  const aspectRatio = formData.platform.format.aspectRatio;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation failed, no images returned.");
    }
  } catch (error) {
    console.error("Error generating poster with Gemini API:", error);
    throw new Error("Failed to generate poster. Please try again.");
  }
};