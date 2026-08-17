export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: any;
}

export interface ConstructionItem {
  id: string;
  title: string;
  subtitle: string;
  accent: 'blue' | 'orange';
  image: any;
}

export interface PieceWorkItem {
  id: string;
  title: string;
  image: any;
}

export interface AdditionalServiceItem {
  id: string;
  title: string;
  image: any;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  duration: string;
  thumbnail: any;
  videoUrl: string;
}

export interface MachineryItem {
  id: string;
  title: string;
  image: any;
}

export interface MaterialItem {
  id: string;
  title: string;
  image: any;
}

export interface PropertyCare {
  title: string;
  subtitle: string;
  bullets: string[];
  image: any;
}

export interface VendorBanner {
  title: string;
  subtitle: string;
  image: any;
}
