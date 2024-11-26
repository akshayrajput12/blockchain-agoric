import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

interface Credential {
  id: string;
  issuer: string;
  holder: string;
  type: string;
  data: any;
  signature: string;
  timestamp: number;
  chainId: number;
}

export const AgoricCredentialSystem: React.FC = () => {
  const { address } = useAccount();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [newCredential, setNewCredential] = useState({
    type: '',
    data: '',
  });

  const createCredential = async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      
      const credential: Credential = {
        id: ethers.randomBytes(32).toString('hex'),
        issuer: address || '',
        holder: address || '',
        type: newCredential.type,
        data: newCredential.data,
        timestamp: Date.now(),
        chainId: Number(network.chainId),
        signature: ''
      };

      // Create message hash for cross-chain compatibility
      const message = ethers.solidityPackedKeccak256(
        ['string', 'address', 'address', 'string', 'string', 'uint256', 'uint256'],
        [
          credential.id,
          credential.issuer,
          credential.holder,
          credential.type,
          JSON.stringify(credential.data),
          credential.timestamp,
          credential.chainId
        ]
      );

      // Sign the message
      const signature = await signer.signMessage(ethers.getBytes(message));
      credential.signature = signature;

      setCredentials([...credentials, credential]);
      toast.success('Credential created successfully');
      setNewCredential({ type: '', data: '' });

    } catch (error) {
      console.error('Error creating credential:', error);
      toast.error('Failed to create credential');
    }
  };

  const verifyCredential = async (credential: Credential) => {
    try {
      const message = ethers.solidityPackedKeccak256(
        ['string', 'address', 'address', 'string', 'string', 'uint256', 'uint256'],
        [
          credential.id,
          credential.issuer,
          credential.holder,
          credential.type,
          JSON.stringify(credential.data),
          credential.timestamp,
          credential.chainId
        ]
      );

      const recoveredAddress = ethers.verifyMessage(ethers.getBytes(message), credential.signature);
      
      if (recoveredAddress.toLowerCase() === credential.issuer.toLowerCase()) {
        toast.success('Credential verified successfully');
        return true;
      } else {
        toast.error('Invalid credential signature');
        return false;
      }
    } catch (error) {
      console.error('Error verifying credential:', error);
      toast.error('Failed to verify credential');
      return false;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-neon-blue/20">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Create New Credential</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Credential Type"
            value={newCredential.type}
            onChange={(e) => setNewCredential({ ...newCredential, type: e.target.value })}
            className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white"
          />
          <textarea
            placeholder="Credential Data"
            value={newCredential.data}
            onChange={(e) => setNewCredential({ ...newCredential, data: e.target.value })}
            className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white h-24"
          />
          <button
            onClick={createCredential}
            className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg 
                     hover:shadow-neon-glow transition-all duration-300"
          >
            Create Credential
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Credentials</h2>
        <div className="space-y-4">
          {credentials.map((cred) => (
            <div key={cred.id} className="p-4 bg-dark-700 rounded-lg border border-neon-blue/20">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-neon-blue font-semibold">{cred.type}</p>
                  <p className="text-gray-400 text-sm">ID: {cred.id.substring(0, 8)}...</p>
                  <p className="text-gray-400 text-sm">Issuer: {cred.issuer.substring(0, 8)}...</p>
                  <p className="text-gray-400 text-sm">Chain ID: {cred.chainId}</p>
                  <p className="text-gray-400 text-sm">Created: {new Date(cred.timestamp).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => verifyCredential(cred)}
                  className="px-4 py-2 bg-gradient-to-r from-neon-green to-neon-blue text-white rounded-lg 
                           hover:shadow-neon-glow transition-all duration-300"
                >
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
