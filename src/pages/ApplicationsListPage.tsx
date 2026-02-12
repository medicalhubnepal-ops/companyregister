import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockApplications, mockCompanies } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  submitted: "bg-info/10 text-info",
  under_verification: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  returned: "bg-warning/10 text-warning",
};

const ApplicationsListPage: React.FC = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const apps = user?.role === "user"
    ? mockApplications.filter((a) => a.submittedBy === user.id)
    : mockApplications;

  const filtered = apps.filter((a) => {
    const matchSearch = a.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
      a.eventName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {user?.role === "user" ? "My Applications" : "All Applications"}
        </h1>
        <p className="text-muted-foreground">Track and manage event submissions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by application number or event..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under_verification">Under Verification</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((app) => {
          const company = mockCompanies.find((c) => c.id === app.companyId);
          return (
            <Link key={app.id} to={`/applications/${app.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-foreground">{app.applicationNumber}</p>
                        <span className={`status-badge ${statusColors[app.status]}`}>
                          {app.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{app.eventName}</p>
                      <p className="text-xs text-muted-foreground">
                        {company?.nameEn} • Submitted: {app.submissionDate} • v{app.version}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{app.documents.length} docs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No applications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsListPage;
