// hooks/useZKPVoting.js
import { useState, useCallback } from "react";
import zkpClient from "../services/zkpClient";
import apiClient from "../services/apiClient";

export const useZKPVoting = () => {
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const [proofData, setProofData] = useState(null);

  // Cast vote with ZKP
  const castZKPVote = useCallback(async (candidateId, electionId, voterId) => {
    try {
      setIsGeneratingProof(true);

      // Generate proof on client side
      console.log("🔐 Generating zero-knowledge proof...");
      const proof = await zkpClient.generateVoteProof(
        voterId,
        candidateId,
        electionId
      );

      setProofData(proof);
      setIsGeneratingProof(false);
      setIsSubmittingVote(true);

      // Submit vote with proof to backend
      console.log("📤 Submitting vote with proof...");
      const response = await apiClient.post("/votes/zkp/cast", {
        candidateId,
        electionId,
        proof: proof.proof,
        publicSignals: proof.publicSignals,
      });

      setIsSubmittingVote(false);

      if (response.data.success) {
        console.log("✅ ZKP vote cast successfully");
        return {
          success: true,
          voteId: response.data.voteId,
          zkpProof: response.data.zkpProof,
        };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setIsGeneratingProof(false);
      setIsSubmittingVote(false);
      console.error("❌ ZKP voting failed:", error);
      throw error;
    }
  }, []);

  // Verify proof
  const verifyProof = useCallback(async (proof, publicSignals) => {
    try {
      const verification = await zkpClient.verifyProof(proof, publicSignals);
      return verification;
    } catch (error) {
      console.error("❌ Proof verification failed:", error);
      return { valid: false, error: error.message };
    }
  }, []);

  return {
    castZKPVote,
    verifyProof,
    isGeneratingProof,
    isSubmittingVote,
    proofData,
    isLoading: isGeneratingProof || isSubmittingVote,
  };
};
