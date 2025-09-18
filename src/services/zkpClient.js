import snarkjs from "snarkjs";

class ZKPClient {
  constructor() {
    this.wasmCache = new Map();
    this.zkeyCache = new Map();
  }

  // Initialize ZKP system
  async initialize() {
    try {
      console.log("🔐 Initializing ZKP client...");

      // Load circuit files
      await this.loadCircuit("vote");

      console.log("✅ ZKP client initialized");
    } catch (error) {
      console.error("❌ ZKP initialization failed:", error);
      throw error;
    }
  }

  // Load circuit files
  async loadCircuit(circuitName) {
    try {
      const wasmResponse = await fetch(
        `/circuits/${circuitName}/${circuitName}.wasm`
      );
      const wasmBuffer = await wasmResponse.arrayBuffer();
      this.wasmCache.set(circuitName, wasmBuffer);

      const zkeyResponse = await fetch(
        `/circuits/${circuitName}/${circuitName}_final.zkey`
      );
      const zkeyBuffer = await zkeyResponse.arrayBuffer();
      this.zkeyCache.set(circuitName, zkeyBuffer);

      console.log(`✅ Loaded ${circuitName} circuit`);
    } catch (error) {
      console.error(`❌ Failed to load ${circuitName} circuit:`, error);
      throw error;
    }
  }

  // Generate vote proof on client side
  async generateVoteProof(voterId, candidateId, electionId) {
    try {
      console.log("🔐 Generating ZKP proof on client...");

      // Generate salt
      const salt = this.generateSalt();

      // Calculate public inputs
      const nullifierHash = await this.calculateNullifierHash(
        voterId,
        electionId
      );
      const commitmentHash = await this.calculateCommitmentHash(
        voterId,
        candidateId,
        electionId,
        salt
      );
      const electionRoot = await this.getElectionRoot(electionId);

      // Prepare circuit inputs
      const input = {
        voterId: voterId.toString(),
        candidateId: candidateId.toString(),
        electionId: electionId.toString(),
        salt: salt.toString(),
        nullifierHash: nullifierHash.toString(),
        commitmentHash: commitmentHash.toString(),
        electionRoot: electionRoot.toString(),
      };

      // Generate proof
      const wasm = this.wasmCache.get("vote");
      const zkey = this.zkeyCache.get("vote");

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        new Uint8Array(wasm),
        new Uint8Array(zkey)
      );

      console.log("✅ ZKP proof generated successfully");

      return {
        proof,
        publicSignals,
        nullifierHash: nullifierHash.toString(),
        commitmentHash: commitmentHash.toString(),
      };
    } catch (error) {
      console.error("❌ ZKP proof generation failed:", error);
      throw error;
    }
  }

  // Verify proof on client side
  async verifyProof(proof, publicSignals) {
    try {
      const vkeyResponse = await fetch(
        "/circuits/vote/vote_verification_key.json"
      );
      const vkey = await vkeyResponse.json();

      const isValid = await snarkjs.groth16.verify(vkey, publicSignals, proof);

      return {
        valid: isValid,
        publicSignals,
      };
    } catch (error) {
      console.error("❌ Proof verification failed:", error);
      return { valid: false, error: error.message };
    }
  }

  // Calculate nullifier hash
  async calculateNullifierHash(voterId, electionId) {
    // Use circomlib poseidon hash
    const { poseidon } = await import("circomlib");
    return poseidon([BigInt(voterId), BigInt(electionId)]);
  }

  // Calculate commitment hash
  async calculateCommitmentHash(voterId, candidateId, electionId, salt) {
    const { poseidon } = await import("circomlib");
    return poseidon([
      BigInt(voterId),
      BigInt(candidateId),
      BigInt(electionId),
      BigInt(salt),
    ]);
  }

  // Get election root (placeholder)
  async getElectionRoot(electionId) {
    // In production, this should fetch from your API
    return BigInt(
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    );
  }

  // Generate random salt
  generateSalt() {
    const array = new Uint32Array(4);
    crypto.getRandomValues(array);
    return BigInt(
      "0x" + Array.from(array, (x) => x.toString(16).padStart(8, "0")).join("")
    );
  }
}

export default new ZKPClient();
