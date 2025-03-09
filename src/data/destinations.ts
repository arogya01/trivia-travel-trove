
export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  category: string[];
  clues: string[];
  facts: string[];
  image?: string;
}

// Sample data - In a real implementation, this would be fetched from a server
export const destinations: Destination[] = [
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    country: "France",
    continent: "Europe",
    category: ["Landmark", "Cultural"],
    clues: [
      "I was built for a world fair in 1889",
      "I was initially criticized by artists for my design",
      "I'm made of 18,038 pieces of puddle iron"
    ],
    facts: [
      "The Eiffel Tower was originally intended as a temporary structure",
      "It was the tallest man-made structure in the world until 1930",
      "The tower shrinks by about 6 inches in winter",
      "It takes 20,000 lightbulbs to make it sparkle at night"
    ],
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80"
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    continent: "South America",
    category: ["Historical", "Archaeological"],
    clues: [
      "I'm an Incan citadel set high in the Andes Mountains",
      "I was built in the 15th century and later abandoned",
      "I was unknown to the outside world until 1911"
    ],
    facts: [
      "Machu Picchu means 'Old Peak' in Quechua",
      "It was declared a UNESCO World Heritage Site in 1983",
      "The site contains more than 150 buildings, from houses to sanctuaries",
      "No wheels were used to transport stones during construction"
    ],
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80"
  },
  {
    id: "grand-canyon",
    name: "Grand Canyon",
    country: "United States",
    continent: "North America",
    category: ["Natural", "Geological"],
    clues: [
      "I'm 277 miles long and up to 18 miles wide",
      "I was carved by the Colorado River over millions of years",
      "I expose nearly two billion years of Earth's geological history"
    ],
    facts: [
      "The Grand Canyon is neither the deepest nor the widest canyon in the world",
      "The canyon has a unique microclimate due to its varied elevations",
      "It's home to over 1,500 plant species and 500 animal species",
      "The Pueblo people considered it a holy site and made pilgrimages to it"
    ],
    image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&q=80"
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    country: "India",
    continent: "Asia",
    category: ["Historical", "Architectural"],
    clues: [
      "I'm a white marble mausoleum built between 1632 and 1653",
      "I was commissioned by a Mughal emperor as a tomb for his favorite wife",
      "My design combines elements of Persian, Islamic, and Indian architectural styles"
    ],
    facts: [
      "The Taj Mahal's marble changes color depending on the time of day",
      "Over 20,000 workers and 1,000 elephants were used in its construction",
      "It's perfectly symmetrical on all sides",
      "The precious stones used for inlay work were sourced from all over Asia"
    ],
    image: "https://images.unsplash.com/photo-1548013146-72479768bfac?auto=format&fit=crop&q=80"
  },
  {
    id: "great-wall",
    name: "Great Wall of China",
    country: "China",
    continent: "Asia",
    category: ["Historical", "Architectural"],
    clues: [
      "I was built across different dynasties spanning over 2,000 years",
      "I was designed to protect Chinese states against nomadic invasions",
      "My total length is approximately 13,171 miles"
    ],
    facts: [
      "The Great Wall isn't a single continuous wall but a collection of walls built by different dynasties",
      "It's the longest human-made structure in the world",
      "Contrary to popular belief, it cannot be seen from space with the naked eye",
      "Over 1 million people died during its construction"
    ],
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80"
  },
  {
    id: "sydney-opera-house",
    name: "Sydney Opera House",
    country: "Australia",
    continent: "Oceania",
    category: ["Architectural", "Cultural"],
    clues: [
      "I'm a multi-venue performing arts center designed by Jørn Utzon",
      "My distinctive roof features white shell-like structures",
      "I was completed in 1973, ten years behind schedule"
    ],
    facts: [
      "The Sydney Opera House hosts over 1,500 performances annually",
      "Its construction cost 14 times more than the original budget",
      "It has over one million roof tiles covering the shells",
      "The architect who designed it left the project before it was completed and never saw it finished"
    ],
    image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&q=80"
  },
  {
    id: "mount-kilimanjaro",
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    continent: "Africa",
    category: ["Natural", "Geographical"],
    clues: [
      "I'm the highest mountain in Africa at 19,341 feet",
      "I'm a dormant volcano with three distinct cones",
      "Despite being near the equator, I'm snow-capped year-round"
    ],
    facts: [
      "Mount Kilimanjaro is the highest free-standing mountain in the world",
      "Its name may come from the Swahili word 'kilima' meaning mountain",
      "The glaciers on its summit are disappearing due to climate change",
      "It was first summited by Europeans in 1889"
    ],
    image: "https://images.unsplash.com/photo-1631646109206-4c844df1db8f?auto=format&fit=crop&q=80"
  },
  {
    id: "petra",
    name: "Petra",
    country: "Jordan",
    continent: "Asia",
    category: ["Historical", "Archaeological"],
    clues: [
      "I'm an ancient city carved into rose-colored stone",
      "I was built by the Nabataeans around 312 BCE",
      "I remained unknown to the Western world until 1812"
    ],
    facts: [
      "Petra is nicknamed the 'Rose City' due to the color of the stone",
      "Only 15% of the ancient city has been uncovered",
      "It features an ingenious water management system with dams and conduits",
      "It appeared in the film 'Indiana Jones and the Last Crusade'"
    ],
    image: "https://images.unsplash.com/photo-1563177978-4c54ac1061b4?auto=format&fit=crop&q=80"
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    country: "Multiple",
    continent: "Multiple",
    category: ["Natural", "Phenomenon"],
    clues: [
      "I'm a natural light display in the Earth's sky",
      "I'm caused by disturbances in the magnetosphere by solar wind",
      "I'm best viewed in high-latitude regions around the Arctic"
    ],
    facts: [
      "The Northern Lights are also known as Aurora Borealis",
      "They can display multiple colors including green, pink, violet, and blue",
      "They occur in the Southern Hemisphere too, where they're called Aurora Australis",
      "Some indigenous cultures believed they were spirits of ancestors or messages from gods"
    ],
    image: "https://images.unsplash.com/photo-1579033060982-1bb5b083f4fa?auto=format&fit=crop&q=80"
  },
  {
    id: "venice-canals",
    name: "Venice Canals",
    country: "Italy",
    continent: "Europe",
    category: ["Cultural", "Architectural"],
    clues: [
      "I'm a network of waterways in a city built on 118 small islands",
      "I have over 400 bridges connecting the islands",
      "My main transportation consists of gondolas and water taxis"
    ],
    facts: [
      "Venice has no roads, just canals and pedestrian paths",
      "The city is sinking at a rate of 1-2mm per year",
      "The Grand Canal is the largest canal in Venice, forming an S shape through the city",
      "During the annual carnival, elaborate masks are worn throughout the city"
    ],
    image: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&q=80"
  }
];

// Function to get a specified number of random destinations
export const getRandomDestinations = (count: number): Destination[] => {
  const shuffled = [...destinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to get random wrong answers for a destination
export const getRandomWrongAnswers = (
  correctDestination: Destination,
  count: number
): Destination[] => {
  const filteredDestinations = destinations.filter(
    (dest) => dest.id !== correctDestination.id
  );
  const shuffled = [...filteredDestinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
