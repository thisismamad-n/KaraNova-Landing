export const SLIDE_PATH_DESIGNER_CONFIG: {
  enabled: boolean;
  targets: Record<string, boolean>;
} = {
  enabled: false,
  targets: {
    "landing-hero": true,
    "landing-snap-001": true,
    "landing-snap-002": true,
    "landing-snap-003": true,
    "landing-snap-004": true,
    "landing-feature-steps": true,
    "landing-four-advisors": true,
    "landing-why-choose": true,
    "landing-testimonials": true,
    "landing-final-cta": true,
  },
};

export const isSlidePathDesignerEnabled = (key: string) =>
  SLIDE_PATH_DESIGNER_CONFIG.enabled && !!SLIDE_PATH_DESIGNER_CONFIG.targets[key];

type PartialConfig = Partial<typeof SLIDE_PATH_DESIGNER_CONFIG> & {
  targets?: Record<string, boolean>;
};

export const mergeSlidePathDesignerConfig = (partial: PartialConfig) => {
  if (typeof partial.enabled === "boolean") {
    SLIDE_PATH_DESIGNER_CONFIG.enabled = partial.enabled;
  }
  if (partial.targets) {
    SLIDE_PATH_DESIGNER_CONFIG.targets = {
      ...SLIDE_PATH_DESIGNER_CONFIG.targets,
      ...partial.targets,
    };
  }
  return SLIDE_PATH_DESIGNER_CONFIG;
};
