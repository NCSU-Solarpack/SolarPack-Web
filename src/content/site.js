// All the words on the public site that are not stored in Supabase.
// Edit here; every page reads from this file. Items marked TODO need a team check before launch.

export const LINKS = {
  donate: 'https://www.paypal.com/fundraiser/charity/3728956',
  email: 'solarpacknc@ncsu.edu',
  instagram: 'https://www.instagram.com/solarpacknc/',
  linkedin: 'https://www.linkedin.com/company/solarpack-nc-state/',
  facebook: 'https://www.facebook.com/SolarPackNC/',
}

const img = (name) => ({
  src: `/images/2026/${name}-2400.webp`,
  srcSet: `/images/2026/${name}-1200.webp 1200w, /images/2026/${name}-2400.webp 2400w`,
})

export const PHOTOS = {
  sunsetSide: { ...img('fenrir-sunset-side'), w: 2400, h: 1807, alt: 'Fenrir, car 99, parked on the paddock tarmac at sunset with its doors and canopy open' },
  sunsetOpen: { ...img('fenrir-sunset-open'), w: 2250, h: 1688, alt: 'Fenrir with its front panel off, showing the steel tube chassis and wiring, crew working in the distance at sunset' },
  nightHeadlights: { ...img('fenrir-night-headlights'), w: 2259, h: 3000, alt: 'Fenrir at night with its headlights on and a crew member in a hi-vis vest at the window' },
  pitTent: { ...img('crew-pit-tent'), w: 2317, h: 1738, alt: 'Five SolarPack members throwing the wolf sign in front of the car under the pit tent' },
  cockpit: { ...img('crew-cockpit'), w: 2400, h: 1800, alt: 'Driver and passenger in helmets and harnesses inside the Fenrir cockpit' },
  nightLineup: { ...img('crew-night-lineup'), w: 2400, h: 1803, alt: 'The crew posing around Fenrir at night, one member sitting on the ground in front of the door' },
  sunsetSponsors: { ...img('crew-sunset-sponsors'), w: 2400, h: 1803, alt: 'A crew member in a helmet sitting against the sponsor panel on the door of Fenrir at sunset' },
  campus: { src: '/hero_shot.jpg', w: 1600, h: 1067, alt: 'The bare Fenrir chassis parked on a brick plaza on campus' },
  push: { src: '/race2025/race2025_2.jpg', w: 1600, h: 1067, alt: 'Team members pushing the bare chassis past the American Solar Challenge tent' },
  scrutineering: { src: '/race2025/race2025_3.jpg', w: 1600, h: 1067, alt: 'Inspectors and team members leaning over the chassis during scrutineering' },
  suspension: { src: '/race2025/race2025_5.jpg', w: 1600, h: 1067, alt: 'A team member working on a coilover and wheel of the chassis' },
  rear: { src: '/race2025/race2025_7.jpg', w: 1600, h: 1067, alt: 'The rear of the chassis with the battery box, cooling and coilovers exposed' },
  wrench: { src: '/race2025/race2025_8.jpg', w: 1600, h: 1067, alt: 'Two team members fitting a wheel in the garage' },
  paddock: { src: '/race2025/race2025_1.jpg', w: 1600, h: 1067, alt: 'Aerial view of every team and solar car lined up on the tarmac' },
}

export const HERO = {
  lines: ['Heavy.', 'Solar.'],
  sentence: 'SolarPack is NC State’s solar car team. Eighty students turned a gas car into Fenrir, car 99, and took it racing.',
  action: { label: 'Back the build', to: '/sponsors' },
}

// TODO: the notes say the old "Our Mission" was inaccurate; confirm this wording with the team.
export const MISSION = {
  lines: ['NC State’s first solar team', 'took a gas car,', 'gave it the sun,', 'and taught it', 'to drift.'],
  note: 'Fenrir, car 99. Designed, welded and wired by students in Raleigh, North Carolina.',
}

export const STATS = {
  heading: 'By the numbers',
  items: [
    { figure: '80+', caption: 'students build, wire and race the car' },
    { figure: '13.6 kWh', caption: 'battery pack we built by hand' }, // TODO: confirm figure and what "420" means in the notes
    { figure: '2 seats', caption: 'Fenrir carries a passenger' },
  ],
}

// Yearbook superlatives. Swagger, not stats.
export const SUPERLATIVES = [
  { word: 'Fast', caption: 'Voted fastest' },
  { word: 'Heavy', caption: 'Voted heaviest' },
  { word: 'Drift', caption: 'Only solar car to ever drift, and make it cool' },
  { word: 'Gas→Sun', caption: 'First team to do a gas-to-solar conversion' },
  { word: 'Crash', caption: 'Most likely to win in a crash' },
]

