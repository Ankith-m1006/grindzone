
import React from "react";
import { useNavigate } from "react-router-dom";
import GrindZoneLogo from "@/components/GrindZoneLogo";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import FeatureCard from "@/components/cards/FeatureCard";
import { Trophy, Shield, Trophy as GamepadIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("login");

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <GrindZoneLogo size="large" />
              <h2 className="text-2xl md:text-4xl font-bold mt-6 text-purple-500 glow-text">
                LEVEL UP YOUR ESPORTS JOURNEY
              </h2>
              <p className="text-lg mt-4 text-zinc-300 max-w-lg">
                Your ultimate hub for tournaments, leaderboards, and team management in the competitive gaming world.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                <FeatureCard
                  icon={<Trophy size={28} />}
                  title="Tournaments"
                  description="Compete at your level"
                />
                <FeatureCard
                  icon={<Shield size={28} />}
                  title="Leaderboards"
                  description="Track your progress"
                />
                <FeatureCard
                  icon={<GamepadIcon size={28} />}
                  title="Squad Up"
                  description="Find your team"
                />
              </div>

              <div className="mt-10 grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-500 glow-text">10K+</div>
                  <div className="text-sm text-zinc-400">Players</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-500 glow-text">500+</div>
                  <div className="text-sm text-zinc-400">Tournaments</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-500 glow-text">50+</div>
                  <div className="text-sm text-zinc-400">Games</div>
                </div>
              </div>
            </div>

            <div>
              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black py-4 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-500">
          <p>© 2025 GrindZone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
