import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { generateImage } from '../utils/imageUtils';

interface ImageGeneratorProps {
  prompt?: string;
  width?: number;
  height?: number;
  onImageGenerated?: (imageUrl: string) => void;
  currentPlace?: string;
  currentCountry?: string;
  autoGenerate?: boolean;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  prompt = "A travel postcard with a globe and airplane",
  width = 512,
  height = 512,
  onImageGenerated,
  currentPlace,
  currentCountry,
  autoGenerate = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const hasGeneratedRef = useRef(false);

  // Memoize the generate image function to use in useEffect
  const generateImageWithCurrentProps = useCallback(async () => {
    if (isLoading) return; // Prevent multiple simultaneous generations
    
    setIsLoading(true);
    try {
      // Enhance the prompt with current place information if available
      let enhancedPrompt = prompt;
      if (currentPlace && currentCountry) {
        enhancedPrompt = `${prompt} featuring ${currentPlace}, ${currentCountry} with recognizable landmarks or scenery`;
      } else if (currentPlace) {
        enhancedPrompt = `${prompt} featuring ${currentPlace} with recognizable landmarks or scenery`;
      } else if (currentCountry) {
        enhancedPrompt = `${prompt} featuring ${currentCountry} with recognizable landmarks or scenery`;
      }
      
      const imageData = await generateImage(enhancedPrompt, width, height);
      
      if (imageData) {
        setImageUrl(imageData);
        if (onImageGenerated) {
          onImageGenerated(imageData);
        }
      } else {
        toast({
          title: "Image generation failed",
          description: "Could not generate image. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Image generation failed",
        description: "An error occurred while generating the image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [prompt, width, height, currentPlace, currentCountry, onImageGenerated, isLoading]);

  // Auto-generate image only once when component mounts if autoGenerate is true
  useEffect(() => {
    if (autoGenerate && !hasGeneratedRef.current && !imageUrl) {
      hasGeneratedRef.current = true;
      generateImageWithCurrentProps();
    }
  }, [autoGenerate, generateImageWithCurrentProps, imageUrl]);

  return (
    <div className="flex flex-col items-center gap-4">
      {imageUrl ? (
        <div className="relative rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`Generated travel image${currentPlace ? ` of ${currentPlace}` : ''}`}
            className="max-w-full h-auto"
            width={width}
            height={height}
          />
        </div>
      ) : (
        <div 
          className="bg-gray-200 rounded-md flex items-center justify-center"
          style={{ width: width, height: height, maxWidth: '100%' }}
        >
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          ) : (
            <span className="text-gray-500 text-sm">
              {autoGenerate ? "Generating image..." : "Click generate to create an image"}
            </span>
          )}
        </div>
      )}
      
      {!autoGenerate && (
        <Button
          onClick={generateImageWithCurrentProps}
          disabled={isLoading}
          className="mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Travel Image'
          )}
        </Button>
      )}
    </div>
  );
};

export default ImageGenerator; 