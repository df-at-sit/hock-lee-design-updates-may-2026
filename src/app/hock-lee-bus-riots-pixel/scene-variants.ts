import type {
  BaseSceneConfig,
  SceneAudioCue,
  SceneAnimatedElement,
  SceneArtifact,
  SceneNpcFigure,
} from "./base-scene-shell";
import type { SceneBackgroundReference } from "./scene-title-with-camera";
import { CHARACTER_LABELS, HOCK_LEE_SCENES } from "./scenes";
import {
  STUDENT_HUNGRY_BUS_WORKERS_ACTIONS,
  STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID,
} from "./sidequest-state";

const REAL_PHOTO_DIRECTORY = "/background/hockleescenes/realphotos";

const buildRealPhotoSrc = (fileName: string) =>
  encodeURI(`${REAL_PHOTO_DIRECTORY}/${fileName}`);

const buildBackgroundReference = (
  sceneLabel: string,
  fileName: string,
  caption?: string
): SceneBackgroundReference => ({
  title: `Original photo behind the ${sceneLabel} scene`,
  description: `Archival photograph of ${sceneLabel} that informed the scene background. The in-game version reworks that source image into the pixel-art environment.`,
  imageSrc: buildRealPhotoSrc(fileName),
  imageAlt: `Original ${sceneLabel} reference photo used for the pixel-art scene background`,
  caption: caption ?? `Reference photo for the ${sceneLabel} scene.`,
});

const ALEXANDRA_CROWD_AMBIENT_AUDIO: SceneAudioCue = {
  src: "/sounds/Alexandra-Crowd_Fighting.mp3",
  volume: 0.22,
  loop: true,
};

const POLICE_RADIO_AUDIO: SceneAudioCue = {
  src: "/sounds/police_radio.mp3",
  volume: 0.48,
};

const OLD_PHONE_AUDIO: SceneAudioCue = {
  src: "/sounds/ringing_old_phone.mp3",
  volume: 0.58,
};

