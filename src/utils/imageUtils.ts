import Together from 'together-ai';

/**
 * Generates an image using the Together AI API
 * @param prompt The text prompt to generate an image from
 * @param width The width of the image (default: 512)
 * @param height The height of the image (default: 512)
 * @param steps The number of diffusion steps (default: 4)
 * @returns A Promise that resolves to the base64 encoded image data
 */
export const generateImage = async (
  prompt: string,
  width: number = 512,
  height: number = 512,
  steps: number = 4
): Promise<string | null> => {
  try {
    const together = new Together({
      apiKey: import.meta.env.TOGETHER_API_KEY,
    });

    // Using a type assertion to handle the API's expected format
    // The Together API actually accepts "b64_json" but the type definition may be outdated
    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-dev",
      prompt,
      width,
      height,
      steps,
      n: 1,
      // @ts-expect-error - The Together API accepts "b64_json" but the type definition may be outdated
      response_format: "b64_json",
    });

    if (response.data && response.data[0]?.b64_json) {
      return `data:image/png;base64,${response.data[0].b64_json}`;
    }
    
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

/**
 * Creates a travel-themed prompt based on user stats and current place
 * @param correctAnswers Number of correct answers
 * @param totalPlayed Total number of questions played
 * @param currentPlace Optional current place the user is trying to guess
 * @param currentCountry Optional country of the current place
 * @returns A formatted prompt string
 */
export const createTravelPrompt = (
  correctAnswers: number, 
  totalPlayed: number,
  currentPlace?: string,
  currentCountry?: string
): string => {
  const percentage = Math.round((correctAnswers / totalPlayed) * 100);
  let basePrompt = '';
  
  if (percentage >= 80) {
    basePrompt = `A beautiful travel postcard showing a score of ${correctAnswers}/${totalPlayed} (${percentage}%). Include a globe, passport stamps, and a gold medal to represent expert travel knowledge.`;
  } else if (percentage >= 60) {
    basePrompt = `A colorful travel postcard showing a score of ${correctAnswers}/${totalPlayed} (${percentage}%). Include a map, compass, and silver medal to represent good travel knowledge.`;
  } else {
    basePrompt = `A fun travel postcard showing a score of ${correctAnswers}/${totalPlayed} (${percentage}%). Include a suitcase, plane ticket, and a bronze medal to encourage more travel learning.`;
  }
  
  // Add location-specific elements if available
  if (currentPlace && currentCountry) {
    return `${basePrompt} Feature iconic landmarks or scenery from ${currentPlace}, ${currentCountry} in a photorealistic style.`;
  } else if (currentPlace) {
    return `${basePrompt} Feature iconic landmarks or scenery from ${currentPlace} in a photorealistic style.`;
  } else if (currentCountry) {
    return `${basePrompt} Feature iconic landmarks or scenery from ${currentCountry} in a photorealistic style.`;
  }
  
  return basePrompt;
}; 