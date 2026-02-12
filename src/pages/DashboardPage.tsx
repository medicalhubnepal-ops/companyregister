import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockApplications, mockCompanies, mockEventTypes, mockUsers, mockAuditLogs } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  FileText, ClipboardCheck, Building2, Users, TrendingUp, Clock,
  CheckCircle2, AlertCircle, ArrowRight, BarChart3
} from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  submitted: "bg-info/10 text-info",
  under_verification: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  returned: "bg-warning/10 text-warning",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`status-badge ${statusColors[status] || "bg-muted text-muted-foreground"}`}>
    {status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
  </span>
);

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const company = mockCompanies.find((c) => c.id === user?.companyId);
  const myApps = mockApplications.filter((a) => a.submittedBy === user?.id);

  const stats = [
    { label: "Total Applications", value: myApps.length, icon: FileText, color: "text-primary" },
    { label: "Pending", value: myApps.filter((a) => ["submitted", "under_verification"].includes(a.status)).length, icon: Clock, color: "text-warning" },
    { label: "Approved", value: myApps.filter((a) => a.status === "approved").length, icon: CheckCircle2, color: "text-success" },
    { label: "Returned", value: myApps.filter((a) => a.status === "returned").length, icon: AlertCircle, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">{company?.nameEn} • {company?.registrationNumber}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <s.icon className={`w-8 h-8 ${s.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Applications</CardTitle>
            <Link to="/applications" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myApps.slice(0, 5).map((app) => (
                <Link key={app.id} to={`/applications/${app.id}`} className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.eventName}</p>
                    <p className="text-xs text-muted-foreground">{app.applicationNumber} • {app.submissionDate}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </Link>
              ))}
              {myApps.length === 0 && <p className="text-sm text-muted-foreground py-4 text-center">No applications yet</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/events/new" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <FileText className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Submit Event</span>
              </Link>
              <Link to="/company" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <Building2 className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Company Profile</span>
              </Link>
              <Link to="/applications" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <ClipboardCheck className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Track Status</span>
              </Link>
              <Link to="/applications" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <BarChart3 className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Documents</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StaffDashboard: React.FC = () => {
  const pendingApps = mockApplications.filter((a) => ["submitted", "under_verification"].includes(a.status));
  const recentApproved = mockApplications.filter((a) => a.status === "approved");

  const stats = [
    { label: "Pending Reviews", value: pendingApps.length, icon: Clock, color: "text-warning" },
    { label: "Approved Today", value: recentApproved.length, icon: CheckCircle2, color: "text-success" },
    { label: "Total Companies", value: mockCompanies.length, icon: Building2, color: "text-primary" },
    { label: "Event Types", value: mockEventTypes.length, icon: FileText, color: "text-info" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Staff Dashboard</h1>
        <p className="text-muted-foreground">Verification & review overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <s.icon className={`w-8 h-8 ${s.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Pending Verification</CardTitle>
          <Link to="/reviews" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApps.map((app) => {
              const company = mockCompanies.find((c) => c.id === app.companyId);
              return (
                <Link key={app.id} to={`/applications/${app.id}`} className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.eventName}</p>
                    <p className="text-xs text-muted-foreground">{company?.nameEn} • {app.applicationNumber}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: "Total Companies", value: mockCompanies.length, icon: Building2, color: "text-primary" },
    { label: "Applications", value: mockApplications.length, icon: FileText, color: "text-info" },
    { label: "Event Types", value: mockEventTypes.length, icon: ClipboardCheck, color: "text-warning" },
    { label: "Users", value: mockUsers.length, icon: Users, color: "text-success" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview & configuration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <s.icon className={`w-8 h-8 ${s.color} opacity-70`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAuditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.userName} • {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Quick Links</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/events" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <FileText className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Event Types</span>
              </Link>
              <Link to="/admin/templates" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <ClipboardCheck className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Templates</span>
              </Link>
              <Link to="/admin/users" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Users</span>
              </Link>
              <Link to="/admin/audit" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">Audit Logs</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  if (user?.role === "admin") return <AdminDashboard />;
  if (user?.role === "staff") return <StaffDashboard />;
  return <UserDashboard />;
};

export default DashboardPage;
