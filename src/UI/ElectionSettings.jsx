import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Settings, Bell, Shield } from "lucide-react";
import { de } from "date-fns/locale";

const ElectionSettings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Election Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationStart">Registration Start</Label>
              <Input
                id="registrationStart"
                type="datetime-local"
                defaultValue="2024-01-10T09:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationEnd">Registration End</Label>
              <Input
                id="registrationEnd"
                type="datetime-local"
                defaultValue="2024-01-20T23:59"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaignStart">Campaign Start</Label>
              <Input
                id="campaignStart"
                type="datetime-local"
                defaultValue="2024-01-22T00:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaignEnd">Campaign End</Label>
              <Input
                id="campaignEnd"
                type="datetime-local"
                defaultValue="2024-02-05T23:59"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="votingStart">Voting Start</Label>
              <Input
                id="votingStart"
                type="datetime-local"
                defaultValue="2024-02-06T08:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="votingEnd">Voting End</Label>
              <Input
                id="votingEnd"
                type="datetime-local"
                defaultValue="2024-02-08T18:00"
              />
            </div>
          </div>
          <Button className="w-full">Update Timeline</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Candidate Registration</Label>
              <p className="text-sm text-gray-500">
                Enable new candidate applications
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Voting System Active</Label>
              <p className="text-sm text-gray-500">
                Enable voting functionality
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Real-time Results</Label>
              <p className="text-sm text-gray-500">Show live vote counts</p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minGPA">Minimum GPA Requirement</Label>
            <Input id="minGPA" type="number" step="0.1" defaultValue="2.5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxCampaignBudget">Max Campaign Budget</Label>
            <Select defaultValue="1000">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">$500</SelectItem>
                <SelectItem value="1000">$1,000</SelectItem>
                <SelectItem value="1500">$1,500</SelectItem>
                <SelectItem value="2000">$2,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="announcement">System Announcement</Label>
            <Textarea
              id="announcement"
              placeholder="Enter announcement for all users..."
              defaultValue="Voting is now open! Cast your vote by February 8th at 6 PM."
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">
                Send email updates to users
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-gray-500">Send SMS reminders</p>
            </div>
            <Switch />
          </div>
          <Button className="w-full">Send Announcement</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Audit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Recent Security Events</Label>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="text-sm">System backup completed</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="text-sm">
                  Multiple login attempts detected
                </span>
                <span className="text-xs text-gray-500">4 hours ago</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="text-sm">Database integrity check passed</span>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              Export Logs
            </Button>
            <Button variant="outline" size="sm">
              Run Security Scan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectionSettings;
