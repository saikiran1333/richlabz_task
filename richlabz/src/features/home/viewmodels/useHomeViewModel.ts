import { useState } from 'react';
import { images } from '../../../assets';
import {
  HeroSlide,
  ConstructionItem,
  PieceWorkItem,
  AdditionalServiceItem,
  TestimonialItem,
  MachineryItem,
  MaterialItem,
  PropertyCare,
  VendorBanner,
} from '../models/home.models';

export function useHomeViewModel() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const location = { displayName: 'Madhapur, Hyderabad' };

  const heroSlides: HeroSlide[] = [
    {
      id: 'hero-1',
      title: 'Modern Villa',
      subtitle: 'Completed Project',
      image: images.hero.coursal1,
    },
    {
      id: 'hero-2',
      title: 'Commercial Project',
      subtitle: 'Completed Project',
      image: images.hero.coursal2,
    },
    {
      id: 'hero-3',
      title: 'Guest House layout',
      subtitle: 'Completed Project',
      image: images.hero.coursal3,
    },
  ];

  const constructionItems: ConstructionItem[] = [
    { id: 'residential', title: 'Residential', subtitle: 'Build your Home', accent: 'blue', image: images.construction.residential },
    { id: 'commercial', title: 'Commercial', subtitle: 'Build your Home', accent: 'orange', image: images.construction.commercial },
    { id: 'land', title: 'Land Development', subtitle: 'Build your Home', accent: 'orange', image: images.construction.landDevelopment },
    { id: 'industries', title: 'Industries', subtitle: 'Build your Home', accent: 'blue', image: images.construction.industries },
  ];

  const propertyCare: PropertyCare = {
    title: 'Residential & Commercial\nProperty Care',
    subtitle: '',
    bullets: ['Construction', 'Maintenance'],
    image: images.propertyCare.main,
  };

  const pieceWorks: PieceWorkItem[] = [
    { id: 'interiors', title: 'Interiors', image: images.pieceWorks.interiors },
    { id: 'plumbing', title: 'Plumbing', image: images.pieceWorks.plumbing },
    { id: 'electrical', title: 'Electrical', image: images.pieceWorks.electrical },
    { id: 'painting', title: 'Painting', image: images.pieceWorks.painting },
  ];

  const additionalServices: AdditionalServiceItem[] = [
    { id: 'pmc', title: 'PMC Services', image: images.additionalServices.pmc },
    { id: 'legal', title: 'Legal Services', image: images.additionalServices.legal },
    { id: 'taxation', title: 'Taxation', image: images.additionalServices.taxation },
  ];

  const driveVideoUrl = (fileId: string) => `https://drive.google.com/uc?export=download&id=${fileId}`;

  const testimonials: TestimonialItem[] = [
    { id: 'test-1', name: 'Santosh P', role: 'Manager', duration: '02:35 s', thumbnail: images.testimonials.placeholder, videoUrl: driveVideoUrl('1h0BhZRzhsPgUlAv27L0kSslTNXqsQzTR') },
    { id: 'test-2', name: 'John D', role: 'Client', duration: '05:12 s', thumbnail: images.testimonials.placeholder, videoUrl: driveVideoUrl('1DS2NK6E5PEoqUc2F1fKEVaITl4S0UvoK') },
    { id: 'test-3', name: 'Sarah M', role: 'Customer', duration: '01:45 s', thumbnail: images.testimonials.placeholder, videoUrl: driveVideoUrl('1N-i6YH831uqouWskp5MQw4gjzctPTEmj') },
  ];

  const vendor: VendorBanner = {
    title: 'Grow Your Business With Us',
    subtitle: 'Become a Trusted Vendor',
    image: images.vendor.main,
  };

  const machinery: MachineryItem[] = [
    { id: 'excavators', title: 'Excavators', image: images.machinery.excavator },
    { id: 'tractors', title: 'Tractors', image: images.machinery.tractor },
    { id: 'cranes', title: 'Cranes', image: images.machinery.crane },
  ];

  const materials: MaterialItem[] = [
    { id: 'steel', title: 'Iron & Steel Rods', image: images.materials.steel },
    { id: 'cement', title: 'Cement', image: images.materials.cement },
    { id: 'plywood', title: 'Plywood', image: images.materials.plywood },
  ];

  return {
    location,
    heroSlides,
    constructionItems,
    propertyCare,
    pieceWorks,
    additionalServices,
    testimonials,
    vendor,
    machinery,
    materials,
    activeHeroIndex,
    setActiveHeroIndex,
    searchText,
    setSearchText,
  };
}
