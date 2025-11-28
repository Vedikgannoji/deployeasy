import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Github,
  Upload,
  Palette,
  ArrowRight,
  Check,
  Loader2,
  FolderArchive,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const importOptions = [
  {
    id: "github",
    icon: Github,
    title: "Import from GitHub",
    description: "Connect a repository for automatic deployments",
  },
  {
    id: "upload",
    icon: Upload,
    title: "Upload ZIP",
    description: "Upload your project files directly",
  },
  {
    id: "template",
    icon: Palette,
    title: "Start from Template",
    description: "Choose a pre-configured starter template",
  },
];

const frameworks = [
  { id: "react", name: "React", icon: "⚛️" },
  { id: "nextjs", name: "Next.js", icon: "▲" },
  { id: "vue", name: "Vue", icon: "💚" },
  { id: "angular", name: "Angular", icon: "🅰️" },
  { id: "django", name: "Django", icon: "🐍" },
  { id: "flask", name: "Flask", icon: "🌶️" },
  { id: "nodejs", name: "Node.js", icon: "🟢" },
  { id: "express", name: "Express", icon: "📦" },
];

const templates = [
  { id: "react-starter", name: "React Starter", framework: "React" },
  { id: "nextjs-blog", name: "Next.js Blog", framework: "Next.js" },
  { id: "django-api", name: "Django REST API", framework: "Django" },
  { id: "node-api", name: "Node.js API", framework: "Node.js" },
];

export default function DeployNew() {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [detectedFramework, setDetectedFramework] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setStep(2);
  };

  const handleAnalyze = () => {
    if (!repoUrl && selectedOption === "github") return;
    
    setIsAnalyzing(true);
    // Simulate framework detection
    setTimeout(() => {
      setDetectedFramework("react");
      // Extract repository name from GitHub URL
      const repoName = repoUrl.split("/").pop()?.replace(".git", "") || "my-project";
      setProjectName(repoName);
      setIsAnalyzing(false);
      setStep(3);
    }, 2000);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      toast({
        title: "Deployment started!",
        description: "Your project is being deployed. You'll be redirected shortly.",
      });
      navigate("/projects/1");
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-colors",
                  step >= s
                    ? "gradient-hero text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-16 h-0.5 ml-4",
                    step > s ? "bg-primary" : "bg-secondary"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Choose Import Method */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Deploy a New Project</h1>
              <p className="text-muted-foreground">
                Choose how you want to import your project
              </p>
            </div>

            <div className="grid gap-4">
              {importOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className="p-6 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:gradient-hero transition-all">
                        <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Configure Import */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                {selectedOption === "github" && "Connect GitHub Repository"}
                {selectedOption === "upload" && "Upload Your Project"}
                {selectedOption === "template" && "Choose a Template"}
              </h1>
              <p className="text-muted-foreground">
                {selectedOption === "github" && "Enter your repository URL or search for it"}
                {selectedOption === "upload" && "Drag and drop your project folder or ZIP file"}
                {selectedOption === "template" && "Start with a pre-configured project template"}
              </p>
            </div>

            {selectedOption === "github" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Repository URL</Label>
                  <Input
                    placeholder="https://github.com/username/repository"
                    value={repoUrl}
                    onChange={(e) => {
                      const url = e.target.value;
                      setRepoUrl(url);
                      // Auto-extract repository name as user types
                      if (url) {
                        const repoName = url.split("/").pop()?.replace(".git", "") || "";
                        if (repoName) {
                          setProjectName(repoName);
                        }
                      }
                    }}
                  />
                </div>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleAnalyze}
                  disabled={!repoUrl || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {selectedOption === "upload" && (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <FolderArchive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-medium mb-1">Drop your files here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (ZIP, folder)
                  </p>
                </div>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleAnalyze}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & Continue
                </Button>
              </div>
            )}

            {selectedOption === "template" && (
              <div className="grid md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setDetectedFramework(template.framework.toLowerCase());
                      setProjectName(template.id);
                      setStep(3);
                    }}
                    className="p-4 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all text-left"
                  >
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.framework}</p>
                  </button>
                ))}
              </div>
            )}

            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        )}

        {/* Step 3: Configure & Deploy */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Configure & Deploy</h1>
              <p className="text-muted-foreground">
                Review your project settings and deploy
              </p>
            </div>

            {/* Detected Framework */}
            <div className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Detected Framework</p>
                  <p className="font-semibold text-lg capitalize">{detectedFramework}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We've automatically detected your project configuration.
              </p>
            </div>

            {/* Project Name */}
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {projectName}.oneship.app
              </p>
            </div>

            {/* Framework Selection (override) */}
            <div className="space-y-2">
              <Label>Framework (change if incorrect)</Label>
              <div className="grid grid-cols-4 gap-2">
                {frameworks.map((fw) => (
                  <button
                    key={fw.id}
                    onClick={() => setDetectedFramework(fw.id)}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-all",
                      detectedFramework === fw.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/50"
                    )}
                  >
                    <span className="text-xl">{fw.icon}</span>
                    <p className="text-xs mt-1">{fw.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                onClick={handleDeploy}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    Deploy Project
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
