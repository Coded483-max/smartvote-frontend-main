import React, { useState, useEffect } from "react";
import { useZKPVoting } from "../hooks/useZKPVoting";
import zkpClient from "../services/zkpClient";

const ZKPVotingInterface = ({ election, candidates, user, onVoteSuccess }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [zkpInitialized, setZkpInitialized] = useState(false);
  const { castZKPVote, isGeneratingProof, isSubmittingVote, proofData } =
    useZKPVoting();

  // Initialize ZKP client
  useEffect(() => {
    const initZKP = async () => {
      try {
        await zkpClient.initialize();
        setZkpInitialized(true);
      } catch (error) {
        console.error("ZKP initialization failed:", error);
      }
    };

    initZKP();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate || !zkpInitialized) return;

    try {
      const result = await castZKPVote(
        selectedCandidate._id,
        election._id,
        user.id
      );

      onVoteSuccess(result);
    } catch (error) {
      console.error("Voting failed:", error);
    }
  };

  if (!zkpInitialized) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Initializing Zero-Knowledge Proof system...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🔐 Secure Zero-Knowledge Voting
          </h2>
          <p className="text-gray-600">
            Your vote is completely private and verifiable using cryptographic
            proofs.
          </p>
        </div>

        {/* ZKP Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Zero-Knowledge Proof System Active
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your vote choice remains completely private</li>
                  <li>Double voting is cryptographically prevented</li>
                  <li>Vote integrity is mathematically verifiable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Selection */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Select Candidate
          </h3>
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedCandidate?._id === candidate._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={selectedCandidate?._id === candidate._id}
                  onChange={() => setSelectedCandidate(candidate)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {candidate.firstName} {candidate.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {candidate.position?.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vote Button */}
        <div className="flex justify-center">
          <button
            onClick={handleVote}
            disabled={
              !selectedCandidate || isGeneratingProof || isSubmittingVote
            }
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              !selectedCandidate || isGeneratingProof || isSubmittingVote
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isGeneratingProof && (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Proof...
              </span>
            )}
            {isSubmittingVote && !isGeneratingProof && (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting Vote...
              </span>
            )}
            {!isGeneratingProof && !isSubmittingVote && (
              <span className="flex items-center">🔐 Cast Secure Vote</span>
            )}
          </button>
        </div>

        {/* Proof Data Display (for debugging) */}
        {proofData && import.meta.env.DEV && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Generated Proof (Debug)
            </h4>
            <pre className="text-xs text-gray-600 overflow-x-auto">
              {JSON.stringify(proofData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZKPVotingInterface;
