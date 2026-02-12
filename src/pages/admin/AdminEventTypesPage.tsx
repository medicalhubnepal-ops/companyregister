import React, { useState } from "react";
import { mockEventTypes } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminEventTypesPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Event Type Saved", description: "Event type configuration has been updated." });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Types</h1>
          <p className="text-muted-foreground">Configure event types and their dynamic fields</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Event Type</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Event Type</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Event Code</Label>
                <Input placeholder="e.g., ANNUAL_RETURN" />
              </div>
              <div className="space-y-2">
                <Label>Event Name (English)</Label>
                <Input placeholder="Annual Return Filing" />
              </div>
              <div className="space-y-2">
                <Label>Event Name (Nepali)</Label>
                <Input placeholder="वार्षिक विवरण" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="annual, capital, director, structural" />
              </div>
              <Button onClick={handleSave} className="w-full">Save Event Type</Button>
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
                <TableHead>Name (NP)</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Fields</TableHead>
                <TableHead>Docs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEventTypes.map((evt) => (
                <TableRow key={evt.id}>
                  <TableCell className="font-mono text-xs">{evt.code}</TableCell>
                  <TableCell className="font-medium">{evt.name}</TableCell>
                  <TableCell className="text-xs">{evt.nameNp}</TableCell>
                  <TableCell className="capitalize">{evt.category}</TableCell>
                  <TableCell>{evt.fields.length}</TableCell>
                  <TableCell>{evt.requiredDocs.length}</TableCell>
                  <TableCell>
                    <Badge variant={evt.status === "active" ? "default" : "secondary"}>{evt.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm"><Edit className="w-3 h-3" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEventTypesPage;
