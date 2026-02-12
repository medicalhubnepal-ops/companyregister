import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockEventTypes } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, ArrowLeft, ArrowRight, Check } from "lucide-react";

const EventSubmissionPage: React.FC = () => {
  const [step, setStep] = useState<"select" | "form" | "docs" | "review">("select");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const selectedEvent = mockEventTypes.find((e) => e.id === selectedEventId);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const appNum = `APP-2081-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
    toast({
      title: "Application Submitted!",
      description: `Application ${appNum} has been submitted for verification.`,
    });
    navigate("/applications");
  };

  const categories = [...new Set(mockEventTypes.map((e) => e.category))];

  if (step === "select") {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Submit New Event</h1>
          <p className="text-muted-foreground">Select the event type to begin your application</p>
        </div>

        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {cat.replace(/\b\w/g, (c) => c.toUpperCase())} Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {mockEventTypes.filter((e) => e.category === cat && e.status === "active").map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => { setSelectedEventId(evt.id); setStep("form"); }}
                  className={`text-left p-4 rounded-lg border transition-all hover:border-primary hover:shadow-sm ${
                    selectedEventId === evt.id ? "border-primary bg-primary/5" : "bg-card"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{evt.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{evt.nameNp}</p>
                      <p className="text-xs text-muted-foreground mt-1">{evt.requiredDocs.length} documents required</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (step === "form" && selectedEvent) {
    return (
      <div className="max-w-2xl space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setStep("select")}><ArrowLeft className="w-4 h-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedEvent.name}</h1>
            <p className="text-muted-foreground">{selectedEvent.nameNp}</p>
          </div>
        </div>

        <StepIndicator current={1} />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Event Details</CardTitle>
            <CardDescription>Fill in the required information for this event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedEvent.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                  {field.label} {field.mandatory && <span className="text-destructive">*</span>}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : field.type === "select" && field.options ? (
                  <Select value={formData[field.name] || ""} onValueChange={(v) => handleFieldChange(field.name, v)}>
                    <SelectTrigger><SelectValue placeholder={`Select ${field.label.toLowerCase()}`} /></SelectTrigger>
                    <SelectContent>
                      {field.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep("docs")}>
                Next: Upload Documents <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "docs" && selectedEvent) {
    return (
      <div className="max-w-2xl space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setStep("form")}><ArrowLeft className="w-4 h-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Upload Documents</h1>
            <p className="text-muted-foreground">{selectedEvent.name}</p>
          </div>
        </div>

        <StepIndicator current={2} />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Required Documents</CardTitle>
            <CardDescription>Upload all mandatory documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedEvent.requiredDocs.map((doc) => (
              <div key={doc} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc}</p>
                    <p className="text-xs text-muted-foreground">Required</p>
                  </div>
                </div>
                {uploadedDocs[doc] ? (
                  <Badge variant="default" className="bg-success">
                    <Check className="w-3 h-3 mr-1" /> Uploaded
                  </Badge>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setUploadedDocs((prev) => ({ ...prev, [doc]: true }))}
                  >
                    <Upload className="w-3 h-3 mr-1" /> Upload
                  </Button>
                )}
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep("form")}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={() => setStep("review")}>
                Review & Submit <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "review" && selectedEvent) {
    return (
      <div className="max-w-2xl space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setStep("docs")}><ArrowLeft className="w-4 h-4" /></Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Review & Submit</h1>
            <p className="text-muted-foreground">{selectedEvent.name}</p>
          </div>
        </div>

        <StepIndicator current={3} />

        <Card>
          <CardHeader><CardTitle className="text-base">Form Data</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedEvent.fields.map((f) => (
                <div key={f.name} className="flex justify-between py-2 border-b last:border-0">
                  <span className="text-sm text-muted-foreground">{f.label}</span>
                  <span className="text-sm font-medium text-foreground">{formData[f.name] || "—"}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Uploaded Documents</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedEvent.requiredDocs.map((doc) => (
                <div key={doc} className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground">{doc}</span>
                  {uploadedDocs[doc] ? (
                    <Badge variant="default" className="bg-success"><Check className="w-3 h-3 mr-1" /> Ready</Badge>
                  ) : (
                    <Badge variant="destructive">Missing</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep("docs")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={handleSubmit}>
            <Check className="w-4 h-4 mr-2" /> Submit Application
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

const StepIndicator: React.FC<{ current: number }> = ({ current }) => {
  const steps = ["Event Details", "Documents", "Review"];
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div className={`flex items-center gap-2 ${i + 1 <= current ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              i + 1 < current ? "bg-primary text-primary-foreground" :
              i + 1 === current ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            }`}>
              {i + 1 < current ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            <span className="text-xs font-medium hidden sm:inline">{label}</span>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i + 1 < current ? "bg-primary" : "bg-border"}`} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EventSubmissionPage;
