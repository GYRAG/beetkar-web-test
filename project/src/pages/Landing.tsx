import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, Shield, BarChart3, Bell, Camera, Wifi, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';

export const Landing: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Camera,
      title: 'Thermal Imaging',
      description: 'Advanced FLIR Lepton 3.5 camera detects varroa mites and temperature anomalies with AI-powered analysis.',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Monitor temperature, humidity, sound, and vibration patterns with interactive charts and trend analysis.',
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Receive instant notifications for critical issues with severity-based prioritization and recommended actions.',
    },
    {
      icon: Shield,
      title: 'Hive Health',
      description: 'Comprehensive health monitoring prevents colony collapse and optimizes honey production.',
    },
    {
      icon: Wifi,
      title: 'Remote Access',
      description: 'Monitor your hives from anywhere with GSM/WiFi connectivity and offline data synchronization.',
    },
    {
      icon: Hexagon,
      title: 'Multi-Hive Management',
      description: 'Manage unlimited hives from a single dashboard with individual device tracking and analytics.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Commercial Beekeeper',
      content: 'Beetkar has revolutionized how I manage my 50+ hives. Early mite detection saved my entire operation.',
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      role: 'Hobbyist Beekeeper',
      content: 'The thermal imaging feature is incredible. I can spot problems before they become serious issues.',
      avatar: 'MC',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Apiary Manager',
      content: 'Real-time alerts have reduced our colony losses by 80%. The ROI was immediate.',
      avatar: 'ER',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Hives Monitored' },
    { value: '95%', label: 'Mite Detection Accuracy' },
    { value: '80%', label: 'Reduced Colony Loss' },
    { value: '24/7', label: 'Continuous Monitoring' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-warm-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-honey-500 rounded-lg flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-warm-900">Beetkar</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-warm-600 hover:text-warm-900 transition-colors">
                {t('nav.about')}
              </Link>
              <a href="#features" className="text-warm-600 hover:text-warm-900 transition-colors">
                Features
              </a>
              <Link to="/shop" className="text-warm-600 hover:text-warm-900 transition-colors">
                {t('nav.shop')}
              </Link>
              <a href="#pricing" className="text-warm-600 hover:text-warm-900 transition-colors">
                Pricing
              </a>
              <Link to="/login" className="text-warm-600 hover:text-warm-900 transition-colors">
                {t('nav.login')}
              </Link>
              <LanguageToggle />
              <Link 
                to="/signup" 
                className="bg-honey-500 hover:bg-honey-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {t('nav.signup')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-warm-900 leading-tight">
                  {t('landing.hero.title')}
                  <span className="text-honey-500"> {t('landing.hero.subtitle')}</span>
                </h1>
                <p className="text-xl text-warm-600 leading-relaxed">
                  {t('landing.hero.description')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/signup"
                  className="inline-flex items-center justify-center space-x-2 bg-honey-500 hover:bg-honey-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
                >
                  <span>{t('landing.hero.cta.trial')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/shop"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-warm-200 hover:border-warm-300 text-warm-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-md"
                >
                  <span>{t('landing.hero.cta.shop')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-warm-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-forest-500" />
                  <span>{t('landing.hero.benefits.trial')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-forest-500" />
                  <span>{t('landing.hero.benefits.card')}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-honey-50 to-forest-50 rounded-3xl p-8 shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Beehive monitoring dashboard"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-forest-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-warm-900">Live Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-honey-500 mb-2">{stat.value}</div>
                <div className="text-warm-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-900 mb-4">
              Everything you need to protect your hives
            </h2>
            <p className="text-xl text-warm-600 max-w-3xl mx-auto">
              Advanced technology meets traditional beekeeping. Monitor, analyze, and protect 
              your colonies with cutting-edge sensors and AI-powered insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-warm-100">
                <div className="w-12 h-12 bg-honey-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-honey-600" />
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-4">{feature.title}</h3>
                <p className="text-warm-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-900 mb-4">
              Trusted by beekeepers worldwide
            </h2>
            <p className="text-xl text-warm-600">
              See how Beetkar is helping beekeepers protect and optimize their operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <p className="text-warm-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-forest-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-warm-900">{testimonial.name}</div>
                    <div className="text-warm-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-warm-900 mb-6">
            Ready to revolutionize your beekeeping?
          </h2>
          <p className="text-xl text-warm-600 mb-8">
            Join thousands of beekeepers who trust Beetkar to protect their colonies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="inline-flex items-center space-x-2 bg-honey-500 hover:bg-honey-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg text-lg"
            >
              <span>{t('landing.hero.cta.trial')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/shop"
              className="inline-flex items-center space-x-2 border-2 border-warm-200 hover:border-warm-300 text-warm-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-md text-lg"
            >
              <span>{t('landing.hero.cta.shop')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-honey-500 rounded-lg flex items-center justify-center">
                  <Hexagon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Beetkar</span>
              </div>
              <p className="text-warm-300">
                Smart beehive monitoring for the modern beekeeper
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-warm-300">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Documentation</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-warm-300">
                <Link to="/about">{t('nav.about')}</Link>
                <Link to="/shop">{t('nav.shop')}</Link>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-warm-300">
                <div>Help Center</div>
                <div>Community</div>
                <div>Status</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-warm-700 mt-8 pt-8 text-center text-warm-400">
            <p>&copy; 2025 Beetkar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};