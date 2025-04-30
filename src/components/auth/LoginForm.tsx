
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating successful login
    if (email && password) {
      toast({
        title: "Login successful",
        description: "Welcome back to GrindZone!",
        duration: 3000,
      });
      
      // In a real app, you would redirect after successful authentication
      // navigate('/tournaments');
    }
  };

  return (
    <div className="bg-grindzone-card p-8 rounded-xl border border-border shadow-glow-sm w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
      <p className="text-muted-foreground mb-6">Log in to continue your gaming journey</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-grindzone-blue hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm">Remember me</Label>
        </div>
        
        <Button type="submit" className="w-full bg-grindzone-blue hover:bg-grindzone-blue-light">
          Login
        </Button>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-grindzone-blue hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
