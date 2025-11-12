import React, { useState } from 'react';
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, AlertCircle, CheckCircle, Info, Camera, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import WebcamCapture from "@/components/WebcamCapture";

interface DetectionResult {
  detected: boolean;
  confidence: number;
  severity: "none" | "mild" | "moderate" | "severe";
  symptoms: string[];
  recommendations: string;
  imageUrl?: string;
  timestamp?: string;
}

const Monitoring = () => {
  const [inputMode, setInputMode] = useState<'file' | 'webcam'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const symptoms = [
    "Dark brown circular spots on leaves",
    "Concentric ring patterns (target-like appearance)",
    "Yellowing around spots",
    "Leaf wilting and premature defoliation",
    "Fruit lesions and quality degradation",
  ];

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setCapturedImage(null);
    setResult(null);
  };

  const handleWebcamCapture = (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
    setSelectedFile(null);
    setResult(null);
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setCapturedImage(null);
    setResult(null);
  };

  const saveDetection = async (detectionData: DetectionResult) => {
    // For demo purposes, just return the detection data with a timestamp
    return {
      ...detectionData,
      timestamp: new Date().toISOString()
    };
  };

  const analyzeImage = async () => {
    // Check if we have either a selected file or captured image
    if (!selectedFile && !capturedImage) {
      toast({
        title: "Error",
        description: "Please select an image or capture one using the webcam",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate analysis with local data
      const mockResult: DetectionResult = {
        detected: Math.random() > 0.3, // 70% chance of detection
        confidence: Math.floor(Math.random() * 40) + 60, // 60-100% confidence
        severity: ['none', 'mild', 'moderate', 'severe'][Math.floor(Math.random() * 4)] as any,
        symptoms: symptoms.slice(0, Math.floor(Math.random() * 3) + 1),
        recommendations: "Apply copper-based fungicide and improve air circulation. Remove affected leaves immediately. Monitor humidity levels and maintain below 85%.",
        imageUrl: capturedImage || (selectedFile ? URL.createObjectURL(selectedFile) : '')
      };

      // Save locally
      const savedDetection = await saveDetection(mockResult);
      setResult(savedDetection);

      toast({
        title: "Analysis Complete",
        description: savedDetection.detected
          ? `Disease detected with ${savedDetection.confidence}% confidence`
          : "No disease detected",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe": return "text-destructive";
      case "moderate": return "text-orange-500";
      case "mild": return "text-yellow-500";
      default: return "text-accent";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "severe": return "bg-destructive/10 border-destructive/30";
      case "moderate": return "bg-orange-500/10 border-orange-500/30";
      case "mild": return "bg-yellow-500/10 border-yellow-500/30";
      default: return "bg-accent/10 border-accent/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Plant Health Monitoring
            </h1>
            <p className="text-muted-foreground">
              Real-time AI-powered disease detection for your brinjal crops
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted p-1 rounded-lg flex gap-1">
              <Button
                variant={inputMode === 'file' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setInputMode('file')}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
              <Button
                variant={inputMode === 'webcam' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setInputMode('webcam')}
                className="gap-2"
              >
                <Camera className="h-4 w-4" />
                Webcam
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {inputMode === 'file' ? 'Upload Plant Image' : 'Live Camera'}
              </h2>

              {inputMode === 'file' ? (
                <FileUpload
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedFile}
                  onClearImage={handleClearImage}
                />
              ) : (
                <WebcamCapture
                  onImageCapture={handleWebcamCapture}
                  capturedImage={capturedImage}
                  onClearImage={handleClearImage}
                />
              )}

              <Button
                onClick={analyzeImage}
                disabled={(!selectedFile && !capturedImage) || isAnalyzing}
                className="w-full mt-4"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Image
                  </>
                )}
              </Button>
            </Card>

            {/* Results Section */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Detection Results
              </h2>

              {!result ? (
                <div className="h-full flex items-center justify-center text-center py-12">
                  <div>
                    <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Upload and analyze an image to see results
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Detection Status */}
                  <Card className={`p-4 border-2 ${getSeverityBg(result.severity)}`}>
                    <div className="flex items-center gap-3">
                      {result.detected ? (
                        <AlertCircle className={`h-8 w-8 ${getSeverityColor(result.severity)}`} />
                      ) : (
                        <CheckCircle className="h-8 w-8 text-accent" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground">
                          {result.detected ? "Disease Detected" : "No Disease Detected"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {result.confidence}%
                        </p>
                      </div>
                    </div>
                  </Card>

                  {result.detected && (
                    <>
                      {/* Severity */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Severity Level
                        </h4>
                        <p className={`text-2xl font-bold ${getSeverityColor(result.severity)} capitalize`}>
                          {result.severity}
                        </p>
                      </div>

                      {/* Symptoms */}
                      {result.symptoms.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            Observed Symptoms
                          </h4>
                          <ul className="space-y-1">
                            {result.symptoms.map((symptom, index) => (
                              <li key={index} className="text-sm text-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Recommendations */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Recommendations
                        </h4>
                        <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                          {result.recommendations}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-card to-card/50">
              <h3 className="font-semibold text-foreground mb-2">About Alternaria Solani</h3>
              <p className="text-sm text-muted-foreground">
                A fungal disease causing brown to black spots with target-like rings on leaves, 
                leading to defoliation in severe cases.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50">
              <h3 className="font-semibold text-foreground mb-2">Best Practices</h3>
              <p className="text-sm text-muted-foreground">
                Take clear, well-lit photos of affected leaves. Multiple angles help improve 
                detection accuracy.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50">
              <h3 className="font-semibold text-foreground mb-2">Early Detection</h3>
              <p className="text-sm text-muted-foreground">
                Regular monitoring and early detection are key to preventing disease spread 
                in your indoor terrace farm.
              </p>
            </Card>
          </div>
</div>
      </div>

    </div>
  );
};

export default Monitoring;
