import { useLazyExportLogsQuery, useLazyGenerateReportQuery } from "@/api/securityLogsApi";
import { Button } from "@/components/ui/button";
import { Database, AlertTriangle } from "lucide-react";

function SecurityLogsHeader() {
  const [exportLogs] = useLazyExportLogsQuery();
  const [generateReport] = useLazyGenerateReportQuery();

  const handleExport = async () => {
    const result = await exportLogs();
    if (result.data) {
      const url = window.URL.createObjectURL(result.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "security-logs.csv";
      a.click();
    }
  };

  const handleReport = async () => {
    const result = await generateReport();
    if (result.data) {
      const url = window.URL.createObjectURL(result.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "security-report.pdf";
      a.click();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Security & Audit Logs</h2>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={handleExport}>
          <Database className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
        <Button variant="outline" onClick={handleReport}>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Security Report
        </Button>
      </div>
    </div>
  );
}

export default SecurityLogsHeader
