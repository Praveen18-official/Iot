import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, RotateCcw, CameraIcon, Loader2, AlertCircle } from 'lucide-react';

interface ESP32StreamProps {
  onImageCapture: (imageDataUrl: string) => void;
  capturedImage: string | null;
  onClearImage: () => void;
  streamUrl: string;
}

const ESP32Stream: React.FC<ESP32StreamProps> = ({ 
  onImageCapture, 
  capturedImage, 
  onClearImage,
  streamUrl 
}) => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Add a timestamp to the URL to prevent caching
  const streamUrlWithTimestamp = `${streamUrl}?t=${Date.now()}`;

  // Handle image load/error
  const handleImageLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError('Failed to load camera feed. Please check the stream URL.');
  };

  const capture = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    
    if (!img || !canvas) return;
    
    try {
      // Set canvas dimensions to match image
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      
      // Draw the image to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Get the image data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        onImageCapture(imageDataUrl);
        setIsStreaming(false);
      }
    } catch (error) {
      console.error('Error capturing frame:', error);
      setError('Error capturing image. Please try again.');
    }
  };

  const retake = () => {
    onClearImage();
    setIsStreaming(true);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 text-white z-10">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <p>Connecting to ESP32 camera...</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 text-white z-10 p-4 text-center">
            <AlertCircle className="h-12 w-12 mb-4" />
            <p className="font-semibold">Connection Error</p>
            <p className="text-sm mt-2">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="mt-4"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry Connection
            </Button>
          </div>
        )}
        
        {!capturedImage ? (
          <div className="relative">
            <img
              ref={imgRef}
              src={streamUrlWithTimestamp}
              alt="ESP32 Camera Stream"
              className="w-full h-auto max-h-[400px] object-contain"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: isStreaming ? 'block' : 'none' }}
            />
            {isStreaming && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <Button 
                  onClick={capture}
                  variant="default"
                  size="lg"
                  className="gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Capture
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-auto max-h-[400px] object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <Button 
                onClick={retake}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Retake
              </Button>
            </div>
          </div>
        )}
        
        {/* Hidden canvas for capturing frames */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      {/* Debug info - can be removed in production */}
      <div className="text-xs text-muted-foreground text-center">
        <p>Stream URL: {streamUrl}</p>
        <p>Status: {isLoading ? 'Connecting...' : error ? 'Error' : 'Connected'}</p>
      </div>
    </div>
  );
};

export default ESP32Stream;
