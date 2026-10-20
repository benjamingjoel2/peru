import { photo } from "./photos";
import type { Experience, ExperienceGroup, ExperienceGroupId } from "./types";


export const experienceGroups: ExperienceGroup[] = [
  {
    id: "icons-of-peru",
    name: "Icons of Peru",
    title: "Icons of *Peru*",
    intro:
      "The places that made you want to come. We get you there at the right hour, in the right order and at the right altitude, so you can stand in front of them and simply look.",
    image: photo("machu-picchu-sunrise"),
  },
  {
    id: "living-culture",
    name: "Living Culture",
    title: "Living *Culture*",
    intro:
      "Peru isn't a museum. It's weavers who still dye with cochineal, farmers who grow potatoes their grandparents grew, and cooks who've made Lima a place people fly to for dinner. Spend time with them, on their terms.",
    image: photo("weaving"),
  },
  {
    id: "peru-unplugged",
    name: "Peru Unplugged",
    title: "Peru *Unplugged*",
    intro:
      "Trails, passes, glaciers and rivers. These are the days you'll talk about most, and the ones where good pacing matters most. We'll make sure you're ready before the trail starts climbing.",
    image: photo("trekker"),
  },
];

export const experiences: Experience[] = [
  // Icons of Peru
  {
    slug: "machu-picchu",
    group: "icons-of-peru",
    name: "Machu Picchu",
    summary: "The citadel on its ridge, seen at the right time slot, on the right circuit, with a guide who knows it stone by stone.",
    body: [
      "Machu Picchu runs on timed tickets and set circuits, and the best slots go months ahead. We choose your circuit for what you want to see (the classic postcard view, the temples, or both), then fit the trains and buses around it.",
      "Add Huayna Picchu or Machu Picchu Mountain if you like steep stairs and big views. Each needs its own ticket and sells out first.",
    ],
    whoFor: "Everyone. Train and bus access means it suits most fitness levels, though there are many uneven steps.",
    effort: "moderate",
    altitudeM: 2430,
    destinations: ["machu-picchu"],
    image: photo("machu-picchu-window"),
  },
  {
    slug: "sacred-valley",
    group: "icons-of-peru",
    name: "The Sacred Valley",
    summary: "Pisac, Ollantaytambo, Moray and Maras: Inca engineering in a valley lower and greener than Cusco.",
    body: [
      "We often start Andean trips here because it sits lower than Cusco. That makes it easier on your body, and nicer on the eye.",
      "Walk the terraces at Pisac, climb the fortress steps at Ollantaytambo, look into the circular terraces of Moray and taste the salt at Maras.",
    ],
    whoFor: "All ages. Walking is easy to moderate.",
    effort: "gentle",
    altitudeM: 2870,
    destinations: ["sacred-valley"],
    image: photo("moray"),
  },
  {
    slug: "lake-titicaca",
    group: "icons-of-peru",
    name: "Lake Titicaca",
    summary: "Reed islands, island weavers and the highest night of most trips, at about 3,800 metres.",
    body: [
      "Take a boat to the Uros floating islands, then on to Taquile, where knitting is a men's craft and the hillsides are terraced to the shore.",
      "Stay overnight with a family on Amantaní to see the lake after the day boats leave.",
    ],
    whoFor: "Travellers already acclimatised to Cusco or Colca.",
    effort: "gentle",
    altitudeM: 3830,
    destinations: ["lake-titicaca"],
    image: photo("uros-boat"),
  },
  {
    slug: "colca-canyon",
    group: "icons-of-peru",
    name: "Colca Canyon",
    summary: "Condors at Cruz del Cóndor, pre-Inca terraces and hot springs, over the high puna from Arequipa.",
    body: [
      "The drive from Arequipa crosses a high pass of around 4,900 metres, so we time it after a couple of nights in Arequipa.",
      "Early mornings at Cruz del Cóndor give the best chance of seeing condors rise on the thermals.",
    ],
    whoFor: "Anyone happy with a long scenic drive. Optional hikes into the canyon are demanding.",
    effort: "moderate",
    altitudeM: 3450,
    destinations: ["arequipa-colca"],
    image: photo("colca"),
  },
  {
    slug: "nazca-lines",
    group: "icons-of-peru",
    name: "The Nazca Lines",
    summary: "A flight over the desert to see the hummingbird, the monkey and the spider from above.",
    body: [
      "Flights last about 30 minutes and bank sharply so both sides of the plane can see. If you're prone to motion sickness, skip breakfast and take the front seats.",
      "Prefer to keep your feet on the ground? The viewing tower and Chauchilla cemetery are good alternatives.",
    ],
    whoFor: "Anyone comfortable in small aircraft.",
    effort: "gentle",
    altitudeM: 520,
    destinations: ["nazca-lines"],
    image: photo("nazca-desert"),
  },

  // Living Culture
  {
    slug: "weaving-cooperatives",
    group: "living-culture",
    name: "Weaving cooperatives",
    summary: "Spinning, natural dyeing and backstrap looms, with the weavers who run the cooperative and set the prices.",
    body: [
      "In community cooperatives around the Sacred Valley, weavers show how wool becomes thread and how plants, minerals and cochineal insects become colour.",
      "Every visit we plan is paid directly to the cooperative, and anything you buy goes straight to the person who made it.",
    ],
    whoFor: "Everyone, especially families and makers.",
    effort: "gentle",
    altitudeM: 3700,
    destinations: ["sacred-valley", "lake-titicaca"],
    image: photo("weaving-hands"),
  },
  {
    slug: "homestays",
    group: "living-culture",
    name: "Community homestays",
    summary: "A night with an Andean family: cooking together, working the fields, and a sky full of stars.",
    body: [
      "Simple rooms, shared meals and a real glimpse of daily life. Homestays on Amantaní and in Sacred Valley communities are run by the communities themselves.",
      "Expect basic comforts and a warm welcome. We brief you on customs and what to bring.",
    ],
    whoFor: "Curious travellers happy with simple rooms.",
    effort: "gentle",
    altitudeM: 3850,
    destinations: ["lake-titicaca", "sacred-valley"],
    image: photo("amantani"),
  },
  {
    slug: "markets",
    group: "living-culture",
    name: "Markets",
    summary: "San Pedro in Cusco, Pisac on market day and Belén in Iquitos: Peru's kitchens, without the walls.",
    body: [
      "Markets are where Peru's altitude zones meet: highland potatoes beside jungle fruits, cheese from the valleys and bread from the village ovens.",
      "Go with a guide who can introduce you to the stallholders and tell you what to taste.",
    ],
    whoFor: "Food lovers and families.",
    effort: "gentle",
    destinations: ["cusco", "sacred-valley", "iquitos", "lima"],
    image: photo("market"),
  },
  {
    slug: "lima-food-scene",
    group: "living-culture",
    name: "Lima's food scene",
    summary: "Cevicherías, chifas, Nikkei counters and tasting menus that take you from the sea to the peaks.",
    body: [
      "Lima has become one of the world's great food cities. We'll book the tables that need booking months ahead, and the ones that don't take bookings at all.",
      "Pair it with a market morning, a ceviche class or a pisco tasting.",
    ],
    whoFor: "Anyone who plans their trips around lunch.",
    effort: "gentle",
    altitudeM: 150,
    destinations: ["lima"],
    image: photo("pisco-sour"),
  },
  {
    slug: "festivals",
    group: "living-culture",
    name: "Festivals",
    summary: "Inti Raymi in June, Candelaria in February, Qoyllur Rit'i in the mountains: Peru's calendar is full.",
    body: [
      "Festivals fill hotels fast and change how a city feels for a week. We'll tell you which ones are worth planning around, and which ones to avoid if you'd rather have the streets to yourself.",
      "Dates move with the religious calendar, so always confirm with us before booking flights.",
    ],
    whoFor: "Travellers who like crowds, music and colour.",
    effort: "gentle",
    destinations: ["cusco", "lake-titicaca"],
    image: photo("festival"),
  },

  // Peru Unplugged
  {
    slug: "inca-trail",
    group: "peru-unplugged",
    name: "The Inca Trail",
    summary: "Four days on original stone paths, over Dead Woman's Pass, finishing at the Sun Gate.",
    body: [
      "Permits are limited, sold only through licensed operators, and the best months sell out early. The trail closes every February for maintenance.",
      "We schedule at least two to three nights at altitude before you start, and work only with operators who meet our porter-welfare standards.",
    ],
    whoFor: "Fit walkers comfortable with long days, steep stone steps and camping.",
    effort: "demanding",
    altitudeM: 4215,
    destinations: ["inca-trail-salkantay", "machu-picchu"],
    image: photo("inca-trail-hikers"),
  },
  {
    slug: "salkantay",
    group: "peru-unplugged",
    name: "The Salkantay trek",
    summary: "A wilder route to Machu Picchu, over a 4,600-metre pass beneath a glacier and down into coffee country.",
    body: [
      "No Inca Trail permit is needed, so Salkantay is a good choice when permits are gone, and a great one in its own right.",
      "You'll go from glacier views to cloud forest in two days. Camps or mountain lodges are available.",
    ],
    whoFor: "Fit, acclimatised walkers.",
    effort: "demanding",
    altitudeM: 4600,
    destinations: ["inca-trail-salkantay", "machu-picchu"],
    image: photo("humantay-shore"),
  },
  {
    slug: "rainbow-mountain",
    group: "peru-unplugged",
    name: "Rainbow Mountain",
    summary: "A very early start for striped slopes at about 5,000 metres. Save it for the end of your Andean days.",
    body: [
      "The viewpoint is higher than anywhere else on most trips, so we only add it once you've had several nights at Cusco's altitude.",
      "Horses are available for most of the climb. Palccoyo is a gentler, quieter alternative.",
    ],
    whoFor: "Acclimatised travellers in good health.",
    effort: "demanding",
    altitudeM: 5000,
    destinations: ["rainbow-mountain"],
    image: photo("rainbow-mountain-stripes"),
  },
  {
    slug: "cordillera-blanca",
    group: "peru-unplugged",
    name: "The Cordillera Blanca",
    summary: "Glacier lakes, high trails and Peru's tallest peak, Huascarán, from a base in Huaraz.",
    body: [
      "Day hikes like Laguna 69 climb above 4,500 metres, so we build up over several days with shorter walks first.",
      "Longer treks like the Santa Cruz circuit are possible for experienced hikers.",
    ],
    whoFor: "Hikers who want mountains without the crowds.",
    effort: "demanding",
    altitudeM: 4600,
    destinations: ["huaraz"],
    image: photo("laguna-69-turquoise"),
  },
  {
    slug: "amazon-lodges",
    group: "peru-unplugged",
    name: "Amazon lodges",
    summary: "River lodges in Tambopata, Manu and around Iquitos: macaws at dawn, caiman by torchlight.",
    body: [
      "Lodges range from simple and remote to genuinely comfortable. All of them run on river time: early starts, long lunches, and night walks.",
      "Low altitude and warm air make the Amazon a good recovery after the Andes.",
    ],
    whoFor: "Everyone, including families. Check the vaccination advice for your trip.",
    effort: "gentle",
    altitudeM: 200,
    destinations: ["tambopata", "manu", "iquitos"],
    image: photo("macaws-flock"),
  },
];

export const experienceBySlug = (slug: string) => experiences.find((e) => e.slug === slug);
export const experiencesByGroup = (g: ExperienceGroupId) => experiences.filter((e) => e.group === g);