const DEFAULT_PETIR_ARTIFACT: SceneArtifact = {
  id: "petir-weekly",
  title: "PAP Publication: Petir Weekly (1959)",
  image: "/artifacts/PAP_publication_petir_weekly_1959.png",
  alt: "PAP publication Petir weekly 1959",
  description:
    "An issue of Petir, the PAP's party organ, first published in 1956 and named after the lightning bolt in the party logo.",
  details:
    "Petir appeared in English, Chinese, and Malay, and PAP leaders such as Lee Kuan Yew, Lim Kim San, and S. Rajaratnam wrote in it about party policy. It is a useful reminder that political ideas travelled through print as well as speeches and rallies.",
  didYouKnow:
    "Consecutive issues from 1959 to 1961 offer a window into the social and political concerns of early self-governing Singapore.",
  inventoryIndex: 0,
  position: {
    left: "30%",
    top: "65%",
    width: "180px",
  },
  chat: {
    master1:
      "Petir Weekly was one way the PAP shared its ideas and plans in 1959.",
    user1: "What does this issue highlight?",
    master2:
      "It highlights party unity and what the PAP wanted to do after the 1959 election.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1581109",
};

const BUS_DEPOT_HOCK_LEE_BUS_ARTIFACT: SceneArtifact = {
  id: "bus-depot-hock-lee-bus",
  title: "Hock Lee Amalgamated Bus Company Albion Bus",
  image: "/artifacts/hockleebusriots/objects/HockLeeBus.png",
  alt: "Hock Lee bus parked on the left side of the depot",
  detailImage: "/artifacts/hockleebusriots/objects/HockLeeBus-real-photo.png",
  detailAlt: "Archival photograph of a Hock Lee Amalgamated Bus Company Albion bus",
  description:
    "A 1956 National Archives photograph of a Hock Lee bus. In this scene, it reminds us what the strike stopped: the buses that normally carried the city were held behind the depot gates.",
  details:
    "Images like this anchor the story in the physical world of transport work. The conflict was not abstract. It involved depots, schedules, fares, and the workers whose dismissals turned a company dispute into a public blockade.",
  didYouKnow:
    "Archival vehicle photographs often preserve small details such as company markings and body design that help historians identify a bus years later.",
  inventoryIndex: 0,
  position: {
    right: "72%",
    top: "26%",
    width: "470px",
  },
  chat: {
    master1:
      "The National Archives identifies this as a Hock Lee bus photographed in 1956. In 1955, buses like this became symbols of a city forced to notice the strike.",
    user1: "Why make the bus itself an artifact here?",
    master2:
      "Because once dismissed workers sat at the gates and stopped departures, even the bus itself became evidence that ordinary business had been interrupted.",
  },
  rootsUrl:
    "https://www.nas.gov.sg/archivesonline/photographs/record-details/b57b63a8-1162-11e3-83d5-0050568939ad",
};

const ALEXANDRA_ROAD_RIOT_CONTROL_TRUCK_ARTIFACT: SceneArtifact = {
  id: "alexandra-road-riot-control-truck",
  title: "Riot Control Truck",
  image: "/artifacts/hockleebusriots/objects/Riot-Control-Truck.png",
  alt: "Riot control truck stationed on the right side of Alexandra Road",
  description:
    "An archival photograph of riot control vehicle SG2556, dated 1946 to 1952 and held by the National Museum of Singapore.",
  details:
    "Because the catalogue entry is for a photograph rather than the vehicle itself, it works here as evidence of what happened once Hock Lee was handled as a public-order emergency instead of only as a labour dispute.",
  didYouKnow:
    "The linked collection item is a photographic print from Singapore, not the vehicle itself.",
  inventoryIndex: 0,
  position: {
    right: "0%",
    top: "30%",
    width: "480px",
  },
  chat: {
    master1:
      "A vehicle like this changes the road immediately. It turns a strike into a confrontation that looks and feels like state force.",
    user1: "Why does the truck matter in this scene?",
    master2:
      "Because by 12 May the dispute was no longer being contained as a workplace issue. State power was arriving as equipment, intimidation, and public spectacle.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1009098",
};

const ALEXANDRA_ROAD_POLICE_TURRET_BELL_ARTIFACT: SceneArtifact = {
  id: "alexandra-road-police-turret-bell",
  title: "Police Turret Bell",
  image: "/artifacts/hockleebusriots/objects/police-turret-bell.png",
  alt: "Police turret bell positioned with the riot-control equipment on Alexandra Road",
  description:
    "A metal police turret bell from 1960s Singapore, preserved in the National Museum of Singapore and catalogued as part of a larger set of police riot gear.",
  details:
    "Roots groups the bell with shields, batons, truncheons, intercoms, and radios that police carried during years of repeated unrest and strike action. In this scene, it helps show how a labour dispute came to be managed through equipment designed for crowd control.",
  didYouKnow:
    "The Roots entry notes that police dealt with 300 strikes in 1955 alone, while a formal Police Riot Squad was only created a decade later in 1965.",
  inventoryIndex: 1,
  position: {
    right: "10%",
    top: "35%",
    width: "88px",
    zIndex: 8,
  },
  chat: {
    master1:
      "A bell like this belongs to a police vehicle, not a negotiation table. It signals coordination, urgency, and command.",
    user1: "Why add the turret bell to Alexandra Road?",
    master2:
      "Because it makes the scene feel organized as a police operation. The strike is no longer just workers and students in the street. It is being answered with riot-control hardware.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1112147",
};

const ALEXANDRA_ROAD_POLICE_SHIELD_ARTIFACT: SceneArtifact = {
  id: "alexandra-road-police-shield",
  title: "Police Shield",
  image: "/artifacts/hockleebusriots/objects/police-sheild.png",
  alt: "Police shield lying among the riot-control equipment on Alexandra Road",
  description:
    "A wicker police shield from 1960s Singapore, catalogued by the National Museum of Singapore as part of the police force's riot gear.",
  details:
    "The Roots record links the shield to a wider set of policing equipment used during a decade marked by riots and heavy strike activity. In the Alexandra Road scene, that matters because the shield stands for the state preparing to meet a crowd with protection, pressure, and force rather than mediation.",
  didYouKnow:
    "Roots explicitly connects this riot-gear collection to the Maria Hertogh riots of 1950 and the Hock Lee Bus Riots of 1955 as moments of high security on Singapore's streets.",
  inventoryIndex: 2,
  position: {
    right: "26%",
    top: "68%",
    width: "124px",
    zIndex: 8,
  },
  chat: {
    master1:
      "A shield changes the physical logic of the street. It lets a line advance, brace, and keep moving into a crowd.",
    user1: "What does the shield tell us about this moment?",
    master2:
      "It shows that Alexandra Road is being handled as a public-order confrontation. Once shields appear, fear, distance, and force start shaping what everyone thinks will happen next.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1114151",
};

const HOME_CIVIL_SERVANT_POSTER_ARTIFACT: SceneArtifact = {
  id: "civil-servant-home-poster",
  title: "Singapore: The City of Tropical Splendour",
  image: "/artifacts/hockleebusriots/objects/Civil Servant_Home_Poster.png",
  alt: "Singapore travel poster in the civil servant's home",
  description:
    "A 1955 poster advertising Singapore as 'The City of Tropical Splendour', showing the waterfront, tropical fruit, a trishaw rider, a satay seller, a woman in local dress, and the statue of Stamford Raffles.",
  details:
    "The poster presents Singapore as colorful, scenic, and welcoming. In Rajiv's home, that polished tourist image sits uneasily beside paperwork about labour tension and unrest.",
  didYouKnow:
    "The poster compresses food, transport, dress, and landmarks into one promotional image of the city.",
  inventoryIndex: 0,
  position: {
    right: "10%",
    top: "24%",
    width: "72px",
  },
  chat: {
    master1:
      "This poster sells Singapore as colourful, prosperous, and inviting. It is the kind of image a government would want visitors and residents to remember.",
    user1: "Why place this in the civil servant's home?",
    master2:
      "Because it captures the official image of Singapore at the very moment everyday reports are revealing strain beneath that surface.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1315396",
};

const HOME_CIVIL_SERVANT_PARKER_PEN_ARTIFACT: SceneArtifact = {
  id: "civil-servant-home-parker-pen",
  title: "Parker Fountain Pen",
  image: "/artifacts/hockleebusriots/objects/Civil Servant_Home_Parker Pen.png",
  alt: "Parker fountain pen laid across the civil servant's table",
  description:
    "Fountain pens were the kind students began using once they reached Standard III, when fountain pens and pencils replaced dip pens and inkwells.",
  details:
    "Much school stationery and many teaching aids had to be ordered from places such as Shanghai and England. In this scene, the pen still works as a reminder that writing was a material routine built around refillable tools, imported supplies, and handwritten records.",
  didYouKnow:
    "Switching from a dip pen to a fountain pen meant students no longer had to keep reaching back to an inkwell while they wrote.",
  inventoryIndex: 1,
  position: {
    left: "55.5%",
    top: "60.5%",
    width: "90px",
  },
  chat: {
    master1:
      "A fountain pen makes official writing portable. Notes, comments, and corrections can move with the person responsible for them.",
    user1: "Why does that matter for a civil servant?",
    master2:
      "Because bureaucracy runs on written judgment. Pens like this helped turn meetings, rumours, and complaints into records that could shape policy.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1082316",
};

const HOME_BUS_WORKER_TINGKAT_ARTIFACT: SceneArtifact = {
  id: "bus-worker-home-tingkat",
  title: "Tiffin Carrier (Tingkat)",
  image: "/artifacts/hockleebusriots/objects/Bus Driver_Home_ Tingkat.png",
  alt: "Metal tiffin carrier resting in the bus worker's home",
  description:
    "An insulated tiffin carrier acquired in India during World War II and brought back to Singapore after the war.",
  details:
    "This particular carrier later kept food warm on trips to Bukit Brown Cemetery for ritual offerings and ancestor prayers. In the scene, it still helps evoke how portable containers moved food, care, and obligation between home and the outside world.",
  didYouKnow:
    "This specific carrier is traced to Mdm Lim Yeok Quan and Ong Peng Hock, who brought it back to Singapore after wartime evacuation.",
  inventoryIndex: 0,
  position: {
    left: "47%",
    top: "52.5%",
    width: "120px",
  },
  chat: {
    master1:
      "A tingkat keeps food warm and portable, which mattered in homes organized around long days away from the house.",
    user1: "Why does it fit this scene so well?",
    master2:
      "Because labour history is also home life. Someone has to prepare, pack, and carry the meal that follows a worker into the city and back again.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1513819",
};

const HOME_BUS_WORKER_HAND_FAN_ARTIFACT: SceneArtifact = {
  id: "bus-worker-home-hand-fan",
  title: "Rattan Woven Hand Fan",
  image: "/artifacts/hockleebusriots/objects/Bus Worker_Home_Rattan Woven Hand fan.png",
  alt: "Rattan woven hand fan placed in the bus worker's home",
  description:
    "A hand fan from Terengganu, acquired in 1951 and made from woven leaf material.",
  details:
    "Even with sparse catalogue text, its materials and construction make it a strong reminder that everyday comfort often depended on portable, hand-worked objects rather than electric appliances.",
  didYouKnow:
    "This item is catalogued as a woven hand fan in the Asian Civilisations Museum collection.",
  inventoryIndex: 1,
  position: {
    left: "35%",
    top: "51.5%",
    width: "112px",
  },
  chat: {
    master1:
      "A hand fan records the feel of the room as much as the look of it. It suggests heat, closeness, and the need to keep making yourself comfortable.",
    user1: "What does that add to the worker's home?",
    master2:
      "It grounds the scene in everyday labour. Even rest takes effort in a cramped home after a long day of work.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1026678",
};

const HOME_BUS_WORKER_RETURN_BADGE_ARTIFACT: SceneArtifact = {
  id: "bus-worker-home-driver-badge",
  title: "Driver's Badge 143",
  image: "/artifacts/hockleebusriots/objects/bus-badge.png",
  alt: "Hock Lee Amalgamated Bus Company driver's badge resting in the bus worker's home",
  description:
    "Driver's Badge 143 from Hock Lee Amalgamated Bus Co. Ltd, dated 1952 and catalogued as an identification badge from Singapore.",
  details:
    "In the post-riot home scene, the badge works as a small but loaded object. It marks the worker as part of the company system, yet after the violence it also feels like a fragile proof of labour, belonging, and what the struggle has cost.",
  didYouKnow:
    "The badge measures just 4.8 by 2.7 cm in the National Museum of Singapore collection.",
  inventoryIndex: 2,
  position: {
    left: "58%",
    top: "59.5%",
    width: "46px",
  },
  chat: {
    master1:
      "A badge like this turns a worker into a numbered employee, but it also becomes a personal sign of the job he risks everything to keep.",
    user1: "Why place the badge here after the riot?",
    master2:
      "Because after the shouting ends, the struggle comes back to the smallest things. A badge can stand for wages, dignity, and whether a worker still has a place to return to.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1125787",
};

const HOME_STUDENT_KEROSENE_LAMP_ARTIFACT: SceneArtifact = {
  id: "student-home-kerosene-lamp",
  title: "Kerosene Lamp",
  image: "/artifacts/hockleebusriots/objects/Student_Home_Kerosene lamp.png",
  alt: "Kerosene lamp in the student's home",
  description:
    "A kerosene lamp probably used by amahs, or Cantonese domestic servants, to light their tiny rented cubicles in Chinatown.",
  details:
    "That provenance makes the object a reminder that evening light in modest quarters had to be bought, lit, and maintained. In the student's home, it helps ground reading, family talk, and worry in material conditions rather than abstraction.",
  didYouKnow:
    "Many amahs lived with employers and returned to these cubicles mainly to collect mail, visit other amahs, or stay between jobs.",
  inventoryIndex: 0,
  position: {
    left: "73.5%",
    top: "41%",
    width: "64px",
  },
  chat: {
    master1:
      "A lamp like this turns study and family talk into something physical. Light has to be prepared, maintained, and paid for.",
    user1: "Why does that matter in the student's home?",
    master2:
      "Because it reminds us that political awareness grows inside ordinary domestic routines, not only in rallies or classrooms.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1049615",
};

const HOME_STUDENT_TEXTBOOK_ARTIFACT: SceneArtifact = {
  id: "student-home-textbook",
  title: "Chinese Textbook",
  image: "/artifacts/hockleebusriots/objects/Student_Home_Textbook.png",
  alt: "Chinese textbook resting on the student's coffee table",
  description:
    "A textbook printed in Hong Kong and distributed by The Commercial Press for Chinese-medium upper primary schools in Singapore and the Federation of Malaya.",
  details:
    "The Fuxing history series reflected changing political conditions in China and emphasized patriotism. That makes the book useful here as a reminder that school texts also carried political values, not just lessons and facts.",
  didYouKnow:
    "Editions for overseas Chinese students reflected a changing educational climate in which Chinese communities in Singapore and Malaya were encouraged to build loyalty to their countries of residence.",
  inventoryIndex: 1,
  position: {
    left: "45.5%",
    top: "60%",
    width: "82px",
  },
  chat: {
    master1:
      "Textbooks were not only about facts. They also shaped how students imagined history, belonging, and political duty.",
    user1: "Why is that important here?",
    master2:
      "Because student politics did not begin only in protests. It also grew from the ideas, loyalties, and language students met in school and then carried home.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1496823",
};

const HOME_STUDENT_TINGKAT_ARTIFACT: SceneArtifact = {
  id: "student-home-tingkat",
  title: "Tingkat Carrier",
  image: "/artifacts/hockleebusriots/objects/Bus Driver_Home_ Tingkat.png",
  alt: "Metal tingkat carrier in the student's home",
  description:
    "A tingkat carrier keeps food stacked, portable, and warm enough to carry across town.",
  details:
    "For the student sidequest, it becomes the practical object that turns sympathy for hungry workers into help that can actually reach the bus depot.",
  didYouKnow:
    "Tingkat carriers were everyday food containers, but here the object also carries care from home into a public labour dispute.",
  inventoryIndex: 2,
  position: {
    left: "55.5%",
    top: "58%",
    width: "88px",
  },
  chat: {
    master1:
      "This tingkat can carry food to the depot without spilling or cooling too quickly.",
    user1: "Why use this for the workers?",
    master2:
      "Because the sidequest needs more than concern. It needs something that can move a meal from home to the people waiting at the gates.",
  },
  sideQuestActionOnOpen: {
    sideQuestId: STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID,
    actionId: STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.findTingkat,
  },
};

const COMMAND_CENTER_RADIO_ARTIFACT: SceneArtifact = {
  id: "command-center-radio",
  title: "National Panasonic 8 Transistor Radio",
  image: "/artifacts/hockleebusriots/objects/radio.png",
  alt: "National Panasonic transistor radio",
  description:
    "A portable receiver built on transistor-based circuitry and popular from the mid-1950s onward.",
  details:
    "Its portability changed listening habits because people could carry news and music with them. In this scene, that matters because updates no longer have to stay fixed to one room or wait for the next day's paper.",
  didYouKnow:
    "Billions of transistor radios were produced worldwide in the 1960s and 1970s before newer portable players began to replace them.",
  inventoryIndex: 2,
  position: {
    left: "24%",
    top: "45%",
    width: "84px",
  },
  chat: {
    master1:
      "This was a popular transistor radio format in the 1950s and 1960s.",
    user1: "Why does this matter in the command center?",
    master2:
      "Phones carry private reports, but radio spreads the public version almost at once.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1039006",
};

const CLASSROOM_RADIO_ARTIFACT: SceneArtifact = {
  id: "classroom-radio",
  title: "Classroom Election Radio",
  image: "/artifacts/hockleebusriots/objects/radio.png",
  alt: "Portable transistor radio on a classroom desk",
  description:
    "A portable receiver built on transistor-based circuitry and popular from the mid-1950s onward.",
  details:
    "Its portability changed listening habits because people could carry news and music with them. In a classroom, that means politics can enter a lesson in real time instead of waiting for the next newspaper.",
  didYouKnow:
    "Billions of transistor radios were produced worldwide in the 1960s and 1970s before newer portable players began to replace them.",
  inventoryIndex: 2,
  position: {
    left: "43.5%",
    top: "56.5%",
    width: "68px",
  },
  chat: {
    master1:
      "On 2 April 1955, students could hear that Labour Front had won the election and would lead Singapore's first locally elected government.",
    user1: "Why does that matter inside a classroom?",
    master2:
      "Once the results are heard aloud, politics stops feeling far away. Students start asking what change might mean for workers, schools, and Singapore.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1039006",
};

const CITY_HALL_DAVID_MARSHALL_NPC = {
  id: "city-hall-david-marshall",
  image: "/npcfigures/davidmarshall/David Marshall_South.webp",
  alt: "David Marshall in City Hall",
  chatBubbleSpeaker: "David Marshall",
  chatBubbleTexts: [
    "Labour Front has won, but victory only buys us the right to be judged.",
    "Workers, students, and the British will all test whether this government moves faster than the grievances it inherited.",
    "Watch Hock Lee closely. If a bus dispute hardens into a public confrontation, it becomes our first real measure in office.",
    "Bring me facts, not celebration. Elections end in one night; governing begins the morning after.",
  ],
  autoOpenChatOnLoad: true,
  position: {
    left: "clamp(0px, calc(55vw - 300px), calc(100vw - 310px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_BRITISH_OFFICER_SOUTH_NPC = {
  id: "city-hall-british-officer-south",
  image: "/npcfigures/britishofficer/British Officer_South.webp",
  alt: "British officer facing south in City Hall",
  chatBubbleSpeaker: "Commander Albert",
  chatBubbleTexts: [
    "Singapore may have a new Chief Minister, but communist influence has not disappeared.",
    "Bus workers are upset, and communist groups know how to turn that anger into political support.",
    "If Marshall moves too slowly, they will use this dispute to grow stronger.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 760px), calc(100vw - 440px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_BRITISH_OFFICER_WEST_NPC = {
  id: "city-hall-british-officer-west",
  image: "/npcfigures/britishofficer/British Officer_East.webp",
  alt: "British officer facing west in City Hall",
  chatBubbleSpeaker: "Major Alfred",
  chatBubbleTexts: [
    "The British are watching communist influence very closely in Singapore.",
    "Communist organisers are active in unions and Chinese schools, especially when people already feel ignored.",
    "That is why Hock Lee matters. A labour dispute can become part of a bigger communist movement very quickly.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 680px), calc(100vw - 570px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_CHARACTER_SCALE = 1.3;
const CITY_HALL_NPC_LEFT_OVERRIDES: Record<string, string> = {
  "city-hall-british-officer-west":
    "clamp(0px, calc(55vw + 110px), calc(100vw - 270px))",
  "city-hall-british-officer-south":
    "clamp(0px, calc(55vw + 220px), calc(100vw - 140px))",
  "city-hall-david-marshall":
    "clamp(0px, calc(55vw - 150px), calc(100vw - 160px))",
};

const PARTY_WORKER_MANIFESTO_ARTIFACT: SceneArtifact = {
  id: "labour-front-manifesto",
  title: "Labour Front Manifesto",
  image: "/artifacts/hockleebusriots/objects/labourpartymanifesto.png",
  alt: "Labour Front manifesto leaflet",
  description:
    "A Labour Front manifesto from the moment the party moved from election victory into government under David Marshall in April 1955.",
  details:
    "Labour Front won the 2 April 1955 election, formed a coalition government, and brought Marshall into office as Singapore's first Chief Minister. That makes the manifesto read less like campaign language and more like a benchmark people could use to judge the new government on labour grievances, living costs, education, and the wider demand for self-government.",
  didYouKnow:
    "Because Labour Front had only just taken office, documents like this were tested almost immediately when the Hock Lee dispute forced the government to respond to worker anger and public unrest.",
  inventoryIndex: 1,
  position: {
    left: "32%",
    top: "65%",
    width: "180px",
  },
  chat: {
    master1:
      "Now that Labour Front has won, people are checking whether these promises will become real action.",
    user1: "What should I focus on first?",
    master2:
      "Start with worker conditions, transport problems, and the cost of living. Those are the promises people will test first.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1223724",
};

const STUDENT_RIOT_WOODBLOCK_PRINT_ARTIFACT: SceneArtifact = {
  id: "student-riot-woodblock-print",
  title: "Student Riot Woodblock Print",
  image: "/artifacts/hockleebusriots/objects/student-riot-woodblock-print.png",
  alt: "Student riot woodblock print",
  description:
    "A woodblock print depicting the 13 May 1954 Chinese Middle School student protest against military conscription under the National Service Ordinance.",
  details:
    "Many students saw conscription as unfair because it asked them to defend a colonial government that had not advanced Chinese education and seemed to favor the English-educated in jobs and opportunities.",
  didYouKnow:
    "When the protest turned violent, 26 people were injured and 45 students were arrested.",
  inventoryIndex: 1,
  position: {
    left: "32%",
    top: "65%",
    width: "180px",
  },
  chat: {
    master1:
      "This woodcut turns the 13 May 1954 student protest into an image people can carry, share, and remember.",
    user1: "Why would this print matter in the market?",
    master2:
      "Because it gives people a shared picture of the protest. In a market, that can spread the story from stall to stall.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1132595",
};

const CITY_HALL_PARTY_WORKER_ARTIFACT_NPC: SceneNpcFigure = {
  id: "city-hall-party-worker-manifesto",
  image: "/artifacts/hockleebusriots/heldartifacts/char-holding-manifestoro.png",
  alt: "Party worker holding a manifesto in City Hall",
  chatBubbleSpeaker: "Party Worker",
  chatBubbleText:
    "Labour Front has won. Read the manifesto carefully; people will now expect these promises to be kept.",
  npcType: "artifact",
  autoChatCycle: {
    initialDelayMs: 2000,
    firstVisibleMs: 5000,
    hiddenMs: 2000,
    secondVisibleMs: 5000,
  },
  flipHorizontallyEachCycle: true,
  artifactWalkToSideBeforeOpen: "right",
  artifactId: PARTY_WORKER_MANIFESTO_ARTIFACT.id,
  position: {
    left: "clamp(0px, calc(55vw - 680px), calc(100vw - 810px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_NPCS: SceneNpcFigure[] = [
  CITY_HALL_BRITISH_OFFICER_WEST_NPC,
  CITY_HALL_BRITISH_OFFICER_SOUTH_NPC,
  CITY_HALL_DAVID_MARSHALL_NPC,
].map((npcFigure) => {
  const overriddenLeft = CITY_HALL_NPC_LEFT_OVERRIDES[npcFigure.id];
  if (!overriddenLeft) return npcFigure;
  return {
    ...npcFigure,
    position: {
      ...npcFigure.position,
      left: overriddenLeft,
    },
  };
});

const MARKET_DEVAN_NAIR_NPC = {
  id: "market-devan-nair",
  image: "/npcfigures/devannair/Devan Nair_South.webp",
  alt: "Devan Nair facing south in the market",
  chatBubbleSpeaker: "Devan Nair",
  chatBubbleTexts: [
    "I'm Devan Nair, a trade unionist working with workers across Singapore.",
    "Everywhere I go I hear the same complaint: long hours, low pay, and then the insult of being told to endure it quietly.",
    "When wages fail and prices rise, a bus worker, hawker, and dock labourer start hearing themselves in one another.",
    "That is the ground on which a strike like Hock Lee can gather sympathy quickly.",
    "If Singapore wants stability, it has to treat labour as a human problem, not only a police one.",
  ],
  position: {
    left: "clamp(0px, calc(55vw + 250px), calc(100vw - 250px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const MARKET_FISHERMAN_NPC = {
  id: "market-fisherman-south",
  image: "/npcfigures/marketfisherman/Fisherman_South.webp",
  alt: "Fisherman facing south in the market",
  className: "npc-figure--fisherman",
  chatBubbleSpeaker: "Pak Hamid",
  chatBubbleTexts: [
    "Some mornings I bring in a fair catch and still go home short after paying for rice, fuel, and rent.",
    "The city grows, but for men like us the kampong stays crowded and the drains stay bad.",
    "That is why people discuss Hock Lee here. Rising prices are felt in the market before they become speeches elsewhere.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 100px), calc(100vw - 140px))",
    top: "clamp(0px, 58vh, calc(100vh - 250px))",
    width: "115px",
  },
};

const MARKET_ARTIST_NPC: SceneNpcFigure = {
  id: "market-artist",
  image: "/artifacts/hockleebusriots/heldartifacts/artist-holding-blockprint.png",
  alt: "Artifact NPC holding a print in the market",
  chatBubbleSpeaker: "Artist",
  chatBubbleText:
    "This woodcut shows the Chinese Middle School students' protest of 13 May 1954. Images like this help explain why students might answer Hock Lee with sympathy a year later.",
  npcType: "artifact",
  artifactWalkToSideBeforeOpen: "right",
  artifactId: STUDENT_RIOT_WOODBLOCK_PRINT_ARTIFACT.id,
  position: {
    left: "clamp(0px, calc(55vw + 50px), calc(100vw - 20px))",
    top: "clamp(0px, 58vh, calc(100vh - 250px))",
    width: "115px",
  },
};

const MARKET_FOOD_SELLER_EAST_NPC = {
  id: "market-food-seller-east",
  image: "/npcfigures/marketfoodseller/Food Seller_East.webp",
  alt: "Food seller facing east in the market",
  chatBubbleSpeaker: "Mdm Lee",
  chatBubbleTexts: [
    "Customers complain my noodles cost more now, but charcoal, oil, and ingredients all cost more too.",
    "The poor blame the seller, the seller blames the wholesaler, and everyone waits to see whether the new government listens any better than the old one.",
    "A family can work all day in Singapore and still worry about next month's rent. That is the sort of pressure that makes strikes feel understandable.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 750px), calc(100vw - 330px))",
    top: "clamp(0px, calc(76vh), calc(100vh - 320px))",
    width: "200px",
  },
};

const MARKET_BUS_WORKER_EAST_NPC = {
  id: "market-bus-worker-east",
  image: "/npcfigures/busdepotworker1/Bus Worker01_East.webp",
  alt: "Muthu Krishnan, an Indian bus worker, facing east in the market",
  chatBubbleSpeaker: "Muthu Krishnan",
  chatBubbleTexts: [
    "So many hours on the road and still my pay disappears the moment I hand it over at home.",
    "They want punctual buses, but drivers are tired, conductors are stretched, and the company treats us as replaceable.",
    "That is why men at Hock Lee are talking about more than money now. Being treated as disposable has its own anger.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 560px), calc(100vw - 500px))",
    top: "clamp(0px, 66vh, calc(100vh - 180px))",
    width: "155px",
  },
};

const MARKET_BUS_WORKER_SOUTH_NPC = {
  id: "market-bus-worker-south",
  image: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
  alt: "Tan Ah Seng, a Chinese bus worker, facing south in the market",
  chatBubbleSpeaker: "Tan Ah Seng",
  chatBubbleTexts: [
    "I am struggling to find a new house. The old place leaks, but every better room costs more than I can manage.",
    "We keep the city moving, yet many of us still raise children in cramped quarters with bad roofs and worse sanitation.",
    "A man can accept hard work. It is harder to accept that hard work still buys so little and still earns so little respect.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 420px), calc(100vw - 360px))",
    top: "clamp(0px, 66vh, calc(100vh - 180px))",
    width: "155px",
  },
};

const MARKET_BUS_WORKER_WEST_NPC = {
  id: "market-bus-worker-west",
  image: "/npcfigures/busdepotworker3/Bus Worker 02_0004.webp",
  alt: "Hassan bin Ali, a Malay bus worker, facing west in the market",
  chatBubbleSpeaker: "Hassan bin Ali",
  chatBubbleTexts: [
    "Everything is so expensive now. I joke about eggs, but truthfully even simple meals are becoming a calculation.",
    "When wages stay flat and food climbs, every small purchase turns into an argument at home.",
    "That is why people join unions. It is not only politics. It is about surviving with some dignity.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 280px), calc(100vw - 220px))",
    top: "clamp(0px, 66vh, calc(100vh - 180px))",
    width: "155px",
  },
};

const GOVERNMENT_OFFICE_NPC_WIDTH = "210px";
const GOVERNMENT_OFFICE_NPC_TOP = "66%";
const GOVERNMENT_OFFICE_NPC_Y_OFFSET = "translateY(-100px)";
const GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET = "400px";
const GOVERNMENT_OFFICE_DESK_ARTIFACT_WIDTH = "46px";
const GOVERNMENT_OFFICE_DESK_ARTIFACT_LEFT = `clamp(40px, calc(54.5% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET} - 690px), calc(100vw - 96px))`;
const GOVERNMENT_OFFICE_DESK_ARTIFACT_TOP = "46%";

const GOVERNMENT_OFFICE_PIPES_ARTIFACT: SceneArtifact = {
  id: "government-office-david-marshall-pipes",
  title: "Pipes and pipe stand",
  image: "/artifacts/hockleebusriots/objects/davidmarshallpipes.png",
  alt: "David Marshall's pipes and pipe stand on the government office desk",
  description:
    "David Marshall's favourite pipes and pipe holder, with the stand made for him by his son Jonathan.",
  details:
    "The same entry treats the pipe as part of Marshall's public image alongside his bush jacket. In this scene, that makes the set feel less like desk decoration and more like a marker of a very specific political personality in the room.",
  didYouKnow:
    "The pipe became a trademark object on Marshall's desk and in photographs throughout his public life.",
  inventoryIndex: 0,
  position: {
    left: GOVERNMENT_OFFICE_DESK_ARTIFACT_LEFT,
    top: GOVERNMENT_OFFICE_DESK_ARTIFACT_TOP,
    width: GOVERNMENT_OFFICE_DESK_ARTIFACT_WIDTH,
    transform: "translateX(-50%)",
  },
  chat: {
    master1:
      "These were David Marshall's favorite pipes and pipe holder, with the tobacco container belonging to the same set.",
    user1: "Why notice the pipes during this meeting?",
    master2:
      "Because the pipe had become part of Marshall's public image. On his desk, it helps show who holds authority in the room.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1134262",
};

const GOVERNMENT_OFFICE_PIPES_ARTIFACT_NPC: SceneNpcFigure = {
  id: "government-office-david-marshall-pipes-object",
  image: "/artifacts/hockleebusriots/objects/davidmarshallpipes.png",
  alt: "David Marshall's pipes resting on the desk in the government office",
  npcType: "artifact",
  artifactId: GOVERNMENT_OFFICE_PIPES_ARTIFACT.id,
  interactionPromptIcon: "artifact",
  position: {
    left: GOVERNMENT_OFFICE_DESK_ARTIFACT_LEFT,
    top: GOVERNMENT_OFFICE_DESK_ARTIFACT_TOP,
    width: GOVERNMENT_OFFICE_DESK_ARTIFACT_WIDTH,
    transform: "translateX(-50%)",
  },
  zIndex: 9,
};

const GOVERNMENT_OFFICE_DAVID_MARSHALL_NPC: SceneNpcFigure = {
  id: "government-office-david-marshall-south",
  image: "/npcfigures/davidmarshall/David Marshall_South.webp",
  alt: "David Marshall facing south in the government office",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "David Marshall",
  chatBubbleTexts: [
    "We are not here to trade speeches. The dismissed men must be discussed directly or this room is only theatre.",
    "If the company wants buses running, it must answer why so many workers were pushed out and why the union was handled this way.",
    "I want a settlement before Hock Lee becomes a public spectacle the whole city feels compelled to join.",
  ],
  position: {
    left: `calc(50% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET})`,
    top: GOVERNMENT_OFFICE_NPC_TOP,
    width: GOVERNMENT_OFFICE_NPC_WIDTH,
    transform: `translateX(-50%) ${GOVERNMENT_OFFICE_NPC_Y_OFFSET}`,
  },
};

const GOVERNMENT_OFFICE_LEE_KUAN_YEW_NPC: SceneNpcFigure = {
  id: "government-office-lee-kuan-yew-south",
  image: "/npcfigures/leekuanyew/LeeKuanYew_South.webp",
  alt: "Lee Kuan Yew standing in the background of the government office",
  chatBubbleSpeaker: "Lee Kuan Yew",
  chatBubbleTexts: [
    "Lee Kuan Yew. I'm here as a lawyer and observer, not the man leading the meeting.",
    "Marshall is trying to keep a labour dispute from becoming a wider political confrontation.",
    "Once workers sit at the gates and the public starts taking sides, every legal point becomes a political one.",
    "What happens in this room will shape not just the company and the union, but how this government is judged.",
  ],
  position: {
    left: "26%",
    top: "56%",
    width: "150px",
    transform: "translateX(-50%) translateY(-40px)",
  },
};

const GOVERNMENT_OFFICE_FENG_SWEE_SUAN_NPC: SceneNpcFigure = {
  id: "government-office-feng-swee-suan-east",
  image: "/npcfigures/fengsweesuan/Feng Swee Suan_East South.webp",
  alt: "Feng Swee Suan facing southeast in the government office",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Feng Swee Suan",
  chatBubbleTexts: [
    "Our men did not come here over one insult. Hock Lee denied union leave, favoured a rival union, and kept dismissing workers as warnings to the rest.",
    "Begin with the 229 men thrown out. If they are not taken back, no one at the depot will call these talks serious.",
    "The workers have shown discipline so far. Do not answer that discipline with delay.",
  ],
  position: {
    left: `calc(42% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET})`,
    top: GOVERNMENT_OFFICE_NPC_TOP,
    width: GOVERNMENT_OFFICE_NPC_WIDTH,
    transform: `translateX(-50%) ${GOVERNMENT_OFFICE_NPC_Y_OFFSET}`,
  },
};

const GOVERNMENT_OFFICE_BUS_BOSS_NPC: SceneNpcFigure = {
  id: "government-office-bus-boss-west",
  image: "/npcfigures/busboss/Buss Boss_West.webp",
  alt: "Bus company boss facing west in the government office",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Bus Company Boss",
  chatBubbleTexts: [
    "You speak as if the company has no problems of its own. Costs are rising too, and discipline inside the depot matters.",
    "You ask about dismissals as though idle buses and disorder cost nothing. They do.",
    "I can discuss terms, but not while a hunger strike and blocked gate are being used to force my hand.",
  ],
  position: {
    left: `calc(61% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET})`,
    top: GOVERNMENT_OFFICE_NPC_TOP,
    width: GOVERNMENT_OFFICE_NPC_WIDTH,
    transform: `translateX(-50%) ${GOVERNMENT_OFFICE_NPC_Y_OFFSET}`,
  },
};

const GOVERNMENT_OFFICE_NPCS: SceneNpcFigure[] = [
  GOVERNMENT_OFFICE_LEE_KUAN_YEW_NPC,
  GOVERNMENT_OFFICE_DAVID_MARSHALL_NPC,
  GOVERNMENT_OFFICE_FENG_SWEE_SUAN_NPC,
  GOVERNMENT_OFFICE_BUS_BOSS_NPC,
  GOVERNMENT_OFFICE_PIPES_ARTIFACT_NPC,
];

const BUS_DEPOT_WORKER_1_NPCS = [
  {
    id: "bus-depot-worker-1-east",
    image: "/npcfigures/busdepotworker1/Bus Worker01_East.webp",
    alt: "Bus depot worker 1 facing east",
    position: {
      left: "8%",
      top: "72%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-1-north",
    image: "/npcfigures/busdepotworker1/Bus Worker01_North.webp",
    alt: "Bus depot worker 1 facing north",
    position: {
      left: "60%",
      top: "68%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-1-south",
    image: "/npcfigures/busdepotworker1/Bus Worker01_South.webp",
    alt: "Bus depot worker 1 facing south",
    position: {
      left: "28%",
      top: "68%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-1-west",
    image: "/npcfigures/busdepotworker1/Bus Worker01_West.webp",
    alt: "Bus depot worker 1 facing west",
    position: {
      left: "38%",
      top: "64%",
      width: "132px",
    },
  },
];

const BUS_DEPOT_WORKER_2_NPCS = [
  {
    id: "bus-depot-worker-2-east",
    image: "/npcfigures/busdepotworker2/Bus Worker02_East.webp",
    alt: "Bus depot worker 2 facing east",
    position: {
      left: "48%",
      top: "65%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-2-north",
    image: "/npcfigures/busdepotworker2/Bus Worker02_North.webp",
    alt: "Bus depot worker 2 facing north",
    position: {
      left: "58%",
      top: "61%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-2-south",
    image: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
    alt: "Bus depot worker 2 facing south",
    position: {
      right: "28%",
      top: "67%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-2-west",
    image: "/npcfigures/busdepotworker2/Bus Worker02_West.webp",
    alt: "Bus depot worker 2 facing west",
    position: {
      right: "18%",
      top: "63%",
      width: "132px",
    },
  },
];

const BUS_DEPOT_WORKER_3_NPCS = [
  {
    id: "bus-depot-worker-3-east",
    image: "/npcfigures/busdepotworker3/Bus Worker 02_0002.webp",
    alt: "Bus depot worker 3 facing east",
    position: {
      right: "8%",
      top: "66%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-3-north",
    image: "/npcfigures/busdepotworker3/Bus Worker 02_0003.webp",
    alt: "Bus depot worker 3 facing north",
    position: {
      right: "34%",
      top: "58%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-3-south",
    image: "/npcfigures/busdepotworker3/Bus Worker 02_0001.webp",
    alt: "Bus depot worker 3 facing south",
    position: {
      left: "22%",
      top: "74%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-3-west",
    image: "/npcfigures/busdepotworker3/Bus Worker 02_0004.webp",
    alt: "Bus depot worker 3 facing west",
    position: {
      right: "80%",
      top: "72%",
      width: "132px",
    },
  },
];

const BUS_DEPOT_GATE_WORKER_WIDTH = "158.4px";

const BUS_DEPOT_GATE_WORKER_NPCS: SceneNpcFigure[] = [
  {
    ...BUS_DEPOT_WORKER_1_NPCS[0],
    position: { left: "32%", top: "89%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_1_NPCS[1],
    position: { left: "38%", top: "94%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_1_NPCS[2],
    position: { left: "54%", top: "86%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_1_NPCS[3],
    position: { left: "60%", top: "86%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[0],
    position: { left: "49%", top: "89%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[1],
    position: { left: "45%", top: "95%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[2],
    position: { right: "30%", top: "92%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[3],
    position: { right: "28%", top: "95%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[0],
    position: { right: "64%", top: "99%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[1],
    position: { right: "38%", top: "91%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[2],
    position: { left: "50%", top: "86%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[3],
    position: { right: "53%", top: "90%", width: BUS_DEPOT_GATE_WORKER_WIDTH },
  },
];

const BUS_DEPOT_POLICE_WIDTH = "156px";
const BUS_DEPOT_POLICE_SCALE = 132 / 156;
const BUS_DEPOT_POLICE_Z_INDEX = 11;
const BUS_DEPOT_POLICE_NPC_IDS = new Set([
  "bus-depot-police-1-west",
  "bus-depot-police-2-west",
  "bus-depot-police-3-west",
]);

const BUS_DEPOT_HIDDEN_POLICE_NPCS: SceneNpcFigure[] = [
  {
    id: "bus-depot-police-1-west",
    image: "/npcfigures/police/Police01_0007.webp",
    alt: "Police officer waiting below the bus depot scene",
    position: {
      left: "132%",
      top: "70%",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
    zIndex: BUS_DEPOT_POLICE_Z_INDEX,
  },
  {
    id: "bus-depot-police-2-west",
    image: "/npcfigures/police/Police03_0007.webp",
    alt: "Police officer waiting below the bus depot scene",
    position: {
      left: "132%",
      top: "70%",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
    zIndex: BUS_DEPOT_POLICE_Z_INDEX,
  },
  {
    id: "bus-depot-police-3-west",
    image: "/npcfigures/police/Police03_0008.webp",
    alt: "Police officer waiting below the bus depot scene",
    position: {
      left: "132%",
      top: "70%",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
    zIndex: BUS_DEPOT_POLICE_Z_INDEX,
  },
];

const BUS_DEPOT_RAJIV_POLICE_NPCS: SceneNpcFigure[] = [
  {
    ...BUS_DEPOT_HIDDEN_POLICE_NPCS[0],
    alt: "Police officer moving up beside Rajiv at the bus depot",
    position: {
      left: "72%",
      top: "70%",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
  },
  {
    ...BUS_DEPOT_HIDDEN_POLICE_NPCS[1],
    alt: "Police officer moving up beside Rajiv at the bus depot",
    position: {
      left: "76%",
      top: "72%",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
  },
  {
    ...BUS_DEPOT_HIDDEN_POLICE_NPCS[2],
    alt: "Police officer moving up beside Rajiv at the bus depot",
    position: {
      left: "65%",
      top: "69%",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
  },
];

const BUS_DEPOT_FENG_SWEE_SUAN_NPC = {
  id: "bus-depot-feng-swee-suan-east-south",
  image: "/npcfigures/fengsweesuan/Feng Swee Suan_East South.webp",
  alt: "Feng Swee Suan facing southeast in the bus depot",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Feng Swee Suan",
  chatBubbleTexts: [
    "The men did not walk out for drama. Hock Lee denied union leave, favoured the other union, and treated workers as if we could be discarded.",
    "When 229 men were dismissed, the argument changed. We will hold the gate until management is forced to face what it has done.",
    "Keep the line disciplined. The point is to stop the buses and make the injustice visible, not to hand anyone an excuse.",
  ],
  position: {
    left: "45%",
    top: "50%",
    width: "132px",
    transform: "translateX(-50%) translateY(200px)",
  },
  zIndex: 10,
};

const BUS_DEPOT_GATE_FENG_SWEE_SUAN_NPC = {
  ...BUS_DEPOT_FENG_SWEE_SUAN_NPC,
  id: "bus-depot-feng-swee-suan-gate",
  chatBubbleTexts: [
    "Hold the line at the gates. The hunger strike and blockade mean nothing if the buses slip out as though the dismissals never happened.",
    "Students are bringing food and songs because they want the company to see this dispute is no longer hidden inside the depot.",
    "Stay calm, stay together, and remember why we came here. If the police arrive, they must meet workers who know exactly what they are standing for.",
  ],
};

const BUS_DEPOT_BUS_BOSS_NPC = {
  id: "bus-depot-bus-boss-west",
  image: "/npcfigures/busboss/Buss Boss_West.webp",
  alt: "Bus boss facing west in the bus depot",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Bus Company Boss",
  chatBubbleTexts: [
    "You keep stirring the men up, Feng, as if I can run a bus company on demands and slogans.",
    "There are costs, rival unions, and discipline to maintain. I will not hand control of the depot to whoever shouts loudest.",
    "If you bring the men to the gate, understand what you are choosing. A blockade turns grievance into confrontation.",
  ],
  position: {
    left: "55%",
    top: "50%",
    width: "132px",
    transform: "translateX(-50%) translateY(200px)",
  },
  zIndex: 10,
};

const BUS_DEPOT_REACTING_BUS_BOSS_NPC = {
  ...BUS_DEPOT_BUS_BOSS_NPC,
  chatBubbleTexts: [
    "So this is your answer then: dismissed men at my gate, buses held back, and students gathering outside.",
    "A crowd does not change the books, but it does turn a company dispute into a public humiliation.",
    "Clear a way back to the table and I will talk. Keep the blockade, and the whole city will be dragged into this.",
  ],
};

const BUS_DEPOT_NPC_Y_OFFSET_PX = -200;
const BUS_DEPOT_NON_INTERACTIVE_NPC_SCALE = 0.8;
const BUS_DEPOT_GATE_STAGE_MIN_Z_INDEX = 13;
const BUS_DEPOT_GATE_STAGE_BEHIND_AHMAD_IDS = new Set([
  "bus-depot-feng-swee-suan-gate",
  "bus-depot-bus-boss-west",
]);
const BUS_DEPOT_INTERACTIVE_NPC_IDS = new Set([
  "bus-depot-feng-swee-suan-east-south",
  "bus-depot-feng-swee-suan-gate",
  "bus-depot-bus-boss-west",
]);

const extractFirstNumber = (value: string) => {
  const match = value.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

const parseCssYValue = (value: string): number | null => {
  const normalized = value.trim().toLowerCase();
  if (normalized.length === 0) return null;

  if (normalized.startsWith("clamp(") && normalized.endsWith(")")) {
    const inner = normalized.slice(6, -1);
    const parts = inner.split(",");
    if (parts.length >= 2) {
      return parseCssYValue(parts[1]) ?? parseCssYValue(parts[0]);
    }
  }

  if (normalized.startsWith("calc(") && normalized.endsWith(")")) {
    return extractFirstNumber(normalized.slice(5, -1));
  }

  return extractFirstNumber(normalized);
};

const resolveBusDepotNpcDepth = (npcFigure: SceneNpcFigure, fallbackDepth: number) => {
  if (typeof npcFigure.position.top === "number") return npcFigure.position.top;
  if (typeof npcFigure.position.top === "string") {
    const parsedTop = parseCssYValue(npcFigure.position.top);
    if (parsedTop !== null) return parsedTop;
  }
  if (typeof npcFigure.position.bottom === "number") return 1000 - npcFigure.position.bottom;
  if (typeof npcFigure.position.bottom === "string") {
    const parsedBottom = parseCssYValue(npcFigure.position.bottom);
    if (parsedBottom !== null) return 1000 - parsedBottom;
  }
  return fallbackDepth;
};

const elevateBusDepotGateStageNpcs = (npcFigures: SceneNpcFigure[]) => {
  const sortedEntries = npcFigures
    .map((npcFigure, index) => ({
      id: npcFigure.id,
      depth: resolveBusDepotNpcDepth(npcFigure, index),
      index,
    }))
    .sort((a, b) => (a.depth === b.depth ? a.index - b.index : a.depth - b.depth));

  const zIndexById: Record<string, number> = {};
  sortedEntries.forEach((entry, rank) => {
    zIndexById[entry.id] = BUS_DEPOT_GATE_STAGE_MIN_Z_INDEX + rank;
  });

  return npcFigures.map((npcFigure) => ({
    ...npcFigure,
    zIndex: BUS_DEPOT_GATE_STAGE_BEHIND_AHMAD_IDS.has(npcFigure.id)
      ? (npcFigure.zIndex ?? 10)
      : zIndexById[npcFigure.id],
  }));
};

const buildBusDepotNpcs = (
  workerNpcFigures: SceneNpcFigure[],
  options?: {
    fengNpc?: SceneNpcFigure;
    bossNpc?: SceneNpcFigure;
  }
) =>
  (
    [
      ...workerNpcFigures,
      options?.fengNpc ?? BUS_DEPOT_FENG_SWEE_SUAN_NPC,
      options?.bossNpc ?? BUS_DEPOT_BUS_BOSS_NPC,
    ] as SceneNpcFigure[]
  ).map((npcFigure): SceneNpcFigure => {
    const isInteractive = BUS_DEPOT_INTERACTIVE_NPC_IDS.has(npcFigure.id);
    const nonInteractiveScale = BUS_DEPOT_POLICE_NPC_IDS.has(npcFigure.id)
      ? BUS_DEPOT_POLICE_SCALE
      : BUS_DEPOT_NON_INTERACTIVE_NPC_SCALE;
    const scaleTransform = isInteractive
      ? ""
      : ` scale(${nonInteractiveScale})`;

    return {
      ...npcFigure,
      isInteractive,
      position: {
        ...npcFigure.position,
        transform: npcFigure.position.transform
          ? `${npcFigure.position.transform} translateY(${BUS_DEPOT_NPC_Y_OFFSET_PX}px)${scaleTransform}`
          : `translateY(${BUS_DEPOT_NPC_Y_OFFSET_PX}px)${scaleTransform}`,
      },
    };
  });

const BUS_DEPOT_NPCS = buildBusDepotNpcs([
  ...BUS_DEPOT_WORKER_1_NPCS,
  ...BUS_DEPOT_WORKER_2_NPCS,
  ...BUS_DEPOT_WORKER_3_NPCS,
  ...BUS_DEPOT_HIDDEN_POLICE_NPCS,
]);

const BUS_DEPOT_GATE_NPCS = elevateBusDepotGateStageNpcs(
  buildBusDepotNpcs([
    ...BUS_DEPOT_GATE_WORKER_NPCS,
    ...BUS_DEPOT_HIDDEN_POLICE_NPCS,
  ], {
    fengNpc: BUS_DEPOT_GATE_FENG_SWEE_SUAN_NPC,
    bossNpc: BUS_DEPOT_REACTING_BUS_BOSS_NPC,
  })
);

const BUS_DEPOT_GATE_WITH_POLICE_NPCS = elevateBusDepotGateStageNpcs(
  buildBusDepotNpcs([
    ...BUS_DEPOT_GATE_WORKER_NPCS,
    ...BUS_DEPOT_RAJIV_POLICE_NPCS,
  ], {
    fengNpc: BUS_DEPOT_GATE_FENG_SWEE_SUAN_NPC,
    bossNpc: BUS_DEPOT_REACTING_BUS_BOSS_NPC,
  })
);

const HOME_CIVIL_SERVANT_WIFE_NPC = {
  id: "home-civil-servant-wife-south",
  image: "/npcfigures/civilservant-wife/west.png",
  imageOnChatOpen: "/npcfigures/civilservant-wife/south.png",
  alt: "Lakshmi, Rajiv's wife, facing west at home",
  chatBubbleSpeaker: "Lakshmi",
  chatBubbleTexts: [
    "You've been quiet since you came home. What are all those reports and meetings really telling you?",
  ],
  dialogueChoices: [
    {
      id: "rising-prices",
      label: "Rising prices are making everything worse.",
      playerText:
        "Rising prices are making every complaint sharper. Even everyday worker problems are starting to grow into something bigger.",
      npcReply:
        "Then the city is shakier than the papers admit. Promise me you will not treat this like just another file.",
    },
    {
      id: "government-unsure",
      label: "The office thinks it can manage this, but I'm no longer sure.",
      playerText:
        "The office still thinks meetings and reports can manage this dispute, but I'm no longer sure that will be enough.",
      npcReply:
        "That doubt worries me more than any headline. If even you sound doubtful, the situation must be serious.",
    },
    {
      id: "rumor-faster-than-facts",
      label: "Rumours are moving faster than facts.",
      playerText:
        "What troubles me most is how fast rumour is moving. People may act on fear before the government even understands the situation.",
      npcReply:
        "Then be careful what you repeat and who you trust. Fear can do damage before any order is given.",
    },
  ],
  position: {
    left: "clamp(0px, calc(55vw - 580px), calc(100vw - 770px))",
    top: "calc(58vh - 44px)",
    width: "352px",
  },
};

const HOME_BUS_WORKER_WIFE_NPC: SceneNpcFigure = {
  id: "home-bus-worker-wife-south",
  image: "/npcfigures/busworker-wife/Bus Worker Wife_0004.webp",
  imageOnChatOpen: "/npcfigures/busworker-wife/Bus Worker Wife_0001.webp",
  alt: "Aminah, Ahmad's wife, facing west at home",
  chatBubbleSpeaker: "Aminah",
  chatBubbleTexts: [
    "You came home looking worn out again. Tell me honestly, why are the men at Hock Lee talking about sitting at the gates and losing pay, and what happens to us if it all turns bad?",
  ],
  dialogueChoices: [
    {
      id: "union-recognition-dismissals",
      label: "Management keeps dismissing men and brushing off the union.",
      playerText:
        "It did not begin with one bad day. Hock Lee kept denying union leave, treating the other union better, and dismissing men as warnings to the rest of us. After 229 workers were thrown out, more men started to think a strike was the only way to make management listen.",
      npcReply:
        "That is exactly what frightens me. Every dismissal feels like a warning to every other man still working there. I do not want your name to be the next one carried into that struggle.",
    },
    {
      id: "wages-prices",
      label: "Our wages no longer keep up with what life costs.",
      playerText:
        "Look at what things cost now. Rice, rent, oil, and even the small household items keep going up, but our pay does not. Men finish long shifts, come home exhausted, and still watch every coin. That kind of strain follows us back onto the buses and into every talk at the depot.",
      npcReply:
        "I know the money is not enough. I feel it every time I go to market and have to put something back. That is why I understand the anger, even while I worry what lost pay during a strike would do to us.",
    },
    {
      id: "conditions-dignity",
      label: "It is also about conditions and respect, not only pay.",
      playerText:
        "People outside say it is all politics, but at the depot it feels more ordinary than that. The men are tired of the hours, the pressure, and the way management ignores us, especially when union men ask for fair treatment. After enough of that, it stops being only about money. It becomes about whether a man is treated with respect.",
      npcReply:
        "Then promise me you will be careful. I can hear why the men are angry. But once a strike begins, students, police, and strangers all gather around it, and that is when fear grows bigger.",
    },
    {
      id: "family-duty",
      label: "I am thinking about this house as much as the strike.",
      playerText:
        "That is the hardest part. At the depot I stand with the men because what they are saying is real, but on the walk home I think about this room, the rent, and all of you. I am trying to stand by my fellow workers without failing my family.",
      npcReply:
        "Then hold on to that thought when the crowd gets louder. If you must take a stand, do it with open eyes and remember who will carry the cost with you.",
    },
  ],
  position: {
    left: "clamp(0px, calc(55vw - 580px), calc(100vw - 770px))",
    top: "calc(58vh - 44px)",
    width: "352px",
  },
};

const HOME_CHINESE_STUDENT_SIBLING_NPC: SceneNpcFigure = {
  id: "home-chinese-student-sibling",
  image: "/npcfigures/sibling/BW Sibling_0001.webp",
  imageOnChatOpen: "/npcfigures/sibling/BW Sibling_0001.webp",
  alt: "Ong Kim Wah, Kim Chuan's bus worker sibling, standing in the living room at home",
  chatBubbleSpeaker: "Ong Kim Wah",
  chatBubbleTexts: [
    "Kim Chuan, I came straight from Hock Lee. The 229 dismissals have changed everything. Men are at the gates now, and the whole depot feels like a place waiting for a spark.",
  ],
  dialogueChoices: [
    {
      id: "hock-lee-dismissals",
      label: "Ask what started the trouble at the depot.",
      playerText:
        "You look worn out. What exactly has been happening at Hock Lee to make everyone so tense?",
      npcReply:
        "It began with unfair treatment. Men were denied leave to attend union meetings, workers in the other union seemed to get better treatment, and dismissals kept hanging over us. When the company finally pushed out 229 workers, every man at Hock Lee knew the warning could one day have been his.",
    },
    {
      id: "hock-lee-union-demands",
      label: "Ask what the workers are demanding.",
      playerText:
        "At school I keep hearing people talk about the union. What do the workers actually want?",
      npcReply:
        "Most of the men want the company to take the union seriously, bring back the dismissed workers, and deal more fairly with wages and conditions. People outside keep calling it politics, but at the depot it feels more basic than that. The men are tired of being treated as disposable.",
    },
    {
      id: "hock-lee-not-yet-riot",
      label: "Ask whether it has already become a riot.",
      playerText:
        "People in the neighbourhood are already using dangerous words. Has it turned into a riot yet?",
      npcReply:
        "Not yet. Right now it is still a labour dispute, with men sitting at the gates and students starting to arrive with food and songs. But tempers are short, police are nearby, and it could turn ugly very quickly.",
    },
    {
      id: "hock-lee-reaches-home",
      label: "Ask why it is reaching students and families so quickly.",
      playerText:
        "If this is happening at the bus depot, why does it already feel so close to school and home?",
      npcReply:
        "Because bus workers do not live inside the depot gates. We come home to the same kitchens, markets, and school fees as everyone else. Once enough families start worrying about dismissals, lost pay, and what the police may do next, the dispute stops being only the workers' problem.",
    },
  ],
  autoOpenChatOnLoad: true,
  autoOpenDelayMs: 1800,
  position: {
    left: "clamp(0px, calc(55vw - 460px), calc(100vw - 720px))",
    top: "calc(58vh - 44px)",
    width: "352px",
  },
};

const HOME_CHINESE_STUDENT_RETURN_SIBLING_NPC: SceneNpcFigure = {
  id: "home-chinese-student-return-sibling",
  image: "/npcfigures/sibling/BW Sibling_0001.webp",
  imageOnChatOpen: "/npcfigures/sibling/BW Sibling_0001.webp",
  alt: "Ong Kim Wah, Kim Chuan's bus worker sibling, standing in the living room at home after the riots",
  chatBubbleSpeaker: "Ong Kim Wah",
  chatBubbleTexts: [
    "Kim Chuan, you've been carrying that silence home with you. The papers keep arguing over blame and order, but you were there. If you want, tell me what has stayed with you after all of it.",
  ],
  dialogueChoices: [
    {
      id: "post-riot-headlines-flatten",
      label: "The headlines feel too neat.",
      playerText:
        "The newspaper makes everything sound settled: crowds, police, disorder, casualties. But what I remember is confusion. People were shouting one moment and trying to drag each other out of danger the next. It does not fit into the tidy version printed after the fact.",
      npcReply:
        "That is often how these things live on. The public gets a clean story to argue over, while the people who stood inside it are left with fragments that never become so simple.",
    },
    {
      id: "post-riot-conviction-to-fear",
      label: "I saw conviction turn into fear very quickly.",
      playerText:
        "I thought I understood why people were angry. Then the hoses came, stones flew, and suddenly everyone was moving on instinct. What unsettles me most is how fast a cause can turn into panic when the street loses control.",
      npcReply:
        "Remembering that matters. It does not mean the anger was false. It means you have seen how quickly a struggle with real grievances can become something larger and more dangerous than anyone meant to carry.",
    },
    {
      id: "post-riot-school-home-not-separate",
      label: "School and home do not feel separate anymore.",
      playerText:
        "Before this, school felt like one world and labour disputes another. Now every warning from teachers sounds different. What happened at Hock Lee followed us back through the gates and into this room.",
      npcReply:
        "It always could. Workers, students, and families were never as separate as officials liked to pretend. These days have only made that truth harder to ignore.",
    },
    {
      id: "post-riot-no-simple-victory",
      label: "I still cannot call it a simple victory.",
      playerText:
        "The dismissed men were reinstated, and I know why people fought so hard. But after the fear, the injuries, and the funerals, I cannot say the ending feels clean. Too much was proven, and too much was lost at the same time.",
      npcReply:
        "You do not have to force a cleaner answer than the truth allows. Reflection begins there: holding together why people acted and what the cost has made impossible to forget.",
    },
  ],
  autoOpenChatOnLoad: true,
  autoOpenDelayMs: 1800,
  position: {
    left: "clamp(0px, calc(55vw - 460px), calc(100vw - 720px))",
    top: "calc(58vh - 44px)",
    width: "352px",
  },
};

const HOME_BUS_WORKER_RETURN_WIFE_NPC: SceneNpcFigure = {
  id: "home-bus-worker-return-wife-south",
  image: "/npcfigures/busworker-wife/Bus Worker Wife_0004.webp",
  imageOnChatOpen: "/npcfigures/busworker-wife/Bus Worker Wife_0001.webp",
  alt: "Aminah, Ahmad's wife, facing west at home after the riots",
  chatBubbleSpeaker: "Aminah",
  chatBubbleTexts: [
    "You're home, and that is more than I dared promise myself after the rumours and the shouting. Sit with me and tell me honestly, after everything that happened, what do you think remains?",
  ],
  dialogueChoices: [
    {
      id: "riots-cost-too-high",
      label: "Too many people paid too high a price.",
      playerText:
        "That is what stays with me most. What began as a fight over dismissals, wages, and fair treatment turned into something far worse once the hoses came out and the streets filled with panic. It is hard to come home and call any of that a simple victory.",
      npcReply:
        "Then we must not talk about these days as if they were only slogans and speeches. If the city remembers anything, it should remember what ordinary people went through.",
    },
    {
      id: "riots-uncertain-result",
      label: "I still do not know what all this achieved.",
      playerText:
        "That doubt has followed me home. The dismissed men were taken back, yes, but the problems were real before the riots and they are real now. I cannot say clearly what was won against everything that was broken.",
      npcReply:
        "That may be the truest answer anyone can give tonight. Most families live in the part after the shouting, where the losses are real and the meaning is still unsettled.",
    },
    {
      id: "riots-home-changed",
      label: "Coming home changes what the struggle means to me.",
      playerText:
        "Out there I kept thinking about the cause and whether the men would finally be heard. Standing here again, I still feel the same anger, but I also feel how close all of it came to taking me away from this house entirely.",
      npcReply:
        "Then hold on to both truths. What drove the men into action mattered, and so does the fact that every public struggle returns home at the end of the day.",
    },
  ],
  position: {
    left: "clamp(0px, calc(55vw - 580px), calc(100vw - 770px))",
    top: "calc(58vh - 44px)",
    width: "352px",
  },
};

const HOME_CIVIL_SERVANT_ARTIFACT_NPCS: SceneNpcFigure[] = [
  {
    id: "home-civil-servant-poster",
    image: HOME_CIVIL_SERVANT_POSTER_ARTIFACT.image,
    alt: HOME_CIVIL_SERVANT_POSTER_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_CIVIL_SERVANT_POSTER_ARTIFACT.id,
    chatBubbleText:
      "A polished travel poster promises a calm, thriving Singapore that Rajiv's reports keep complicating.",
    position: {
      right: "25%",
      top: "31%",
      width: "100px",
    },
    zIndex: 6,
  },
  {
    id: "home-civil-servant-parker-pen",
    image: HOME_CIVIL_SERVANT_PARKER_PEN_ARTIFACT.image,
    alt: HOME_CIVIL_SERVANT_PARKER_PEN_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_CIVIL_SERVANT_PARKER_PEN_ARTIFACT.id,
    chatBubbleText:
      "A fountain pen lies beside Rajiv's reading, ready to turn observation into official notes.",
    position: {
      left: "55.5%",
      top: "60.5%",
      width: "120px",
    },
    zIndex: 7,
  },
];

const HOME_BUS_WORKER_ARTIFACT_NPCS: SceneNpcFigure[] = [
  {
    id: "home-bus-worker-tingkat",
    image: HOME_BUS_WORKER_TINGKAT_ARTIFACT.image,
    alt: HOME_BUS_WORKER_TINGKAT_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_BUS_WORKER_TINGKAT_ARTIFACT.id,
    chatBubbleText:
      "A tingkat brings the routines of food, work, and family into the same cramped room.",
    position: {
      left: "44%",
      top: "54.5%",
      width: "200px",
    },
    zIndex: 7,
  },
  {
    id: "home-bus-worker-hand-fan",
    image: HOME_BUS_WORKER_HAND_FAN_ARTIFACT.image,
    alt: HOME_BUS_WORKER_HAND_FAN_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_BUS_WORKER_HAND_FAN_ARTIFACT.id,
    chatBubbleText:
      "The woven hand fan makes the heat and closeness of the room part of the story too.",
    position: {
      right: "10%",
      top: "61.5%",
      width: "212px",
    },
    zIndex: 6,
  },
];

const HOME_BUS_WORKER_RETURN_ARTIFACT_NPCS: SceneNpcFigure[] = [
  ...HOME_BUS_WORKER_ARTIFACT_NPCS,
  {
    id: "home-bus-worker-driver-badge",
    image: HOME_BUS_WORKER_RETURN_BADGE_ARTIFACT.image,
    alt: HOME_BUS_WORKER_RETURN_BADGE_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_BUS_WORKER_RETURN_BADGE_ARTIFACT.id,
    chatBubbleText:
      "The driver's badge feels smaller than the unrest around it, but it still carries the weight of work, identity, and survival.",
    position: {
      left: "77%",
      top: "65%",
      width: "50px",
    },
    zIndex: 7,
  },
];

const HOME_STUDENT_ARTIFACT_NPCS: SceneNpcFigure[] = [
  {
    id: "home-student-kerosene-lamp",
    image: HOME_STUDENT_KEROSENE_LAMP_ARTIFACT.image,
    alt: HOME_STUDENT_KEROSENE_LAMP_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_STUDENT_KEROSENE_LAMP_ARTIFACT.id,
    chatBubbleText:
      "A kerosene lamp marks the kind of evening light under which worry, study, and family talk continue.",
    position: {
      left: "83.5%",
      top: "51%",
      width: "164px",
    },
    zIndex: 7,
  },
  {
    id: "home-student-textbook",
    image: HOME_STUDENT_TEXTBOOK_ARTIFACT.image,
    alt: HOME_STUDENT_TEXTBOOK_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_STUDENT_TEXTBOOK_ARTIFACT.id,
    chatBubbleText:
      "The textbook reminds you that school lessons shape how students understand politics before they ever join a crowd.",
    position: {
      left: "73.5%",
      top: "35%",
      width: "82px",
    },
    zIndex: 7,
  },
  {
    id: "home-student-tingkat",
    image: HOME_STUDENT_TINGKAT_ARTIFACT.image,
    alt: HOME_STUDENT_TINGKAT_ARTIFACT.alt,
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    artifactId: HOME_STUDENT_TINGKAT_ARTIFACT.id,
    chatBubbleText:
      "A tingkat would be useful if you need to carry food to the depot.",
    position: {
      left: "77%",
      top: "43%",
      width: "136px",
    },
    zIndex: 7,
  },
];

const ALEXANDRA_ROAD_FIRE_FRAMES: [string, string, string] = [
  "/animatedelements/fire/1.png",
  "/animatedelements/fire/2.png",
  "/animatedelements/fire/3.png",
];

const buildPoliceTakingAttackFrames = (
  variant: "01" | "02" | "03"
): [string, string, string, string, string, string] => [
    `/npcfigures/police/Police-taking attach/${variant}/police_taking attack_${variant}_0001.webp`,
    `/npcfigures/police/Police-taking attach/${variant}/police_taking attack_${variant}_0002.webp`,
    `/npcfigures/police/Police-taking attach/${variant}/police_taking attack_${variant}_0003.webp`,
    `/npcfigures/police/Police-taking attach/${variant}/police_taking attack_${variant}_0004.webp`,
    `/npcfigures/police/Police-taking attach/${variant}/police_taking attack_${variant}_0005.webp`,
    `/npcfigures/police/Police-taking attach/${variant}/police_taking attack_${variant}_0006.webp`,
  ];

const ALEXANDRA_ROAD_POLICE_ATTACK_01_FRAMES = buildPoliceTakingAttackFrames("01");
const ALEXANDRA_ROAD_POLICE_ATTACK_02_FRAMES = buildPoliceTakingAttackFrames("02");
const ALEXANDRA_ROAD_POLICE_ATTACK_03_FRAMES = buildPoliceTakingAttackFrames("03");

const ALEXANDRA_ROAD_FIRE_ELEMENTS: SceneAnimatedElement[] = [
  {
    id: "alexandra-road-fire-left",
    frames: ALEXANDRA_ROAD_FIRE_FRAMES,
    alt: "",
    frameOffset: 0,
    className: "hl-pixel-fire",
    position: {
      left: "16%",
      top: "55%",
      width: "84px",
      opacity: 0.95,
    },
  },
  {
    id: "alexandra-road-fire-center",
    frames: ALEXANDRA_ROAD_FIRE_FRAMES,
    alt: "",
    frameOffset: 1,
    className: "hl-pixel-fire",
    position: {
      left: "44%",
      top: "50%",
      width: "98px",
      opacity: 0.95,
    },
  },
  {
    id: "alexandra-road-fire-right",
    frames: ALEXANDRA_ROAD_FIRE_FRAMES,
    alt: "",
    frameOffset: 2,
    className: "hl-pixel-fire",
    position: {
      left: "67%",
      top: "90%",
      width: "90px",
      opacity: 0.93,
    },
  },
];

const ALEXANDRA_ROAD_STUDENT_THROWING_FRAMES: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] = [
    "/npcfigures/Student Throwing Stone/Student Throwing_0001.webp",
    "/npcfigures/Student Throwing Stone/Student Throwing_0002.webp",
    "/npcfigures/Student Throwing Stone/Student Throwing_0003.webp",
    "/npcfigures/Student Throwing Stone/Student Throwing_0004.webp",
    "/npcfigures/Student Throwing Stone/Student Throwing_0005.webp",
    "/npcfigures/Student Throwing Stone/Student Throwing_0006.webp",
    "/npcfigures/Student Throwing Stone/Student Throwing_0007.webp",
  ];

const ALEXANDRA_ROAD_STUDENT_THROWING_VARIANT_TWO_FRAMES: [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
] = [
    "/npcfigures/Student Throwing Stone/Student throwing stone 2/student throwing 2_0001.webp",
    "/npcfigures/Student Throwing Stone/Student throwing stone 2/student throwing 2_0002.webp",
    "/npcfigures/Student Throwing Stone/Student throwing stone 2/student throwing 2_0003.webp",
    "/npcfigures/Student Throwing Stone/Student throwing stone 2/student throwing 2_0004.webp",
    "/npcfigures/Student Throwing Stone/Student throwing stone 2/student throwing 2_0005.webp",
    "/npcfigures/Student Throwing Stone/Student throwing stone 2/student throwing 2_0006.webp",
    "/npcfigures/Student Throwing Stone/Student throwing stone 2/student throwing 2_0007.webp",
  ];

const ALEXANDRA_ROAD_BUS_WORKER_THROWING_FRAMES: [
  string,
  string,
  string,
  string,
  string,
  string,
] = [
    "/npcfigures/Bus Worker-Throwing Stone/Student-Throwing_0001.webp",
    "/npcfigures/Bus Worker-Throwing Stone/Student-Throwing_0002.webp",
    "/npcfigures/Bus Worker-Throwing Stone/Student-Throwing_0003.webp",
    "/npcfigures/Bus Worker-Throwing Stone/Student-Throwing_0004.webp",
    "/npcfigures/Bus Worker-Throwing Stone/Student-Throwing_0005.webp",
    "/npcfigures/Bus Worker-Throwing Stone/Student-Throwing_0006.webp",
  ];

const ALEXANDRA_ROAD_CLASH_ELEMENTS: SceneAnimatedElement[] = [
  ...ALEXANDRA_ROAD_FIRE_ELEMENTS,
  {
    id: "alexandra-road-police-attack-mid-2",
    frames: ALEXANDRA_ROAD_POLICE_ATTACK_02_FRAMES,
    alt: "Police officer advancing on Alexandra Road",
    frameOffset: 1,
    position: {
      right: "39%",
      top: "47.5%",
      width: "182px",
    },
    zIndex: 4,
  },
  {
    id: "alexandra-road-police-attack-mid-3",
    frames: ALEXANDRA_ROAD_POLICE_ATTACK_03_FRAMES,
    alt: "Police officer surging forward on Alexandra Road",
    frameOffset: 3,
    position: {
      right: "0%",
      top: "58%",
      width: "182px",
    },
    zIndex: 5,
  },
  {
    id: "alexandra-road-police-attack-mid-1",
    frames: ALEXANDRA_ROAD_POLICE_ATTACK_01_FRAMES,
    alt: "Police officer charging the crowd on Alexandra Road",
    frameOffset: 5,
    position: {
      right: "19%",
      top: "62%",
      width: "182px",
    },
    zIndex: 6,
  },
  {
    id: "alexandra-road-student-throwing-left",
    frames: ALEXANDRA_ROAD_STUDENT_THROWING_VARIANT_TWO_FRAMES,
    alt: "Student throwing a stone during the Alexandra Road riot",
    frameOffset: 1,
    position: {
      left: "24%",
      top: "55%",
      width: "200px",
    },
    zIndex: 5,
  },
  {
    id: "alexandra-road-bus-worker-throwing-center",
    frames: ALEXANDRA_ROAD_BUS_WORKER_THROWING_FRAMES,
    alt: "Bus worker throwing a stone during the Alexandra Road riot",
    frameOffset: 3,
    position: {
      left: "34%",
      top: "56%",
      width: "200px",
    },
    zIndex: 2,
  },
  {
    id: "alexandra-road-student-throwing-mid",
    frames: ALEXANDRA_ROAD_STUDENT_THROWING_FRAMES,
    alt: "Student charging forward with a stone at Alexandra Road",
    frameOffset: 5,
    position: {
      left: "60%",
      top: "48%",
      width: "200px",
    },
    zIndex: 4,
  },
];

const ALEXANDRA_ROAD_BUS_WORKER_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-bus-worker-1-east",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_East.webp",
    alt: "Bus worker facing east at Alexandra Road",
    position: {
      left: "35%",
      top: "60%",
      width: "130px",
    },
  },
  {
    id: "alexandra-road-bus-worker-2-south",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_South.webp",
    alt: "Bus worker facing south at Alexandra Road",
    position: {
      left: "24%",
      top: "70%",
      width: "130px",
    },
  },
  {
    id: "alexandra-road-bus-worker-3-east",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_East.webp",
    alt: "Bus worker facing east at Alexandra Road",
    position: {
      right: "36%",
      top: "30%",
      width: "130px",
    },
  },
  {
    id: "alexandra-road-bus-worker-4-south",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_South.webp",
    alt: "Bus worker facing south at Alexandra Road",
    position: {
      left: "2%",
      top: "20%",
      width: "130px",
    },
  },
];

const ALEXANDRA_ROAD_LEE_CHIM_SIONG_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-lee-chim-siong-east",
    image: "/npcfigures/riotfigures/Lee Chim Siong/Lee Chim Siong-Riot_East.webp",
    alt: "Lee Chim Siong facing east at Alexandra Road",
    chatBubbleSpeaker: "Lee Chim Siong",
    chatBubbleTexts: [
      "The strike has spilled into confrontation because the company and the authorities thought dismissed workers would fold before the city noticed.",
      "Now everyone is here at once: workers, students, police, reporters. That is what happens when a labour dispute is met with force instead of settlement.",
      "The hoses have already changed the mood. Hold your ground if you must, but do not forget how quickly a crowd can be punished once the state decides it has found its excuse.",
    ],
    position: {
      left: "55%",
      top: "38%",
      width: "130px",
    },
    zIndex: 6,
  },
];

const ALEXANDRA_ROAD_STUDENT_UNION_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-student-union-1-west",
    image: "/npcfigures/riotfigures/Student Union/Student-Riot_East.webp",
    alt: "Student union member facing west at Alexandra Road",
    chatBubbleSpeaker: "Student Organizer",
    chatBubbleTexts: [
      "Stay together on the left. Don't scatter once the police start using the hoses.",
      "We came to support the workers, not to give the authorities an easy story about chaos.",
    ],
    autoChatCycle: {
      initialDelayMs: 1400,
      firstVisibleMs: 3200,
      hiddenMs: 1800,
      secondVisibleMs: 3000,
    },
    position: {
      left: "4%",
      top: "40%",
      width: "130px",
    },
  },
  {
    id: "alexandra-road-student-union-3-east",
    image: "/npcfigures/riotfigures/Student Union/Student-Riot_East.webp",
    alt: "Student union member facing east at Alexandra Road",
    position: {
      left: "16%",
      top: "36%",
      width: "130px",
    },
  },
  {
    id: "alexandra-road-student-union-4-south",
    image: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
    alt: "Student union member facing south at Alexandra Road",
    position: {
      left: "28%",
      top: "35%",
      width: "130px",
    },
  },
];

const SCHOOL_LAKE_SPRITE_WIDTH = "300px";
const SCHOOL_LAKE_PLAYER_FIXED_SCALE = 1.36;
const SCHOOL_LAKE_INTERACTION_HOTSPOT: NonNullable<
  SceneNpcFigure["interactionHotspotStyle"]
> = {
  top: "8%",
  left: "28%",
  width: "44%",
  height: "90%",
  transform: "none",
};

const SCHOOL_LAKE_NPCS: SceneNpcFigure[] = [
  {
    id: "school-lake-student-1",
    image: "/npcfigures/Middle School Students/Students_0007.webp",
    alt: "Student standing at the far left of the school lake gathering",
    npcType: "non-interactive",
    position: {
      left: "6%",
      top: "63%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
  {
    id: "school-lake-student-2",
    image: "/npcfigures/Middle School Students/Students_0002.webp",
    alt: "Student standing on the left side of the school lake gathering",
    npcType: "non-interactive",
    position: {
      left: "14%",
      top: "70%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
  {
    id: "school-lake-organizer-left",
    image: "/npcfigures/Middle School Students/Student_East.webp",
    alt: "Student organizer facing east at the school lake gathering",
    chatBubbleSpeaker: "Student Organizer",
    chatBubbleTexts: [
      "The students on the left are arguing over one question: should we go to the depot to support the workers?",
      "Some want to bring food, stand beside them, and show solidarity. Others worry students will only make things more dangerous.",
      "If you speak, help them decide what support and solidarity should look like.",
    ],
    dialogueChoices: [
      {
        id: "school-lake-rally-solidarity",
        label: "Say students should go support the workers.",
        playerText:
          "We should go. If the workers are being isolated, students can show they are not alone.",
        npcReply:
          "That will move the bold ones. They want a clear reason to act.",
      },
      {
        id: "school-lake-rally-common-struggle",
        label: "Say support should be calm and practical.",
        playerText:
          "If we go, we should bring food, water, and discipline. We should help the workers, not add confusion.",
        npcReply:
          "Good. That gives the careful students a way to join.",
      },
      {
        id: "school-lake-rally-history",
        label: "Say students must think about the risk.",
        playerText:
          "We cannot pretend it is safe. If students go, they need to know the police may treat them as part of the crowd.",
        npcReply:
          "Yes. People should hear the risk clearly before they decide.",
      },
    ],
    autoOpenChatOnLoad: true,
    interactionHotspotStyle: SCHOOL_LAKE_INTERACTION_HOTSPOT,
    position: {
      left: "22%",
      top: "64%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
  {
    id: "school-lake-student-3",
    image: "/npcfigures/Middle School Students/Students_0003.webp",
    alt: "Student standing just left of center near the school lake",
    npcType: "non-interactive",
    position: {
      left: "34%",
      top: "59%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
  {
    id: "school-lake-student-4",
    image: "/npcfigures/Middle School Students/Students_0008.webp",
    alt: "Student standing just right of center near the school lake",
    npcType: "non-interactive",
    position: {
      left: "57%",
      top: "59%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
  {
    id: "school-lake-monitor-right",
    image: "/npcfigures/Middle School Students/Student_West.webp",
    alt: "Class monitor facing west at the school lake gathering",
    chatBubbleSpeaker: "Class Monitor",
    chatBubbleTexts: [
      "The students on the right keep asking why the riots are happening at all.",
      "Some point to the dismissals. Others say low pay, pressure, and police action pushed the workers and students to the edge.",
    ],
    dialogueChoices: [
      {
        id: "school-lake-monitor-purpose",
        label: "Say the dismissals were the spark.",
        playerText:
          "The dismissals were the clearest trigger. That is why the anger burst out in public.",
        npcReply:
          "That gives everyone a clear starting point.",
      },
      {
        id: "school-lake-monitor-discipline",
        label: "Say the anger had been building for a long time.",
        playerText:
          "It was not only one event. Low wages, daily pressure, and fear of losing work had been building for a long time.",
        npcReply:
          "Yes. People understand it better when they see the longer pressure behind it.",
      },
    ],
    interactionHotspotStyle: SCHOOL_LAKE_INTERACTION_HOTSPOT,
    position: {
      left: "67%",
      top: "64%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
  {
    id: "school-lake-student-5",
    image: "/npcfigures/Middle School Students/Students_0006.webp",
    alt: "Student standing on the right side of the school lake gathering",
    npcType: "non-interactive",
    position: {
      left: "76%",
      top: "70%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
  {
    id: "school-lake-student-6",
    image: "/npcfigures/Middle School Students/Students_0004.webp",
    alt: "Student standing at the far right of the school lake gathering",
    npcType: "non-interactive",
    position: {
      left: "84%",
      top: "63%",
      width: SCHOOL_LAKE_SPRITE_WIDTH,
    },
  },
];

const ALEXANDRA_ROAD_POLICE_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-police-back-1",
    image: "/npcfigures/police/Police02_0001.webp",
    alt: "Police officer holding the back line on the right side of Alexandra Road",
    npcType: "non-interactive",
    position: {
      right: "26%",
      top: "18%",
      width: "130px",
    },
    zIndex: 4,
  },
  {
    id: "alexandra-road-police-back-2",
    image: "/npcfigures/police/Police03_0001.webp",
    alt: "Police officer holding the back line on the right side of Alexandra Road",
    npcType: "non-interactive",
    position: {
      right: "14%",
      top: "27%",
      width: "130px",
    },
    zIndex: 4,
  },
  {
    id: "alexandra-road-police-back-3",
    image: "/npcfigures/police/Police01_0008.webp",
    alt: "Police officer holding the back line on the right side of Alexandra Road",
    npcType: "non-interactive",
    position: {
      right: "2%",
      top: "38%",
      width: "130px",
    },
    zIndex: 4,
  },
  {
    id: "alexandra-road-police-front-1",
    image: "/npcfigures/police/Police02_0007.webp",
    alt: "Police officer closing the right flank at Alexandra Road",
    chatBubbleSpeaker: "Police Sergeant",
    chatBubbleTexts: [
      "Push them back from the road. Keep the line tight and get the hoses forward.",
      "If this breaks any further, the whole city will hear about Alexandra Road before sundown.",
    ],
    autoChatCycle: {
      initialDelayMs: 2600,
      firstVisibleMs: 2800,
      hiddenMs: 2000,
      secondVisibleMs: 2800,
    },
    position: {
      right: "13%",
      top: "42%",
      width: "130px",
    },
    zIndex: 10,
  },
  {
    id: "alexandra-road-police-front-2",
    image: "/npcfigures/police/Police03_0008.webp",
    alt: "Police officer closing the right flank at Alexandra Road",
    npcType: "non-interactive",
    position: {
      right: "6%",
      top: "0%",
      width: "130px",
    },
    zIndex: 7,
  },
];

const ALEXANDRA_ROAD_CASUALTY_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-injured-bus-worker",
    image: "/npcfigures/injured/injured bus worker_0001.webp",
    alt: "Injured bus worker collapsed on Alexandra Road",
    npcType: "non-interactive",
    position: {
      left: "36%",
      top: "73%",
      width: "130px",
    },
    zIndex: 7,
  },
  {
    id: "alexandra-road-injured-student",
    image: "/npcfigures/injured/injured student.webp",
    alt: "Injured student collapsed on Alexandra Road",
    npcType: "non-interactive",
    position: {
      right: "33%",
      top: "12%",
      width: "130px",
    },
    zIndex: 7,
  },
];

const ALEXANDRA_ROAD_JOURNALIST_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-american-journalist",
    image: "/npcfigures/journalists/American Journalist_0001.webp",
    alt: "American journalist covering unrest at Alexandra Road",
    chatBubbleSpeaker: "American Journalist",
    chatBubbleTexts: [
      "Every few minutes the story changes. Workers call this solidarity, police call it disorder, and the road is swallowing both versions at once.",
      "Once the hoses came out and the crowd answered with bricks and bottles, Alexandra Road stopped being only a depot story. If someone dies here, it becomes international copy by nightfall.",
    ],
    dialogueChoices: [
      {
        id: "alexandra-journalist-ask-cause",
        label: "Ask what he thinks started this.",
        playerText:
          "From where you're standing, what turned this from a strike into something like this?",
        npcReply:
          "Dismissals and labour anger built the ground, but the scene changed once students arrived in large numbers and the police treated the crowd as a security problem instead of a negotiation problem.",
      },
      {
        id: "alexandra-journalist-ask-headline",
        label: "Ask what headline he expects to file.",
        playerText:
          "What headline do you think leaves this road with you tonight?",
        npcReply:
          "That depends on whether the city remembers the grievances or only the violence. Editors like flames and bodies; history is slower about dismissals and humiliation.",
      },
      {
        id: "alexandra-journalist-ask-witness",
        label: "Say the witnesses won't agree on anything.",
        playerText:
          "The witnesses are already contradicting each other. How do you report that honestly?",
        npcReply:
          "You write the contradiction down. Crowds rarely produce one truth in real time, but the disagreement itself tells you how fractured the city already is.",
      },
    ],
    position: {
      left: "50%",
      top: "26%",
      width: "130px",
      transform: "translateX(-50%)",
    },
  },
  {
    id: "alexandra-road-asian-reporter",
    image: "/npcfigures/journalists/Asian Reporter_0001.webp",
    alt: "Asian reporter documenting events at Alexandra Road",
    chatBubbleSpeaker: "Asian Reporter",
    chatBubbleTexts: [
      "Witness accounts are changing by the hour out here.",
      "No one wants to be the last person standing near the police line when it surges.",
    ],
    position: {
      right: "80%",
      top: "0%",
      width: "130px",
    },
  },
];

const parsePercentPositionValue = (value: string | number | undefined) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;

  const normalizedValue = value.trim();
  if (!normalizedValue.endsWith("%")) return null;

  const parsedValue = Number.parseFloat(normalizedValue.slice(0, -1));
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const formatPercentPositionValue = (value: number) =>
  `${Number(value.toFixed(2))}%`;

const parsePixelSizeValue = (value: string | number | undefined) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;

  const normalizedValue = value.trim().toLowerCase();
  if (!normalizedValue.endsWith("px")) return null;

  const parsedValue = Number.parseFloat(normalizedValue.slice(0, -2));
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const formatPixelSizeValue = (value: number) =>
  `${Number(value.toFixed(2))}px`;

const scaleNpcWidths = (npcFigures: SceneNpcFigure[], multiplier: number) =>
  npcFigures.map((npcFigure) => {
    const widthPx = parsePixelSizeValue(npcFigure.position.width);
    if (widthPx === null) return npcFigure;

    return {
      ...npcFigure,
      position: {
        ...npcFigure.position,
        width: formatPixelSizeValue(widthPx * multiplier),
      },
    };
  });

const removeNpcZIndexOverrides = (npcFigures: SceneNpcFigure[]) =>
  npcFigures.map((npcFigure) => {
    const { zIndex, ...npcFigureWithoutZIndex } = npcFigure;
    void zIndex;
    return npcFigureWithoutZIndex;
  });

const moveNpcTopIntoLowerHalf = (npcFigures: SceneNpcFigure[]) =>
  npcFigures.map((npcFigure) => {
    const topPercent = parsePercentPositionValue(npcFigure.position.top);
    if (topPercent === null || topPercent >= 50) return npcFigure;

    return {
      ...npcFigure,
      position: {
        ...npcFigure.position,
        top: formatPercentPositionValue(50 + topPercent / 2),
      },
    };
  });

const shiftNpcTopPercent = (npcFigures: SceneNpcFigure[], deltaPercent: number) =>
  npcFigures.map((npcFigure) => {
    const topPercent = parsePercentPositionValue(npcFigure.position.top);
    if (topPercent === null) return npcFigure;

    return {
      ...npcFigure,
      position: {
        ...npcFigure.position,
        top: formatPercentPositionValue(
          Math.min(100, Math.max(0, topPercent + deltaPercent))
        ),
      },
    };
  });

//adjustingnpchere

const ALEXANDRA_ROAD_NPCS: SceneNpcFigure[] = [
  ...ALEXANDRA_ROAD_BUS_WORKER_NPCS,
  ...ALEXANDRA_ROAD_LEE_CHIM_SIONG_NPCS,
  ...ALEXANDRA_ROAD_STUDENT_UNION_NPCS,
  ...ALEXANDRA_ROAD_POLICE_NPCS,
  ...ALEXANDRA_ROAD_CASUALTY_NPCS,
  ...ALEXANDRA_ROAD_JOURNALIST_NPCS,
];

const ALEXANDRA_ROAD_NPC_SIZE_MULTIPLIER = 1.4;

const ALEXANDRA_ROAD_NPCS_LOWER_HALF = scaleNpcWidths(
  shiftNpcTopPercent(
    removeNpcZIndexOverrides(moveNpcTopIntoLowerHalf(ALEXANDRA_ROAD_NPCS)),
    -5
  ),
  ALEXANDRA_ROAD_NPC_SIZE_MULTIPLIER
);

const NEGOTIATION_NPC_WIDTH = "136px";

const NEGOTIATION_BACK_BUS_WORKER_NPCS: SceneNpcFigure[] = [
  {
    id: "negotiation-bus-worker-back-1-south",
    image: "/npcfigures/busdepotworker1/Bus Worker01_South.webp",
    alt: "Bus worker standing in the back of the negotiation hall",
    position: {
      left: "14%",
      top: "80%",
      width: NEGOTIATION_NPC_WIDTH,
    },
  },
  {
    id: "negotiation-bus-worker-back-2-south",
    image: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
    alt: "Bus worker standing in the back of the negotiation hall",
    position: {
      left: "25%",
      top: "75%",
      width: NEGOTIATION_NPC_WIDTH,
      transform: "translateX(-50%)",
    },
  },
  {
    id: "negotiation-bus-worker-back-3-south",
    image: "/npcfigures/busdepotworker3/Bus Worker 02_0001.webp",
    alt: "Bus worker standing in the back of the negotiation hall",
    position: {
      left: "25%",
      top: "70%",
      width: NEGOTIATION_NPC_WIDTH,
    },
  },
];

const NEGOTIATION_FRONT_LEADERS_NPCS: SceneNpcFigure[] = [
  {
    id: "negotiation-bus-boss-west",
    image: "/npcfigures/busboss/Buss Boss_West.webp",
    alt: "Bus boss in front at the negotiation hall",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "Bus Company Boss",
    chatBubbleTexts: [
      "The company cannot run if every dispute ends with blocked buses and public pressure at the gates.",
      "If you want an agreement, it must leave the depot able to operate tomorrow. I will not sign terms that make future discipline impossible.",
      "I am prepared to discuss reinstatement and conditions, but not under the threat of another crowd outside.",
    ],
    position: {
      right: "20%",
      top: "65%",
      width: NEGOTIATION_NPC_WIDTH,
    },
  },
  {
    id: "negotiation-lee-kuan-yew-south",
    image: "/npcfigures/leekuanyew/LeeKwanYew_East.webp",
    alt: "Lee Kuan Yew in front at the negotiation hall",
    chatBubbleSpeaker: "Lee Kuan Yew",
    chatBubbleTexts: [
      "Every side in this room now speaks with the riot behind it. That makes compromise harder and more urgent at the same time.",
      "If the workers leave with nothing after the dismissals and deaths, resentment deepens. If the company feels cornered, it hardens further. That is the trap.",
      "These are no longer mere wage talks. Labour, law, and political legitimacy are all being tested at once.",
    ],
    position: {
      left: "5%",
      top: "85%",
      width: NEGOTIATION_NPC_WIDTH,
    },
  },
  {
    id: "negotiation-david-marshall-south",
    image: "/npcfigures/davidmarshall/David Marshall_South.webp",
    alt: "David Marshall in front at the negotiation hall",
    className: "npc-figure--priority-chat npc-figure--negotiation-david-marshall",
    chatBubbleSpeaker: "David Marshall",
    chatBubbleTexts: [
      "Sit down and speak plainly. We are here because 12 May proved what delay can cost.",
      "The workers want the dismissed men back, fairer treatment, and proof that negotiation still means something. The company wants control and a depot that can reopen. Then let us start there.",
      "No one will leave with everything, but if these talks fail, the cost will be paid well beyond this room.",
    ],
    autoOpenChatOnLoad: true,
    position: {
      left: "50%",
      top: "61%",
      width: NEGOTIATION_NPC_WIDTH,
      transform: "translateX(-50%)",
    },
  },
  {
    id: "negotiation-feng-swee-suan-south",
    image: "/npcfigures/fengsweesuan/Feng Swee Suan_East.webp",
    alt: "Feng Swee Suan in front at the negotiation hall",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "Feng Swee Suan",
    chatBubbleTexts: [
      "The workers did not come here for ceremony. They came because dismissals, poor conditions, and intimidation have gone on too long.",
      "Do not ask men who sat at the gates and buried the dead to return with nothing but speeches.",
      "Show the men that negotiation can bring back dismissed workers and fairer treatment, and you will see calm. Give them empty words, and anger will return.",
    ],
    position: {
      left: "20%",
      top: "85%",
      width: NEGOTIATION_NPC_WIDTH,
    },
  },
];

const NEGOTIATION_NPCS: SceneNpcFigure[] = [
  ...NEGOTIATION_BACK_BUS_WORKER_NPCS,
  ...NEGOTIATION_FRONT_LEADERS_NPCS,
];

const FUNERAL_NPC_WIDTH = "280px";

const FUNERAL_NPCS: SceneNpcFigure[] = [
  {
    id: "funeral-asian-reporter-4",
    image: "/npcfigures/journalists/Asian Reporter_0002.webp",
    alt: "Asian reporter documenting the funeral procession",
    chatBubbleSpeaker: "Fellow Reporter",
    chatBubbleTexts: [
      "By the morning after 12 May, four people were dead, including 16-year-old student Chong Lon Chong. That is why the schools are watching this funeral so closely.",
      "Look around. Some people came to mourn a boy. Others came because a funeral is one of the last places where grief and anger can still speak in public.",
    ],
    dialogueChoices: [
      {
        id: "funeral-reporter-truth",
        label: "Ask what the press is trying to record here.",
        playerText:
          "What are you trying to capture today, grief itself or the politics gathering around it?",
        npcReply:
          "Both. If we print only sorrow, people forget the dismissals and the hoses. If we print only slogans, we erase the dead as people. The truth is that grief and politics are marching together now.",
      },
      {
        id: "funeral-reporter-order",
        label: "Say the city cannot survive another escalation.",
        playerText:
          "Whatever people feel today, Singapore cannot survive another surge of violence.",
        npcReply:
          "That may be true, but order sounds thin at a funeral after 12 May. People hear calls for calm and ask why calm only becomes urgent once bodies are counted.",
      },
      {
        id: "funeral-reporter-cost",
        label: "Admit the human cost feels different up close.",
        playerText:
          "From an office, casualties become reports. Standing here, the cost feels much harder to hide.",
        npcReply:
          "Then remember this view when the next statement is drafted. A riot is not only broken windows and police logs. It is coffins, parents, and a city deciding what kind of death it wants to remember.",
      },
    ],
    position: {
      left: "28%",
      top: "47%",
      width: FUNERAL_NPC_WIDTH,
    },
  },
  {
    id: "funeral-police-back-left",
    image: "/npcfigures/police/Police02_0001.webp",
    alt: "Police officer standing with back turned at the funeral",
    isInteractive: false,
    position: {
      left: "31%",
      top: "52%",
      width: FUNERAL_NPC_WIDTH,
    },
  },
  {
    id: "funeral-police-back-right",
    image: "/npcfigures/police/Police02_0008.webp",
    alt: "Police officer standing with back turned at the funeral",
    isInteractive: false,
    position: {
      right: "31%",
      top: "52%",
      width: FUNERAL_NPC_WIDTH,
    },
  },
  {
    id: "funeral-civil-servant-left",
    image: "/npcfigures/civilservant/Civil Servant_0002.webp",
    alt: "Government worker observing the funeral from the left side",
    isInteractive: false,
    position: {
      left: "15%",
      top: "48%",
      width: FUNERAL_NPC_WIDTH,
    },
  },
  {
    id: "funeral-civil-servant-center-right",
    image: "/npcfigures/civilservant/Civil Servant_0005.webp",
    alt: "Government worker standing near the right side of the funeral street",
    isInteractive: false,
    position: {
      right: "16%",
      top: "48%",
      width: FUNERAL_NPC_WIDTH,
    },
  },
  {
    id: "funeral-civil-servant-right",
    image: "/npcfigures/civilservant/Civil Servant_0008.webp",
    alt: "Government worker watching the funeral from the right side",
    isInteractive: false,
    position: {
      right: "10%",
      top: "48%",
      width: FUNERAL_NPC_WIDTH,
    },
  },
];

const KK_HOSPITAL_NPCS: SceneNpcFigure[] = [
  {
    id: "kkhospital-nurse-left",
    image: "/npcfigures/Nurse/Nurse_0006.webp",
    alt: "Nurse attending to patients on the left side of the hospital ward",
    isInteractive: false,
    position: {
      left: "30%",
      top: "26%",
      width: "250px",
    },
    zIndex: 3,
  },
  {
    id: "kkhospital-injured-student-back-left",
    image: "/npcfigures/injured/Student-Injured (2).webp",
    alt: "Injured student resting on a bed at the back left of the hospital ward",
    isInteractive: false,
    position: {
      right: "10%",
      top: "22%",
      width: "280px",
    },
    zIndex: 2,
  },
  {
    id: "kkhospital-injured-bus-worker",
    image: "/npcfigures/injured/injured bus worker_0001.webp",
    alt: "Injured bus worker recovering in the hospital ward",
    className: "hl-kkhospital-injured-bus-worker",
    chatBubbleSpeaker: "Injured Colleague",
    chatBubbleTexts: [
      "You came. I was hoping one of the depot men would make it here before visiting hours ended.",
      "The doctor says I'll recover, but every bruise keeps telling me the riot is not finished with me yet.",
      "Tell the others I am still here. Four are dead, many more are hurt, and that is the part no speech can tidy up.",
    ],
    dialogueChoices: [
      {
        id: "kkhospital-colleague-checkin",
        label: "Ask how he is managing.",
        playerText:
          "I needed to see you with my own eyes. How are you managing after the riot?",
        npcReply:
          "One hour at a time. The pain is real, but worse is lying here while people outside argue about us as though we are only headlines and trouble.",
      },
      {
        id: "kkhospital-colleague-memory",
        label: "Say you keep replaying the riot.",
        playerText:
          "I keep replaying that day, wondering whether any of us could have stopped it before it swallowed everyone.",
        npcReply:
          "Maybe once, early on. But after the hoses came and people answered with whatever they could throw, fear and anger moved faster than sense. We were workers in a dispute, then suddenly we were bodies in a riot.",
      },
      {
        id: "kkhospital-colleague-solidarity",
        label: "Promise the workers still stand with him.",
        playerText:
          "You are not facing this alone. The rest of us still stand with you, and I came to make sure you knew that.",
        npcReply:
          "That matters more than medicine some days. If we lose each other now, then the company, the police, and every critic who wanted us broken will have exactly what they wanted.",
      },
    ],
    position: {
      left: "30%",
      top: "30%",
      width: "500px",
      transform: "translateX(-50%)",
    },
  },
  {
    id: "kkhospital-injured-student-front-left",
    image: "/npcfigures/injured/Student-Injured (1).webp",
    alt: "Injured student recovering on a front bed in the hospital ward",
    isInteractive: false,
    position: {
      left: "0%",
      top: "28%",
      width: "340px",
    },
    zIndex: 2,
  },
  {
    id: "kkhospital-injured-back-center",
    image: "/npcfigures/injured/Student-Injured (1).webp",
    alt: "Injured patient lying back on a center bed in the hospital ward",
    isInteractive: false,
    className: "hl-kkhospital-blue-silhouette",
    position: {
      left: "14%",
      top: "25%",
      width: "150px",
    },
    zIndex: 1,
  },
  {
    id: "kkhospital-injured-mid-right",
    image: "/npcfigures/injured/Student-Injured (2).webp",
    alt: "Injured patient resting on a mid-right bed in the hospital ward",
    isInteractive: false,
    className: "hl-kkhospital-blue-silhouette",
    position: {
      right: "28%",
      top: "24%",
      width: "170px",
    },
    zIndex: 2,
  },
  {
    id: "kkhospital-injured-student-right",
    image: "/npcfigures/injured/injured student.webp",
    alt: "Injured patient sitting up on a bed on the right side of the hospital ward",
    isInteractive: false,
    position: {
      right: "15%",
      top: "20%",
      width: "260px",
    },
    zIndex: 1,
  },
  {
    id: "kkhospital-injured-front-right",
    image: "/npcfigures/injured/injured student.webp",
    alt: "Injured patient recovering on a front-right bed in the hospital ward",
    isInteractive: false,
    className: "hl-kkhospital-blue-silhouette",
    position: {
      right: "2%",
      top: "22%",
      width: "200px",
    },
    zIndex: 4,
  },
  {
    id: "kkhospital-nurse-right",
    image: "/npcfigures/Nurse/Nurse 2/Nurse2_0008.webp",
    alt: "Nurse moving through the right side of the hospital ward",
    isInteractive: false,
    position: {
      right: "8%",
      top: "36%",
      width: "400px",
    },
  },
];

const KALLANG_AIRPORT_NPCS: SceneNpcFigure[] = [
  {
    id: "kallang-airport-david-marshall-south",
    image: "/npcfigures/davidmarshall/David Marshall_South.webp",
    alt: "David Marshall speaking at Kallang Airport",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "David Marshall",
    chatBubbleTexts: [
      "I leave for London today to argue that Singapore is ready for Merdeka, ready to govern itself with dignity.",
      "But every British question will begin with Hock Lee. They will say the riots prove we are not fit to rule ourselves.",
      "That is why discipline matters now as much as conviction. If we want self-government, we must show that grief and anger will not master us.",
      "Keep the peace while we press our case. What happens in London will matter, but so will what Singapore becomes while I am away.",
    ],
    isInteractive: true,
    position: {
      left: "50%",
      top: "64%",
      width: "198px",
      transform: "translateX(-50%)",
    },
  },
  {
    id: "kallang-airport-press-reporter",
    image: "/npcfigures/journalists/Asian Reporter_0002.webp",
    alt: "Journalist covering David Marshall's departure at Kallang Airport",
    chatBubbleSpeaker: "Journalist",
    chatBubbleTexts: [
      "Every question on this tarmac leads back to Hock Lee. London will hear Marshall's Merdeka case, but it will also hear how shaken Singapore looked after the riots.",
      "We're not just reporting a departure. We're reporting whether self-government still sounds credible after blood on the streets.",
    ],
    isInteractive: true,
    position: {
      left: "12%",
      top: "70%",
      width: "170px",
    },
  },
  {
    id: "kallang-airport-civil-servant-1",
    image: "/npcfigures/civilservant/Civil Servant_0002.webp",
    alt: "Civil servant standing near the departure steps",
    chatBubbleSpeaker: "Airport Aide",
    chatBubbleTexts: [
      "Reporters keep asking whether London will trust Marshall after Hock Lee.",
      "Everyone here is trying to look confident, but the whole delegation knows the riots have followed them onto the tarmac.",
    ],
    isInteractive: true,
    position: {
      left: "23%",
      top: "68%",
      width: "168px",
    },
  },
  {
    id: "kallang-airport-civil-servant-2",
    image: "/npcfigures/civilservant/Civil Servant_0005.webp",
    alt: "Civil servant reviewing notes at Kallang Airport",
    chatBubbleSpeaker: "Private Secretary",
    chatBubbleTexts: [
      "His brief is clear: full internal self-government, not another half-measure dressed up as reform.",
      "The British will study every weakness in Singapore's case. These notes have to sound firm without pretending Hock Lee never happened.",
    ],
    isInteractive: true,
    position: {
      right: "26%",
      top: "66%",
      width: "166px",
    },
  },
  {
    id: "kallang-airport-civil-servant-3",
    image: "/npcfigures/civilservant/Civil Servant_0007.webp",
    alt: "Civil servant waiting by the tarmac",
    chatBubbleSpeaker: "Ground Officer",
    chatBubbleTexts: [
      "Some people think he should have stayed to steady the city. Others think this trip cannot wait another week.",
      "That is the pressure of this moment: Singapore is still carrying Hock Lee at home while asking abroad to be trusted with its own future.",
    ],
    isInteractive: true,
    position: {
      right: "10%",
      top: "72%",
      width: "160px",
    },
  },
];

const COMMAND_CENTER_NPCS: SceneNpcFigure[] = [
  {
    id: "command-center-ringing-phone",
    image: "/artifacts/hockleebusriots/objects/telephone1-idle.png",
    imageOnChatOpen: "/artifacts/hockleebusriots/objects/telephone1-ringing.png",
    alt: "Ringing desk telephone in the command center",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "Telephone Report",
    chatBubbleTexts: [
      "Ring-ring. Command center? Urgent line from Alexandra Road.",
      "Crowds are spreading beyond the depot. Students are still mixed in, the hoses have come out, and the police line is shifting.",
      "We have injuries but no reliable count yet. Officers and witnesses are contradicting one another, and bricks and bottles are flying back toward the police.",
      "Rajiv, we need instructions now: reinforcements, ambulances, and what the press is to be told.",
    ],
    autoOpenChatOnLoad: true,
    position: {
      left: "35.5%",
      top: "55.5%",
      width: "60px",
    },
    zIndex: 8,
    interactionSound: OLD_PHONE_AUDIO,
  },
  {
    id: "command-center-second-phone",
    image: "/artifacts/hockleebusriots/objects/telephone2-idle.png",
    imageOnChatOpen: "/artifacts/hockleebusriots/objects/telephone2-ringing.png",
    alt: "Second desk telephone in the command center",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "Operations Line",
    chatBubbleTexts: [
      "Command center, operations desk. We are receiving conflicting reports from multiple streets now.",
      "Some officers say the crowd is breaking up. Others say smaller groups are reforming further down Alexandra Road.",
      "If Mr. Marshall wants a statement soon, Rajiv will need to mark clearly what is confirmed and what is only rumour, especially on casualties.",
    ],
    position: {
      left: "45%",
      top: "54.2%",
      width: "50px",
    },
    zIndex: 8,
    interactionSound: OLD_PHONE_AUDIO,
  },
  {
    id: "command-center-radio-bulletin",
    image: "/artifacts/hockleebusriots/objects/radio.png",
    alt: "Transistor radio relaying a live bulletin in the command center",
    chatBubbleSpeaker: "Radio Bulletin",
    chatBubbleText:
      "Radio Malaya bulletin: unrest linked to the Hock Lee dispute continues after clashes involving police hoses and crowd violence. Official casualty details are still being checked.",
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    autoChatCycle: {
      initialDelayMs: 1800,
      firstVisibleMs: 4800,
      hiddenMs: 2200,
      secondVisibleMs: 4200,
    },
    artifactWalkToSideBeforeOpen: "right",
    artifactId: COMMAND_CENTER_RADIO_ARTIFACT.id,
    position: {
      left: "24%",
      top: "48%",
      width: "54px",
    },
    zIndex: 7,
    interactionSound: POLICE_RADIO_AUDIO,
  },
  {
    id: "command-center-david-marshall-south",
    image: "/npcfigures/davidmarshall/David Marshall_South.webp",
    alt: "David Marshall standing on the left side of the command center",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "David Marshall",
    chatBubbleTexts: [
      "Rajiv, separate rumour from report and label both clearly. If we speak carelessly now, we deepen the panic.",
      "I want the police response tracked as closely as the crowd itself. Order matters, but so does what the police have done in the street.",
      "Keep the lines open. You and the staff brief me with facts, not reassurance.",
    ],
    position: {
      left: "clamp(506px, calc(12vw + 450px), 980px)",
      top: "clamp(0px, calc(62vh - 35px), calc(100vh - 230px))",
      width: "15%",
    },
    zIndex: 7,
  },
  {
    id: "command-center-civil-servant-right",
    image: "/npcfigures/civilservant/Civil Servant_0005.webp",
    alt: "Civil servant watching the street from the right window in the command center",
    chatBubbleSpeaker: "Civil Servant",
    chatBubbleTexts: [
      "Sir, from the window the crowd looks less frightened than watchful. People are waiting to see whether the police or the crowd moves next.",
      "They keep pointing down the road whenever another vehicle passes. Word is moving faster than our messengers.",
      "Whatever is being decided in here, the street is already reacting to rumours outside.",
    ],
    position: {
      right: "clamp(134px, calc(6vw + 0px), 288px)",
      top: "clamp(0px, 57vh, calc(100vh - 210px))",
      width: "210px",
    },
  },
];

const CLASSROOM_NPCS_BASE: SceneNpcFigure[] = [
  {
    id: "classroom-teacher",
    image: "/npcfigures/Teacher/teacher_0001.webp",
    alt: "Teacher standing behind the classroom desk",
    chatBubbleSpeaker: "Teacher",
    chatBubbleText: "Kim Chuan! You are late.",
    dialogueChoices: [
      {
        id: "classroom-teacher-city-hall-reply",
        label: "Sorry! I was at City Hall. Labour Front has won!",
        playerText: "Sorry! I was at City Hall. Labour Front has won!",
        npcReply:
          "Yes, and that means more than a change in headlines. Labour Front's victory puts David Marshall at the head of Singapore's first locally elected government, and now people will watch whether it can answer workers asking for fair pay, families burdened by rising prices, and students wondering what real self-government should look like.",
      },
    ],
    autoOpenChatOnLoad: true,
    position: {
      left: "52%",
      top: "65%",
      width: "184px",
    },
  },
  {
    id: "classroom-radio-bulletin",
    image: "/artifacts/hockleebusriots/objects/radio.png",
    alt: "Radio relaying an election bulletin from the classroom desk",
    chatBubbleSpeaker: "Live Radio Update",
    chatBubbleTexts: [
      "Saturday, April 2, 1955. Election bulletin: Labour Front has won the general election.",
      "David Marshall is expected to become Chief Minister, leading Singapore's first locally elected government.",
      "Students across the island are listening closely and asking whether this victory will bring real change for workers, schools, and colonial rule itself.",
    ],
    npcType: "artifact",
    interactionPromptIcon: "artifact",
    className: "npc-figure--priority-chat",
    artifactId: CLASSROOM_RADIO_ARTIFACT.id,
    position: {
      left: "43.5%",
      top: "56.5%",
      width: "68px",
    },
    scaleMultiplier: 0.7,
    zIndex: 8,
    interactionSound: POLICE_RADIO_AUDIO,
  },
  {
    id: "classroom-student-1",
    image: "/npcfigures/Middle School Students/Students_0001.webp",
    alt: "Student standing near the front left side of the classroom",
    npcType: "non-interactive",
    position: {
      left: "32%",
      top: "63%",
      width: "114px",
    },
  },
  {
    id: "classroom-student-2",
    image: "/npcfigures/Middle School Students/Students_0002.webp",
    alt: "Student standing on the left side of the classroom",
    npcType: "non-interactive",
    position: {
      left: "27%",
      top: "72%",
      width: "114px",
    },
  },
  {
    id: "classroom-student-3",
    image: "/npcfigures/Middle School Students/Students_0003.webp",
    alt: "Student standing at the front of the classroom",
    npcType: "non-interactive",
    position: {
      left: "20%",
      top: "75%",
      width: "114px",
    },
  },
  {
    id: "classroom-student-4",
    image: "/npcfigures/Middle School Students/Students_0004.webp",
    alt: "Student standing on the right side of the classroom",
    npcType: "non-interactive",
    position: {
      left: "30%",
      top: "85%",
      width: "114px",
    },
  },
  {
    id: "classroom-student-5",
    image: "/npcfigures/Middle School Students/Students_0005.webp",
    alt: "Student facing the chalkboard near the center of the classroom",
    npcType: "non-interactive",
    position: {
      left: "38%",
      top: "86%",
      width: "114px",
    },
  },
  {
    id: "classroom-student-6",
    image: "/npcfigures/Middle School Students/Students_0006.webp",
    alt: "Student standing on the right side of the classroom facing inward",
    npcType: "non-interactive",
    position: {
      left: "68%",
      top: "72%",
      width: "114px",
    },
  },
  {
    id: "classroom-student-7",
    image: "/npcfigures/Middle School Students/Students_0007.webp",
    alt: "Student standing on the far left side of the classroom",
    npcType: "non-interactive",
    position: {
      left: "63%",
      top: "78%",
      width: "114px",
    },
  },
];

const CLASSROOM_NPCS: SceneNpcFigure[] = CLASSROOM_NPCS_BASE.map((npcFigure) =>
  npcFigure.npcType === "artifact" || npcFigure.id === "classroom-teacher"
    ? npcFigure
    : {
      ...npcFigure,
      scaleMultiplier: 1.5,
    }
);

const SCHOOL_GATES_NPCS: SceneNpcFigure[] = [
  {
    id: "school-gates-headmaster",
    image: "/npcfigures/headmaster/Headmaster_0001.webp",
    alt: "Headmaster addressing reporters from inside the reopened school gates",
    chatBubbleSpeaker: "Headmaster",
    chatBubbleTexts: [
      "School has reopened, but not as if Hock Lee and the unrest that followed never happened. We are reviewing which boys were publicly identified at strike lines, protests, and riots.",
      "Some will face suspension or expulsion. Others may return only after formal warnings and written undertakings promising to stay out of further agitation.",
      "Student unions will not resume as before. Administrators now mean to restrict political organising much more tightly.",
    ],
    position: {
      left: "48%",
      top: "54%",
      width: "120px",
    },
    scaleMultiplier: 1.35,
  },
  {
    id: "school-gates-teacher",
    image: "/npcfigures/Teacher/teacher_0001.webp",
    alt: "Teacher standing near the school drive facing the press",
    chatBubbleSpeaker: "Teacher",
    chatBubbleTexts: [
      "The consequences are not equal for every student. Much depends on who was seen, who was named, and who is believed to have been politically active.",
      "Some families say their children only followed the crowd at Hock Lee. But one speech, one arrest, or one newspaper photograph can be enough to bring discipline back into the classroom.",
      "That is why the mood here is so tense. Students are returning to lessons, but also to records, warnings, and the fear of being marked out.",
    ],
    position: {
      left: "59%",
      top: "59%",
      width: "116px",
    },
    scaleMultiplier: 1.3,
  },
  {
    id: "school-gates-american-journalist",
    image: "/npcfigures/journalists/American Journalist_0003.webp",
    alt: "Journalist with his back to the viewer taking notes outside the school gates",
    chatBubbleSpeaker: "Reporter",
    chatBubbleTexts: [
      "Parents want to know what comes next. Are students being suspended, expelled, or merely warned?",
      "The story no longer ends at Hock Lee itself. It continues in how schools decide who may quietly return and who will be made an example of.",
    ],
    position: {
      left: "39%",
      top: "68%",
      width: "112px",
    },
    scaleMultiplier: 1.25,
  },
  {
    id: "school-gates-asian-reporter",
    image: "/npcfigures/journalists/Asian Reporter_0006.webp",
    alt: "Reporter with his back to the viewer listening at the school gates",
    npcType: "non-interactive",
    position: {
      left: "52%",
      top: "72%",
      width: "108px",
    },
    scaleMultiplier: 1.25,
  },
];

const getScene = (sceneNumber: number) =>
  HOCK_LEE_SCENES.find((candidate) => candidate.sceneNumber === sceneNumber) ??
  HOCK_LEE_SCENES[0];

const buildSceneSubtitle = (sceneNumber: number) => {
  const scene = getScene(sceneNumber);
  return [
    scene.description,
    `Playable characters: ${scene.characters
      .map((character) => CHARACTER_LABELS[character])
      .join(", ")}.`,
    scene.npc ? `NPC: ${scene.npc}.` : null,
    scene.notes ? `Notes: ${scene.notes}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
};

export const buildDefaultSceneConfig = (sceneNumber: number): BaseSceneConfig => {
  const scene = getScene(sceneNumber);

  return {
    sceneTitle: `Scene ${scene.sceneNumber}: ${scene.locationEvent}`,
    sceneSubtitle: buildSceneSubtitle(sceneNumber),
    sceneBackgroundImage:
      sceneNumber === 1
        ? "url(/background/hockleescenes/cityhall.png)"
        : "url(/background/placeholder.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    npcFigures:
      sceneNumber === 1
        ? [
          CITY_HALL_BRITISH_OFFICER_WEST_NPC,
          CITY_HALL_BRITISH_OFFICER_SOUTH_NPC,
          CITY_HALL_DAVID_MARSHALL_NPC,
        ]
        : undefined,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  };
};

export type PixelSceneVariantKey =
  | "scene-1-city-hall"
  | "home-civil-servant"
  | "home-bus-worker"
  | "home-chinese-student"
  | "home-bus-worker-return"
  | "home-chinese-student-return"
  | "government-office"
  | "market"
  | "bus-depot"
  | "command-center"
  | "classroom"
  | "negotiation"
  | "alexandra-road"
  | "school-lake"
  | "funeral"
  | "kkhospital"
  | "school-gates"
  | "kallangairport";

export const PIXEL_SCENE_VARIANTS: Record<PixelSceneVariantKey, BaseSceneConfig> = {
  "scene-1-city-hall": {
    ...buildDefaultSceneConfig(1),
    sceneBackgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/background/hockleescenes/cityhall.png)",
    backgroundReference: buildBackgroundReference("City Hall", "Real_Cityhall.png"),
    artifacts: [PARTY_WORKER_MANIFESTO_ARTIFACT],
    npcFigures: [...CITY_HALL_NPCS, CITY_HALL_PARTY_WORKER_ARTIFACT_NPC],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: CITY_HALL_CHARACTER_SCALE,
    characterInitialXOffset: (buildDefaultSceneConfig(1).characterInitialXOffset ?? 0) + 350,
    introGuide: {
      title: "Pro Tip",
      description:
        "Use each scene to explore the space, hear different perspectives, and decide when you are ready to move the story forward.",
      tips: [
        "Move with the Left/Right arrow keys or click on the ground to walk.",
        "Talk to characters with chat bubbles and inspect interactive objects when they appear.",
        "Use MAP when you're ready to continue to the next location.",
      ],
      dismissLabel: "Start Exploring",
    },
  },
  market: {
    sceneTitle: "Pre-Riot: Market",
    sceneSubtitle: buildSceneSubtitle(2),
    sceneBackgroundImage: "url(/background/hockleescenes/market.png)",
    backgroundReference: buildBackgroundReference("Market", "Real_Market.png"),
    artifacts: [STUDENT_RIOT_WOODBLOCK_PRINT_ARTIFACT],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: 1.75,
    npcFigures: [
      MARKET_FISHERMAN_NPC,
      MARKET_ARTIST_NPC,
      MARKET_FOOD_SELLER_EAST_NPC,
      MARKET_DEVAN_NAIR_NPC,
      MARKET_BUS_WORKER_EAST_NPC,
      MARKET_BUS_WORKER_SOUTH_NPC,
      MARKET_BUS_WORKER_WEST_NPC,
    ],
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "government-office": {
    sceneTitle: "Pre-Riot: Government Office",
    sceneSubtitle: buildSceneSubtitle(4),
    sceneBackgroundImage: "url(/background/hockleescenes/governmentoffice.png)",
    backgroundReference: buildBackgroundReference("Government Office", "Real_Gov office.png"),
    artifacts: [GOVERNMENT_OFFICE_PIPES_ARTIFACT],
    showArtifacts: false,
    sceneCharacterZIndex: 20,
    sceneCharacterScaleMultiplier: 2,
    characterInitialYRatio: 0.7,
    npcFigures: GOVERNMENT_OFFICE_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "bus-depot": {
    sceneTitle: "Riot: Bus Depot",
    sceneSubtitle: buildSceneSubtitle(5),
    sceneBackgroundImage: "url(/background/hockleescenes/busdepot.png)",
    backgroundReference: buildBackgroundReference("Bus Depot", "Real_Bus Depot.png"),
    characterName: "",
    artifacts: [BUS_DEPOT_HOCK_LEE_BUS_ARTIFACT],
    showArtifacts: true,
    sceneCharacterScaleMultiplier: 1.43,
    characterScaleMultiplier: 0.33,
    characterInitialYOffset: -80,
    npcFigures: BUS_DEPOT_NPCS,
    npcTransitions: [
      {
        triggerNpcId: "bus-depot-feng-swee-suan-east-south",
        nextNpcFigures: BUS_DEPOT_GATE_NPCS,
      },
      {
        triggerNpcId: "bus-depot-feng-swee-suan-gate",
        nextNpcFigures: BUS_DEPOT_GATE_WITH_POLICE_NPCS,
      },
    ],
    npcPositionTransitionMs: 700,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "command-center": {
    sceneTitle: "Riot: Command Center",
    sceneSubtitle:
      "Officials track reports from Alexandra Road as hoses, thrown debris, and casualty rumours overtake the strike.",
    sceneBackgroundImage: "url(/background/hockleescenes/commandcenter.png)",
    artifacts: [COMMAND_CENTER_RADIO_ARTIFACT],
    showArtifacts: false,
    npcFigures: COMMAND_CENTER_NPCS,
    sceneCharacterZIndex: 12,
    sceneCharacterScaleMultiplier: 2.5,
    characterInitialXRatio: 0.44,
    characterInitialYRatio: 0.75,
    characterInitialYOffset: -50,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  classroom: {
    sceneTitle: "Riot: Classroom",
    sceneSubtitle:
      "A teacher breaks the lesson to explain the 2 April 1955 election result and what a new government might now have to answer to workers, families, and students.",
    sceneBackgroundImage: "url(/background/hockleescenes/classroom.png)",
    artifacts: [CLASSROOM_RADIO_ARTIFACT],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: 1.8,
    characterVisualScaleMultiplier: 0.7,
    characterInitialXRatio: 0.18,
    characterInitialYRatio: 0.79,
    npcFigures: CLASSROOM_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  negotiation: {
    sceneTitle: "Riot: Negotiation Hall",
    sceneSubtitle: buildSceneSubtitle(11),
    sceneBackgroundImage: "url(/background/hockleescenes/negotiation.png)",
    backgroundReference: buildBackgroundReference("Negotiation Hall", "Real_Gov office 2.png"),
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    allowCharacterMovement: true,
    allowDirectNpcInteractionWhenUnreachable: true,
    characterInitialXRatio: 0.65,
    characterMinXRatio: 0.65,
    sceneCharacterScaleMultiplier: 3.25,
    characterScaleMultiplier: 0.325,
    npcFigures: NEGOTIATION_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "alexandra-road": {
    sceneTitle: "Riot: Alexandra Road",
    sceneSubtitle: buildSceneSubtitle(8),
    sceneBackgroundImage: "url(/background/hockleescenes/alexandra-road.png)",
    backgroundReference: buildBackgroundReference("Alexandra Road", "Real_Alexandra Road.png"),
    ambientSound: ALEXANDRA_CROWD_AMBIENT_AUDIO,
    artifacts: [
      ALEXANDRA_ROAD_RIOT_CONTROL_TRUCK_ARTIFACT,
      ALEXANDRA_ROAD_POLICE_TURRET_BELL_ARTIFACT,
      ALEXANDRA_ROAD_POLICE_SHIELD_ARTIFACT,
    ],
    showArtifacts: true,
    sceneAnimatedElements: ALEXANDRA_ROAD_CLASH_ELEMENTS,
    npcFigures: ALEXANDRA_ROAD_NPCS_LOWER_HALF,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/post-riot-cutscene",
  },
  "school-lake": {
    sceneTitle: "Riot: School Lake",
    sceneSubtitle: buildSceneSubtitle(15),
    sceneBackgroundImage: "url(/background/hockleescenes/schoollake.png)",
    backgroundReference: {
      ...buildBackgroundReference("School Lake", "Real_School Lake.png"),
      additionalImages: [
        buildBackgroundReference(
          "School Gate",
          "Real_School Gate.png",
          "Reference photo for the school gate connected to the School Lake scene."
        ),
      ],
    },
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    characterFixedScale: SCHOOL_LAKE_PLAYER_FIXED_SCALE,
    characterInitialXRatio: 0.43,
    characterInitialYRatio: 0.7,
    characterEntryChat: {
      text: "By the school lake, the students on the left are debating whether to go support the workers, while the students on the right are arguing over why the riots are happening.",
      delayMs: 1100,
      durationMs: 5200,
    },
    npcFigures: SCHOOL_LAKE_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  funeral: {
    sceneTitle: "Post-Riot: Funeral",
    sceneSubtitle: buildSceneSubtitle(10),
    sceneBackgroundImage: "url(/background/hockleescenes/funeral.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    sceneCharacterZIndex: 30,
    characterScaleMultiplier: 0.75,
    characterInitialYRatio: 0.84,
    characterInitialYOffset: 36,
    npcFigures: FUNERAL_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  kkhospital: {
    sceneTitle: "Post-Riot: KK Hospital",
    sceneSubtitle: buildSceneSubtitle(12),
    sceneBackgroundImage: "url(/background/hockleescenes/kkhospital.png)",
    backgroundReference: buildBackgroundReference("KK Hospital", "Real_Hospital.png"),
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    characterFixedScale: 1.9,
    characterDialogueYOffset: 420,
    npcFigures: KK_HOSPITAL_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "school-gates": {
    sceneTitle: "Post-Riot: School Gates",
    sceneSubtitle:
      "As schools reopen after Hock Lee and later unrest, administrators weigh suspensions, warnings, written undertakings, and tighter controls on student unions.",
    sceneBackgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.38)), url(/background/hockleescenes/schoolgates.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: 1.85,
    characterInitialXRatio: 0.24,
    characterInitialYRatio: 0.85,
    npcFigures: SCHOOL_GATES_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  kallangairport: {
    sceneTitle: "Post-Riot: Kallang Airport",
    sceneSubtitle: buildSceneSubtitle(13),
    sceneBackgroundImage: "url(/background/hockleescenes/kallangairport.png)",
    backgroundReference: buildBackgroundReference("Kallang Airport", "Real_Kallang Airport.png"),
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: 1.45,
    characterInitialXRatio: 0.68,
    characterInitialYRatio: 0.74,
    npcFigures: KALLANG_AIRPORT_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/outro-cutscene",
  },
  "home-civil-servant": {
    sceneTitle: "Pre-Riot: Home of a Civil Servant",
    sceneSubtitle:
      "At home after work, the civil servant reviews reports on rising prices and worker tension before deciding what to brief next.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-of-civil-servant.png)",
    artifacts: [
      HOME_CIVIL_SERVANT_POSTER_ARTIFACT,
      HOME_CIVIL_SERVANT_PARKER_PEN_ARTIFACT,
    ],
    showArtifacts: false,
    npcFigures: [HOME_CIVIL_SERVANT_WIFE_NPC, ...HOME_CIVIL_SERVANT_ARTIFACT_NPCS],
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/riot-cutscene",
  },
  "home-bus-worker": {
    sceneTitle: "Pre-Riot: Home",
    sceneSubtitle:
      "A cramped home where worker anger becomes a family argument about pay, risk, and fairness.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-of-bus-worker.png)",
    backgroundReference: buildBackgroundReference("Bus Worker Home", "Real_Bus Worker Home.jpg"),
    artifacts: [HOME_BUS_WORKER_TINGKAT_ARTIFACT, HOME_BUS_WORKER_HAND_FAN_ARTIFACT],
    showArtifacts: false,
    npcFigures: [HOME_BUS_WORKER_WIFE_NPC, ...HOME_BUS_WORKER_ARTIFACT_NPCS],
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/riot-cutscene",
  },
  "home-chinese-student": {
    sceneTitle: "Pre-Riot: Home",
    sceneSubtitle:
      "Ong Kim Wah comes home from Hock Lee with word of dismissals, union tension, and a strike that has not yet turned violent.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-of-student.png)",
    backgroundReference: buildBackgroundReference("Student Home", "Real_Student House.png"),
    artifacts: [
      HOME_STUDENT_KEROSENE_LAMP_ARTIFACT,
      HOME_STUDENT_TEXTBOOK_ARTIFACT,
      HOME_STUDENT_TINGKAT_ARTIFACT,
    ],
    showArtifacts: false,
    npcFigures: [HOME_CHINESE_STUDENT_SIBLING_NPC, ...HOME_STUDENT_ARTIFACT_NPCS],
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/riot-cutscene",
  },
  "home-bus-worker-return": {
    sceneTitle: "Post-Riot: Home",
    sceneSubtitle:
      "The worker returns home bruised and alive, but the room is still full of questions about what the strike achieved.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-of-bus-worker.png)",
    backgroundReference: buildBackgroundReference("Bus Worker Home", "Real_Bus Worker Home.jpg"),
    artifacts: [
      HOME_BUS_WORKER_TINGKAT_ARTIFACT,
      HOME_BUS_WORKER_HAND_FAN_ARTIFACT,
      HOME_BUS_WORKER_RETURN_BADGE_ARTIFACT,
    ],
    showArtifacts: false,
    npcFigures: [HOME_BUS_WORKER_RETURN_WIFE_NPC, ...HOME_BUS_WORKER_RETURN_ARTIFACT_NPCS],
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/outro-cutscene",
  },
  "home-chinese-student-return": {
    sceneTitle: "Post-Riot: Home",
    sceneSubtitle:
      "Headlines, parental fear, and silence leave the student to reckon with an identity that no longer feels innocent.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-of-student.png)",
    backgroundReference: buildBackgroundReference("Student Home", "Real_Student House.png"),
    artifacts: [
      HOME_STUDENT_KEROSENE_LAMP_ARTIFACT,
      HOME_STUDENT_TEXTBOOK_ARTIFACT,
      HOME_STUDENT_TINGKAT_ARTIFACT,
    ],
    showArtifacts: false,
    npcFigures: [HOME_CHINESE_STUDENT_RETURN_SIBLING_NPC, ...HOME_STUDENT_ARTIFACT_NPCS],
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/outro-cutscene",
  },
};
