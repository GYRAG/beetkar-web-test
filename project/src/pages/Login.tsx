import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hexagon, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
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
    
    if (!formData.email) {
      newErrors.email = t('login.error.email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('login.error.email.invalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('login.error.password');
    } else if (formData.password.length < 6) {
      newErrors.password = t('login.error.password.length');
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid email/password
      if (formData.email && formData.password.length >= 6) {
        // Store auth state (in real app, this would be handled by auth service)
        localStorage.setItem('beetkar_auth', 'true');
        localStorage.setItem('beetkar_user', JSON.stringify({
          email: formData.email,
          name: formData.email.split('@')[0],
        }));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ general: t('login.error.general') });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@beetkar.com',
      password: 'demo123',
      rememberMe: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-50 via-white to-forest-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
            {t('login.title')}
          </h2>
          <p className="text-warm-600">
            {t('login.subtitle')}
          </p>
          
          <div className="mt-4">
            <LanguageToggle />
          </div>
        </div>

        {/* Demo Login Button */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-blue-700 text-sm mb-3">
            {t('login.demo.title')}
          </p>
          <button
            onClick={handleDemoLogin}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
          >
            {t('login.demo.button')}
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-2">
              {t('login.email')}
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
                placeholder={t('login.email.placeholder')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-warm-700 mb-2">
              {t('login.password')}
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
                placeholder={t('login.password.placeholder')}
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-honey-600 focus:ring-honey-500 border-warm-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-warm-700">
                {t('login.remember')}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-honey-600 hover:text-honey-500">
                {t('login.forgot')}
              </a>
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
                <span>{t('login.signing')}</span>
              </>
            ) : (
              <>
                <span>{t('login.signin')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-warm-600">
            {t('login.no.account')}{' '}
            <Link to="/signup" className="font-medium text-honey-600 hover:text-honey-500">
              {t('login.signup.link')}
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-warm-500 hover:text-warm-700 transition-colors">
            {t('login.back.home')}
          </Link>
        </div>
      </div>
    </div>
  );
};