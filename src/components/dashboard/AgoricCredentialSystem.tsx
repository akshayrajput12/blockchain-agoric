import React, { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiCheck, FiClock } from 'react-icons/fi';

interface Credential {
  id: string;
  issuer: string;
  holder: string;
  type: string;
  title: string;
  description: string;
  data: any;
  image: string;
  expiryDate: string;
  issuanceDate: string;
  category: string;
  tags: string[];
  signature: string;
  timestamp: number;
  chainId: number;
  verificationStatus: 'unverified' | 'verified' | 'expired' | 'invalid';
  lastVerified?: number;
  verificationCount: number;
}

export const AgoricCredentialSystem: React.FC = () => {
  const { address } = useAccount();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [newCredential, setNewCredential] = useState({
    type: '',
    title: '',
    description: '',
    data: '',
    image: '',
    expiryDate: '',
    issuanceDate: new Date().toISOString().split('T')[0],
    category: '',
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setNewCredential(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const addTag = () => {
    if (newTag.trim() && !newCredential.tags.includes(newTag.trim())) {
      setNewCredential(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewCredential(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const createCredential = async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask');
        return;
      }

      if (!newCredential.title || !newCredential.type || !newCredential.expiryDate) {
        toast.error('Please fill in all required fields');
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
        title: newCredential.title,
        description: newCredential.description,
        data: newCredential.data,
        image: newCredential.image,
        expiryDate: newCredential.expiryDate,
        issuanceDate: newCredential.issuanceDate,
        category: newCredential.category,
        tags: newCredential.tags,
        timestamp: Date.now(),
        chainId: Number(network.chainId),
        signature: '',
        verificationStatus: 'unverified',
        verificationCount: 0
      };

      const message = ethers.solidityPackedKeccak256(
        ['string', 'address', 'address', 'string', 'string', 'string', 'string', 'string', 'uint256', 'uint256'],
        [
          credential.id,
          credential.issuer,
          credential.holder,
          credential.type,
          credential.title,
          credential.expiryDate,
          credential.issuanceDate,
          JSON.stringify(credential.data),
          credential.timestamp,
          credential.chainId
        ]
      );

      const signature = await signer.signMessage(ethers.getBytes(message));
      credential.signature = signature;

      setCredentials([...credentials, credential]);
      toast.success('Credential created successfully');
      
      // Reset form
      setNewCredential({
        type: '',
        title: '',
        description: '',
        data: '',
        image: '',
        expiryDate: '',
        issuanceDate: new Date().toISOString().split('T')[0],
        category: '',
        tags: [],
      });
      setPreviewImage(null);

    } catch (error) {
      console.error('Error creating credential:', error);
      toast.error('Failed to create credential');
    }
  };

  const verifyCredential = async (credential: Credential) => {
    try {
      const message = ethers.solidityPackedKeccak256(
        ['string', 'address', 'address', 'string', 'string', 'string', 'string', 'string', 'uint256', 'uint256'],
        [
          credential.id,
          credential.issuer,
          credential.holder,
          credential.type,
          credential.title,
          credential.expiryDate,
          credential.issuanceDate,
          JSON.stringify(credential.data),
          credential.timestamp,
          credential.chainId
        ]
      );

      const recoveredAddress = ethers.verifyMessage(ethers.getBytes(message), credential.signature);
      const isValidSignature = recoveredAddress.toLowerCase() === credential.issuer.toLowerCase();
      
      // Check expiry
      const isExpired = new Date(credential.expiryDate) < new Date();
      
      // Update verification status
      const updatedCredentials = credentials.map(cred => {
        if (cred.id === credential.id) {
          return {
            ...cred,
            verificationStatus: isExpired ? 'expired' : (isValidSignature ? 'verified' : 'invalid'),
            lastVerified: Date.now(),
            verificationCount: cred.verificationCount + 1
          };
        }
        return cred;
      });
      
      setCredentials(updatedCredentials);

      if (isExpired) {
        toast.error('Credential has expired');
        return false;
      }
      
      if (isValidSignature) {
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

  const getVerificationStatusColor = (status: Credential['verificationStatus']) => {
    switch (status) {
      case 'verified':
        return 'text-neon-green';
      case 'expired':
        return 'text-neon-red';
      case 'invalid':
        return 'text-neon-red';
      default:
        return 'text-gray-400';
    }
  };

  const getVerificationStatusIcon = (status: Credential['verificationStatus']) => {
    switch (status) {
      case 'verified':
        return <FiCheck className="w-4 h-4" />;
      case 'expired':
        return <FiClock className="w-4 h-4" />;
      case 'invalid':
        return <FiX className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-neon-blue/20">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Create New Credential</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Title *</label>
              <input
                type="text"
                placeholder="Credential Title"
                value={newCredential.title}
                onChange={(e) => setNewCredential({ ...newCredential, title: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Type *</label>
              <select
                value={newCredential.type}
                onChange={(e) => setNewCredential({ ...newCredential, type: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white"
              >
                <option value="">Select Type</option>
                <option value="academic">Academic</option>
                <option value="professional">Professional</option>
                <option value="certification">Certification</option>
                <option value="identity">Identity</option>
                <option value="membership">Membership</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Category</label>
              <input
                type="text"
                placeholder="Credential Category"
                value={newCredential.category}
                onChange={(e) => setNewCredential({ ...newCredential, category: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Description</label>
              <textarea
                placeholder="Credential Description"
                value={newCredential.description}
                onChange={(e) => setNewCredential({ ...newCredential, description: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white h-24"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Issuance Date *</label>
              <input
                type="date"
                value={newCredential.issuanceDate}
                onChange={(e) => setNewCredential({ ...newCredential, issuanceDate: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Expiry Date *</label>
              <input
                type="date"
                value={newCredential.expiryDate}
                onChange={(e) => setNewCredential({ ...newCredential, expiryDate: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Tags</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {newCredential.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-neon-blue/20 rounded-lg text-white flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-neon-pink hover:text-neon-red"
                    >
                      <FiX />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-4 py-2 bg-dark-700 border border-neon-blue/20 rounded-lg text-white"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-neon-blue/20 text-white rounded-lg hover:bg-neon-blue/30"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white mb-2">Image</label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-neon-blue/20 rounded-lg p-4 text-center cursor-pointer
                          ${isDragActive ? 'border-neon-blue bg-neon-blue/10' : ''}`}
              >
                <input {...getInputProps()} />
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-32 mx-auto rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(null);
                        setNewCredential(prev => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-1 right-1 p-1 bg-dark-800/80 rounded-full text-neon-pink hover:text-neon-red"
                    >
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <div className="text-white">
                    <FiUpload className="mx-auto text-2xl mb-2" />
                    <p>Drag & drop an image or click to select</p>
                    <p className="text-sm text-gray-400">(Max size: 5MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={createCredential}
          className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg 
                   hover:shadow-neon-glow transition-all duration-300 mt-4"
        >
          Create Credential
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Credentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {credentials.map((cred) => (
            <div key={cred.id} className="p-4 bg-dark-700 rounded-lg border border-neon-blue/20">
              <div className="flex flex-col gap-3">
                {cred.image && (
                  <img
                    src={cred.image}
                    alt={cred.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-neon-blue font-semibold text-lg">{cred.title}</h3>
                      <span className={`flex items-center gap-1 ${getVerificationStatusColor(cred.verificationStatus)}`}>
                        {getVerificationStatusIcon(cred.verificationStatus)}
                        <span className="text-sm capitalize">{cred.verificationStatus}</span>
                      </span>
                    </div>
                    <p className="text-white">{cred.type}</p>
                    <p className="text-gray-400 text-sm">ID: {cred.id.substring(0, 8)}...</p>
                    <p className="text-gray-400 text-sm">Issuer: {cred.issuer.substring(0, 8)}...</p>
                    <p className="text-gray-400 text-sm">Chain ID: {cred.chainId}</p>
                    <p className="text-gray-400 text-sm">
                      Valid: {new Date(cred.issuanceDate).toLocaleDateString()} - {new Date(cred.expiryDate).toLocaleDateString()}
                    </p>
                    {cred.lastVerified && (
                      <p className="text-gray-400 text-sm">
                        Last Verified: {new Date(cred.lastVerified).toLocaleString()}
                      </p>
                    )}
                    {cred.verificationCount > 0 && (
                      <p className="text-gray-400 text-sm">
                        Verified {cred.verificationCount} time{cred.verificationCount !== 1 ? 's' : ''}
                      </p>
                    )}
                    {cred.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {cred.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-neon-blue/20 rounded-lg text-sm text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => verifyCredential(cred)}
                    className={`px-4 py-2 bg-gradient-to-r text-white rounded-lg 
                             hover:shadow-neon-glow transition-all duration-300
                             ${cred.verificationStatus === 'verified' 
                               ? 'from-neon-green to-neon-blue' 
                               : 'from-neon-blue to-neon-purple'}`}
                  >
                    {cred.verificationStatus === 'verified' ? 'Verify Again' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
