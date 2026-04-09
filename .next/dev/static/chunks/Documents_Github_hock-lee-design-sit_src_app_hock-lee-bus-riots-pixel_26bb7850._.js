(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-paths.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALEXANDRA_ROAD_ROUTE",
    ()=>ALEXANDRA_ROAD_ROUTE,
    "BUS_DEPOT_ROUTE",
    ()=>BUS_DEPOT_ROUTE,
    "CITY_HALL_ROUTE",
    ()=>CITY_HALL_ROUTE,
    "CLASSROOM_ROUTE",
    ()=>CLASSROOM_ROUTE,
    "COMMAND_CENTER_ROUTE",
    ()=>COMMAND_CENTER_ROUTE,
    "FUNERAL_ROUTE",
    ()=>FUNERAL_ROUTE,
    "GOVERNMENT_OFFICE_ROUTE",
    ()=>GOVERNMENT_OFFICE_ROUTE,
    "HOCK_LEE_MAP_ROUTE",
    ()=>HOCK_LEE_MAP_ROUTE,
    "HOME_BUS_WORKER_RETURN_ROUTE",
    ()=>HOME_BUS_WORKER_RETURN_ROUTE,
    "HOME_BUS_WORKER_ROUTE",
    ()=>HOME_BUS_WORKER_ROUTE,
    "HOME_CIVIL_SERVANT_ROUTE",
    ()=>HOME_CIVIL_SERVANT_ROUTE,
    "HOME_STUDENT_RETURN_ROUTE",
    ()=>HOME_STUDENT_RETURN_ROUTE,
    "HOME_STUDENT_ROUTE",
    ()=>HOME_STUDENT_ROUTE,
    "INTRO_CUTSCENE_ROUTE",
    ()=>INTRO_CUTSCENE_ROUTE,
    "KALLANG_AIRPORT_ROUTE",
    ()=>KALLANG_AIRPORT_ROUTE,
    "KK_HOSPITAL_ROUTE",
    ()=>KK_HOSPITAL_ROUTE,
    "MARKET_ROUTE",
    ()=>MARKET_ROUTE,
    "NEGOTIATION_ROUTE",
    ()=>NEGOTIATION_ROUTE,
    "OUTRO_CUTSCENE_ROUTE",
    ()=>OUTRO_CUTSCENE_ROUTE,
    "POST_RIOT_CUTSCENE_ROUTE",
    ()=>POST_RIOT_CUTSCENE_ROUTE,
    "RIOT_CUTSCENE_ROUTE",
    ()=>RIOT_CUTSCENE_ROUTE,
    "SCHOOL_GATES_ROUTE",
    ()=>SCHOOL_GATES_ROUTE,
    "SCHOOL_LAKE_ROUTE",
    ()=>SCHOOL_LAKE_ROUTE
]);
const HOCK_LEE_MAP_ROUTE = "/hock-lee-bus-riots-pixel/map";
const INTRO_CUTSCENE_ROUTE = "/hock-lee-bus-riots-pixel/cutscenes/intro";
const RIOT_CUTSCENE_ROUTE = "/hock-lee-bus-riots-pixel/cutscenes/riot-cutscene";
const POST_RIOT_CUTSCENE_ROUTE = "/hock-lee-bus-riots-pixel/cutscenes/post-riot-cutscene";
const OUTRO_CUTSCENE_ROUTE = "/hock-lee-bus-riots-pixel/cutscenes/outro-cutscene";
const CITY_HALL_ROUTE = "/hock-lee-bus-riots-pixel/pre-riot/city-hall";
const MARKET_ROUTE = "/hock-lee-bus-riots-pixel/pre-riot/market";
const HOME_CIVIL_SERVANT_ROUTE = "/hock-lee-bus-riots-pixel/pre-riot/home-civil-servant";
const HOME_BUS_WORKER_ROUTE = "/hock-lee-bus-riots-pixel/pre-riot/home-bus-worker";
const HOME_STUDENT_ROUTE = "/hock-lee-bus-riots-pixel/pre-riot/home-chinese-student";
const GOVERNMENT_OFFICE_ROUTE = "/hock-lee-bus-riots-pixel/pre-riot/government-office";
const BUS_DEPOT_ROUTE = "/hock-lee-bus-riots-pixel/riot/bus-depot";
const ALEXANDRA_ROAD_ROUTE = "/hock-lee-bus-riots-pixel/riot/alexandra-road";
const COMMAND_CENTER_ROUTE = "/hock-lee-bus-riots-pixel/riot/command-center";
const SCHOOL_LAKE_ROUTE = "/hock-lee-bus-riots-pixel/riot/school-lake";
const CLASSROOM_ROUTE = "/hock-lee-bus-riots-pixel/riot/classroom";
const NEGOTIATION_ROUTE = "/hock-lee-bus-riots-pixel/riot/negotiation";
const FUNERAL_ROUTE = "/hock-lee-bus-riots-pixel/post-riot/funeral";
const KK_HOSPITAL_ROUTE = "/hock-lee-bus-riots-pixel/post-riot/hospital";
const SCHOOL_GATES_ROUTE = "/hock-lee-bus-riots-pixel/post-riot/school-gates";
const KALLANG_AIRPORT_ROUTE = "/hock-lee-bus-riots-pixel/post-riot/kallangairport";
const HOME_BUS_WORKER_RETURN_ROUTE = "/hock-lee-bus-riots-pixel/post-riot/home-bus-worker";
const HOME_STUDENT_RETURN_ROUTE = "/hock-lee-bus-riots-pixel/post-riot/home-chinese-student";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARACTER_PRESENTATIONS",
    ()=>CHARACTER_PRESENTATIONS,
    "CUTSCENE_CONTENT_BY_ROLE",
    ()=>CUTSCENE_CONTENT_BY_ROLE,
    "DEFAULT_CHARACTER_CODE",
    ()=>DEFAULT_CHARACTER_CODE,
    "MAP_NODE_DEFINITIONS",
    ()=>MAP_NODE_DEFINITIONS,
    "MASTER_MODE_NODE_ORDER",
    ()=>MASTER_MODE_NODE_ORDER,
    "ROLE_STORY_STEPS",
    ()=>ROLE_STORY_STEPS,
    "SELECTED_CHARACTER_STORAGE_KEY",
    ()=>SELECTED_CHARACTER_STORAGE_KEY,
    "STORY_PHASE_TRACK",
    ()=>STORY_PHASE_TRACK,
    "buildRoleAwareRoute",
    ()=>buildRoleAwareRoute,
    "getCutsceneKindForRoute",
    ()=>getCutsceneKindForRoute,
    "getExitRouteForStepIndex",
    ()=>getExitRouteForStepIndex,
    "getLatestStoryStepForNode",
    ()=>getLatestStoryStepForNode,
    "getNextRouteForCutscene",
    ()=>getNextRouteForCutscene,
    "getRoleSteps",
    ()=>getRoleSteps,
    "getStoryStepByNodeKey",
    ()=>getStoryStepByNodeKey,
    "getStoryStepByRoute",
    ()=>getStoryStepByRoute,
    "getStoryStepIndexByRoute",
    ()=>getStoryStepIndexByRoute,
    "resolveCharacterCode",
    ()=>resolveCharacterCode,
    "stripRouteQuery",
    ()=>stripRouteQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-paths.ts [app-client] (ecmascript)");
