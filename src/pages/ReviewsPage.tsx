import React from "react";
import { mockApplications, mockCompanies } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ClipboardCheck, ArrowRight } from "lucide-react";

const ReviewsPage: React.FC = () => {
  const pendingApps = mockApplications.filter((a) =>
    ["submitted", "under_verification"].includes(a.status)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pending Reviews</h1>
        <p className="text-muted-foreground">{pendingApps.length} applications awaiting verification</p>
      </div>

      <div className="space-y-3">
        {pendingApps.map((app) => {
          const company = mockCompanies.find((c) => c.id === app.companyId);
          return (
            <Link key={app.id} to={`/applications/${app.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ClipboardCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{app.applicationNumber}</p>
                        <p className="text-sm text-foreground">{app.eventName}</p>
                        <p className="text-xs text-muted-foreground">{company?.nameEn} • {app.submissionDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={app.status === "submitted" ? "default" : "secondary"}>
                        {app.status === "submitted" ? "New" : "In Review"}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}

        {pendingApps.length === 0 && (
          <div className="text-center py-12">
            <ClipboardCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No pending reviews</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
