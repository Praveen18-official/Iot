import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Cpu, Database, Wifi, Bell, LineChart, Cloud } from "lucide-react";
import iotImage from "@/assets/iot-system.jpg";

const About = () => {
  const systemFeatures = [
    {
      icon: Cpu,
      title: "IoT Sensors",
      description: "Advanced environmental and plant health sensors for continuous monitoring",
    },
    {
      icon: Database,
      title: "Data Processing",
      description: "Real-time data analysis and storage for historical tracking",
    },
    {
      icon: Wifi,
      title: "Wireless Connectivity",
      description: "Seamless communication between sensors and central system",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Instant alerts for disease detection and environmental changes",
    },
    {
      icon: LineChart,
      title: "Analytics Dashboard",
      description: "Comprehensive visualization of crop health trends and patterns",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Secure cloud storage and remote access from anywhere",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              About Our IoT Monitoring System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced technology for modern indoor terrace farming
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Revolutionizing Brinjal Cultivation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our IoT-Based Alternaria Solani Monitoring System represents a breakthrough
                in precision agriculture for indoor terrace farming. Designed specifically
                for brinjal (eggplant) cultivation, our system combines cutting-edge sensor
                technology with machine learning to detect and prevent crop diseases before
                they become critical.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The system monitors multiple environmental parameters including temperature,
                humidity, soil moisture, and plant health indicators. By analyzing this data
                in real-time, we can detect early signs of Alternaria Solani and other
                diseases, allowing farmers to take preventive action and protect their crops.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform is designed to be user-friendly and accessible, making advanced
                agricultural technology available to farmers of all experience levels. With
                mobile and web interfaces, you can monitor your crops from anywhere, at any
                time.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl rounded-full" />
              <img
                src={iotImage}
                alt="IoT monitoring system dashboard"
                className="relative rounded-2xl shadow-[var(--shadow-card)] w-full h-auto"
              />
            </div>
          </div>

          {/* System Features */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              System Features & Components
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <Card className="p-8 bg-gradient-to-br from-card to-card/50">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Technical Specifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Sensor Network</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Temperature sensors (±0.5°C accuracy)</li>
                    <li>Humidity sensors (±3% RH accuracy)</li>
                    <li>Soil moisture sensors</li>
                    <li>Light intensity sensors</li>
                    <li>Image capture for visual analysis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Data Collection</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Real-time monitoring (5-minute intervals)</li>
                    <li>Historical data storage</li>
                    <li>Automated data backup</li>
                    <li>Data export capabilities</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Disease Detection</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Machine learning-based image analysis</li>
                    <li>Early warning system for Alternaria Solani</li>
                    <li>Multi-parameter disease correlation</li>
                    <li>Preventive measure recommendations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Connectivity</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Wi-Fi and cellular connectivity</li>
                    <li>Secure cloud data transmission</li>
                    <li>Mobile app integration</li>
                    <li>Web dashboard access</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
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

export default About;
