import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Globe,
  Copy,
  ExternalLink,
  User,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Edit,
  Eye,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const userProjects = [
  { id: "1", name: "portfolio-site", framework: "React", url: "portfolio-site.OneShip.in" },
  { id: "2", name: "hackathon-project", framework: "Next.js", url: "hackathon.OneShip.app" },
  { id: "4", name: "blog-platform", framework: "Django", url: "blog.OneShip.app" },
];

export default function Portfolio() {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    name: "Abhishek",
    bio: "Full-stack developer passionate about building web applications. Currently studying Computer Science and participating in hackathons.",
    email: "abhi1289@gmail.com",
    github: "abhi1289",
    linkedin: "Abhishek",
    twitter: "Abhishek",
    selectedProjects: ["1", "2", "4"],
  });
  const { toast } = useToast();

  const portfolioUrl = "abhi.OneShip.app";

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://${portfolioUrl}`);
    toast({
      title: "URL copied",
      description: "Your portfolio URL has been copied to your clipboard.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Page</h1>
            <p className="text-muted-foreground">
              Create a professional portfolio showcasing your projects
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
            <a href={`https://${portfolioUrl}`} target="_blank" rel="noopener noreferrer">
              <Button variant="hero">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live
              </Button>
            </a>
          </div>
        </div>

        {/* Portfolio URL */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Portfolio URL</p>
                <p className="font-mono font-medium">https://{portfolioUrl}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={copyUrl}>
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Edit Form */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={portfolioData.name}
                    onChange={(e) => setPortfolioData({ ...portfolioData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={portfolioData.bio}
                  onChange={(e) => setPortfolioData({ ...portfolioData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={portfolioData.email}
                    onChange={(e) => setPortfolioData({ ...portfolioData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <h3 className="font-semibold pt-4 border-t">Social Links</h3>

              <div className="space-y-2">
                <Label>GitHub Username</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={portfolioData.github}
                    onChange={(e) => setPortfolioData({ ...portfolioData, github: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>LinkedIn Username</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={portfolioData.linkedin}
                    onChange={(e) => setPortfolioData({ ...portfolioData, linkedin: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Twitter Username</Label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={portfolioData.twitter}
                    onChange={(e) => setPortfolioData({ ...portfolioData, twitter: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <Button variant="hero" className="w-full">
                  Save Changes
                </Button>
              )}
            </div>

            {/* Project Selection */}
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Featured Projects</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Select which projects to display on your portfolio
              </p>
              <div className="space-y-3">
                {userProjects.map((project) => {
                  const isSelected = portfolioData.selectedProjects.includes(project.id);
                  return (
                    <button
                      key={project.id}
                      onClick={() => {
                        if (isEditing) {
                          setPortfolioData({
                            ...portfolioData,
                            selectedProjects: isSelected
                              ? portfolioData.selectedProjects.filter((id) => id !== project.id)
                              : [...portfolioData.selectedProjects, project.id],
                          });
                        }
                      }}
                      disabled={!isEditing}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.framework}</p>
                        </div>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl border bg-card overflow-hidden sticky top-24">
            <div className="p-4 border-b flex items-center gap-2 bg-secondary/50">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="ml-2 text-sm text-muted-foreground">{portfolioUrl}</span>
            </div>
            <div className="p-8 space-y-8">
              {/* Preview Header */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {portfolioData.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h1 className="text-2xl font-bold">{portfolioData.name}</h1>
                <p className="text-muted-foreground mt-2 text-sm">{portfolioData.bio}</p>
                <div className="flex justify-center gap-4 mt-4">
                  {portfolioData.github && <Github className="h-5 w-5 text-muted-foreground" />}
                  {portfolioData.linkedin && <Linkedin className="h-5 w-5 text-muted-foreground" />}
                  {portfolioData.twitter && <Twitter className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>

              {/* Preview Projects */}
              <div>
                <h2 className="font-semibold mb-4">Projects</h2>
                <div className="space-y-3">
                  {userProjects
                    .filter((p) => portfolioData.selectedProjects.includes(p.id))
                    .map((project) => (
                      <div key={project.id} className="p-4 rounded-lg bg-secondary/50">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-xs text-muted-foreground">{project.framework}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
