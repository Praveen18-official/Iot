import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Thermometer, Droplets, Sun, AlertCircle, CheckCircle, Activity } from "lucide-react";

const Dashboard = () => {
  const currentData = {
    temperature: 24.5,
    humidity: 68,
    soilMoisture: 45,
    lightIntensity: 12000,
    diseaseRisk: "Low",
    lastUpdated: new Date().toLocaleString(),
  };

  const sensors = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: `${currentData.temperature}°C`,
      status: "normal",
      optimal: "22-28°C",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${currentData.humidity}%`,
      status: "normal",
      optimal: "60-80%",
    },
    {
      icon: Droplets,
      label: "Soil Moisture",
      value: `${currentData.soilMoisture}%`,
      status: "warning",
      optimal: "50-70%",
    },
    {
      icon: Sun,
      label: "Light Intensity",
      value: `${currentData.lightIntensity} lux`,
      status: "normal",
      optimal: "10000-15000 lux",
    },
  ];

  const recentAlerts = [
    {
      time: "2 hours ago",
      message: "Soil moisture dropping below optimal level",
      severity: "warning",
    },
    {
      time: "5 hours ago",
      message: "Temperature within optimal range",
      severity: "info",
    },
    {
      time: "1 day ago",
      message: "System calibration completed successfully",
      severity: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Monitoring Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring of your indoor terrace farm
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {currentData.lastUpdated}
            </p>
          </div>

          {/* Disease Risk Status */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-card to-card/50 border-2 border-accent">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">
                  Disease Risk: {currentData.diseaseRisk}
                </h2>
                <p className="text-muted-foreground">
                  All parameters within safe range. Continue monitoring regularly.
                </p>
              </div>
            </div>
          </Card>

          {/* Sensor Data Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {sensors.map((sensor, index) => (
              <Card
                key={index}
                className={`p-6 bg-gradient-to-br from-card to-card/50 ${
                  sensor.status === "warning"
                    ? "border-2 border-destructive/30"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <sensor.icon className="h-6 w-6 text-primary" />
                  </div>
                  {sensor.status === "warning" && (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                  {sensor.status === "normal" && (
                    <CheckCircle className="h-5 w-5 text-accent" />
                  )}
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {sensor.label}
                </h3>
                <p className="text-3xl font-bold text-foreground mb-2">
                  {sensor.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  Optimal: {sensor.optimal}
                </p>
              </Card>
            ))}
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Trend Chart Placeholder */}
            <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">
                  Environmental Trends (24h)
                </h3>
              </div>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Historical trend chart will be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect sensors to start collecting data
                  </p>
                </div>
              </div>
            </Card>

            {/* Recent Alerts */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Recent Alerts
              </h3>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      alert.severity === "warning"
                        ? "bg-destructive/10"
                        : alert.severity === "success"
                        ? "bg-accent/10"
                        : "bg-muted/50"
                    }`}
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {alert.time}
                    </p>
                    <p className="text-sm text-foreground">{alert.message}</p>
                  </div>
                ))}
              </div>
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
