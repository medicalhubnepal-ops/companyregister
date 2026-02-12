import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockApplications, mockCompanies, mockEventTypes } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, CheckCircle2, XCircle, RotateCcw, FileText, Clock, User, MessageSquare
} from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  submitted: "bg-info/10 text-info",
  under_verification: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  returned: "bg-warning/10 text-warning",
};

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [remarks, setRemarks] = useState("");

  const app = mockApplications.find((a) => a.id === id);
  if (!app) return <p className="text-muted-foreground">Application not found</p>;

  const company = mockCompanies.find((c) => c.id === app.companyId);
  const eventType = mockEventTypes.find((e) => e.id === app.eventTypeId);

  const handleAction = (action: string) => {
    toast({
      title: `Application ${action}`,
      description: `${app.applicationNumber} has been ${action.toLowerCase()}.`,
    });
    navigate(-1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{app.applicationNumber}</h1>
            <span className={`status-badge ${statusColors[app.status]}`}>
              {app.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>
          <p className="text-muted-foreground">{app.eventName} • {company?.nameEn}</p>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents ({app.documents.length})</TabsTrigger>
          <TabsTrigger value="history">History ({app.history.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Application Information</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailRow label="Application Number" value={app.applicationNumber} />
                <DetailRow label="Event Type" value={app.eventName} />
                <DetailRow label="Company" value={company?.nameEn || ""} />
                <DetailRow label="Submission Date" value={app.submissionDate} />
                <DetailRow label="Version" value={String(app.version)} />
                <DetailRow label="Remarks" value={app.remarks || "—"} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Event Data</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventType?.fields.map((field) => (
                  <div key={field.name} className="flex justify-between py-2 border-b last:border-0">
                    <span className="text-sm text-muted-foreground">{field.label}</span>
                    <span className="text-sm font-medium text-foreground">
                      {app.formData[field.name] !== undefined
                        ? typeof app.formData[field.name] === "number"
                          ? Number(app.formData[field.name]).toLocaleString()
                          : String(app.formData[field.name])
                        : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {user?.role === "staff" && ["submitted", "under_verification"].includes(app.status) && (
            <Card>
              <CardHeader><CardTitle className="text-base">Verification Action</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add your verification remarks..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button onClick={() => handleAction("Approved")} className="bg-success hover:bg-success/90">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                  </Button>
                  <Button variant="outline" onClick={() => handleAction("Returned")} className="text-warning border-warning hover:bg-warning/10">
                    <RotateCcw className="w-4 h-4 mr-2" /> Return
                  </Button>
                  <Button variant="destructive" onClick={() => handleAction("Rejected")}>
                    <XCircle className="w-4 h-4 mr-2" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {app.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} • Uploaded: {doc.uploadDate}</p>
                      </div>
                    </div>
                    <Badge variant={doc.status === "verified" ? "default" : doc.status === "rejected" ? "destructive" : "secondary"}>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
                {app.documents.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No documents uploaded</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6">
                  {app.history.map((h, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-primary border-2 border-card" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{h.action}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                          <User className="w-3 h-3" /> {h.by}
                          <Clock className="w-3 h-3 ml-2" /> {h.date}
                        </p>
                        {h.remarks && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> {h.remarks}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

export default ApplicationDetailPage;
