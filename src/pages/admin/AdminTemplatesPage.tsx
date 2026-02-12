import React, { useState } from "react";
import { mockTemplates, mockEventTypes } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminTemplatesPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Templates</h1>
          <p className="text-muted-foreground">Manage templates and placeholder mappings</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Template</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Template</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Template Code</Label><Input placeholder="TPL-XXXX" /></div>
              <div className="space-y-2"><Label>Template Name</Label><Input placeholder="Template name" /></div>
              <div className="space-y-2"><Label>Language</Label><Input placeholder="English / Nepali" /></div>
              <div className="space-y-2"><Label>Format</Label><Input placeholder="PDF / DOCX" /></div>
              <Button onClick={() => { toast({ title: "Template Saved" }); setDialogOpen(false); }} className="w-full">
                Save Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTemplates.map((tpl) => {
                const evt = mockEventTypes.find((e) => e.id === tpl.eventTypeId);
                return (
                  <TableRow key={tpl.id}>
                    <TableCell className="font-mono text-xs">{tpl.code}</TableCell>
                    <TableCell className="font-medium">{tpl.name}</TableCell>
                    <TableCell>{evt?.name || "—"}</TableCell>
                    <TableCell>{tpl.language}</TableCell>
                    <TableCell><Badge variant="secondary">{tpl.format}</Badge></TableCell>
                    <TableCell>v{tpl.version}</TableCell>
                    <TableCell>
                      <Badge variant={tpl.status === "active" ? "default" : "secondary"}>{tpl.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm"><Eye className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="w-3 h-3" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTemplatesPage;
