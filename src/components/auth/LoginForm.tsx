
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if admin credentials
    if (email === "Chandan" && password === "buddy@game") {
      // Simulate network delay
      setTimeout(() => {
        // Store admin status in localStorage for persistence
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userName", "Chandan");
        
        toast({
          title: "Admin login successful",
          description: "Welcome back, Admin!",
          duration: 3000,
        });
        
        setIsLoading(false);
        // Navigate to admin page
        navigate("/admin");
      }, 800);
      return;
    }
    
    // Regular user login
    if (email && password) {
      // Simulate network delay
      setTimeout(() => {
        // Store user data in localStorage for persistence
        localStorage.setItem("userRole", "user");
        localStorage.setItem("userName", email);
        
        toast({
          title: "Login successful",
          description: "Welcome back to GrindZone!",
          duration: 3000,
        });
        
        setIsLoading(false);
        // Navigate to tournaments page after successful login
        navigate("/tournaments");
      }, 800);
    } else {
      setIsLoading(false);
      toast({
        title: "Login failed",
        description: "Please enter both username and password",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-glow-sm w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
      <p className="text-zinc-400 mb-6">Log in to continue your gaming journey</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Username/Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="Enter username or email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-purple-500 hover:underline">
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
        
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-500"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        
        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
