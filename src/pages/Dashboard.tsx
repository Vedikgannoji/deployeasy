import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Plus,
  ArrowUpRight,
  Rocket,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

const recentProjects = [
  
];

const stats = [
  { label: "Total Deployments", value: "0", icon: Rocket, trend: "0%" },
  { label: "Active Projects", value: "0", icon: Globe, trend: "0" },
  { label: "Security Score", value: "0%", icon: Shield, trend: "0%" },
  { label: "Avg Build Time", value: "0s", icon: Zap, trend: "0s" },
];

const tips = [
  "💡 Connect your GitHub account for automatic deployments on every push.",
  "🔒 Enable security scanning to catch vulnerabilities before they go live.",
  "📊 Create a portfolio page to showcase all your projects to employers.",
];

export default function Dashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "building":
        return <Clock className="h-4 w-4 text-warning animate-pulse" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      live: "bg-success/10 text-success",
      building: "bg-warning/10 text-warning",
      failed: "bg-destructive/10 text-destructive",
    };
    return styles[status as keyof typeof styles] || "";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, Abhi! 👋</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </div>
          <Link to="/deploy">
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Deploy New Project
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-6 rounded-xl border bg-card hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm text-success font-medium flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2 rounded-xl border bg-card">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Projects</h2>
                <Link
                  to="/projects"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <div className="divide-y">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">
                        {project.name[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.framework} • {project.lastDeployed}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link to="/deploy">
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Tips & Updates */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {tip}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-accent/10 p-6">
              <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Check out our documentation or reach out to support.
              </p>
              <Link to="/docs">
                <Button variant="outline" size="sm">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
