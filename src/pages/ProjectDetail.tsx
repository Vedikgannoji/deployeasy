import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ExternalLink,
  RefreshCw,
  Settings,
  Globe,
  Terminal,
  Shield,
  Key,
  History,
  CheckCircle,
  AlertTriangle,
  Clock,
  Copy,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const buildLogs = [
  { time: "00:00", message: "Starting deployment...", type: "info" },
  { time: "00:02", message: "Detected framework: React + Vite", type: "success" },
  { time: "00:05", message: "Installing dependencies...", type: "info" },
  { time: "00:15", message: "Dependencies installed successfully", type: "success" },
  { time: "00:16", message: "Running security scan...", type: "info" },
  { time: "00:25", message: "No vulnerabilities found", type: "success" },
  { time: "00:26", message: "Building project...", type: "info" },
  { time: "00:45", message: "Build completed successfully", type: "success" },
  { time: "00:46", message: "Deploying to edge network...", type: "info" },
  { time: "00:52", message: "Deployment complete!", type: "success" },
];

const securityIssues = [
  { severity: "low", message: "Outdated dependency: lodash@4.17.20", recommendation: "Update to 4.17.21" },
];

const envVars = [
  { key: "NODE_ENV", value: "production" },
  { key: "API_URL", value: "https://api.example.com" },
];

const deployHistory = [
  { id: "1", status: "success", message: "Production deploy", time: "2 hours ago", commit: "abc123" },
  { id: "2", status: "success", message: "Fix styling", time: "1 day ago", commit: "def456" },
  { id: "3", status: "failed", message: "Add new feature", time: "2 days ago", commit: "ghi789" },
  { id: "4", status: "success", message: "Initial deploy", time: "1 week ago", commit: "jkl012" },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isRedeploying, setIsRedeploying] = useState(false);

  const project = {
    id,
    name: "portfolio-site",
    framework: "React",
    status: "live",
    url: "portfolio-site.oneship.app",
    lastDeployed: "2 hours ago",
    branch: "main",
    repository: "github.com/johndoe/portfolio-site",
  };

  const handleRedeploy = () => {
    setIsRedeploying(true);
    setTimeout(() => {
      setIsRedeploying(false);
      toast({
        title: "Deployment started",
        description: "Your project is being redeployed.",
      });
    }, 2000);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${project.url}`);
    toast({
      title: "URL copied",
      description: "The live URL has been copied to your clipboard.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/projects">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  {project.name[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{project.name}</h1>
                <p className="text-muted-foreground">{project.framework}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRedeploy} disabled={isRedeploying}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRedeploying ? "animate-spin" : ""}`} />
              {isRedeploying ? "Deploying..." : "Redeploy"}
            </Button>
            <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer">
              <Button variant="hero">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Site
              </Button>
            </a>
          </div>
        </div>

        {/* Live URL Card */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Live URL</p>
                <p className="font-mono font-medium">https://{project.url}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={copyUrl}>
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="logs">Build Logs</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="env">Env Variables</TabsTrigger>
            <TabsTrigger value="history">Deploy History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border bg-card p-6">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-semibold capitalize">{project.status}</span>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <p className="text-sm text-muted-foreground mb-1">Branch</p>
                <p className="font-semibold font-mono">{project.branch}</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <p className="text-sm text-muted-foreground mb-1">Last Deployed</p>
                <p className="font-semibold">{project.lastDeployed}</p>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-xl border bg-card overflow-hidden">
              <div className="p-4 border-b flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-2 text-sm text-muted-foreground">{project.url}</span>
              </div>
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <p className="text-muted-foreground">Live Preview</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <div className="rounded-xl border bg-card overflow-hidden">
              <div className="p-4 border-b flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span className="font-medium">Build Logs</span>
              </div>
              <div className="bg-secondary/50 p-4 font-mono text-sm space-y-1 max-h-96 overflow-auto">
                {buildLogs.map((log, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-muted-foreground">[{log.time}]</span>
                    <span className={log.type === "success" ? "text-success" : log.type === "error" ? "text-destructive" : ""}>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="rounded-xl border bg-card">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Security Scan</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  Passed
                </span>
              </div>
              <div className="p-4 space-y-4">
                {securityIssues.length > 0 ? (
                  securityIssues.map((issue, index) => (
                    <div key={index} className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{issue.message}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Recommendation: {issue.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                    <p className="font-medium">No security issues found</p>
                    <p className="text-sm text-muted-foreground">Your project passed all security checks</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="env">
            <div className="rounded-xl border bg-card">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span className="font-medium">Environment Variables</span>
                </div>
                <Button size="sm">Add Variable</Button>
              </div>
              <div className="divide-y">
                {envVars.map((env, index) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-mono font-medium">{env.key}</p>
                      <p className="text-sm text-muted-foreground font-mono">••••••••</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="rounded-xl border bg-card">
              <div className="p-4 border-b flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="font-medium">Deploy History</span>
              </div>
              <div className="divide-y">
                {deployHistory.map((deploy) => (
                  <div key={deploy.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {deploy.status === "success" ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium">{deploy.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {deploy.time} • {deploy.commit}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Rollback</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Project Settings</h3>
                <p className="text-sm text-muted-foreground">Configure your project deployment settings.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">Auto Deploy</p>
                    <p className="text-sm text-muted-foreground">Deploy automatically on every push</p>
                  </div>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">Build Command</p>
                    <p className="text-sm text-muted-foreground font-mono">npm run build</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button variant="destructive">Delete Project</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
