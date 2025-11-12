import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Eye, Microscope, TrendingUp } from "lucide-react";
import diseaseImage from "@/assets/disease-detection.jpg";

const Detection = () => {

  const symptoms = [
    "Dark brown circular spots on leaves",
    "Concentric ring patterns (target-like appearance)",
    "Yellowing around spots",
    "Leaf wilting and premature defoliation",
    "Fruit lesions and quality degradation",
  ];

  const detectionMethods = [
    {
      icon: Eye,
      title: "Visual Inspection",
      description: "Manual inspection for early spot detection on leaves and stems using trained observation techniques",
    },
    {
      icon: Microscope,
      title: "Environmental Monitoring",
      description: "Track conditions favorable for disease development (humidity, temperature, airflow patterns)",
    },
    {
      icon: TrendingUp,
      title: "Growth Pattern Analysis",
      description: "Monitor plant growth patterns and development stages to predict potential disease risks",
    },
  ];

  const preventiveMeasures = [
    "Maintain optimal humidity levels (below 85%)",
    "Ensure proper air circulation",
    "Regular inspection and early detection",
    "Remove infected plant material promptly",
    "Apply fungicides when necessary (as recommended)",
    "Monitor environmental conditions continuously",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Alternaria Solani Detection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding and preventing early blight in brinjal crops
            </p>
          </div>

          {/* Disease Overview */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-secondary/20 blur-3xl rounded-full" />
              <img
                src={diseaseImage}
                alt="Alternaria Solani disease on brinjal leaf"
                className="relative rounded-2xl shadow-[var(--shadow-card)] w-full h-auto"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                What is Alternaria Solani?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Alternaria Solani, commonly known as early blight, is a fungal disease that
                affects brinjal (eggplant) and other solanaceous crops. It's one of the most
                economically important diseases in indoor and outdoor cultivation, capable of
                causing significant yield losses if not detected and managed early.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The pathogen thrives in warm, humid conditions, making indoor terrace farms
                particularly susceptible. Early detection is crucial for effective management
                and preventing the spread of the disease to healthy plants.
              </p>
              <Card className="p-4 bg-destructive/10 border-destructive/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Critical Impact</p>
                    <p className="text-sm text-muted-foreground">
                      Without proper monitoring, Alternaria Solani can reduce crop yields
                      by 35-78% and significantly affect fruit quality.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Recognizing the Symptoms
            </h2>
            <Card className="p-8 bg-gradient-to-br from-card to-card/50">
              <ul className="grid md:grid-cols-2 gap-4">
                {symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-lg text-muted-foreground">{symptom}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Detection Methods */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Our Detection Methods
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {detectionMethods.map((method, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary w-fit mb-4">
                    <method.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground">{method.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Preventive Measures & Management
            </h2>
            <Card className="p-8 bg-gradient-to-br from-card to-card/50">
              <p className="text-lg text-muted-foreground mb-6">
                Our comprehensive approach combines manual inspection with advanced monitoring
                systems to provide early detection and prevention strategies:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {preventiveMeasures.map((measure, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 p-1 rounded-full bg-accent/10">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-muted-foreground">{measure}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Detection;
