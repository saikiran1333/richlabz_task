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
      title: 'Guest House layout',
      subtitle: 'Completed Project',
      image: images.hero.placeholder,
    },
    {
      id: 'hero-2',
      title: 'Modern Villa',
      subtitle: 'Completed Project',
      image: images.hero.placeholder,
    },
    {
      id: 'hero-3',
      title: 'Commercial Project',
      subtitle: 'Completed Project',
      image: images.hero.placeholder,
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
    { id: 'interiors', title: 'Interiors', image: images.pieceWorks.placeholder },
    { id: 'plumbing', title: 'Plumbing', image: images.pieceWorks.placeholder },
    { id: 'electrical', title: 'Electrical', image: images.pieceWorks.placeholder },
    { id: 'painting', title: 'Painting', image: images.pieceWorks.placeholder },
  ];

  const additionalServices: AdditionalServiceItem[] = [
    { id: 'pmc', title: 'PMC Services', image: images.additionalServices.placeholder },
    { id: 'legal', title: 'Legal Services', image: images.additionalServices.placeholder },
    { id: 'taxation', title: 'Taxation', image: images.additionalServices.placeholder },
  ];

  const testimonials: TestimonialItem[] = [
    { id: 'test-1', name: 'Santosh P', role: 'Manager', duration: '02:35 s', thumbnail: images.testimonials.placeholder, videoUrl: '' },
    { id: 'test-2', name: 'Santosh P', role: 'Manager', duration: '02:35 s', thumbnail: images.testimonials.placeholder, videoUrl: '' },
  ];

  const vendor: VendorBanner = {
    title: 'Grow Your Business With Us',
    subtitle: 'Become a Trusted Vendor',
    image: images.vendor.main,
  };

  const machinery: MachineryItem[] = [
    { id: 'excavators', title: 'Excavators', image: images.machinery.placeholder },
    { id: 'tractors', title: 'Tractors', image: images.machinery.placeholder },
    { id: 'cranes', title: 'Cranes', image: images.machinery.placeholder },
  ];

  const materials: MaterialItem[] = [
    { id: 'steel', title: 'Iron & Steel Rods', image: images.materials.placeholder },
    { id: 'cement', title: 'Cement', image: images.materials.placeholder },
    { id: 'plywood', title: 'Plywood', image: images.materials.placeholder },
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
