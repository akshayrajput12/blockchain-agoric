import React, { useState } from 'react';
import { useCredentialStore } from '../../store/credentialStore';
import type { CredentialType } from '../../store/credentialStore';

interface CreateCredentialFormProps {
  onClose: () => void;
}

export const CreateCredentialForm: React.FC<CreateCredentialFormProps> = ({ onClose }) => {
  const { addCredential } = useCredentialStore();
  const [credentialType, setCredentialType] = useState<CredentialType>('student');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    // Student fields
    institution: '',
    degree: '',
    graduationYear: '',
    major: '',
    gpa: '',
    achievements: '',
    // Employee fields
    company: '',
    position: '',
    startDate: '',
    department: '',
    responsibilities: '',
    // Developer fields
    skills: '',
    certifications: '',
    experience: '',
    githubProfile: '',
    portfolio: '',
    projects: '',
    // Business fields
    companyName: '',
    businessType: '',
    registrationNumber: '',
    foundingDate: '',
    industry: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseCredential = {
      name: formData.name,
      type: credentialType,
      description: formData.description,
      imageUrl: formData.imageUrl || undefined,
    };

    let specificCredential;
    switch (credentialType) {
      case 'student':
        specificCredential = {
          ...baseCredential,
          institution: formData.institution,
          degree: formData.degree,
          graduationYear: formData.graduationYear,
          major: formData.major || undefined,
          gpa: formData.gpa || undefined,
          achievements: formData.achievements ? formData.achievements.split(',').map(a => a.trim()) : undefined,
        };
        break;
      case 'employee':
        specificCredential = {
          ...baseCredential,
          company: formData.company,
          position: formData.position,
          startDate: formData.startDate,
          department: formData.department || undefined,
          responsibilities: formData.responsibilities ? formData.responsibilities.split(',').map(r => r.trim()) : undefined,
          achievements: formData.achievements ? formData.achievements.split(',').map(a => a.trim()) : undefined,
        };
        break;
      case 'developer':
        specificCredential = {
          ...baseCredential,
          skills: formData.skills.split(',').map(s => s.trim()),
          certifications: formData.certifications.split(',').map(c => c.trim()),
          experience: formData.experience,
          githubProfile: formData.githubProfile || undefined,
          portfolio: formData.portfolio || undefined,
          projects: formData.projects ? JSON.parse(formData.projects) : undefined,
        };
        break;
      case 'business':
        specificCredential = {
          ...baseCredential,
          companyName: formData.companyName,
          businessType: formData.businessType,
          registrationNumber: formData.registrationNumber,
          foundingDate: formData.foundingDate,
          industry: formData.industry,
        };
        break;
    }

    addCredential(specificCredential);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create New Credential</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto pr-4" style={{ scrollbarWidth: 'thin' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Credential Type</label>
              <select
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value as CredentialType)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              >
                <option value="student">Student</option>
                <option value="employee">Employee</option>
                <option value="developer">Developer</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Base Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Conditional Fields based on Type */}
            {credentialType === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Graduation Year</label>
                  <input
                    type="text"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Major</label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">GPA</label>
                  <input
                    type="text"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </>
            )}

            {credentialType === 'employee' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </>
            )}

            {credentialType === 'developer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Certifications (comma-separated)</label>
                  <input
                    type="text"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">GitHub Profile</label>
                  <input
                    type="url"
                    name="githubProfile"
                    value={formData.githubProfile}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Portfolio URL</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </>
            )}

            {credentialType === 'business' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Business Type</label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Founding Date</label>
                  <input
                    type="date"
                    name="foundingDate"
                    value={formData.foundingDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Credential
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
