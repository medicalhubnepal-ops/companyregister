import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockCompanies } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Phone, Mail, Landmark, Users, GitBranch } from "lucide-react";

const CompanyProfilePage: React.FC = () => {
  const { user } = useAuth();
  const company = mockCompanies.find((c) => c.id === user?.companyId) || mockCompanies[0];

  if (!company) return <p className="text-muted-foreground">No company found</p>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{company.nameEn}</h1>
          <p className="text-muted-foreground">{company.nameNp} • {company.registrationNumber}</p>
        </div>
        <Badge variant={company.status === "Active" ? "default" : "destructive"}>{company.status}</Badge>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="capital">Capital</TabsTrigger>
          <TabsTrigger value="directors">Directors</TabsTrigger>
          <TabsTrigger value="shareholders">Shareholders</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow icon={Building2} label="Company Type" value={company.type} />
                <InfoRow icon={Building2} label="Industry" value={company.industry} />
                <InfoRow icon={Building2} label="PAN" value={company.pan || "—"} />
                <InfoRow icon={Building2} label="Registration Date" value={company.registrationDate} />
                <InfoRow icon={Building2} label="Fiscal Year" value={company.fiscalYear} />
                <InfoRow icon={MapPin} label="Address" value={`${company.address.tole}, Ward ${company.address.ward}, ${company.address.municipality}, ${company.address.district}`} />
                <InfoRow icon={Phone} label="Contact" value={company.contact} />
                <InfoRow icon={Mail} label="Email" value={company.email} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capital" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Landmark className="w-4 h-4" /> Capital Structure</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Authorized Capital" value={`NPR ${company.capital.authorized.toLocaleString()}`} />
                <StatCard label="Issued Capital" value={`NPR ${company.capital.issued.toLocaleString()}`} />
                <StatCard label="Paid-Up Capital" value={`NPR ${company.capital.paidUp.toLocaleString()}`} />
                <StatCard label="Face Value / Share" value={`NPR ${company.capital.faceValue}`} />
                <StatCard label="Total Shares" value={company.capital.totalShares.toLocaleString()} />
                <StatCard label="Currency" value={company.capital.currency} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="directors" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="w-4 h-4" /> Directors</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Citizenship No.</TableHead>
                    <TableHead>Appointed</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {company.directors.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.name}</TableCell>
                      <TableCell>{d.designation}</TableCell>
                      <TableCell>{d.citizenshipNo}</TableCell>
                      <TableCell>{d.appointmentDate}</TableCell>
                      <TableCell><Badge variant={d.status === "Active" ? "default" : "secondary"}>{d.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shareholders" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Shareholders</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Amount (NPR)</TableHead>
                    <TableHead>%</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {company.shareholders.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.shareType}</TableCell>
                      <TableCell>{s.shareQty.toLocaleString()}</TableCell>
                      <TableCell>{s.shareAmount.toLocaleString()}</TableCell>
                      <TableCell>{s.sharePercentage}%</TableCell>
                      <TableCell><Badge variant={s.status === "Active" ? "default" : "secondary"}>{s.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches" className="mt-4">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><GitBranch className="w-4 h-4" /> Branches</CardTitle></CardHeader>
            <CardContent>
              {company.branches.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No branches registered</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Branch Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Established</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {company.branches.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell>{b.address}</TableCell>
                        <TableCell>{b.establishedDate}</TableCell>
                        <TableCell><Badge variant={b.status === "Active" ? "default" : "secondary"}>{b.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InfoRow: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="w-4 h-4 text-muted-foreground mt-0.5" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-4 rounded-lg bg-muted">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-lg font-bold text-foreground mt-1">{value}</p>
  </div>
);

export default CompanyProfilePage;
