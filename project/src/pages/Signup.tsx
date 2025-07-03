import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store auth state (in real app, this would be handled by auth service)
      localStorage.setItem('beetkar_auth', 'true');
      localStorage.setItem('beetkar_user', JSON.stringify({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 2) return t('signup.password.strength.weak');
    if (strength <= 3) return t('signup.password.strength.medium');
    return t('signup.password.strength.strong');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-50 via-white to-forest-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-honey-500 rounded-xl flex items-center justify-center">
              <Hexagon className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-warm-900">Beetkar</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-warm-900 mb-2">
            {t('signup.title')}
          </h2>
          <p className="text-warm-600">
            {t('signup.subtitle')}
          </p>
          
          <div className="mt-4">
            <LanguageToggle />
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-warm-100">
          <h3 className="font-semibold text-warm-900 mb-4">{t('signup.benefits.title')}</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-forest-500" />
              <span className="text-warm-700 text-sm">{t('signup.benefits.trial')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-forest-500" />
              <span className="text-warm-700 text-sm">{t('signup.benefits.monitoring')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-forest-500" />
              <span className="text-warm-700 text-sm">{t('signup.benefits.detection')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-forest-500" />
              <span className="text-warm-700 text-sm">{t('signup.benefits.alerts')}</span>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-warm-700 mb-2">
                {t('signup.first.name')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-warm-400" />
                </div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-300 bg-red-50' : 'border-warm-300 bg-white'
                  }`}
                  placeholder="John"
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-warm-700 mb-2">
                {t('signup.last.name')}
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-300 bg-red-50' : 'border-warm-300 bg-white'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-2">
              {t('signup.email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-warm-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-warm-300 bg-white'
                }`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-warm-700 mb-2">
              {t('signup.password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-warm-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-warm-300 bg-white'
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-warm-400 hover:text-warm-600" />
                ) : (
                  <Eye className="h-5 w-5 text-warm-400 hover:text-warm-600" />
                )}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-warm-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength() / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-warm-600">{getStrengthText()}</span>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-warm-700 mb-2">
              {t('signup.confirm.password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-warm-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`block w-full pl-10 pr-10 py-3 border rounded-xl shadow-sm placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-warm-300 bg-white'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-warm-400 hover:text-warm-600" />
                ) : (
                  <Eye className="h-5 w-5 text-warm-400 hover:text-warm-600" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-honey-600 focus:ring-honey-500 border-warm-300 rounded mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-warm-700">
                {t('signup.agree.terms')}{' '}
                <a href="#" className="text-honey-600 hover:text-honey-500 underline">
                  {t('signup.terms')}
                </a>{' '}
                and{' '}
                <a href="#" className="text-honey-600 hover:text-honey-500 underline">
                  {t('signup.privacy')}
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            <div className="flex items-start">
              <input
                id="subscribeNewsletter"
                name="subscribeNewsletter"
                type="checkbox"
                checked={formData.subscribeNewsletter}
                onChange={handleInputChange}
                className="h-4 w-4 text-honey-600 focus:ring-honey-500 border-warm-300 rounded mt-1"
              />
              <label htmlFor="subscribeNewsletter" className="ml-3 block text-sm text-warm-700">
                {t('signup.newsletter')}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white transition-all duration-200 ${
              isLoading
                ? 'bg-warm-400 cursor-not-allowed'
                : 'bg-honey-500 hover:bg-honey-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-honey-500 hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{t('signup.creating')}</span>
              </>
            ) : (
              <>
                <span>{t('signup.create')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Sign in link */}
        <div className="text-center">
          <p className="text-warm-600">
            {t('signup.have.account')}{' '}
            <Link to="/login" className="font-medium text-honey-600 hover:text-honey-500">
              {t('signup.signin.link')}
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-warm-500 hover:text-warm-700 transition-colors">
            {t('signup.back.home')}
          </Link>
        </div>
      </div>
    </div>
  );
};