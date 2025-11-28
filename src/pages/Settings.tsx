import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Github,
  Bell,
  CreditCard,
  Shield,
  Trash2,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [notifications, setNotifications] = useState({
    deploySuccess: true,
    deployFailed: true,
    securityAlerts: true,
    weeklyReport: false,
  });
  const [isGithubConnected, setIsGithubConnected] = useState(true);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleConnectGithub = () => {
    setIsGithubConnected(!isGithubConnected);
    toast({
      title: isGithubConnected ? "GitHub disconnected" : "GitHub connected",
      description: isGithubConnected
        ? "Your GitHub account has been disconnected."
        : "Your GitHub account has been connected.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Update your personal information
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">AB</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button variant="hero" onClick={handleSaveProfile}>
                Save Changes
              </Button>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="github">
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">GitHub Integration</h2>
                <p className="text-sm text-muted-foreground">
                  Connect your GitHub account for automatic deployments
                </p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center">
                    <Github className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">
                      {isGithubConnected ? "Connected as @johndoe" : "Not connected"}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isGithubConnected ? "outline" : "hero"}
                  onClick={handleConnectGithub}
                >
                  {isGithubConnected ? "Disconnect" : "Connect"}
                </Button>
              </div>

              {isGithubConnected && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Connected Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-success" />
                      <span>Import repositories</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-success" />
                      <span>Auto-deploy on push</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-success" />
                      <span>Pull request previews</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Notifications</h2>
                <p className="text-sm text-muted-foreground">
                  Choose what notifications you want to receive
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Successful Deployments</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a deployment succeeds
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.deploySuccess}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, deploySuccess: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Failed Deployments</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a deployment fails
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.deployFailed}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, deployFailed: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified about security vulnerabilities
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, securityAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Weekly Report</p>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your projects
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, weeklyReport: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Billing</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription plans and billing information
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Free Plan</h3>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    Active
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You're currently on the free plan with 3 projects and 100 deployments/month.
                </p>
                <Button variant="hero">Upgrade to Pro</Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Usage This Month</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold">0/3</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold">0/100</p>
                    <p className="text-sm text-muted-foreground">Deployments</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-2xl font-bold">0GB</p>
                    <p className="text-sm text-muted-foreground">Bandwidth</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-4">Payment Method</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">No payment method added</span>
                  </div>
                  <Button variant="outline" size="sm">Add Card</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
