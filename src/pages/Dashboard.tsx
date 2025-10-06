import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DetectionResult {
  detected: boolean;
  confidence: number;
  severity: "none" | "mild" | "moderate" | "severe";
  symptoms: string[];
  recommendations: string;
}

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('detect-disease', {
        body: { imageBase64: selectedImage }
      });

      if (error) throw error;

      setResult(data);
      toast({
        title: "Analysis Complete",
        description: data.detected 
          ? `Alternaria Solani detected with ${data.confidence}% confidence`
          : "No disease detected",
      });
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze image. Please try again.",
        variant: "destructive",
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
              Disease Detection System
            </h1>
            <p className="text-muted-foreground">
              Upload an image of your brinjal plant to detect Alternaria Solani
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Upload Plant Image
              </h2>
              
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected plant"
                      className="max-h-64 mx-auto rounded-lg object-contain"
                    />
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-foreground font-medium">Click to upload image</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          PNG, JPG or WEBP (max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                <Button
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full"
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
              </div>
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

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 AgroMonitor. All rights reserved. IoT-Based Disease Monitoring System.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
