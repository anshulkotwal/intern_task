
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const steps = ['Personal Info', 'Business Info', 'Preferences'];

const OnboardingWizard = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    size: '',
    theme: '',
    layout: '',
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const currentErrors = {};
    if (step === 0) {
      if (!formData.name.trim() || formData.name.length < 2) currentErrors.name = 'Enter a valid name';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) currentErrors.email = 'Invalid email';
    } else if (step === 1) {
      if (!formData.company.trim()) currentErrors.company = 'Company name required';
      if (!formData.industry.trim()) currentErrors.industry = 'Industry required';
      if (!/^\d+$/.test(formData.size) || Number(formData.size) <= 0) currentErrors.size = 'Enter valid team size';
    } else if (step === 2) {
      if (!['light', 'dark'].includes(formData.theme.toLowerCase())) currentErrors.theme = 'Choose light or dark';
      if (!formData.layout.trim()) currentErrors.layout = 'Layout required';
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < steps.length - 1) setStep(step + 1);
      else onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div>
              <Input placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div>
              <Input placeholder="Company Name" name="company" value={formData.company} onChange={handleChange} />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>
            <div>
              <Input placeholder="Industry" name="industry" value={formData.industry} onChange={handleChange} />
              {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
            </div>
            <div>
              <Input placeholder="Size (number)" name="size" value={formData.size} onChange={handleChange} />
              {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <Input placeholder="Theme (light/dark)" name="theme" value={formData.theme} onChange={handleChange} />
              {errors.theme && <p className="text-red-500 text-sm">{errors.theme}</p>}
            </div>
            <div>
              <Input placeholder="Default Layout" name="layout" value={formData.layout} onChange={handleChange} />
              {errors.layout && <p className="text-red-500 text-sm">{errors.layout}</p>}
            </div>
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-2xl p-8 w-full space-y-6"
    >
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div className={`bg-blue-500 h-2 rounded-full transition-all duration-500`} style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Step {step + 1}: {steps[step]}</h2>
      <div className="space-y-4">{renderStep()}</div>
      <div className="flex justify-between mt-6">
        {step > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
        <Button onClick={handleNext}>{step === steps.length - 1 ? 'Submit' : 'Next'}</Button>
      </div>
    </motion.div>
  );
};

const WeeklyProgressChart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white shadow-md rounded-lg p-4"
  >
    <h3 className="text-lg font-medium text-gray-700 mb-2">Weekly Task Progress</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={[
        { day: 'Mon', tasks: 3 },
        { day: 'Tue', tasks: 5 },
        { day: 'Wed', tasks: 2 },
        { day: 'Thu', tasks: 6 },
        { day: 'Fri', tasks: 4 },
        { day: 'Sat', tasks: 1 },
        { day: 'Sun', tasks: 0 },
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  </motion.div>
);

const Dashboard = ({ user }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  >
    <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card><CardContent className="text-center text-blue-600 font-semibold">Team Members: 5</CardContent></Card>
      <Card><CardContent className="text-center text-green-600 font-semibold">Active Projects: 3</CardContent></Card>
      <Card><CardContent className="text-center text-red-600 font-semibold">Notifications: 2</CardContent></Card>
    </div>
    <WeeklyProgressChart />
  </motion.div>
);

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) setUserData(JSON.parse(storedData));
  }, []);

  const handleComplete = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {!userData ? <OnboardingWizard onComplete={handleComplete} /> : <Dashboard user={userData} />}
    </div>
  );
};

export default App;
