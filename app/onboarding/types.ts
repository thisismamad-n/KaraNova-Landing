export enum ActivityType {
  SERVICES = 'services',
  PRODUCTION = 'production',
  CONTENT = 'content',
  OTHER = 'other'
}

export enum BusinessSize {
  SOLO = 'solo',
  SMALL = 'small', // 2-10
  MEDIUM = 'medium', // 11-50
  LARGE = 'large' // 50+
}

export enum BusinessStyle {
  ONLINE = 'online',
  OFFLINE = 'offline',
  HYBRID = 'hybrid'
}

export enum BusinessAge {
  NEW = 'new', // < 1 year
  YOUNG = 'young', // 1-3 years
  ESTABLISHED = 'established', // 3-10 years
  VETERAN = 'veteran' // 10+ years
}

export interface OnboardingData {
  activityType: ActivityType | null;
  activityTypeOther?: string;
  businessSize: BusinessSize | null;
  businessStyle: BusinessStyle | null;
  businessAge: BusinessAge | null;
  additionalInfo: string;
}

export interface StepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}
