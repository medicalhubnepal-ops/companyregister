import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const demoAccounts = [
  { label: "Company User", email: "ram@company.com", desc: "Submit events & manage company" },
  { label: "Staff Officer", email: "krishna@staff.gov", desc: "Verify & approve applications" },
  { label: "Administrator", email: "admin@registry.gov", desc: "Full system configuration" },
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials", variant: "destructive" });
    }
  };

  const quickLogin = (emailAddr: string) => {
    if (login(emailAddr, "demo")) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary mb-4">
            <Building2 className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Company Registry</h1>
          <p className="text-sm text-muted-foreground mt-1">Event & Document Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full">
                Sign In <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Demo Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                onClick={() => quickLogin(acc.email)}
                className="w-full flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{acc.label}</p>
                  <p className="text-xs text-muted-foreground">{acc.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
