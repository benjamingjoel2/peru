export type Month =
  | "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun"
  | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export const MONTHS: Month[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type ZoneId = "coast" | "cusco-sacred-valley" | "southern-andes" | "amazon" | "north";

export interface ImageRef {
  src: string;
  alt: string;
}

export interface Zone {
  id: ZoneId;
  name: string;
  /** Title using *asterisks* for italic emphasis */
  title: string;
  intro: string;
  altitudeRange: [number, number];
  bestMonths: Month[];
  image: ImageRef;
}

export interface Destination {
  slug: string;
  zone: ZoneId;
  name: string;
  /** Approximate elevation in metres. All values marked verify. */
  elevationM: number;
  elevationNote?: string;
  tagline: string;
  opening: string;
  bestMonths: Month[];
  bestMonthsNote: string;
  eat: string[]; // Food ids
  gettingThere: string[];
  highlights: string[];
  timeNeeded: string;
  image: ImageRef;
}

export type AltitudeTip = "sleep-lower" | "take-it-easy" | "hydrate" | "big-day" | "descend";

export type Transport = "flight" | "train" | "road" | "boat" | "trek";

export interface JourneyDay {
  day: number;
  title: string;
  summary: string;
  /** Destination slug where you sleep, or a label for camps */
  sleepAt: string;
  sleepLabel: string;
  sleepAltitudeM: number;
  /** Highest point reached during the day (passes, sites) */
  maxAltitudeM?: number;
  maxLabel?: string;
  tip?: AltitudeTip;
  transport: Transport[];
  stay?: string; // Stay slug
}

export type HikingLevel = "none" | "easy" | "moderate" | "challenging";

export interface Journey {
  slug: string;
  days: number;
  /** Title using *asterisks* for italic emphasis */
  title: string;
  summary: string;
  intro: string;
  fromPriceUSD: number;
  hikingLevel: HikingLevel;
  zones: ZoneId[];
  tags: ("kids" | "food" | "trek" | "amazon" | "north" | "classic")[];
  highlights: string[];
  howYouTravel: string[];
  machuPicchu?: { route: MPRouteId; note: string };
  experiences: string[];
  itinerary: JourneyDay[];
  bestMonths: Month[];
  image: ImageRef;
}

export type ExperienceGroupId = "icons-of-peru" | "living-culture" | "peru-unplugged";

export interface ExperienceGroup {
  id: ExperienceGroupId;
  name: string;
  title: string;
  intro: string;
  image: ImageRef;
}

export interface Experience {
  slug: string;
  group: ExperienceGroupId;
  name: string;
  summary: string;
  body: string[];
  whoFor: string;
  effort: "gentle" | "moderate" | "demanding";
  altitudeM?: number;
  destinations: string[];
  image: ImageRef;
}

export type StayStyle = "boutique" | "lodge" | "hacienda" | "eco-lodge" | "homestay" | "hotel";

export interface Stay {
  slug: string;
  name: string;
  destination: string;
  style: StayStyle;
  elevationM: number;
  summary: string;
  features: string[];
  rooms: string;
  isPlaceholder: true;
  image: ImageRef;
}

export type FoodBand = "pacific" | "coast" | "andes-valley" | "high-andes" | "cloud-forest" | "amazon";

export interface Food {
  id: string;
  name: string;
  kind: "dish" | "ingredient" | "drink" | "experience";
  band: FoodBand;
  description: string;
  where: string[]; // destination slugs
  journeys: string[]; // journey slugs
  experience?: string; // experience slug
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  base: string;
  bio: string;
  knows: string[];
  isPlaceholder: true;
}

export interface Testimonial {
  quote: string;
  name: string;
  country: string;
  flag: string;
  journey?: string;
  isPlaceholder: true;
}

export interface Faq {
  id: string;
  q: string;
  a: string[];
  category: "health" | "machu-picchu" | "planning" | "practical" | "booking";
  verify?: string;
  onHome?: boolean;
}

export type MPRouteId = "train" | "classic-inca-trail" | "short-inca-trail" | "salkantay";
