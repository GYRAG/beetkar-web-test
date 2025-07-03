import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon, Target, Users, Award, ArrowRight, Heart, Zap, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('about.bee.conservation'),
      description: t('about.bee.conservation.desc'),
    },
    {
      icon: Zap,
      title: t('about.innovation'),
      description: t('about.innovation.desc'),
    },
    {
      icon: Shield,
      title: t('about.reliability'),
      description: t('about.reliability.desc'),
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'CEO & Co-founder',
      bio: 'Entomologist with 15 years of bee research experience. Former lead researcher at the National Bee Institute.',
      avatar: 'SM',
    },
    {
      name: 'Alex Chen',
      role: 'CTO & Co-founder',
      bio: 'IoT and AI specialist. Previously led sensor development at agricultural tech companies.',
      avatar: 'AC',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Head of Product',
      bio: 'Third-generation beekeeper turned product designer. Bridges the gap between technology and practical beekeeping.',
      avatar: 'MR',
    },
    {
      name: 'Dr. James Wilson',
      role: 'Lead Data Scientist',
      bio: 'Machine learning expert specializing in computer vision and agricultural applications.',
      avatar: 'JW',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a mission to save bee colonies using technology',
    },
    {
      year: '2021',
      title: 'First Prototype',
      description: 'Developed initial thermal imaging system for varroa mite detection',
    },
    {
      year: '2022',
      title: 'Beta Launch',
      description: 'Partnered with 50 beekeepers for real-world testing',
    },
    {
      year: '2023',
      title: 'AI Breakthrough',
      description: 'Achieved 95% accuracy in automated mite detection',
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Launched in 15 countries, monitoring 10,000+ hives',
    },
    {
      year: '2025',
      title: 'Next Generation',
      description: 'Introducing advanced predictive analytics and colony health forecasting',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-warm-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-honey-500 rounded-lg flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-warm-900">Beetkar</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-warm-600 hover:text-warm-900 transition-colors">
                {t('nav.home')}
              </Link>
              <span className="text-warm-900 font-medium">{t('nav.about')}</span>
              <Link to="/shop" className="text-warm-600 hover:text-warm-900 transition-colors">
                {t('nav.shop')}
              </Link>
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-warm-900 mb-6">
            {t('about.title')}
            <span className="text-honey-500"> {t('about.subtitle')}</span>
          </h1>
          <p className="text-xl text-warm-600 leading-relaxed mb-8">
            {t('about.description')}
          </p>
          <div className="bg-gradient-to-r from-honey-50 to-forest-50 rounded-2xl p-8">
            <img 
              src="https://images.pexels.com/photos/6889395/pexels-photo-6889395.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
              alt="Beehive in nature"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-8 h-8 text-honey-500" />
                <h2 className="text-3xl font-bold text-warm-900">{t('about.mission')}</h2>
              </div>
              <p className="text-lg text-warm-600 leading-relaxed mb-6">
                {t('about.mission.description1')}
              </p>
              <p className="text-lg text-warm-600 leading-relaxed mb-8">
                {t('about.mission.description2')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-honey-500 mb-2">80%</div>
                  <div className="text-warm-600">{t('about.reduction.loss')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest-500 mb-2">95%</div>
                  <div className="text-warm-600">{t('about.detection.accuracy')}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-honey-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-honey-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-warm-900 mb-2">{value.title}</h3>
                      <p className="text-warm-600">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-900 mb-4">{t('about.journey.title')}</h2>
            <p className="text-xl text-warm-600">
              {t('about.journey.subtitle')}
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-honey-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg flex-1">
                  <h3 className="text-xl font-semibold text-warm-900 mb-2">{milestone.title}</h3>
                  <p className="text-warm-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-honey-500" />
              <h2 className="text-4xl font-bold text-warm-900">{t('about.team.title')}</h2>
            </div>
            <p className="text-xl text-warm-600">
              {t('about.team.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-20 h-20 bg-forest-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold text-warm-900 mb-1">{member.name}</h3>
                <div className="text-honey-600 font-medium mb-4">{member.role}</div>
                <p className="text-warm-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Award className="w-8 h-8 text-honey-500" />
            <h2 className="text-4xl font-bold text-warm-900">{t('about.recognition.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-honey-500 mb-2">2024</div>
              <div className="font-semibold text-warm-900 mb-2">AgTech Innovation Award</div>
              <div className="text-warm-600 text-sm">Best IoT Solution for Agriculture</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-forest-500 mb-2">2023</div>
              <div className="font-semibold text-warm-900 mb-2">Bee Conservation Prize</div>
              <div className="text-warm-600 text-sm">International Beekeeping Association</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-honey-500 mb-2">2023</div>
              <div className="font-semibold text-warm-900 mb-2">Startup of the Year</div>
              <div className="text-warm-600 text-sm">Agricultural Technology Summit</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-honey-500 to-forest-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="inline-flex items-center space-x-2 bg-white text-honey-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg text-lg"
            >
              <span>{t('about.cta.button')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/shop"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:text-honey-600 text-lg"
            >
              <span>{t('about.cta.shop')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-honey-500 rounded-lg flex items-center justify-center">
                <Hexagon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Beetkar</span>
            </div>
            <p className="text-warm-300 mb-8">
              Smart beehive monitoring for the modern beekeeper
            </p>
            <div className="border-t border-warm-700 pt-8 text-warm-400">
              <p>&copy; 2025 Beetkar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};