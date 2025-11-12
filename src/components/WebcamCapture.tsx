import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, RotateCcw, Download } from 'lucide-react';

interface WebcamCaptureProps {
  onImageCapture: (imageDataUrl: string) => void;
  capturedImage: string | null;
  onClearImage: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onImageCapture, capturedImage, onClearImage }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCapturing, setIsCapturing] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        onImageCapture(imageSrc);
        setIsCapturing(false);
      }
    }
  }, [onImageCapture]);

  const retake = () => {
    onClearImage();
    setIsCapturing(true);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `plant-capture-${new Date().getTime()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        {isCapturing ? (
          <Card className="p-4 bg-black/50">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: facingMode,
                width: 1280,
                height: 720
              }}
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button onClick={capture} className="gap-2">
                <Camera className="h-4 w-4" />
                Capture
              </Button>
              <Button variant="outline" onClick={toggleCamera} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Switch Camera
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-4">
            <div className="relative">
              <img
                src={capturedImage || ''}
                alt="Captured"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button onClick={retake} variant="outline" className="gap-2">
                  <CameraOff className="h-4 w-4" />
                  Retake
                </Button>
                <Button onClick={downloadImage} variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {!isCapturing && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Image captured successfully! Click "Retake" to capture again or "Download" to save the image.
          </p>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