;
const DEFAULT_CHARACTER_CODE = "BW";
const SELECTED_CHARACTER_STORAGE_KEY = "hockLeeSelectedCharacter";
const buildBusWorkerWalkingFrames = (direction, prefix)=>Array.from({
        length: 8
    }, (_, index)=>{
        const frameNumber = index + 1;
        return `/npcfigures/busworker/Bus Worker/${direction}/${encodeURIComponent(`${prefix}_${frameNumber}.webp`)}`;
    });
const CHARACTER_PRESENTATIONS = {
    CIV: {
        code: "CIV",
        playerName: "Rajiv",
        playerFullName: "Rajiv Menon",
        playerAlt: "Rajiv Menon",
        markerSprite: "/character-figures/rajivmenon/south.png",
        cutsceneSprite: "/character-figures/rajivmenon/south.png",
        characterSpriteBasePath: "/character-figures/rajivmenon"
    },
    BW: {
        code: "BW",
        playerName: "Bus Worker",
        playerFullName: "Bus Worker",
        playerAlt: "Bus worker",
        markerSprite: "/npcfigures/busworker/south.png",
        cutsceneSprite: "/npcfigures/busworker/south.png",
        characterSprites: {
            idle: {
                north: "/npcfigures/busworker/north.png",
                south: "/npcfigures/busworker/south.png",
                east: "/npcfigures/busworker/east.png",
                west: "/npcfigures/busworker/west.png"
            },
            walking: {
                north: buildBusWorkerWalkingFrames("North", "Bus Worker_North"),
                south: buildBusWorkerWalkingFrames("South", "Bus Worker_south"),
                east: buildBusWorkerWalkingFrames("East", "Bus Worker_east"),
                west: buildBusWorkerWalkingFrames("West", "Bus Worker_West")
            }
        }
    },
    CS: {
        code: "CS",
        playerName: "Chinese Student",
        playerFullName: "Chinese Student",
        playerAlt: "Chinese student activist",
        markerSprite: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
        cutsceneSprite: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
        characterSprites: {
            idle: {
                north: "/npcfigures/riotfigures/Student Union/Student-Riot_North.webp",
                south: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
                east: "/npcfigures/riotfigures/Student Union/Student-Riot_East.webp",
                west: "/npcfigures/riotfigures/Student Union/Student-Riot_West.webp"
            }
        }
    }
};
const MAP_NODE_DEFINITIONS = {
    "city-hall": {
        key: "city-hall",
        label: "City Hall",
        description: "Formal power, briefings, and decisions that shape the dispute.",
        position: {
            left: "43%",
            top: "65%"
        },
        image: {
            src: "/map-nodes/cityhall.png",
            alt: "City Hall",
            className: "hl-pixel-map-node--cityhall"
        }
    },
    market: {
        key: "market",
        label: "Market",
        description: "Daily life exposes prices, hardship, and street opinion.",
        position: {
            left: "52%",
            top: "45%"
        },
        image: {
            src: "/map-nodes/market.png",
            alt: "Market",
            className: "hl-pixel-map-node--market"
        }
    },
    home: {
        key: "home",
        label: "Home",
        description: "Private space where public unrest becomes personal.",
        position: {
            left: "52%",
            top: "30%"
        },
        image: {
            src: "/map-nodes/home.png",
            alt: "Home",
            className: "hl-pixel-map-node--home"
        }
    },
    "bus-depot": {
        key: "bus-depot",
        label: "Bus Depot",
        description: "The strike line hardens and the crowd becomes a force.",
        position: {
            left: "28%",
            top: "54%"
        },
        image: {
            src: "/map-nodes/busdepot.png",
            alt: "Bus Depot",
            className: "hl-pixel-map-node--busdepot"
        }
    },
    "government-office": {
        key: "government-office",
        label: "Government Office",
        description: "Negotiation, delay, and official uncertainty meet in one room.",
        position: {
            left: "40%",
            top: "50%"
        },
        image: {
            src: "/map-nodes/governmentoffice.png",
            alt: "Government Office",
            className: "hl-pixel-map-node--governmentoffice"
        }
    },
    "command-center": {
        key: "command-center",
        label: "Command Center",
        description: "Phones, reports, and orders fail to contain the crisis.",
        position: {
            left: "33%",
            top: "58%"
        },
        image: {
            src: "/map-nodes/commandcentre.png",
            alt: "Command Center",
            className: "hl-pixel-map-node--commandcentre"
        }
    },
    "alexandra-road": {
        key: "alexandra-road",
        label: "Alexandra Road",
        description: "The confrontation turns from protest into chaos.",
        position: {
            left: "23%",
            top: "58%"
        },
        image: {
            src: "/map-nodes/alexandraroad.png",
            alt: "Alexandra Road",
            className: "hl-pixel-map-node--alexandraroad"
        }
    },
    hospital: {
        key: "hospital",
        label: "Hospital",
        description: "The wounded make the cost of escalation impossible to ignore.",
        position: {
            left: "46%",
            top: "35%"
        },
        image: {
            src: "/map-nodes/hospital.png",
            alt: "Hospital",
            className: "hl-pixel-map-node--hospital"
        }
    },
    "negotiation-hall": {
        key: "negotiation-hall",
        label: "Negotiation Hall",
        description: "Leaders regroup to define what the struggle achieved.",
        position: {
            left: "46%",
            top: "48%"
        },
        image: {
            src: "/map-nodes/negotiationhall.png",
            alt: "Negotiation Hall",
            className: "hl-pixel-map-node--negotiationhall"
        }
    },
    funeral: {
        key: "funeral",
        label: "Funeral",
        description: "Mourning transforms grief into political meaning.",
        position: {
            left: "32%",
            top: "34%"
        },
        image: {
            src: "/map-nodes/funeral.png",
            alt: "Funeral",
            className: "hl-pixel-map-node--funeral"
        }
    },
    airport: {
        key: "airport",
        label: "Airport",
        description: "A departure point that turns the riots into a larger political transition.",
        position: {
            left: "52%",
            top: "62%"
        },
        image: {
            src: "/map-nodes/kallangairport.png",
            alt: "Kallang Airport",
            className: "hl-pixel-map-node--kallang"
        }
    },
    classroom: {
        key: "classroom",
        label: "Classroom",
        description: "Political awakening begins in the language of school and debate.",
        position: {
            left: "10.6%",
            top: "46.4%"
        },
        image: {
            src: "/map-nodes/schoolbuilding.png",
            alt: "Classroom",
            className: "hl-pixel-map-node--schoolbuilding"
        }
    },
    "school-lake": {
        key: "school-lake",
        label: "School Lake",
        description: "Student networks gather momentum in semi-secret spaces.",
        position: {
            left: "13%",
            top: "56.7%"
        },
        image: {
            src: "/map-nodes/schoollake.png",
            alt: "School Lake",
            className: "hl-pixel-map-node--schoollake"
        }
    },
    "school-gates": {
        key: "school-gates",
        label: "School Gates",
        description: "The school reopens under suspicion, pressure, and fear.",
        position: {
            left: "18%",
            top: "43.1%"
        },
        image: {
            src: "/map-nodes/schoolgate.png",
            alt: "School Gates",
            className: "hl-pixel-map-node--schoolgate"
        }
    }
};
const ROLE_STORY_STEPS = {
    CIV: [
        {
            id: "civ-city-hall",
            role: "CIV",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITY_HALL_ROUTE"],
            nodeKey: "city-hall",
            locationLabel: "City Hall",
            timelineLabel: "First Briefing",
            sceneTitle: "Pre-Riot: City Hall Briefing",
            sceneSubtitle: "Rajiv begins inside a newly elected government that still believes the Hock Lee dispute can be managed through meetings, memos, and calm administration. The victory mood has barely faded, but the pressure to act is already building.",
            summary: "The story opens with confidence, responsibility, and a crisis that still looks containable."
        },
        {
            id: "civ-market",
            role: "CIV",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MARKET_ROUTE"],
            nodeKey: "market",
            locationLabel: "Market",
            timelineLabel: "Street Pressure",
            sceneTitle: "Pre-Riot: Market Conversations",
            sceneSubtitle: "Away from official files, Rajiv hears workers and stallholders complain about fares, wages, and rising prices. What sounded manageable in City Hall now feels closer, louder, and harder to dismiss.",
            summary: "Public frustration gives the dispute a human face."
        },
        {
            id: "civ-home",
            role: "CIV",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOME_CIVIL_SERVANT_ROUTE"],
            nodeKey: "home",
            locationLabel: "Home",
            timelineLabel: "Worry at Home",
            sceneTitle: "Pre-Riot: Unrest at Home",
            sceneSubtitle: "Radio bulletins and family concern follow Rajiv home, turning a public dispute into a private unease he cannot file away. For the first time, he suspects this conflict may outrun routine governance.",
            summary: "By nightfall, the crisis no longer feels distant or professional."
        },
        {
            id: "civ-bus-depot",
            role: "CIV",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUS_DEPOT_ROUTE"],
            nodeKey: "bus-depot",
            locationLabel: "Bus Depot",
            timelineLabel: "Strike Line",
            sceneTitle: "Riot: Bus Depot Standoff",
            sceneSubtitle: "At the depot, workers, students, and police converge in the same charged space. Rajiv sees the dispute leave the realm of paperwork and become a public confrontation that may break at any moment.",
            summary: "The crisis steps into the street and can no longer be managed from a distance."
        },
        {
            id: "civ-government-office",
            role: "CIV",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOVERNMENT_OFFICE_ROUTE"],
            nodeKey: "government-office",
            locationLabel: "Government Office",
            timelineLabel: "Crisis Meeting",
            sceneTitle: "Riot: Government Crisis Meeting",
            sceneSubtitle: "Back inside government, every option now feels risky: negotiate too slowly and anger grows; act too forcefully and the city may ignite. Rajiv watches procedure struggle to keep pace with events outside.",
            summary: "Procedure slows down just as events begin to accelerate."
        },
        {
            id: "civ-command-center",
            role: "CIV",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_CENTER_ROUTE"],
            nodeKey: "command-center",
            locationLabel: "Command Center",
            timelineLabel: "Damage Control",
            sceneTitle: "Riot: Command Center",
            sceneSubtitle: "Phones ring with contradictory reports of movement, injuries, and blame. Rajiv is no longer trying to steer the situation so much as contain the fallout before it spreads further.",
            summary: "Government shifts from planning the response to triaging the damage."
        },
        {
            id: "civ-funeral",
            role: "CIV",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FUNERAL_ROUTE"],
            nodeKey: "funeral",
            locationLabel: "Funeral",
            timelineLabel: "Public Mourning",
            sceneTitle: "Post-Riot: Funeral Procession",
            sceneSubtitle: "In the mourning crowd, grief and anger are impossible to separate. Rajiv is forced to face the human cost of decisions once discussed as matters of order, timing, and control.",
            summary: "The aftermath turns administrative failure into public grief."
        },
        {
            id: "civ-negotiation",
            role: "CIV",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEGOTIATION_ROUTE"],
            nodeKey: "negotiation-hall",
            locationLabel: "Negotiation Hall",
            timelineLabel: "Fragile Settlement",
            sceneTitle: "Post-Riot: Return to Negotiation",
            sceneSubtitle: "Officials and labour representatives return to the table because the city cannot survive another rupture. Rajiv helps rebuild order through negotiation, even while knowing that trust in the system has been damaged.",
            summary: "Recovery begins, but confidence in authority does not fully return."
        },
        {
            id: "civ-airport",
            role: "CIV",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KALLANG_AIRPORT_ROUTE"],
            nodeKey: "airport",
            locationLabel: "Airport",
            timelineLabel: "Uncertain Future",
            sceneTitle: "Post-Riot: Airport Departure",
            sceneSubtitle: "At the airport, Rajiv sees the riots receding into the larger political transition already underway. The immediate crisis is ending, but the deeper questions it raised about power, legitimacy, and change remain unresolved.",
            summary: "The route closes with movement forward, but not with certainty."
        }
    ],
    BW: [
        {
            id: "bw-city-hall",
            role: "BW",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITY_HALL_ROUTE"],
            nodeKey: "city-hall",
            locationLabel: "City Hall",
            sceneTitle: "Pre-Riot: City Hall",
            sceneSubtitle: "Waiting outside City Hall, the bus worker overhears officials discussing labour unrest as if it were an administrative inconvenience. Fatigue turns into resentment as he realizes decisions about his life are made without him.",
            summary: "Power is visible here, but workers remain outside it."
        },
        {
            id: "bw-market",
            role: "BW",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MARKET_ROUTE"],
            nodeKey: "market",
            locationLabel: "Market",
            sceneTitle: "Pre-Riot: Market",
            sceneSubtitle: "Buying food becomes a lesson in inflation and frustration as workers talk wages, rent, and union rumours. Shared grievance settles in: everyone is struggling, and everyone knows why.",
            summary: "Economic pressure gives private frustration a collective voice."
        },
        {
            id: "bw-home",
            role: "BW",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOME_BUS_WORKER_ROUTE"],
            nodeKey: "home",
            locationLabel: "Home",
            sceneTitle: "Pre-Riot: Home",
            sceneSubtitle: "At home, the strike becomes an argument about income, risk, and dignity. Family fear collides with determination, and the worker decides that without action nothing will change.",
            summary: "Solidarity starts with what a household can no longer endure."
        },
        {
            id: "bw-bus-depot",
            role: "BW",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUS_DEPOT_ROUTE"],
            nodeKey: "bus-depot",
            locationLabel: "Bus Depot",
            sceneTitle: "Riot: Bus Depot",
            sceneSubtitle: "The worker joins the picket line among chanting colleagues, police watchfulness, and arriving students. Fear remains, but collective action makes empowerment feel real for the first time.",
            summary: "The depot turns grievance into visible solidarity."
        },
        {
            id: "bw-government-office",
            role: "BW",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOVERNMENT_OFFICE_ROUTE"],
            nodeKey: "government-office",
            locationLabel: "Government Office",
            sceneTitle: "Riot: Government Office",
            sceneSubtitle: "Outside the negotiation building, rumours spread that talks are failing and the crowd's patience wears thin. Hope curdles into betrayal as workers feel the system still is not listening.",
            summary: "Negotiation feels distant when nothing changes on the ground."
        },
        {
            id: "bw-alexandra-road",
            role: "BW",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALEXANDRA_ROAD_ROUTE"],
            nodeKey: "alexandra-road",
            locationLabel: "Alexandra Road",
            sceneTitle: "Riot: Alexandra Road",
            sceneSubtitle: "What began as protest turns into stones, panic, and survival. In the chaos, the worker helps where he can, gets hurt, and understands that this is no longer a controlled labour action.",
            summary: "Solidarity survives, but the street now demands endurance more than slogans."
        },
        {
            id: "bw-hospital",
            role: "BW",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KK_HOSPITAL_ROUTE"],
            nodeKey: "hospital",
            locationLabel: "Hospital",
            sceneTitle: "Post-Riot: Hospital",
            sceneSubtitle: "Among bandages, overcrowded wards, and rumours of the dead, the worker confronts the cost of the struggle directly. Shock gives way to exhaustion as survival becomes the only certain victory.",
            summary: "The movement's price is written on bodies before it is written in history."
        },
        {
            id: "bw-negotiation",
            role: "BW",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEGOTIATION_ROUTE"],
            nodeKey: "negotiation-hall",
            locationLabel: "Negotiation Hall",
            sceneTitle: "Post-Riot: Negotiation Hall",
            sceneSubtitle: "Union leaders speak of next steps while workers argue over whether anything has been won at all. Hope returns in fragments, but the outcome remains morally and politically unresolved.",
            summary: "Victory and defeat become difficult to separate."
        },
        {
            id: "bw-home-return",
            role: "BW",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOME_BUS_WORKER_RETURN_ROUTE"],
            nodeKey: "home",
            locationLabel: "Home (Return)",
            sceneTitle: "Post-Riot: Home",
            sceneSubtitle: "Back home at last, the room is quiet and the family is relieved, but the future is still uncertain. The worker has survived, yet dignity remains unsettled rather than restored.",
            summary: "Survival closes the day, not the conflict."
        }
    ],
    CS: [
        {
            id: "cs-classroom",
            role: "CS",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLASSROOM_ROUTE"],
            nodeKey: "classroom",
            locationLabel: "Classroom",
            sceneTitle: "Pre-Riot: Classroom",
            sceneSubtitle: "A lesson on society and politics suddenly feels urgent as whispers about the strike circulate through the room. Boredom gives way to ideological curiosity: the world outside school now matters.",
            summary: "Awakening begins in conversation before it reaches the street."
        },
        {
            id: "cs-market",
            role: "CS",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MARKET_ROUTE"],
            nodeKey: "market",
            locationLabel: "Market",
            sceneTitle: "Pre-Riot: Market",
            sceneSubtitle: "In the market, the student sees workers argue, hears stories of rising prices, and feels injustice become concrete. Observation becomes empathy as hardship stops being abstract.",
            summary: "Political feeling forms through ordinary scenes of struggle."
        },
        {
            id: "cs-home",
            role: "CS",
            phase: "Pre-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOME_STUDENT_ROUTE"],
            nodeKey: "home",
            locationLabel: "Home",
            sceneTitle: "Pre-Riot: Home",
            sceneSubtitle: "Parents warn against involvement, hoping school will remain separate from the unrest outside. Restriction hardens into defiance as the student feels the need to choose a path independently.",
            summary: "Generational caution collides with political self-definition."
        },
        {
            id: "cs-school-lake",
            role: "CS",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCHOOL_LAKE_ROUTE"],
            nodeKey: "school-lake",
            locationLabel: "School Lake",
            sceneTitle: "Riot: School Lake",
            sceneSubtitle: "Students gather quietly near the school grounds to plan support for the strike. Nervousness turns into collective excitement as the student feels history becoming participatory.",
            summary: "Radicalisation starts with peers deciding to act together."
        },
        {
            id: "cs-bus-depot",
            role: "CS",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUS_DEPOT_ROUTE"],
            nodeKey: "bus-depot",
            locationLabel: "Bus Depot",
            sceneTitle: "Riot: Bus Depot",
            sceneSubtitle: "At the depot, chanting with workers makes the student feel part of a larger movement, even as police presence introduces fear. The struggle is suddenly bigger than school life.",
            summary: "Solidarity offers purpose, but also danger."
        },
        {
            id: "cs-alexandra-road",
            role: "CS",
            phase: "Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALEXANDRA_ROAD_ROUTE"],
            nodeKey: "alexandra-road",
            locationLabel: "Alexandra Road",
            sceneTitle: "Riot: Alexandra Road",
            sceneSubtitle: "Violence erupts, the crowd scatters, and the student sees injury and arrest up close. Adrenaline collapses into trauma as political conviction meets real danger.",
            summary: "The street teaches consequences more harshly than ideology does."
        },
        {
            id: "cs-funeral",
            role: "CS",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FUNERAL_ROUTE"],
            nodeKey: "funeral",
            locationLabel: "Funeral",
            sceneTitle: "Post-Riot: Funeral",
            sceneSubtitle: "At the funeral procession, speeches and mourning transform loss into political meaning. Grief becomes politicisation as the student begins to believe sacrifice must count for something.",
            summary: "Memory becomes part of movement-building."
        },
        {
            id: "cs-school-gates",
            role: "CS",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SCHOOL_GATES_ROUTE"],
            nodeKey: "school-gates",
            locationLabel: "School Gates",
            sceneTitle: "Post-Riot: School Gates",
            sceneSubtitle: "Police presence and institutional tension now greet students at the entrance. Academic routine feels permanently altered, and the student's life path no longer seems separate from politics.",
            summary: "After the riots, identity itself has shifted."
        },
        {
            id: "cs-home-return",
            role: "CS",
            phase: "Post-Riot",
            route: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOME_STUDENT_RETURN_ROUTE"],
            nodeKey: "home",
            locationLabel: "Home",
            sceneTitle: "Post-Riot: Home",
            sceneSubtitle: "Newspaper headlines and worried parents frame the final return home. Silence gives way to reflection as the student realizes innocence is gone and a political self has taken shape.",
            summary: "The route ends with a new identity rather than resolution."
        }
    ]
};
const MASTER_MODE_NODE_ORDER = [
    "city-hall",
    "market",
    "home",
    "government-office",
    "bus-depot",
    "command-center",
    "classroom",
    "school-lake",
    "alexandra-road",
    "funeral",
    "hospital",
    "negotiation-hall",
    "school-gates",
    "airport"
];
const CUTSCENE_CONTENT_BY_ROLE = {
    CIV: {
        intro: {
            badge: "CIVIL SERVANT",
            heading: "Maintaining order before the streets turn",
            paragraphs: [
                "Singapore's political climate is tightening. Labour unrest, student mobilization, and anti-colonial pressure all sit inside the files Rajiv is asked to read as routine governance.",
                "From inside the administration, every problem arrives as a report, a briefing, or a request for restraint. The work seems manageable as long as conflict can be translated into procedure.",
                "But public authority is already fraying. The transport dispute is not simply about buses; it is about wages, legitimacy, and who gets to define order in a changing colony.",
                "Your route begins with watchfulness. Track how confidence in governance shifts into uncertainty once events start outrunning the people meant to contain them."
            ],
            continueLabel: "Enter the briefing"
        },
        "riot-transition": {
            badge: "PHASE SHIFT",
            heading: "From monitoring unrest to losing control",
            paragraphs: [
                "The administrative distance of the pre-riot phase is over. Reports, rumours, and public anger are now converging around the strike itself.",
                "Rajiv has seen enough to know that policy affects real lives, but that knowledge does not make coordination easier. The machinery of government is being asked to move faster than it knows how.",
                "At the depot and beyond, students, workers, police, and officials will now interpret every action as a signal. Misjudgment can harden the entire city at once.",
                "Enter the riot phase expecting ambiguity, pressure, and decisions made without the comfort of complete information."
            ],
            continueLabel: "Face the crisis"
        },
        "post-riot-transition": {
            badge: "PHASE SHIFT",
            heading: "From crisis management to consequence",
            paragraphs: [
                "The street battle is ending, but control has not been restored in any simple sense. Death, mourning, and accusation now shape what the administration must answer for.",
                "Rajiv has watched procedure fail under speed and force. The next task is no longer only to coordinate movement, but to confront how authority will explain itself afterward.",
                "Funerals, negotiations, and international attention will define the meaning of the riots as much as the violence itself did. Administration now becomes narrative as well as policy.",
                "The post-riot phase asks what order is worth when it leaves grief behind it, and who gets to decide what the crisis meant."
            ],
            continueLabel: "Enter the aftermath"
        },
        outro: {
            badge: "AFTERMATH",
            heading: "Reconstructing meaning",
            paragraphs: [
                "Rajiv's route ends where governance and memory overlap. The riots can no longer be reduced to briefings, because they have already been lived, suffered, and interpreted in public.",
                "Order survived, but not untouched. The administration kept moving, yet every later decision now carries the memory of what official control cost.",
                "Political transition continues beyond the airport and beyond this crisis. The institutions Rajiv serves will go on, but their legitimacy has been changed by what they failed to prevent.",
                "This story closes with uncertainty intact: governance has endured, but the meaning of governance itself has become more fragile and more contested."
            ],
            continueLabel: "Return to map"
        }
    },
    BW: {
        intro: {
            badge: "BUS WORKER",
            heading: "Survival before solidarity becomes public",
            paragraphs: [
                "For the bus worker, the Hock Lee dispute begins before the strike line forms. It starts in wages that do not stretch, prices that keep rising, and hours that wear the body down.",
                "Official discussions happen elsewhere, in rooms workers do not enter. What reaches home instead is exhaustion, rumour, and the knowledge that management can wait longer than a family budget can.",
                "The question is no longer whether conditions are fair. The question is whether staying quiet protects anyone at all.",
                "Your route follows a labour struggle from private strain into collective action, and then into the damage that action must absorb."
            ],
            continueLabel: "Start the shift"
        },
        "riot-transition": {
            badge: "PHASE SHIFT",
            heading: "From grievance to confrontation",
            paragraphs: [
                "The argument at home and in the market now becomes visible at the depot. Workers who felt cornered separately begin to act together in public.",
                "Solidarity offers courage, but it also draws in police, officials, students, and political actors with their own agendas. The strike stops belonging only to the workers who began it.",
                "Every chant and every delay changes what the crowd believes is possible. Hope rises quickly, and so does the chance that control will disappear.",
                "The riot phase begins with empowerment, but it will test how much survival a movement can demand from the people inside it."
            ],
            continueLabel: "Join the line"
        },
        "post-riot-transition": {
            badge: "PHASE SHIFT",
            heading: "From solidarity to cost",
            paragraphs: [
                "The street has exacted its price. Whatever the movement hoped to win, it now must carry injuries, rumours of death, and exhausted families back into the story.",
                "For workers, the aftermath is not abstract. It is measured in bandages, fear, and uncertainty about whether sacrifice produced change or only more suffering.",
                "Leaders will keep negotiating, but the worker's question is harsher: was this worth what people had to absorb to stay visible?",
                "The post-riot phase is about survival with no guarantee of closure, and dignity without the comfort of a clear victory."
            ],
            continueLabel: "Carry the cost"
        },
        outro: {
            badge: "AFTERMATH",
            heading: "Survival without closure",
            paragraphs: [
                "The bus worker survives the route, but survival is not the same as peace. The struggle achieved visibility, solidarity, and pressure, yet it also left wounds that cannot be negotiated away.",
                "What changed remains ambiguous. Workers forced the city to reckon with their conditions, but they also learned how quickly a labour action can become a broader political contest beyond their control.",
                "Home returns at the end of the story, but not as the same place it was before. Relief exists beside unresolved anger, pride, and uncertainty about what the future will demand next.",
                "This ending holds onto tragic labour realism: dignity persists, but it does so without the clean comfort of victory."
            ],
            continueLabel: "Return to map"
        }
    },
    CS: {
        intro: {
            badge: "CHINESE STUDENT",
            heading: "Awakening before the street claims you",
            paragraphs: [
                "For the student, the Hock Lee story begins in school, conversation, and curiosity. Politics first appears as something whispered, argued over, and half-understood between lessons.",
                "The market and the home then sharpen that curiosity into conviction. Injustice stops being an idea once hardship is visible and parental caution starts to feel like constraint.",
                "Student support for labour unrest is not an accidental side story. It is one of the ways anti-colonial feeling moves from classrooms into the city itself.",
                "Your route is a political coming-of-age: follow how observation becomes commitment, and how commitment is changed once violence enters the lesson."
            ],
            continueLabel: "Enter the classroom"
        },
        "riot-transition": {
            badge: "PHASE SHIFT",
            heading: "From curiosity to mobilisation",
            paragraphs: [
                "The pre-riot phase has done its work: the student has seen hardship, argued at home, and decided that neutrality is no longer convincing.",
                "Now political energy moves into secret gatherings and public support. The strike becomes a stage on which students can imagine themselves as historical actors rather than spectators.",
                "That excitement is real, but so is the danger. Once the student steps into the movement, fear and consequence begin travelling alongside conviction.",
                "The riot phase will test not whether the student cares, but what caring costs when the city starts to fracture in public."
            ],
            continueLabel: "Join the students"
        },
        "post-riot-transition": {
            badge: "PHASE SHIFT",
            heading: "From trauma to political identity",
            paragraphs: [
                "After Alexandra Road, the student's education changes permanently. Violence has ended the fantasy that history can be entered without risk.",
                "What comes next is not innocence regained, but the struggle over meaning: funerals, school discipline, and family anxiety all compete to explain what the riots should signify.",
                "For some, the lesson is caution. For the student, grief and fear now mingle with a deeper sense that identity itself has been politicised.",
                "The post-riot phase traces how trauma becomes memory, and how memory becomes part of who this young person will be from now on."
            ],
            continueLabel: "Face the aftermath"
        },
        outro: {
            badge: "AFTERMATH",
            heading: "No longer innocent",
            paragraphs: [
                "The student ends this route changed more than settled. The riots have turned politics from a topic into a lived condition that shapes school, family, and self-understanding.",
                "What began as curiosity became solidarity, then fear, then a new form of identity. The cost of awakening is that innocence cannot return once history has entered daily life this directly.",
                "Home still exists, but it no longer contains the student the way it once did. Newspapers, school gates, and parental worry now all point to a future that feels politically charged.",
                "This ending is not closure. It is formation: a political self has emerged, and it will carry the memory of these events into whatever comes next."
            ],
            continueLabel: "Return to map"
        }
    }
};
const STORY_PHASE_TRACK = [
    {
        label: "Pre-Riot",
        span: 3,
        color: "rgb(255, 193, 94)"
    },
    {
        label: "Riot",
        span: 3,
        color: "rgb(210, 92, 92)"
    },
    {
        label: "Post-Riot",
        span: 3,
        color: "rgb(130, 160, 185)"
    }
];
const getRoleSteps = (role)=>ROLE_STORY_STEPS[role];
const getStoryStepByRoute = (role, route)=>getRoleSteps(role).find((step)=>step.route === route) ?? null;
const getStoryStepByNodeKey = (role, nodeKey)=>getRoleSteps(role).find((step)=>step.nodeKey === nodeKey) ?? null;
const getStoryStepIndexByRoute = (role, route)=>getRoleSteps(role).findIndex((step)=>step.route === route);
const getLatestStoryStepForNode = (role, nodeKey, maxIndex)=>{
    const eligibleSteps = getRoleSteps(role).filter((step, index)=>step.nodeKey === nodeKey && index <= maxIndex);
    return eligibleSteps[eligibleSteps.length - 1] ?? null;
};
const getExitRouteForStepIndex = (role, stepIndex)=>{
    const steps = getRoleSteps(role);
    if (stepIndex < 0 || stepIndex >= steps.length) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOCK_LEE_MAP_ROUTE"];
    }
    if (stepIndex === 2) return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RIOT_CUTSCENE_ROUTE"];
    if (stepIndex === 5) return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POST_RIOT_CUTSCENE_ROUTE"];
    if (stepIndex === steps.length - 1) return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OUTRO_CUTSCENE_ROUTE"];
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOCK_LEE_MAP_ROUTE"];
};
const getNextRouteForCutscene = (role, cutsceneKind)=>{
    if (cutsceneKind === "intro") {
        return getRoleSteps(role)[0]?.route ?? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOCK_LEE_MAP_ROUTE"];
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOCK_LEE_MAP_ROUTE"];
};
const getCutsceneKindForRoute = (route)=>{
    if (route === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTRO_CUTSCENE_ROUTE"]) return "intro";
    if (route === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RIOT_CUTSCENE_ROUTE"]) return "riot-transition";
    if (route === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POST_RIOT_CUTSCENE_ROUTE"]) return "post-riot-transition";
    if (route === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OUTRO_CUTSCENE_ROUTE"]) return "outro";
    return null;
};
const resolveCharacterCode = (value)=>{
    if (value === "CIV" || value === "BW" || value === "CS") {
        return value;
    }
    return DEFAULT_CHARACTER_CODE;
};
const buildRoleAwareRoute = (route, role)=>{
    const separator = route.includes("?") ? "&" : "?";
    return `${route}${separator}role=${role}`;
};
const stripRouteQuery = (route)=>route.split("?")[0];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map-progression.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAP_LAST_NODE_KEY",
    ()=>MAP_LAST_NODE_KEY,
    "MAP_UNLOCK_ANIMATION_SCENE_KEY",
    ()=>MAP_UNLOCK_ANIMATION_SCENE_KEY,
    "MAP_VISITED_PROGRESS_KEY",
    ()=>MAP_VISITED_PROGRESS_KEY,
    "advanceVisitedProgress",
    ()=>advanceVisitedProgress,
    "getUnlockedNodeKey",
    ()=>getUnlockedNodeKey,
    "getUnlockedThroughIndex",
    ()=>getUnlockedThroughIndex,
    "isStepIndexUnlocked",
    ()=>isStepIndexUnlocked,
    "normalizeVisitedProgress",
    ()=>normalizeVisitedProgress,
    "parseMapLastNodeKey",
    ()=>parseMapLastNodeKey,
    "parseVisitedProgress",
    ()=>parseVisitedProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-paths.ts [app-client] (ecmascript)");
;
;
const MAP_LAST_NODE_KEY = "mapLastNode";
const MAP_VISITED_PROGRESS_KEY = "hockLeeMapVisitedProgress";
const MAP_UNLOCK_ANIMATION_SCENE_KEY = "hockLeeMapUnlockAnimationNode";
const MIN_VISITED_PROGRESS = -1;
const normalizeVisitedProgress = (value, role)=>{
    const maxVisitedProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(role).length - 1;
    if (!Number.isFinite(value)) return MIN_VISITED_PROGRESS;
    return Math.min(Math.max(Math.floor(value), MIN_VISITED_PROGRESS), maxVisitedProgress);
};
const parseVisitedProgress = (value, role)=>{
    if (!value) return MIN_VISITED_PROGRESS;
    return normalizeVisitedProgress(Number.parseInt(value, 10), role);
};
const getUnlockedThroughIndex = (visitedProgress, role)=>{
    const maxUnlockedThroughIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(role).length - 1;
    return Math.min(maxUnlockedThroughIndex, Math.max(0, normalizeVisitedProgress(visitedProgress, role) + 1));
};
const getUnlockedNodeKey = (visitedProgress, role)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(role)[getUnlockedThroughIndex(visitedProgress, role)]?.nodeKey ?? null;
const isStepIndexUnlocked = (stepIndex, visitedProgress, role)=>stepIndex <= getUnlockedThroughIndex(visitedProgress, role);
const advanceVisitedProgress = (visitedProgress, route, role)=>{
    const current = normalizeVisitedProgress(visitedProgress, role);
    const stepIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoryStepIndexByRoute"])(role, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripRouteQuery"])(route));
    if (stepIndex < 0) return current;
    if (!isStepIndexUnlocked(stepIndex, current, role)) return current;
    return Math.max(current, stepIndex);
};
const parseMapLastNodeKey = (value)=>{
    if (!value) return null;
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/scenes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARACTER_LABELS",
    ()=>CHARACTER_LABELS,
    "HOCK_LEE_SCENES",
    ()=>HOCK_LEE_SCENES
]);
const CHARACTER_LABELS = {
    CIV: "Civil Servant",
    BW: "Bus Worker",
    CS: "Chinese Student"
};
const HOCK_LEE_SCENES = [
    {
        phase: "Pre-Riot",
        sceneNumber: 1,
        route: "/hock-lee-bus-riots-pixel/pre-riot/scene-1-city-hall",
        locationEvent: "City Hall",
        description: "Political shift (LF Rendel win)",
        characters: [
            "CIV",
            "BW",
            "CS"
        ]
    },
    {
        phase: "Pre-Riot",
        sceneNumber: 2,
        route: "/hock-lee-bus-riots-pixel/pre-riot/scene-2-market",
        locationEvent: "Market",
        description: "Cost of living struggles",
        characters: [
            "BW",
            "CS",
            "CIV"
        ]
    },
    {
        phase: "Pre-Riot",
        sceneNumber: 3,
        route: "/hock-lee-bus-riots-pixel/pre-riot/scene-3-chinese-medium-school",
        locationEvent: "Chinese Medium School",
        description: "Bus worker father; discussion of pre-riot tensions",
        characters: [
            "CS"
        ]
    },
    {
        phase: "Pre-Riot",
        sceneNumber: 4,
        route: "/hock-lee-bus-riots-pixel/pre-riot/scene-4-government-office",
        locationEvent: "Government Office",
        description: "Civil servant reports struggles to David Marshall (cost, poor reform)",
        characters: [
            "CIV"
        ]
    },
    {
        phase: "Pre-Riot",
        sceneNumber: 5,
        route: "/hock-lee-bus-riots-pixel/pre-riot/scene-5-bus-depot",
        locationEvent: "Bus Depot",
        description: "Low pay, union issues, mistreatment",
        characters: [
            "BW"
        ]
    },
    {
        phase: "Riot",
        sceneNumber: 6,
        route: "/hock-lee-bus-riots-pixel/riot/scene-6-bus-depot-strike-i",
        locationEvent: "Bus Depot - Strike I",
        description: "Peaceful strike",
        characters: [
            "BW",
            "CIV",
            "CS"
        ],
        npc: "Bus Boss"
    },
    {
        phase: "Riot",
        sceneNumber: 7,
        route: "/hock-lee-bus-riots-pixel/riot/scene-7-negotiation",
        locationEvent: "Negotiation",
        description: "SBWU + Hock Lee Company meeting with David Marshall",
        characters: [
            "BW",
            "CIV"
        ],
        npc: "Bus Boss"
    },
    {
        phase: "Riot",
        sceneNumber: 8,
        route: "/hock-lee-bus-riots-pixel/riot/scene-8-bus-depot-strike-ii",
        locationEvent: "Bus Depot - Strike II",
        description: "Violent escalation",
        characters: [
            "CS",
            "BW"
        ]
    },
    {
        phase: "Riot",
        sceneNumber: 9,
        route: "/hock-lee-bus-riots-pixel/riot/scene-9-radio-news",
        locationEvent: "Home",
        description: "Civil servant hears riot developments",
        characters: [
            "CIV"
        ]
    },
    {
        phase: "Riot",
        sceneNumber: 10,
        route: "/hock-lee-bus-riots-pixel/riot/scene-10-funeral-newspaper",
        locationEvent: "Funeral / Newspaper",
        description: "Public grief and media coverage",
        characters: [
            "CS",
            "BW",
            "CIV"
        ]
    },
    {
        phase: "Riot",
        sceneNumber: 15,
        route: "/hock-lee-bus-riots-pixel/riot/school-lake",
        locationEvent: "School Lake",
        description: "Student activists regroup near the school grounds",
        characters: [
            "CS"
        ]
    },
    {
        phase: "Riot",
        sceneNumber: 16,
        route: "/hock-lee-bus-riots-pixel/riot/classroom",
        locationEvent: "Classroom",
        description: "Students organize inside the school amid escalating unrest",
        characters: [
            "CS"
        ]
    },
    {
        phase: "Post-Riot",
        sceneNumber: 11,
        route: "/hock-lee-bus-riots-pixel/post-riot/scene-11-settlement",
        locationEvent: "Negotiation Hall",
        description: "David Marshall negotiates with SBWU",
        characters: [
            "BW",
            "CIV"
        ],
        npc: "Bus Boss"
    },
    {
        phase: "Post-Riot",
        sceneNumber: 12,
        route: "/hock-lee-bus-riots-pixel/post-riot/hospital",
        locationEvent: "KK Hospital",
        description: "Students and families confront the riot's aftermath",
        characters: [
            "CS"
        ]
    },
    {
        phase: "Post-Riot",
        sceneNumber: 13,
        route: "/hock-lee-bus-riots-pixel/post-riot/scene-13-paya-lebar-airport",
        locationEvent: "Kallang Airport",
        description: "Departure for Merdeka Talks",
        characters: [
            "CIV",
            "BW",
            "CS"
        ],
        notes: "TV Scene?; DM resign"
    },
    {
        phase: "Post-Riot",
        sceneNumber: 17,
        route: "/hock-lee-bus-riots-pixel/post-riot/school-gates",
        locationEvent: "School Gates",
        description: "Students face the guarded school entrance in the aftermath",
        characters: [
            "CS"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChooseYourCharacterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map-progression.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/scenes.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-paths.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const INVENTORY_STORAGE_KEY = "inventorySlots";
const CHARACTER_OPTIONS = [
    {
        id: "BW",
        sprite: "/npcfigures/busworker/south.png",
        alt: "Bus worker sprite",
        portraitBackground: "#efe6dc",
        quote: "I need to make sure the depot workers are heard.",
        mission: [
            "Track how low pay, long shifts, and company decisions push workers toward action.",
            "Observe the bus depot, union pressure, and how unrest grows on the ground.",
            "Document what workers risk when the dispute turns public and political."
        ]
    },
    {
        id: "CIV",
        sprite: "/npcfigures/civilservant/Civil%20Servant_0001.webp",
        alt: "Civil servant sprite",
        portraitBackground: "#f1ece5",
        quote: "I am here to understand the crisis before it spins out of control.",
        mission: [
            "See how the colonial government and new local leaders respond to rising unrest.",
            "Follow reports, official decisions, and the pressure to maintain public order.",
            "Piece together how political reform, labor demands, and fear of disorder collide."
        ]
    },
    {
        id: "CS",
        sprite: "/npcfigures/riotfigures/Student%20Union/Student-Riot_South.webp",
        alt: "Chinese student sprite",
        portraitBackground: "#ecebcf",
        quote: "The schools are part of this story too, and students feel every shift.",
        mission: [
            "Witness the Hock Lee tensions through student networks and Chinese-medium schools.",
            "Trace how solidarity, anger, and activism move from classrooms into the streets.",
            "Understand why students become part of a wider anti-colonial struggle."
        ]
    }
];
function ChooseYourCharacterPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedCharacter, setSelectedCharacter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("BW");
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChooseYourCharacterPage.useEffect": ()=>{
            router.prefetch(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOCK_LEE_MAP_ROUTE"]);
        }
    }["ChooseYourCharacterPage.useEffect"], [
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChooseYourCharacterPage.useEffect": ()=>{
            const { body, documentElement } = document;
            const previousHtmlOverflow = documentElement.style.overflow;
            const previousBodyOverflow = body.style.overflow;
            const previousHtmlHeight = documentElement.style.height;
            const previousBodyHeight = body.style.height;
            const previousBodyOverscroll = body.style.overscrollBehavior;
            documentElement.style.overflow = "hidden";
            body.style.overflow = "hidden";
            documentElement.style.height = "100%";
            body.style.height = "100%";
            body.style.overscrollBehavior = "none";
            return ({
                "ChooseYourCharacterPage.useEffect": ()=>{
                    documentElement.style.overflow = previousHtmlOverflow;
                    body.style.overflow = previousBodyOverflow;
                    documentElement.style.height = previousHtmlHeight;
                    body.style.height = previousBodyHeight;
                    body.style.overscrollBehavior = previousBodyOverscroll;
                }
            })["ChooseYourCharacterPage.useEffect"];
        }
    }["ChooseYourCharacterPage.useEffect"], []);
    const selectedOption = CHARACTER_OPTIONS.find((option)=>option.id === selectedCharacter) ?? CHARACTER_OPTIONS[0];
    const selectedIndex = CHARACTER_OPTIONS.findIndex((option)=>option.id === selectedOption.id);
    const handleStepCharacter = (direction)=>{
        const nextIndex = (selectedIndex + direction + CHARACTER_OPTIONS.length) % CHARACTER_OPTIONS.length;
        setSelectedCharacter(CHARACTER_OPTIONS[nextIndex].id);
    };
    const handleBack = ()=>{
        if (("TURBOPACK compile-time value", "object") !== "undefined" && window.history.length > 1) {
            router.back();
            return;
        }
        router.push("/");
    };
    const handleSelect = ()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELECTED_CHARACTER_STORAGE_KEY"], selectedCharacter);
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_LAST_NODE_KEY"]);
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_VISITED_PROGRESS_KEY"]);
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_UNLOCK_ANIMATION_SCENE_KEY"]);
        window.localStorage.removeItem(INVENTORY_STORAGE_KEY);
        startTransition(()=>{
            router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRoleAwareRoute"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOCK_LEE_MAP_ROUTE"], selectedCharacter));
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "hl-character-select-page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hl-character-select-stage",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hl-character-select-header",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scene-title-stack",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pixel-corners--wrapper",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pixel-corners scene-title",
                                children: "Select Player"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "hl-character-select-layout",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pixel-corners--wrapper hl-character-select-panel-shell",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "pixel-corners hl-character-select-panel",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pixel-corners--wrapper hl-character-select-mission-shell",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "scene-description hl-character-select-mission pixel-corners",
                                        "data-collapsed": "false",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "scene-title-stack hl-character-select-panel-stack",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pixel-corners--wrapper hl-character-select-role-shell",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pixel-corners scene-title hl-character-select-role-title",
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_LABELS"][selectedOption.id].toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pixel-corners--wrapper hl-character-select-mission-label-shell",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pixel-corners scene-subtitle hl-character-select-mission-label",
                                                            children: "Mission"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "scene-description-content",
                                                children: selectedOption.mission.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "scene-description-line",
                                                        children: [
                                                            "• ",
                                                            item
                                                        ]
                                                    }, item, true, {
                                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "hl-character-select-hero",
                            "aria-live": "polite",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hl-character-select-figure-stage",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "npc-chat-bubble-shell hl-character-select-chat-bubble",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "npc-chat-bubble pixel-corners",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "npc-chat-text",
                                                    children: selectedOption.quote
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            alt: selectedOption.alt,
                                            className: "hl-character-select-figure",
                                            height: 520,
                                            priority: true,
                                            src: selectedOption.sprite,
                                            width: 300
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                            lineNumber: 183,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hl-character-select-figure-shadow",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hl-character-select-mission-nav",
                                    "aria-label": "Switch role",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "aria-label": `Previous role: ${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_LABELS"][CHARACTER_OPTIONS[(selectedIndex - 1 + CHARACTER_OPTIONS.length) % CHARACTER_OPTIONS.length].id]}`,
                                            className: "pixel-corners hl-character-select-mission-arrow hl-character-select-mission-arrow--prev",
                                            onClick: ()=>handleStepCharacter(-1),
                                            type: "button",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "aria-hidden": "true",
                                                className: "hl-character-select-mission-arrow-icon"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                            lineNumber: 194,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "aria-label": `Next role: ${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_LABELS"][CHARACTER_OPTIONS[(selectedIndex + 1) % CHARACTER_OPTIONS.length].id]}`,
                                            className: "pixel-corners hl-character-select-mission-arrow hl-character-select-mission-arrow--next",
                                            onClick: ()=>handleStepCharacter(1),
                                            type: "button",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "aria-hidden": "true",
                                                className: "hl-character-select-mission-arrow-icon"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            "aria-label": "Choose one of three characters",
                            className: "hl-character-select-picker",
                            role: "radiogroup",
                            children: CHARACTER_OPTIONS.map((option, index)=>{
                                const isSelected = option.id === selectedCharacter;
                                const portraitVars = {
                                    "--hl-character-portrait-bg": isSelected ? "#e97443" : "#a6d9fc",
                                    "--hl-character-portrait-frame": isSelected ? "#ffd24a" : "#6f99b5",
                                    "--hl-character-portrait-glow": isSelected ? "rgba(233, 116, 67, 0.28)" : "transparent"
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `pixel-corners--wrapper hl-character-select-portrait-shell ${index === 2 ? "hl-character-select-portrait-shell--wide" : ""}`,
                                    "data-selected": isSelected,
                                    style: portraitVars,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "aria-checked": isSelected,
                                        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_LABELS"][option.id],
                                        className: "pixel-corners hl-character-select-portrait",
                                        onClick: ()=>setSelectedCharacter(option.id),
                                        role: "radio",
                                        type: "button",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                alt: "",
                                                "aria-hidden": "true",
                                                className: "hl-character-select-portrait-image",
                                                height: 120,
                                                src: option.sprite,
                                                width: 120
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                lineNumber: 253,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hl-character-select-portrait-name",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_LABELS"][option.id]
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                        lineNumber: 245,
                                        columnNumber: 19
                                    }, this)
                                }, option.id, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hl-character-select-actions",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--back",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "pixel-corners hl-character-select-action hl-character-select-action--back",
                                onClick: handleBack,
                                type: "button",
                                children: "Back"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--select",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "aria-label": `Select ${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scenes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_LABELS"][selectedCharacter]}`,
                                className: "pixel-corners hl-character-select-action hl-character-select-action--select",
                                disabled: isPending,
                                onClick: handleSelect,
                                type: "button",
                                children: isPending ? "Loading..." : "Select"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                    lineNumber: 271,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hl-character-select-floor",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/choose-your-character/page.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(ChooseYourCharacterPage, "ZJV+U5rTlQWgarzfZTP1JJaEnUI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = ChooseYourCharacterPage;
var _c;
__turbopack_context__.k.register(_c, "ChooseYourCharacterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Github_hock-lee-design-sit_src_app_hock-lee-bus-riots-pixel_26bb7850._.js.map