import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Activity, Shield, Zap, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-farming.jpg";

const Index = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track crop health and environmental conditions 24/7 with IoT sensors",
    },
    {
      icon: Shield,
      title: "Disease Detection",
      description: "Early detection of Alternaria Solani and other crop diseases",
    },
    {
      icon: Zap,
      title: "Smart Alerts",
      description: "Instant notifications for critical changes in crop conditions",
    },
    {
      icon: Leaf,
      title: "Indoor Terrace Farming",
      description: "Optimized for controlled environment agriculture systems",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                IoT-Based Crop Disease Monitoring
              </h1>
              <p className="text-xl text-muted-foreground">
                Advanced Alternaria Solani detection system for brinjal cultivation in
                indoor terrace farming environments
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button size="lg" className="shadow-[var(--shadow-glow)]">
                    Sign Up and Start
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Indoor terrace farming with IoT monitoring"
                className="relative rounded-2xl shadow-[var(--shadow-card)] w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Monitoring System
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protect your brinjal crops with cutting-edge IoT technology and early
              disease detection
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
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
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-foreground">
              About System
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our IoT-Based Alternaria Solani Monitoring System is specifically designed
              for indoor terrace farming of brinjal (eggplant) crops. Using advanced
              sensors and machine learning algorithms, we provide real-time monitoring
              and early detection of crop diseases, helping farmers prevent losses and
              optimize their yields.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The system continuously monitors environmental conditions, plant health
              indicators, and disease markers to provide actionable insights. Our
              platform combines cutting-edge technology with agricultural expertise to
              make precision farming accessible and effective.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
