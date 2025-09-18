import { useGetActiveElectionsQuery } from "@/api/electionApi";
import { Link } from "react-router-dom";

const CandidateRegistrationBanner = () => {
  const { data: elections = [] } = useGetActiveElectionsQuery();
  const hasOpenRegistration = elections.some(
    (election) => election.status === "candidate_registration"
  );

  if (!hasOpenRegistration) return null;

  console.log(elections);
  if (elections.length === 0) {
    return (
      <div className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>No active elections found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">
          🗳️ Candidate Registration Open!
        </h2>
        <p className="text-lg mb-4">
          Ready to lead? Register as a candidate for student government
          positions.
        </p>
        <div className="space-x-4">
          <Link
            to="/candidate-registration"
            className="bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Learn More & Register
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
          >
            New Voter? Register First
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CandidateRegistrationBanner;
