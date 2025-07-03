import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hexagon, 
  ShoppingCart, 
  Star, 
  Check, 
  Camera, 
  Thermometer, 
  Wifi, 
  Shield,
  Truck,
  CreditCard,
  ArrowRight,
  Plus,
  Minus,
  Heart,
  Share2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from '../components/LanguageToggle';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  badge?: string;
}

export const Shop: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<Record<string, number>>({});

  const products: Product[] = [
    {
      id: 'beetkar-pro',
      name: 'Beetkar Pro Monitor',
      price: 625,
      originalPrice: 750,
      image: 'https://images.pexels.com/photos/6889395/pexels-photo-6889395.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      rating: 4.9,
      reviews: 127,
      description: 'Complete beehive monitoring system with thermal imaging, environmental sensors, and AI-powered mite detection.',
      features: [
        'FLIR Lepton 3.5 thermal camera',
        'Temperature & humidity sensors',
        'Sound & vibration monitoring',
        'GSM/WiFi connectivity',
        'AI mite detection (95% accuracy)',
        'Real-time alerts',
        'Weather-resistant housing',
        '2-year warranty'
      ],
      inStock: true,
      badge: 'Best Seller'
    },
    {
      id: 'beetkar-starter',
      name: 'Beetkar Starter Kit',
      price: 625,
      image: 'https://images.pexels.com/photos/6889395/pexels-photo-6889395.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      rating: 4.7,
      reviews: 89,
      description: 'Essential monitoring package perfect for hobbyist beekeepers starting their smart hive journey.',
      features: [
        'Basic thermal imaging',
        'Temperature monitoring',
        'WiFi connectivity',
        'Mobile app access',
        'Basic alert system',
        'Easy installation',
        '1-year warranty'
      ],
      inStock: true
    },
    {
      id: 'beetkar-enterprise',
      name: 'Beetkar Enterprise',
      price: 625,
      originalPrice: 850,
      image: 'https://images.pexels.com/photos/6889395/pexels-photo-6889395.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      rating: 5.0,
      reviews: 45,
      description: 'Professional-grade system for commercial apiaries with advanced analytics and multi-hive management.',
      features: [
        'Advanced thermal imaging',
        'Full sensor suite',
        'Multi-hive dashboard',
        'API access',
        'Custom alerts',
        'Priority support',
        'Rugged design',
        '3-year warranty'
      ],
      inStock: true,
      badge: 'Professional'
    }
  ];

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const updateQuantity = (productId: string, change: number) => {
    const current = getQuantity(productId);
    const newQuantity = Math.max(1, Math.min(10, current + change));
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const addToCart = (productId: string) => {
    const quantity = getQuantity(productId);
    setCart(prev => ({ ...prev, [productId]: (prev[productId] || 0) + quantity }));
    
    // Show success message
    const product = products.find(p => p.id === productId);
    alert(`Added ${quantity}x ${product?.name} to cart!`);
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

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
              <Link to="/about" className="text-warm-600 hover:text-warm-900 transition-colors">
                {t('nav.about')}
              </Link>
              <span className="text-warm-900 font-medium">{t('nav.shop')}</span>
              <Link to="/login" className="text-warm-600 hover:text-warm-900 transition-colors">
                {t('nav.login')}
              </Link>
              <LanguageToggle />
              <div className="relative">
                <button className="flex items-center space-x-2 bg-honey-500 hover:bg-honey-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{t('nav.cart')}</span>
                  {getTotalCartItems() > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {getTotalCartItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-honey-50 to-forest-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-warm-900 mb-6">
            {t('shop.title')}
            <span className="text-honey-500"> {t('shop.subtitle')}</span>
          </h1>
          <p className="text-xl text-warm-600 mb-8 max-w-3xl mx-auto">
            {t('shop.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-white rounded-xl px-6 py-3 shadow-lg">
              <Truck className="w-5 h-5 text-forest-500" />
              <span className="font-medium text-warm-900">{t('shop.free.shipping')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-xl px-6 py-3 shadow-lg">
              <Shield className="w-5 h-5 text-forest-500" />
              <span className="font-medium text-warm-900">{t('shop.warranty')}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-xl px-6 py-3 shadow-lg">
              <CreditCard className="w-5 h-5 text-forest-500" />
              <span className="font-medium text-warm-900">{t('shop.secure.payment')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-900 mb-4">
              {t('shop.choose.system')}
            </h2>
            <p className="text-xl text-warm-600">
              {t('shop.choose.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg border border-warm-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-honey-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-warm-600" />
                    </button>
                    <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Share2 className="w-5 h-5 text-warm-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-warm-900">{product.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-honey-500 fill-current" />
                      <span className="text-sm font-medium text-warm-700">{product.rating}</span>
                      <span className="text-sm text-warm-500">({product.reviews})</span>
                    </div>
                  </div>

                  <p className="text-warm-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-medium text-warm-900 mb-3">{t('shop.key.features')}:</h4>
                    <div className="space-y-2">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-forest-500 flex-shrink-0" />
                          <span className="text-sm text-warm-700">{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 4 && (
                        <button
                          onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                          className="text-honey-600 hover:text-honey-700 text-sm font-medium"
                        >
                          {selectedProduct === product.id ? t('shop.show.less') : `+${product.features.length - 4} ${t('shop.more.features')}`}
                        </button>
                      )}
                    </div>

                    {/* Expanded Features */}
                    {selectedProduct === product.id && (
                      <div className="mt-3 space-y-2 animate-slide-up">
                        {product.features.slice(4).map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-forest-500 flex-shrink-0" />
                            <span className="text-sm text-warm-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-bold text-warm-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-warm-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                        {t('shop.save')} {formatPrice(product.originalPrice - product.price)}
                      </span>
                    )}
                  </div>

                  {/* Quantity and Add to Cart */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-warm-900">{t('shop.quantity')}:</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-8 h-8 bg-warm-100 hover:bg-warm-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-warm-600" />
                        </button>
                        <span className="w-8 text-center font-medium text-warm-900">
                          {getQuantity(product.id)}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-8 h-8 bg-warm-100 hover:bg-warm-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-warm-600" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        product.inStock
                          ? 'bg-honey-500 hover:bg-honey-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-warm-300 text-warm-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>{product.inStock ? t('shop.add.cart') : t('shop.out.stock')}</span>
                    </button>
                  </div>

                  {product.inStock && (
                    <div className="mt-3 text-center">
                      <span className="text-sm text-forest-600 font-medium">
                        ✓ {t('shop.in.stock')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-900 mb-4">
              Why Choose Beetkar?
            </h2>
            <p className="text-xl text-warm-600">
              Advanced technology meets practical beekeeping solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-honey-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-honey-600" />
              </div>
              <h3 className="text-lg font-semibold text-warm-900 mb-2">Thermal Imaging</h3>
              <p className="text-warm-600 text-sm">
                FLIR Lepton 3.5 camera detects mites and temperature anomalies with 95% accuracy
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Thermometer className="w-8 h-8 text-forest-600" />
              </div>
              <h3 className="text-lg font-semibold text-warm-900 mb-2">Environmental Monitoring</h3>
              <p className="text-warm-600 text-sm">
                Track temperature, humidity, sound, and vibration in real-time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-honey-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-honey-600" />
              </div>
              <h3 className="text-lg font-semibold text-warm-900 mb-2">Remote Access</h3>
              <p className="text-warm-600 text-sm">
                Monitor your hives from anywhere with GSM/WiFi connectivity
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-forest-600" />
              </div>
              <h3 className="text-lg font-semibold text-warm-900 mb-2">Weather Resistant</h3>
              <p className="text-warm-600 text-sm">
                Rugged design withstands harsh outdoor conditions year-round
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-honey-500 to-forest-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to protect your hives?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of beekeepers who trust Beetkar to monitor their colonies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="inline-flex items-center space-x-2 bg-white text-honey-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <span>{t('landing.hero.cta.trial')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/about"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:text-honey-600"
            >
              <span>Learn More</span>
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