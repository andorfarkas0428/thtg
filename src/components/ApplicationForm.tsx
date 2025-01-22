import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

const jobCategories = {
  'Front of House': [
    'Waiter/Waitress',
    'Host/Hostess',
    'Bartender',
    'Sommelier',
    'Restaurant Manager',
    'Maître d\'',
  ],
  'Back of House': [
    'Chef de Partie',
    'Sous Chef',
    'Head Chef',
    'Kitchen Porter',
    'Pastry Chef',
    'Kitchen Manager',
  ],
  'Management': [
    'General Manager',
    'Operations Manager',
    'Food & Beverage Manager',
    'Events Manager',
    'Hotel Manager',
    'Revenue Manager',
  ],
};

const referralSources = [
  'LinkedIn',
  'Indeed',
  'Company Website',
  'Referral',
  'Job Fair',
  'Social Media',
  'Other',
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  postcode: string;
  selectedCategories: string[];
  selectedRoles: string[];
  salaryExpectation: string;
  cv: File | null;
  coverLetter: File | null;
  referralSource: string;
}

export default function ApplicationForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    postcode: '',
    selectedCategories: [],
    selectedRoles: [],
    salaryExpectation: '',
    cv: null,
    coverLetter: null,
    referralSource: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: checked 
        ? [...prev.selectedCategories, category]
        : prev.selectedCategories.filter(c => c !== category),
      selectedRoles: checked 
        ? prev.selectedRoles
        : prev.selectedRoles.filter(role => 
            !jobCategories[category as keyof typeof jobCategories].includes(role)
          )
    }));
  };

  const handleRoleChange = (role: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedRoles: checked
        ? [...prev.selectedRoles, role]
        : prev.selectedRoles.filter(r => r !== role)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // For now, we'll just show an alert and close the form
    alert('Application submitted successfully!');
    onClose();
  };

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        postcode: '',
        selectedCategories: [],
        selectedRoles: [],
        salaryExpectation: '',
        cv: null,
        coverLetter: null,
        referralSource: '',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-[#2ab0b4]">
              Application Form
            </Dialog.Title>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Street Address *</label>
                <input
                  type="text"
                  name="streetAddress"
                  required
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postcode *</label>
                  <input
                    type="text"
                    name="postcode"
                    required
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                  />
                </div>
              </div>
            </div>

            {/* Job Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Job Preferences</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department *</label>
                <div className="mt-2 space-y-2">
                  {Object.keys(jobCategories).map((category) => (
                    <label key={category} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={formData.selectedCategories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                        className="rounded border-gray-300 text-[#2ab0b4] focus:ring-[#2ab0b4]"
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {formData.selectedCategories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Desired Roles *</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {formData.selectedCategories.map((category) => (
                      jobCategories[category as keyof typeof jobCategories].map((role) => (
                        <label key={role} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.selectedRoles.includes(role)}
                            onChange={(e) => handleRoleChange(role, e.target.checked)}
                            className="rounded border-gray-300 text-[#2ab0b4] focus:ring-[#2ab0b4]"
                          />
                          <span className="ml-2">{role}</span>
                        </label>
                      ))
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Salary Expectation (£ per annum) *</label>
                <input
                  type="number"
                  name="salaryExpectation"
                  required
                  min="0"
                  step="1000"
                  value={formData.salaryExpectation}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
                />
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Documents</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">CV (PDF) *</label>
                <input
                  type="file"
                  name="cv"
                  required
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#2ab0b4] file:text-white
                    hover:file:bg-[#2ab0b4]/90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Letter (PDF)</label>
                <input
                  type="file"
                  name="coverLetter"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#2ab0b4] file:text-white
                    hover:file:bg-[#2ab0b4]/90"
                />
              </div>
            </div>

            {/* Referral Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700">How did you hear about us? *</label>
              <select
                name="referralSource"
                required
                value={formData.referralSource}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2ab0b4] focus:ring-[#2ab0b4]"
              >
                <option value="">Please select</option>
                {referralSources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2ab0b4] text-white rounded-md hover:bg-[#2ab0b4]/90"
              >
                Submit Application
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 