import { photo } from "./photos";
import type { Zone, ZoneId } from "./types";

export const zones: Zone[] = [
  {
    id: "coast",
    name: "The Coast",
    title: "The *Coast*",
    intro:
      "A long strip of desert between the Andes and the Pacific. Lima's kitchens, sea lions off Paracas, dunes at Huacachina and lines in the Nazca plain that only make sense from the air. It's all near sea level, which makes it the right place to start.",
    altitudeRange: [0, 600],
    bestMonths: ["Dec", "Jan", "Feb", "Mar", "Apr"],
    image: photo("coast-desert"),
  },
  {
    id: "cusco-sacred-valley",
    name: "Cusco & the Sacred Valley",
    title: "*Cusco* & the Sacred Valley",
    intro:
      "The old Inca capital, the valley below it and the mountain citadel everyone comes for. This is where altitude and permits matter most, so it's where we put the most care into the order you do things.",
    altitudeRange: [2000, 5000],
    bestMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    image: photo("pisac"),
  },
  {
    id: "southern-andes",
    name: "The Southern Andes",
    title: "The Southern *Andes*",
    intro:
      "White-stone Arequipa, condors over Colca Canyon and the high plains running down to Lake Titicaca. Big skies, cold nights and some of the highest beds of the trip.",
    altitudeRange: [2300, 4900],
    bestMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    image: photo("uros-boat"),
  },
  {
    id: "amazon",
    name: "The Amazon",
    title: "The *Amazon*",
    intro:
      "More than half of Peru is rainforest. Fly in, take a boat up a river and wake to macaws and howler monkeys. It's low, warm and humid: a gift to your lungs after the Andes.",
    altitudeRange: [100, 500],
    bestMonths: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    image: photo("macaws-flock"),
  },
  {
    id: "north",
    name: "The North",
    title: "The *Wild* North",
    intro:
      "Glacier peaks above Huaraz, cloud-forest fortresses at Kuélap, adobe cities near Trujillo and warm surf at Máncora. Fewer visitors, longer drives and some of the best surprises in the country.",
    altitudeRange: [0, 4700],
    bestMonths: ["May", "Jun", "Jul", "Aug", "Sep"],
    image: photo("laguna-69"),
  },
];

export const zoneById = (id: ZoneId) => zones.find((z) => z.id === id)!;
