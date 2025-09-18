import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react";
import Loader from "./Loader";

import { formatDateTime } from "@/hooks/DateAndTimeFormatter";

import { useGetCandidatesQuery } from "@/api/superAdminsApiSlice";
import { useNavigate } from "react-router-dom";

// Move the helper function outside and before the component
const getStatusBadge = (status) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const CandidatesTable = () => {
  const { data: candidates = [], isLoading } = useGetCandidatesQuery();

  console.log("Candidates data:", candidates.candidates);

  const navigate = useNavigate();

  // Handle candidate actions
  const handleViewCandidate = (candidateId) => {
    console.log("View candidate:", candidateId);
    navigate(`/admin/candidates/${candidateId}`);
  };

  const handleApproveCandidate = (candidateId) => {
    console.log("Approve candidate:", candidateId);
    // Implement approve functionality
  };

  const handleRejectCandidate = (candidateId) => {
    console.log("Reject candidate:", candidateId);
    // Implement reject functionality
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[200px]">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Candidate Management</CardTitle>
          </CardHeader>
          <CardContent>
            {candidates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No candidates found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates?.candidates?.map((candidate) => (
                    <TableRow key={candidate.id || candidate._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {candidate.name ||
                              `${candidate.firstName} ${candidate.lastName}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {candidate.studentId || candidate.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.position || "N/A"}</TableCell>
                      <TableCell>
                        {candidate.faculty || candidate.department || "N/A"}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(candidate.approvalStatus)}
                      </TableCell>
                      <TableCell>
                        {(candidate.votes || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {formatDateTime(candidate.createdAt) || "N/A"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleViewCandidate(
                                  candidate.id || candidate._id
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {candidate.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleApproveCandidate(
                                      candidate.id || candidate._id
                                    )
                                  }
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleRejectCandidate(
                                      candidate.id || candidate._id
                                    )
                                  }
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CandidatesTable;
