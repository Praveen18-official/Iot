import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login logic
    if (loginData.email && loginData.password) {
      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder signup logic
    if (
      signupData.name &&
      signupData.email &&
      signupData.password &&
      signupData.confirmPassword
    ) {
      if (signupData.password !== signupData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      toast.success("Account created successfully! Please login.");
      // Reset form and switch to login tab
      setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome to AgroMonitor
              </h1>
              <p className="text-muted-foreground">
                Access your crop monitoring dashboard
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)]">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full shadow-[var(--shadow-glow)]">
                      Login
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                      Forgot your password?{" "}
                      <a href="#" className="text-primary hover:underline">
                        Reset it here
                      </a>
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData({ ...signupData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({ ...signupData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({ ...signupData, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full shadow-[var(--shadow-glow)]">
                      Create Account
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms & Conditions
                      </a>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
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

export default Auth;
