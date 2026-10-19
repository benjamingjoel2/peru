import type { TeamMember, Testimonial } from "./types";

// PLACEHOLDER team: replace with real specialists and guides (and their consent to be listed).
export const team: TeamMember[] = [
  {
    slug: "specialist-1",
    name: "Lucía R. (placeholder)",
    role: "Senior Peru Specialist",
    base: "Lima",
    bio: "Grew up between Lima and Arequipa and has planned hundreds of first trips to Peru. Will talk you out of Rainbow Mountain on day two.",
    knows: ["First trips", "Lima food", "Southern Andes"],
    isPlaceholder: true,
  },
  {
    slug: "specialist-2",
    name: "Tom H. (placeholder)",
    role: "Peru Specialist",
    base: "Cusco",
    bio: "Came to walk the Inca Trail and stayed. Knows every permit date, train timetable and porter team we work with.",
    knows: ["Inca Trail", "Salkantay", "Machu Picchu logistics"],
    isPlaceholder: true,
  },
  {
    slug: "specialist-3",
    name: "Mariana Q. (placeholder)",
    role: "Peru Specialist, families",
    base: "Lima",
    bio: "Mother of two and the person to ask about Peru with children: short drives, sensible altitude and lodges with family cabins.",
    knows: ["Families", "Amazon lodges", "The coast"],
    isPlaceholder: true,
  },
  {
    slug: "guide-1",
    name: "Wilber C. (placeholder)",
    role: "Local Guide, Sacred Valley",
    base: "Urubamba",
    bio: "Quechua speaker, archaeology graduate and grandson of a Chinchero weaver. Tells Inca history like it happened last week.",
    knows: ["Sacred Valley", "Machu Picchu", "Quechua culture"],
    isPlaceholder: true,
  },
  {
    slug: "guide-2",
    name: "Rosa M. (placeholder)",
    role: "Local Guide, Amazon",
    base: "Puerto Maldonado",
    bio: "Naturalist guide who can hear a macaw before you see it. Runs the best night walks on the Tambopata River.",
    knows: ["Tambopata", "Birding", "Night walks"],
    isPlaceholder: true,
  },
];

// PLACEHOLDER testimonials: replace with real, consented reviews before launch.
export const testimonials: Testimonial[] = [
  { quote: "We never once felt rushed or breathless. Starting in the valley instead of Cusco made all the difference.", name: "Sarah & Mike (placeholder)", country: "United States", flag: "🇺🇸", journey: "first-peru-done-right", isPlaceholder: true },
  { quote: "Our Specialist secured Inca Trail permits for the exact week we wanted, six months out. The porters were brilliant.", name: "James (placeholder)", country: "United Kingdom", flag: "🇬🇧", journey: "the-classic-inca-trail", isPlaceholder: true },
  { quote: "The kids still talk about the sea lions and the night walk in the jungle. Short days, good hotels, zero meltdowns.", name: "The Nguyen family (placeholder)", country: "Australia", flag: "🇦🇺", journey: "peru-with-kids", isPlaceholder: true },
  { quote: "Every meal was a highlight. The pachamanca with a farming family was the best day of our year.", name: "Anna & Lukas (placeholder)", country: "Germany", flag: "🇩🇪", journey: "peru-for-food-lovers", isPlaceholder: true },
  { quote: "Laguna 69 nearly finished me, but the days building up to it meant I made it. The north was empty and wonderful.", name: "Claire (placeholder)", country: "Ireland", flag: "🇮🇪", journey: "the-wild-north", isPlaceholder: true },
  { quote: "The homestay on Amantaní was simple and unforgettable. We liked knowing the money went straight to the family.", name: "Marie & Paul (placeholder)", country: "France", flag: "🇫🇷", journey: "titicaca-and-the-high-plains", isPlaceholder: true },
];