// What is already on the car (the old projects in the notes).
export const BUILT = {
  heading: 'Already on the car',
  paragraphs: [
    'Already on the car: everything that got Fenrir through scrutineering and onto the track.',
    'Every slip below is a system our students designed, built and signed off.',
  ],
  slips: [
    { team: 'High Voltage', title: '13.6 kWh battery pack', lines: ['Cells assembled in-house', 'Pack built from scratch', 'Sized for a full race day'] },
    { team: 'Low Voltage', title: 'Decentralized CAN bus', lines: ['One car-wide data line', 'Every board talks on it', 'Fewer wires, fewer faults'] },
    { team: 'Structures', title: 'Military-grade chassis', lines: ['Welded steel tube frame', 'Survived the gas-to-solar swap', 'Built to win a crash'] },
    { team: 'Structures', title: 'Butterfly doors', lines: ['Smooth on their hinges', 'Pull to open', 'Yes, really'] },
    { team: 'Structures', title: 'Ballast boxes', lines: ['Military-grade', 'Hold race ballast', 'Pass inspection'] },
    { team: 'Aerodynamics', title: 'Composite research', lines: ['Panel mold design', 'Materials testing', 'Better layups, lap by lap'] },
  ],
}

// Active projects, one panel per subteam. `id` matches schedule_teams.id in Supabase.
export const SUBTEAMS = [
  {
    id: 'high-voltage', name: 'High Voltage', short: 'HV',
    projects: [
      '1.1 kW dual-phase MPPT boost converter',
      'Synchronous dual-stage buck converter, 85% efficient',
      'Regenerative braking',
    ],
    photo: 'rear',
  },
  {
    id: 'low-voltage', name: 'Low Voltage', short: 'LV',
    projects: [
      'LoRa telemetry board: a long-range radio that streams battery, speed, temperature and solar data to the pit crew during a race',
      'Body control modules: two boards, front and rear, that run the lights, signals, horn, dash and start-up sequence over the car-wide data line',
      'Software-controlled steering: electronic power steering that turns the car quickly, allows remote-controlled driving and has a built-in failsafe',
    ],
    photo: 'scrutineering',
  },
  {
    id: 'vehicle-dynamics', name: 'Vehicle Dynamics', short: 'VD',
    projects: ['Dual-bias brake system with an electronic proportioning valve'],
    photo: 'suspension',
  },
  {
    id: 'aerodynamics', name: 'Aerodynamics', short: 'Aero',
    projects: [
      'Body panels laid up in fiberglass, Lantor Soric and epoxy resin',
      'Front bumper and rear redesigned in 3D',
      'The 2027/28 car, modelled from scratch',
      'A better windshield',
    ],
    photo: 'sunsetSide',
  },
  {
    id: 'structures', name: 'Structures', short: 'Structures',
    projects: [
      'An invincible, non-flammable battery box',
      'Removable rear enclosure for the motor',
      'Critical weight reduction (we know)',
      'Foldable trunk',
      'A new way to attach the aeroshell',
      'Racing-grade padding for the occupant cell',
    ],
    photo: 'wrench',
  },
]

export const ROAD_AHEAD = {
  heading: 'The road ahead',
  items: [
    'A direct-drive system and a more efficient drivetrain, for more speed',
    'Power steering, regenerative braking, cruise control and air conditioning',
    'The most efficient panel process we can find, for a smooth aeroshell',
    'Automation: we are the first solar car team looking into it',
    'A brand new car for 2027/28',
  ],
  quotes: [
    { text: 'We’re making a new car and it’s gonna be awesome and win everything.', who: 'Estyn Gerber, Project Director' },
    { text: 'Very cool, very efficient car. We are the first solar car team looking into automation.', who: 'Alexander Levine, Low Voltage' },
  ],
}

// Funding needs. "Everything" is the honest answer; these are the specifics.
export const NEEDS = {
  word: 'Needs',
  intro: 'Active funding needs: everything. Here is where it goes first.',
  groups: [
    { name: 'Aerodynamics', items: ['Lantor Soric core material', 'Fiberglass', 'Carbon fiber', 'Epoxy resin', 'Respirator cartridges', 'Chemical-resistant gloves', 'Valves and tubing', 'Air compressor tubing'] },
    { name: 'Structures', items: ['Welding tools', 'Metalworking tools'] },
    { name: 'High Voltage', items: ['Converter parts for the MPPT and buck stages', 'Regen braking hardware'] }, // TODO: confirm with HV
    { name: 'Low Voltage', items: ['LoRa radios and antennas', 'Control board PCBs and parts'] }, // TODO: confirm with LV
    { name: 'Vehicle Dynamics', items: ['Brake system components', 'Proportioning valve'] }, // TODO: confirm with VD
    { name: 'Race season', items: ['Entry fees', 'Trailer, travel and lodging for the crew'] }, // TODO: confirm
  ],
}

export const CTA = {
  word: 'Sponsor',
  sentence: 'Put your name on the door. Sponsor tiers and the packet are on the next page.',
  to: '/sponsors',
}

export const FOOTER = {
  invite: ['Come build', 'the next one'],
  action: { label: 'Join the team', href: `mailto:solarpacknc@ncsu.edu?subject=${encodeURIComponent('I want to join SolarPack')}` },
}

// ---------- v2 home ----------

// Set a date (ISO string) to show a live countdown in the hero. TODO: next race name and date.
export const NEXT_RACE = { name: 'Formula Sun Grand Prix', date: null }

export const MANIFESTO = 'NC State’s first solar team took a gas car, gave it the sun, and taught it to drift.'

export const SUPERLATIVE_TICKER = [
  'Voted fastest',
  'Heaviest in the paddock',
  'Only solar car that drifts',
  'First gas-to-solar conversion',
  'Most likely to win in a crash',
]

export const RAIL = [
  { p: 'sunsetSide', tag: 'Race week · Sunset' },
  { p: 'cockpit', tag: 'Driver + passenger' },
  { p: 'nightLineup', tag: 'Night shift' },
  { p: 'pitTent', tag: 'Pit tent' },
  { p: 'sunsetSponsors', tag: 'Sponsor door' },
  { p: 'nightHeadlights', tag: 'Lights on' },
]

export const TIMELINE = [
  { year: 'Before', title: 'A gas car', text: 'Fenrir started life burning gasoline. The team stripped it to the frame and kept the bones.', photo: null },
  { year: '2025', title: 'Bare chassis', text: 'A welded steel frame, a hand-built 13.6 kWh pack and a decentralized CAN bus rolled into scrutineering with no body at all.', photo: 'scrutineering' },
  { year: '2026', title: 'Fenrir gets its skin', text: 'Panels, butterfly doors, the red flame and the number 99. Then it went racing, and sideways.', photo: 'sunsetSide' },
  { year: '2027/28', title: 'A new car', text: 'Modelled from scratch by Aero, with direct drive, regen and the first steps toward automation.', photo: 'nightHeadlights' },
]

// Hall of Fame: every system on the car. status: 'built' | 'shop'
export const SYSTEMS = [
  { name: '13.6 kWh battery pack', team: 'High Voltage', status: 'built', spec: '13.6 kWh', photo: 'rear' },
  { name: 'MPPT boost converter', team: 'High Voltage', status: 'shop', spec: '1.1 kW · dual-phase', photo: 'rear' },
  { name: 'Synchronous buck converter', team: 'High Voltage', status: 'shop', spec: '85% efficient', photo: 'rear' },
  { name: 'Regenerative braking', team: 'High Voltage', status: 'shop', spec: 'Energy back to pack', photo: 'suspension' },
  { name: 'Decentralized CAN bus', team: 'Low Voltage', status: 'built', spec: 'One car-wide line', photo: 'scrutineering' },
  { name: 'LoRa telemetry board', team: 'Low Voltage', status: 'shop', spec: 'Live to the pit', photo: 'cockpit' },
  { name: 'Body control modules', team: 'Low Voltage', status: 'shop', spec: 'Front + rear', photo: 'nightHeadlights' },
  { name: 'Software steering', team: 'Low Voltage', status: 'shop', spec: 'Remote + failsafe', photo: 'cockpit' },
  { name: 'Electronic brake proportioning', team: 'Vehicle Dynamics', status: 'shop', spec: 'Dual-bias', photo: 'suspension' },
  { name: 'Composite body panels', team: 'Aerodynamics', status: 'shop', spec: 'Glass · Soric · epoxy', photo: 'sunsetSide' },
  { name: 'Military-grade chassis', team: 'Structures', status: 'built', spec: 'Welded steel tube', photo: 'push' },
  { name: 'Butterfly doors', team: 'Structures', status: 'built', spec: 'Pull to open', photo: 'sunsetOpen' },
  { name: 'Non-flammable battery box', team: 'Structures', status: 'shop', spec: 'Invincible, allegedly', photo: 'wrench' },
]

export const NUMBERS = [
  { value: 13.6, decimals: 1, unit: 'kWh', label: 'Battery pack, built by hand in-house' },
  { value: 1.1, decimals: 1, unit: 'kW', label: 'Dual-phase MPPT boost converter on the bench' },
  { value: 85, decimals: 0, unit: '%', label: 'Efficiency of our synchronous buck converter' },
  { value: 100, decimals: 0, unit: 'cells', label: 'Watched live by our own iPad app' },
]
