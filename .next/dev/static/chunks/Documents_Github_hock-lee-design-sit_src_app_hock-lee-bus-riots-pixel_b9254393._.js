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
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DispositionRadarPanel",
    ()=>DispositionRadarPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const DISPOSITION_AXES = [
    {
        label: "EMP",
        value: 72,
        bg: "#ffb4a2"
    },
    {
        label: "CUR",
        value: 66,
        bg: "#ffe066"
    },
    {
        label: "COL",
        value: 81,
        bg: "#9ad0f5"
    },
    {
        label: "EXP",
        value: 58,
        bg: "#a8e6a2"
    },
    {
        label: "REF",
        value: 74,
        bg: "#f7b267"
    }
];
const CHART_SIZE = 280;
const CENTER = CHART_SIZE / 2;
const AXIS_RADIUS = 98;
const LABEL_RADIUS = 110;
const LABEL_CHIP_WIDTH = 45;
const LABEL_CHIP_HEIGHT = 22;
const polarToCartesian = (index, radius)=>{
    const angle = -Math.PI / 2 + index * 2 * Math.PI / DISPOSITION_AXES.length;
    return {
        x: CENTER + radius * Math.cos(angle),
        y: CENTER + radius * Math.sin(angle),
        cos: Math.cos(angle),
        sin: Math.sin(angle)
    };
};
const toSvgPoints = (points)=>points.map(({ x, y })=>`${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
function DispositionRadarPanel({ className = "" }) {
    const axisPoints = DISPOSITION_AXES.map((_, index)=>polarToCartesian(index, AXIS_RADIUS));
    const valuePoints = DISPOSITION_AXES.map((axis, index)=>polarToCartesian(index, AXIS_RADIUS * axis.value / 100));
    const gridLevels = [
        0.25,
        0.5,
        0.75,
        1
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "spider-chart",
        className: `inventory-panel disposition-radar-panel ${className}`.trim(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            id: "spider-chart-svg",
            className: "disposition-radar-svg",
            viewBox: `0 0 ${CHART_SIZE} ${CHART_SIZE}`,
            role: "img",
            "aria-label": "Radar chart showing placeholder values for the five Singapore Design Dispositions",
            children: [
                gridLevels.map((level)=>{
                    const levelPoints = DISPOSITION_AXES.map((_, index)=>polarToCartesian(index, AXIS_RADIUS * level));
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: toSvgPoints(levelPoints),
                        className: "disposition-radar-grid"
                    }, `disposition-grid-level-${level}`, false, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this);
                }),
                axisPoints.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: CENTER,
                        y1: CENTER,
                        x2: point.x,
                        y2: point.y,
                        className: "disposition-radar-axis"
                    }, `disposition-axis-${DISPOSITION_AXES[index].label}`, false, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                    points: toSvgPoints(valuePoints),
                    className: "disposition-radar-area"
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                valuePoints.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: point.x,
                        cy: point.y,
                        r: "5.5",
                        className: "disposition-radar-point"
                    }, `disposition-value-point-${DISPOSITION_AXES[index].label}`, false, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)),
                DISPOSITION_AXES.map((axis, index)=>{
                    const labelPoint = polarToCartesian(index, LABEL_RADIUS);
                    const dy = labelPoint.sin > 0.35 ? 12 : labelPoint.sin < -0.35 ? -8 : 4;
                    const labelY = labelPoint.y + dy;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: labelPoint.x - LABEL_CHIP_WIDTH / 2,
                                y: labelY - LABEL_CHIP_HEIGHT / 2,
                                width: LABEL_CHIP_WIDTH,
                                height: LABEL_CHIP_HEIGHT,
                                rx: "3",
                                ry: "3",
                                fill: axis.bg,
                                className: "disposition-radar-label-chip"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: labelPoint.x,
                                y: labelY,
                                textAnchor: "middle",
                                dominantBaseline: "middle",
                                className: "disposition-radar-text",
                                children: axis.label
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `disposition-label-${axis.label}`, true, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = DispositionRadarPanel;
var _c;
__turbopack_context__.k.register(_c, "DispositionRadarPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/scene-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStoredCharacterCode",
    ()=>getStoredCharacterCode,
    "persistCharacterCode",
    ()=>persistCharacterCode,
    "resolveSceneConfigForRole",
    ()=>resolveSceneConfigForRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-paths.ts [app-client] (ecmascript)");
;
;
const COMMAND_CENTER_DAVID_ID = "command-center-david-marshall-south";
const NPC_BEHIND_DESK_CLASS = "npc-figure--behind-desk";
const appendClassName = (existingClassName, nextClassName)=>{
    if (!existingClassName) return nextClassName;
    if (existingClassName.split(/\s+/).includes(nextClassName)) return existingClassName;
    return `${existingClassName} ${nextClassName}`;
};
const getRoleSpecificNpcFigures = (baseConfig, role, pathname)=>{
    if (role !== "CIV" || pathname !== __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_CENTER_ROUTE"] || !baseConfig.npcFigures) {
        return baseConfig.npcFigures;
    }
    return baseConfig.npcFigures.map((npcFigure)=>npcFigure.id === COMMAND_CENTER_DAVID_ID ? {
            ...npcFigure,
            className: appendClassName(npcFigure.className, NPC_BEHIND_DESK_CLASS)
        } : npcFigure);
};
const replaceRoleName = (value, playerName)=>value.replaceAll("Rajiv Menon", playerName).replaceAll("Rajiv", playerName);
const getStoredCharacterCode = (searchRole)=>{
    const resolvedSearchRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCharacterCode"])(searchRole);
    if (searchRole) return resolvedSearchRole;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveCharacterCode"])(window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELECTED_CHARACTER_STORAGE_KEY"]));
};
const persistCharacterCode = (role)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELECTED_CHARACTER_STORAGE_KEY"], role);
};
const resolveSceneConfigForRole = (baseConfig, role, pathname)=>{
    const presentation = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_PRESENTATIONS"][role];
    const step = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoryStepByRoute"])(role, pathname);
    const stepIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoryStepIndexByRoute"])(role, pathname);
    const exitRoute = stepIndex >= 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExitRouteForStepIndex"])(role, stepIndex) : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HOCK_LEE_MAP_ROUTE"];
    const introGuide = baseConfig.introGuide ? {
        ...baseConfig.introGuide,
        title: baseConfig.introGuide.title ? replaceRoleName(baseConfig.introGuide.title, presentation.playerName) : undefined,
        description: replaceRoleName(baseConfig.introGuide.description, presentation.playerName),
        tips: baseConfig.introGuide.tips?.map((tip)=>replaceRoleName(tip, presentation.playerName))
    } : undefined;
    const npcFigures = getRoleSpecificNpcFigures(baseConfig, role, pathname);
    return {
        ...baseConfig,
        npcFigures,
        sceneTitle: step?.sceneTitle ?? baseConfig.sceneTitle,
        sceneSubtitle: step?.sceneSubtitle ?? baseConfig.sceneSubtitle,
        characterName: presentation.playerName,
        characterAlt: presentation.playerAlt,
        characterSpriteBasePath: presentation.characterSpriteBasePath ?? baseConfig.characterSpriteBasePath,
        characterSprites: presentation.characterSprites ?? baseConfig.characterSprites,
        selectedCharacterCode: role,
        mapRoute: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRoleAwareRoute"])(exitRoute, role),
        introGuide
    };
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameMenuOverlay",
    ()=>GameMenuOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const MENU_FONT = "\"PPNeueBit Bold\", \"PPNeueBit\", Arial, sans-serif";
function GameMenuOverlay({ isOpen, onClose, onNavigate }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 flex items-center justify-center bg-black/75 p-6",
        style: {
            zIndex: 120
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pixel-corners w-full max-w-[400px] border border-[#9d4a1d] bg-[#ed7c42] p-6 text-[#2a1400]",
            style: {
                position: "relative",
                fontFamily: MENU_FONT
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "game-menu-title",
            onClick: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    "aria-label": "Close menu",
                    className: "pixel-corners flex h-12 w-12 items-center justify-center border border-[#7a1010] bg-[#d94141] text-2xl leading-none text-[#fff4dc]",
                    style: {
                        position: "absolute",
                        top: -24,
                        right: -24,
                        zIndex: 1
                    },
                    onClick: onClose,
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
                    lineNumber: 32,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "game-menu-title",
                    className: "artifact-label text-center text-4xl sm:text-6xl",
                    children: "Game Menu"
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex flex-col items-center justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "artifact-button pixel-corners w-full max-w-[18rem] rounded-full border border-[#2a1400] bg-[#ffe7b0] px-6 py-3 text-lg uppercase tracking-[0.16em] text-[#2a1400] sm:text-2xl",
                            onClick: ()=>onNavigate("/hock-lee-bus-riots-pixel"),
                            children: "Back to Game Menu"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "artifact-button pixel-corners w-full max-w-[18rem] rounded-full border border-[#2a1400] bg-[#ffe7b0] px-6 py-3 text-lg uppercase tracking-[0.16em] text-[#2a1400] sm:text-2xl",
                            onClick: ()=>onNavigate("/hock-lee-bus-riots-pixel/choose-your-character"),
                            children: "Select Another Character"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
                            lineNumber: 52,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "artifact-button pixel-corners w-full max-w-[18rem] rounded-full border border-[#2a1400] bg-[#2a1400] px-6 py-3 text-lg uppercase tracking-[0.16em] text-[#fff4dc] sm:text-2xl",
                            onClick: ()=>onNavigate("/"),
                            children: "Exit Game"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
                    lineNumber: 44,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
            lineNumber: 24,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_c = GameMenuOverlay;
var _c;
__turbopack_context__.k.register(_c, "GameMenuOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Map1961Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map-progression.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$disposition$2d$radar$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/disposition-radar-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scene$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/scene-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/story-paths.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$game$2d$menu$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/game-menu-overlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const MAP_NODE_IDLE_FILTER = "drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.72)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.55))";
const MAP_NODE_LOCKED_FILTER = "grayscale(1) brightness(0.52) contrast(0.9)";
const SCHOOL_ZONE_POSITION = {
    left: "14%",
    top: "49%"
};
const SCHOOL_ZONE_NODE_KEYS = [
    "classroom",
    "school-lake",
    "school-gates"
];
const SCHOOL_ZONE_NODE_KEY_SET = new Set(SCHOOL_ZONE_NODE_KEYS);
const SCHOOL_ZONE_FOCUS_KEY = "school-zone";
const SCHOOL_CLUSTER_NODE_DELAYS = {
    classroom: "0ms",
    "school-gates": "70ms",
    "school-lake": "140ms"
};
const findNextSceneNode = (currentNodeKey, direction, nodes)=>{
    const currentNode = nodes.find((node)=>node.nodeKey === currentNodeKey) ?? nodes[0];
    if (!currentNode) return currentNodeKey;
    const directionVector = direction === "ArrowLeft" ? {
        x: -1,
        y: 0
    } : direction === "ArrowRight" ? {
        x: 1,
        y: 0
    } : direction === "ArrowUp" ? {
        x: 0,
        y: -1
    } : {
        x: 0,
        y: 1
    };
    const directionalCandidates = nodes.filter((node)=>node.nodeKey !== currentNode.nodeKey).map((node)=>{
        const dx = node.x - currentNode.x;
        const dy = node.y - currentNode.y;
        const projection = dx * directionVector.x + dy * directionVector.y;
        if (projection <= 0) return null;
        const perpendicular = Math.abs(dx * directionVector.y - dy * directionVector.x);
        const distance = Math.hypot(dx, dy);
        const anglePenalty = perpendicular / projection;
        return {
            nodeKey: node.nodeKey,
            projection,
            distance,
            anglePenalty
        };
    }).filter((candidate)=>Boolean(candidate));
    if (directionalCandidates.length === 0) return currentNodeKey;
    const mostlyStraight = directionalCandidates.filter((candidate)=>candidate.anglePenalty <= 0.75).sort((a, b)=>a.distance - b.distance || b.projection - a.projection);
    if (mostlyStraight.length > 0) {
        return mostlyStraight[0].nodeKey;
    }
    const fallback = directionalCandidates.sort((a, b)=>a.anglePenalty - b.anglePenalty || a.distance - b.distance);
    return fallback[0].nodeKey;
};
const isSchoolClusterNodeKey = (nodeKey)=>nodeKey !== null && nodeKey !== SCHOOL_ZONE_FOCUS_KEY && SCHOOL_ZONE_NODE_KEY_SET.has(nodeKey);
const getUnlockedStepIndexByNodeKey = (role, unlockedThroughIndex)=>{
    const routeSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(role);
    const stepIndexByNodeKey = new Map();
    routeSteps.forEach((step, index)=>{
        if (index > unlockedThroughIndex) return;
        stepIndexByNodeKey.set(step.nodeKey, index);
    });
    return stepIndexByNodeKey;
};
function Map1961Page() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const selectedCharacter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scene$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredCharacterCode"])(searchParams.get("role"));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map1961Page.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$scene$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistCharacterCode"])(selectedCharacter);
        }
    }["Map1961Page.useEffect"], [
        selectedCharacter
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleMapPage, {
        selectedCharacter: selectedCharacter
    }, selectedCharacter, false, {
        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_s(Map1961Page, "wpYCjx3Iuh0YGg4csUQIo9F8Zhk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = Map1961Page;
const loadInitialMapState = (selectedCharacter)=>{
    const firstNodeKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(selectedCharacter)[0]?.nodeKey ?? null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const hydratedVisitedProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseVisitedProgress"])(window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_VISITED_PROGRESS_KEY"]), selectedCharacter);
    const unlockedThroughIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getUnlockedThroughIndex"])(hydratedVisitedProgress, selectedCharacter);
    const unlockedStepIndexByNodeKey = getUnlockedStepIndexByNodeKey(selectedCharacter, unlockedThroughIndex);
    const storedNodeKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseMapLastNodeKey"])(window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_LAST_NODE_KEY"]));
    const defaultNodeKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(selectedCharacter)[unlockedThroughIndex]?.nodeKey ?? firstNodeKey;
    return {
        visitedProgress: hydratedVisitedProgress,
        activeNodeKey: storedNodeKey && unlockedStepIndexByNodeKey.has(storedNodeKey) ? storedNodeKey : defaultNodeKey,
        unlockAnimationNodeKey: window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_UNLOCK_ANIMATION_SCENE_KEY"]) ?? null
    };
};
function RoleMapPage({ selectedCharacter }) {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const initialMapState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[initialMapState]": ()=>loadInitialMapState(selectedCharacter)
    }["RoleMapPage.useMemo[initialMapState]"], [
        selectedCharacter
    ]);
    const [visitedProgress, setVisitedProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMapState.visitedProgress);
    const [activeNodeKey, setActiveNodeKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMapState.activeNodeKey);
    const [unlockAnimationNodeKey, setUnlockAnimationNodeKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMapState.unlockAnimationNodeKey);
    const [isRouteLoading, setIsRouteLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHelpOpen, setIsHelpOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [masterMode, setMasterMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSchoolZoneHovered, setIsSchoolZoneHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isRouteLoadingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const mapNodeLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const schoolZoneHoverTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mapNodeLayerSize, setMapNodeLayerSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleMapPage.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_UNLOCK_ANIMATION_SCENE_KEY"]);
            }
        }
    }["RoleMapPage.useEffect"], []);
    const clearSchoolZoneHoverTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoleMapPage.useCallback[clearSchoolZoneHoverTimeout]": ()=>{
            if (schoolZoneHoverTimeoutRef.current === null) return;
            window.clearTimeout(schoolZoneHoverTimeoutRef.current);
            schoolZoneHoverTimeoutRef.current = null;
        }
    }["RoleMapPage.useCallback[clearSchoolZoneHoverTimeout]"], []);
    const scheduleSchoolZoneHoverExit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoleMapPage.useCallback[scheduleSchoolZoneHoverExit]": ()=>{
            clearSchoolZoneHoverTimeout();
            schoolZoneHoverTimeoutRef.current = window.setTimeout({
                "RoleMapPage.useCallback[scheduleSchoolZoneHoverExit]": ()=>{
                    setIsSchoolZoneHovered(false);
                    schoolZoneHoverTimeoutRef.current = null;
                }
            }["RoleMapPage.useCallback[scheduleSchoolZoneHoverExit]"], 90);
        }
    }["RoleMapPage.useCallback[scheduleSchoolZoneHoverExit]"], [
        clearSchoolZoneHoverTimeout
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleMapPage.useEffect": ()=>({
                "RoleMapPage.useEffect": ()=>{
                    clearSchoolZoneHoverTimeout();
                }
            })["RoleMapPage.useEffect"]
    }["RoleMapPage.useEffect"], [
        clearSchoolZoneHoverTimeout
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleMapPage.useEffect": ()=>{
            const nodeLayer = mapNodeLayerRef.current;
            if (!nodeLayer) return;
            const updateMapNodeLayerSize = {
                "RoleMapPage.useEffect.updateMapNodeLayerSize": ()=>{
                    const bounds = nodeLayer.getBoundingClientRect();
                    setMapNodeLayerSize({
                        width: bounds.width,
                        height: bounds.height
                    });
                }
            }["RoleMapPage.useEffect.updateMapNodeLayerSize"];
            updateMapNodeLayerSize();
            if (typeof ResizeObserver === "undefined") {
                window.addEventListener("resize", updateMapNodeLayerSize);
                return ({
                    "RoleMapPage.useEffect": ()=>window.removeEventListener("resize", updateMapNodeLayerSize)
                })["RoleMapPage.useEffect"];
            }
            const observer = new ResizeObserver(updateMapNodeLayerSize);
            observer.observe(nodeLayer);
            return ({
                "RoleMapPage.useEffect": ()=>observer.disconnect()
            })["RoleMapPage.useEffect"];
        }
    }["RoleMapPage.useEffect"], []);
    const navigateWithLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoleMapPage.useCallback[navigateWithLoading]": (route)=>{
            if (isRouteLoadingRef.current) return;
            isRouteLoadingRef.current = true;
            setIsRouteLoading(true);
            router.push(route);
        }
    }["RoleMapPage.useCallback[navigateWithLoading]"], [
        router
    ]);
    const resetMapProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoleMapPage.useCallback[resetMapProgress]": ()=>{
            if (!selectedCharacter || ("TURBOPACK compile-time value", "object") === "undefined") return;
            window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_VISITED_PROGRESS_KEY"]);
            window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_LAST_NODE_KEY"]);
            window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAP_UNLOCK_ANIMATION_SCENE_KEY"]);
            window.localStorage.removeItem("inventorySlots");
            const firstNodeKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(selectedCharacter)[0]?.nodeKey ?? null;
            setVisitedProgress(-1);
            setUnlockAnimationNodeKey(firstNodeKey);
            setActiveNodeKey(firstNodeKey);
        }
    }["RoleMapPage.useCallback[resetMapProgress]"], [
        selectedCharacter
    ]);
    const handleMenuNavigation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoleMapPage.useCallback[handleMenuNavigation]": (route)=>{
            setIsMenuOpen(false);
            setIsHelpOpen(false);
            navigateWithLoading(route);
        }
    }["RoleMapPage.useCallback[handleMenuNavigation]"], [
        navigateWithLoading
    ]);
    const routeSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[routeSteps]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleSteps"])(selectedCharacter)
    }["RoleMapPage.useMemo[routeSteps]"], [
        selectedCharacter
    ]);
    const unlockedThroughIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[unlockedThroughIndex]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$map$2d$progression$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getUnlockedThroughIndex"])(visitedProgress, selectedCharacter)
    }["RoleMapPage.useMemo[unlockedThroughIndex]"], [
        selectedCharacter,
        visitedProgress
    ]);
    const unlockedStepIndexByNodeKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[unlockedStepIndexByNodeKey]": ()=>getUnlockedStepIndexByNodeKey(selectedCharacter, unlockedThroughIndex)
    }["RoleMapPage.useMemo[unlockedStepIndexByNodeKey]"], [
        selectedCharacter,
        unlockedThroughIndex
    ]);
    const resolvedNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[resolvedNodes]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MASTER_MODE_NODE_ORDER"].map({
                "RoleMapPage.useMemo[resolvedNodes]": (nodeKey)=>{
                    const nodeDefinition = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][nodeKey];
                    const unlockedStepIndex = unlockedStepIndexByNodeKey.get(nodeKey) ?? null;
                    const firstRoleStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoryStepByNodeKey"])(selectedCharacter, nodeKey);
                    const previewStep = unlockedStepIndex !== null ? routeSteps[unlockedStepIndex] : firstRoleStep;
                    const isUnlocked = unlockedStepIndex !== null;
                    const isSelectable = isUnlocked;
                    const previewStepIndex = unlockedStepIndex ?? (firstRoleStep ? routeSteps.findIndex({
                        "RoleMapPage.useMemo[resolvedNodes]": (step)=>step.id === firstRoleStep.id
                    }["RoleMapPage.useMemo[resolvedNodes]"]) : null);
                    const route = unlockedStepIndex !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRoleAwareRoute"])(unlockedStepIndex === 0 && visitedProgress < 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$paths$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTRO_CUTSCENE_ROUTE"] : routeSteps[unlockedStepIndex].route, selectedCharacter) : null;
                    return {
                        key: nodeKey,
                        label: previewStep?.locationLabel ?? nodeDefinition.label,
                        description: previewStep?.summary ?? nodeDefinition.description,
                        isSelectable,
                        isNew: unlockedStepIndex !== null && unlockedStepIndex > visitedProgress,
                        isUnlocked,
                        previewStepIndex,
                        route
                    };
                }
            }["RoleMapPage.useMemo[resolvedNodes]"]);
        }
    }["RoleMapPage.useMemo[resolvedNodes]"], [
        routeSteps,
        selectedCharacter,
        unlockedStepIndexByNodeKey,
        visitedProgress
    ]);
    const visibleNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[visibleNodes]": ()=>resolvedNodes.filter({
                "RoleMapPage.useMemo[visibleNodes]": (node)=>{
                    if (masterMode) return true;
                    return node.previewStepIndex !== null;
                }
            }["RoleMapPage.useMemo[visibleNodes]"])
    }["RoleMapPage.useMemo[visibleNodes]"], [
        masterMode,
        resolvedNodes
    ]);
    const shouldShowSchoolZone = selectedCharacter === "CS" || masterMode;
    const schoolZoneNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[schoolZoneNodes]": ()=>visibleNodes.filter({
                "RoleMapPage.useMemo[schoolZoneNodes]": (node)=>SCHOOL_ZONE_NODE_KEY_SET.has(node.key)
            }["RoleMapPage.useMemo[schoolZoneNodes]"])
    }["RoleMapPage.useMemo[schoolZoneNodes]"], [
        visibleNodes
    ]);
    const nonSchoolZoneNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[nonSchoolZoneNodes]": ()=>visibleNodes.filter({
                "RoleMapPage.useMemo[nonSchoolZoneNodes]": (node)=>!SCHOOL_ZONE_NODE_KEY_SET.has(node.key)
            }["RoleMapPage.useMemo[nonSchoolZoneNodes]"])
    }["RoleMapPage.useMemo[nonSchoolZoneNodes]"], [
        visibleNodes
    ]);
    const isSchoolZoneUnlocked = schoolZoneNodes.some((node)=>node.isUnlocked);
    const latestUnlockedSchoolZoneNodeKey = schoolZoneNodes.filter((node)=>node.isUnlocked).at(-1)?.key ?? null;
    const isSchoolZoneAvailable = shouldShowSchoolZone && schoolZoneNodes.length > 0;
    const effectiveActiveNodeKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[effectiveActiveNodeKey]": ()=>{
            if (activeNodeKey === SCHOOL_ZONE_FOCUS_KEY) {
                return isSchoolZoneAvailable ? activeNodeKey : visibleNodes[0]?.key ?? null;
            }
            if (activeNodeKey && visibleNodes.some({
                "RoleMapPage.useMemo[effectiveActiveNodeKey]": (node)=>node.key === activeNodeKey
            }["RoleMapPage.useMemo[effectiveActiveNodeKey]"])) {
                return activeNodeKey;
            }
            if (isSchoolZoneAvailable) {
                return SCHOOL_ZONE_FOCUS_KEY;
            }
            return visibleNodes[0]?.key ?? null;
        }
    }["RoleMapPage.useMemo[effectiveActiveNodeKey]"], [
        activeNodeKey,
        isSchoolZoneAvailable,
        visibleNodes
    ]);
    const isSchoolClusterOpen = isSchoolZoneHovered || isSchoolClusterNodeKey(effectiveActiveNodeKey);
    const navigationNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoleMapPage.useMemo[navigationNodes]": ()=>{
            const buildNavPoint = {
                "RoleMapPage.useMemo[navigationNodes].buildNavPoint": (nodeKey, left, top)=>({
                        nodeKey,
                        x: Number.parseFloat(left),
                        y: Number.parseFloat(top)
                    })
            }["RoleMapPage.useMemo[navigationNodes].buildNavPoint"];
            if (!isSchoolZoneAvailable) {
                return visibleNodes.map({
                    "RoleMapPage.useMemo[navigationNodes]": (node)=>buildNavPoint(node.key, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.left, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.top)
                }["RoleMapPage.useMemo[navigationNodes]"]);
            }
            if (!isSchoolClusterOpen) {
                return [
                    ...nonSchoolZoneNodes.map({
                        "RoleMapPage.useMemo[navigationNodes]": (node)=>buildNavPoint(node.key, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.left, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.top)
                    }["RoleMapPage.useMemo[navigationNodes]"]),
                    buildNavPoint(SCHOOL_ZONE_FOCUS_KEY, SCHOOL_ZONE_POSITION.left, SCHOOL_ZONE_POSITION.top)
                ];
            }
            return [
                ...nonSchoolZoneNodes.map({
                    "RoleMapPage.useMemo[navigationNodes]": (node)=>buildNavPoint(node.key, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.left, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.top)
                }["RoleMapPage.useMemo[navigationNodes]"]),
                ...schoolZoneNodes.map({
                    "RoleMapPage.useMemo[navigationNodes]": (node)=>buildNavPoint(node.key, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.left, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key].position.top)
                }["RoleMapPage.useMemo[navigationNodes]"])
            ];
        }
    }["RoleMapPage.useMemo[navigationNodes]"], [
        isSchoolClusterOpen,
        isSchoolZoneAvailable,
        nonSchoolZoneNodes,
        schoolZoneNodes,
        visibleNodes
    ]);
    const activeNode = effectiveActiveNodeKey && effectiveActiveNodeKey !== SCHOOL_ZONE_FOCUS_KEY ? resolvedNodes.find((node)=>node.key === effectiveActiveNodeKey) ?? null : null;
    const activeSchoolZoneNode = (latestUnlockedSchoolZoneNodeKey ? resolvedNodes.find((node)=>node.key === latestUnlockedSchoolZoneNodeKey) : schoolZoneNodes[0]) ?? null;
    const isSchoolZoneActive = isSchoolZoneHovered || effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY;
    const isSchoolZoneHiddenForCluster = isSchoolClusterOpen && effectiveActiveNodeKey !== SCHOOL_ZONE_FOCUS_KEY && !isSchoolZoneHovered;
    const activeStep = activeNode?.previewStepIndex !== null && activeNode?.previewStepIndex !== undefined ? routeSteps[activeNode.previewStepIndex] : null;
    const activePanelTitle = effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY ? "School Zone" : activeStep?.sceneTitle ?? "Hock Lee Bus Riots";
    const activePanelSubtitle = effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY ? "A volatile student network spanning the classroom, school lake, and school gates." : activeStep?.sceneSubtitle ?? activeNode?.description ?? undefined;
    const markerSprite = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_PRESENTATIONS"][selectedCharacter].markerSprite;
    const handleActivateNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoleMapPage.useCallback[handleActivateNode]": (node)=>{
            if (!node || !node.route) return;
            navigateWithLoading(node.route);
        }
    }["RoleMapPage.useCallback[handleActivateNode]"], [
        navigateWithLoading
    ]);
    const getSchoolClusterOriginStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoleMapPage.useCallback[getSchoolClusterOriginStyle]": (nodeKey)=>{
            const nodePosition = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][nodeKey].position;
            const originX = (Number.parseFloat(SCHOOL_ZONE_POSITION.left) - Number.parseFloat(nodePosition.left)) / 100 * mapNodeLayerSize.width;
            const originY = (Number.parseFloat(SCHOOL_ZONE_POSITION.top) - Number.parseFloat(nodePosition.top)) / 100 * mapNodeLayerSize.height;
            return {
                "--hl-school-node-origin-x": `${originX}px`,
                "--hl-school-node-origin-y": `${originY}px`,
                "--hl-school-node-delay": SCHOOL_CLUSTER_NODE_DELAYS[nodeKey] ?? "0ms"
            };
        }
    }["RoleMapPage.useCallback[getSchoolClusterOriginStyle]"], [
        mapNodeLayerSize.height,
        mapNodeLayerSize.width
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleMapPage.useEffect": ()=>{
            const handleKeyDown = {
                "RoleMapPage.useEffect.handleKeyDown": (event)=>{
                    if (!activeNodeKey || navigationNodes.length === 0) {
                        const fallbackNodeKey = isSchoolZoneAvailable ? SCHOOL_ZONE_FOCUS_KEY : visibleNodes[0]?.key ?? null;
                        if (event.key.toLowerCase() === "s") {
                            event.preventDefault();
                            setMasterMode({
                                "RoleMapPage.useEffect.handleKeyDown": (previous)=>!previous
                            }["RoleMapPage.useEffect.handleKeyDown"]);
                        }
                        if (fallbackNodeKey) {
                            setActiveNodeKey(fallbackNodeKey);
                        }
                        return;
                    }
                    if (event.key.toLowerCase() === "c") {
                        event.preventDefault();
                        resetMapProgress();
                        return;
                    }
                    if (event.key.toLowerCase() === "s") {
                        event.preventDefault();
                        setMasterMode({
                            "RoleMapPage.useEffect.handleKeyDown": (previous)=>!previous
                        }["RoleMapPage.useEffect.handleKeyDown"]);
                        return;
                    }
                    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowDown" && event.key !== "Enter") {
                        return;
                    }
                    event.preventDefault();
                    if (event.key === "Enter") {
                        if (effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY) {
                            if (latestUnlockedSchoolZoneNodeKey) {
                                setActiveNodeKey(latestUnlockedSchoolZoneNodeKey);
                            }
                            return;
                        }
                        handleActivateNode(activeNode);
                        return;
                    }
                    const nextNodeKey = findNextSceneNode(effectiveActiveNodeKey ?? activeNodeKey, event.key, navigationNodes);
                    setActiveNodeKey(nextNodeKey);
                }
            }["RoleMapPage.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "RoleMapPage.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["RoleMapPage.useEffect"];
        }
    }["RoleMapPage.useEffect"], [
        activeNode,
        activeNodeKey,
        effectiveActiveNodeKey,
        handleActivateNode,
        isSchoolZoneAvailable,
        latestUnlockedSchoolZoneNodeKey,
        navigationNodes,
        resetMapProgress,
        visibleNodes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleMapPage.useEffect": ()=>{
            isRouteLoadingRef.current = isRouteLoading;
        }
    }["RoleMapPage.useEffect"], [
        isRouteLoading
    ]);
    const renderResolvedNode = (node, options)=>{
        const nodeDefinition = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAP_NODE_DEFINITIONS"][node.key];
        const isActive = activeNode?.key === node.key;
        const isSchoolClusterNode = options?.isSchoolClusterNode ?? false;
        const clusterStyle = isSchoolClusterNode ? getSchoolClusterOriginStyle(node.key) : null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center ${isSchoolClusterNode ? "hl-pixel-school-cluster-node" : ""} ${isSchoolClusterNode && isSchoolClusterOpen ? "hl-pixel-school-cluster-node--expanded" : ""}`,
            style: {
                left: nodeDefinition.position.left,
                top: nodeDefinition.position.top,
                zIndex: isActive ? 10 : isSchoolClusterNode ? 8 : 6,
                ...clusterStyle ?? {}
            },
            onMouseEnter: ()=>{
                clearSchoolZoneHoverTimeout();
                setActiveNodeKey(node.key);
                if (!isSchoolClusterNode) {
                    setIsSchoolZoneHovered(false);
                }
            },
            onClick: ()=>{
                clearSchoolZoneHoverTimeout();
                setActiveNodeKey(node.key);
                setIsSchoolZoneHovered(false);
                if (!node.isSelectable) return;
                handleActivateNode(node);
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `artifact-label mb-2 text-center text-sm sm:text-base ${isActive ? "artifact-label--active pixel-corners" : ""}`,
                    children: node.label
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 636,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hl-pixel-map-node-shell",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: nodeDefinition.image.src,
                            alt: nodeDefinition.image.alt,
                            className: `map-location hl-pixel-map-node ${nodeDefinition.image.className} ${unlockAnimationNodeKey === node.key && node.isUnlocked ? "hl-pixel-node-unlock-anim" : ""}`,
                            style: {
                                filter: !node.isUnlocked ? MAP_NODE_LOCKED_FILTER : isActive ? "drop-shadow(2px 0 0 #ffff00) drop-shadow(-2px 0 0 #ffff00) drop-shadow(0 2px 0 #ffff00) drop-shadow(0 -2px 0 #ffff00) drop-shadow(2px 2px 0 #ffff00) drop-shadow(-2px 2px 0 #ffff00) drop-shadow(2px -2px 0 #ffff00) drop-shadow(-2px -2px 0 #ffff00)" : MAP_NODE_IDLE_FILTER,
                                cursor: node.isSelectable ? "pointer" : "not-allowed"
                            },
                            draggable: false
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 643,
                            columnNumber: 11
                        }, this),
                        isActive && node.isUnlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: markerSprite,
                            alt: "",
                            "aria-hidden": "true",
                            className: "hl-pixel-map-rajiv-marker",
                            draggable: false
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 661,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 642,
                    columnNumber: 9
                }, this),
                node.isUnlocked && node.isNew ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "-mt-2 relative z-[2] rounded-full border border-[#ffe45e] bg-[rgba(18,14,6,0.86)] px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-[#ffe45e]",
                    children: "NEW!"
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 671,
                    columnNumber: 11
                }, this) : null,
                isActive && node.isSelectable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "artifact-label artifact-button pixel-corners pop-in mt-2 flex w-auto items-center justify-center gap-2 rounded-full border border-[#7a1c1c] bg-[#f24747] px-3 py-1.5 text-sm uppercase tracking-[0.2em] hl-pixel-action-button",
                    onClick: ()=>handleActivateNode(node),
                    children: [
                        "Visit ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs leading-none",
                            children: "↵"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 681,
                            columnNumber: 19
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 676,
                    columnNumber: 11
                }, this) : isActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "artifact-label pixel-corners pop-in mt-2 rounded-full border border-[#5f5f5f] bg-[rgba(45,45,45,0.92)] px-3 py-1.5 text-sm uppercase tracking-[0.2em] text-[#d0d0d0]",
                    children: "Locked"
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 684,
                    columnNumber: 11
                }, this) : null
            ]
        }, node.key, true, {
            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
            lineNumber: 611,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "map-page relative h-screen w-screen overflow-hidden bg-black",
        "aria-busy": isRouteLoading,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "scene-panel scene-panel-shell",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "scene-title-stack scene-title-swap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pixel-corners--wrapper",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pixel-corners scene-title",
                                    children: activePanelTitle
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 700,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 699,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pixel-corners--wrapper",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pixel-corners scene-subtitle",
                                    children: activePanelSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 703,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 702,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                        lineNumber: 698,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_PRESENTATIONS"][selectedCharacter].cutsceneSprite,
                                alt: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_PRESENTATIONS"][selectedCharacter].playerAlt,
                                className: "h-16 w-16 select-none object-contain",
                                style: {
                                    imageRendering: "pixelated"
                                },
                                draggable: false
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 707,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "artifact-label pixel-corners px-3 py-2 text-left uppercase tracking-[0.14em]",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARACTER_PRESENTATIONS"][selectedCharacter].playerFullName
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 714,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                        lineNumber: 706,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 697,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[12.5rem] left-6 z-20 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ui-button-shell pixel-corners--wrapper",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "ui-button pixel-corners",
                            "aria-label": "Menu",
                            onClick: ()=>{
                                if (isRouteLoadingRef.current) return;
                                setIsHelpOpen(false);
                                setIsMenuOpen(true);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ui-button-icon",
                                children: "≡"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 732,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 722,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                        lineNumber: 721,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ui-button-shell pixel-corners--wrapper",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "ui-button pixel-corners",
                            "aria-label": "Help",
                            onClick: ()=>{
                                if (isRouteLoadingRef.current) return;
                                setIsMenuOpen(false);
                                setIsHelpOpen(true);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ui-button-icon",
                                children: "?"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 746,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 736,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                        lineNumber: 735,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 720,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "map-timeline map-timeline--delay absolute bottom-6 left-6 right-6 z-10 overflow-visible",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hl-pixel-timeline-shell w-full overflow-visible",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hl-pixel-timeline-scroll",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hl-pixel-timeline-inner",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hl-pixel-timeline-track",
                                    "aria-hidden": "true",
                                    style: {
                                        gridTemplateColumns: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORY_PHASE_TRACK"].map((phase)=>`${phase.span}fr`).join(" ")
                                    },
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORY_PHASE_TRACK"].map((phase, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hl-pixel-timeline-track-segment",
                                            style: {
                                                backgroundColor: phase.color,
                                                borderTopLeftRadius: index === 0 ? "999px" : 0,
                                                borderBottomLeftRadius: index === 0 ? "999px" : 0,
                                                borderTopRightRadius: index === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORY_PHASE_TRACK"].length - 1 ? "999px" : 0,
                                                borderBottomRightRadius: index === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$story$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORY_PHASE_TRACK"].length - 1 ? "999px" : 0
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hl-pixel-timeline-track-label",
                                                children: phase.label
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                                lineNumber: 777,
                                                columnNumber: 21
                                            }, this)
                                        }, phase.label, false, {
                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                            lineNumber: 765,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 757,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hl-pixel-timeline-events",
                                    children: routeSteps.map((step, index)=>{
                                        const isUnlocked = index <= unlockedThroughIndex;
                                        const isActive = activeStep?.id === step.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: `hl-pixel-timeline-event-item ${isUnlocked ? "hl-pixel-timeline-event-item--enabled" : "hl-pixel-timeline-event-item--disabled"}`,
                                            onClick: ()=>{
                                                if (!isUnlocked) return;
                                                setActiveNodeKey(step.nodeKey);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `pixel-corners map-timeline-button hl-pixel-timeline-date-box ${isActive ? "hl-pixel-timeline-date-box--active" : "hl-pixel-timeline-date-box--inactive"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "hl-pixel-timeline-date-text",
                                                            children: `Stop ${index + 1}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                                            lineNumber: 804,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `hl-pixel-timeline-event-label ${isActive ? "hl-pixel-timeline-event-label--active" : "hl-pixel-timeline-event-label--inactive"}`,
                                                            children: step.timelineLabel ?? step.locationLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                                            lineNumber: 805,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                                    lineNumber: 798,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "hl-pixel-timeline-marker",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            "aria-hidden": "true",
                                                            className: `hl-pixel-timeline-marker-stem ${isActive ? "hl-pixel-timeline-marker-stem--active" : "hl-pixel-timeline-marker-stem--inactive"}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                                            lineNumber: 815,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            "aria-hidden": "true",
                                                            className: `hl-pixel-timeline-marker-node ${isActive ? "hl-pixel-timeline-marker-node--active" : "hl-pixel-timeline-marker-node--inactive"}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                                            lineNumber: 822,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, step.id, true, {
                                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                            lineNumber: 786,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 781,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 756,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                        lineNumber: 755,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 754,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 751,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scene-bg h-full w-full bg-cover bg-center bg-no-repeat hl-pixel-map-bg"
            }, void 0, false, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 839,
                columnNumber: 7
            }, this),
            masterMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full border-2 border-[#8a0000] bg-[rgba(30,0,0,0.9)] px-6 py-2 text-center text-2xl uppercase tracking-[0.3em] text-[#ff3b30]",
                style: {
                    fontFamily: "\"PPNeueBit Bold\", \"PPNeueBit\", monospace"
                },
                children: "MASTER MODE"
            }, void 0, false, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 842,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapNodeLayerRef,
                className: "absolute inset-0 z-[8]",
                children: [
                    isSchoolZoneAvailable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center hl-pixel-school-zone-node ${isSchoolZoneHiddenForCluster ? "hl-pixel-school-zone-node--content-hidden" : ""}`,
                        style: {
                            left: SCHOOL_ZONE_POSITION.left,
                            top: SCHOOL_ZONE_POSITION.top,
                            zIndex: isSchoolZoneActive ? 9 : 7,
                            pointerEvents: "auto"
                        },
                        onMouseEnter: ()=>{
                            if (!isSchoolZoneUnlocked) return;
                            clearSchoolZoneHoverTimeout();
                            setActiveNodeKey(SCHOOL_ZONE_FOCUS_KEY);
                            setIsSchoolZoneHovered(true);
                        },
                        onMouseLeave: scheduleSchoolZoneHoverExit,
                        onClick: ()=>{
                            if (!isSchoolZoneUnlocked || !latestUnlockedSchoolZoneNodeKey) return;
                            clearSchoolZoneHoverTimeout();
                            setActiveNodeKey(latestUnlockedSchoolZoneNodeKey);
                        },
                        children: [
                            !isSchoolZoneHovered ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `artifact-label mb-2 text-center text-sm sm:text-base hl-pixel-school-zone-label ${isSchoolZoneActive ? "artifact-label--active pixel-corners" : ""}`,
                                children: "School Zone"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 875,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hl-pixel-map-node-shell",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "aria-hidden": "true",
                                        className: "hl-pixel-school-zone-hit-area"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                        lineNumber: 883,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "aria-hidden": "true",
                                        className: `hl-pixel-school-zone-blob ${isSchoolZoneActive ? "hl-pixel-school-zone-blob--active" : ""} ${isSchoolZoneUnlocked ? "" : "hl-pixel-school-zone-blob--locked"}`
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                        lineNumber: 884,
                                        columnNumber: 15
                                    }, this),
                                    !isSchoolZoneHovered ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/map-nodes/schoolzone.png",
                                        alt: "School Zone",
                                        className: "map-location hl-pixel-map-node hl-pixel-school-zone-image hl-pixel-map-node--schoolzone",
                                        style: {
                                            filter: !isSchoolZoneUnlocked ? MAP_NODE_LOCKED_FILTER : isSchoolZoneActive ? "drop-shadow(2px 0 0 #ffff00) drop-shadow(-2px 0 0 #ffff00) drop-shadow(0 2px 0 #ffff00) drop-shadow(0 -2px 0 #ffff00) drop-shadow(2px 2px 0 #ffff00) drop-shadow(-2px 2px 0 #ffff00) drop-shadow(2px -2px 0 #ffff00) drop-shadow(-2px -2px 0 #ffff00)" : MAP_NODE_IDLE_FILTER
                                        },
                                        draggable: false
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                        lineNumber: 890,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 882,
                                columnNumber: 13
                            }, this),
                            !isSchoolZoneHovered && !isSchoolZoneUnlocked && isSchoolZoneActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "artifact-label pixel-corners pop-in mt-2 rounded-full border border-[#5f5f5f] bg-[rgba(45,45,45,0.92)] px-3 py-1.5 text-sm uppercase tracking-[0.2em] text-[#d0d0d0]",
                                children: "Locked"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 906,
                                columnNumber: 15
                            }, this) : !isSchoolZoneHovered && effectiveActiveNodeKey === SCHOOL_ZONE_FOCUS_KEY && activeSchoolZoneNode?.isSelectable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "artifact-label pixel-corners pop-in mt-2 rounded-full border border-[#c58b19] bg-[rgba(41,24,4,0.92)] px-3 py-1.5 text-sm uppercase tracking-[0.2em] text-[#ffe45e]",
                                children: "Open Cluster"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 912,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                        lineNumber: 852,
                        columnNumber: 11
                    }, this) : null,
                    nonSchoolZoneNodes.map((node)=>renderResolvedNode(node)),
                    isSchoolZoneAvailable ? schoolZoneNodes.map((node)=>renderResolvedNode(node, {
                            isSchoolClusterNode: true
                        })) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 850,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-6 top-6 z-10 inventory-rise-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$disposition$2d$radar$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DispositionRadarPanel"], {}, void 0, false, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 927,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 926,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$src$2f$app$2f$hock$2d$lee$2d$bus$2d$riots$2d$pixel$2f$game$2d$menu$2d$overlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameMenuOverlay"], {
                isOpen: isMenuOpen,
                onClose: ()=>setIsMenuOpen(false),
                onNavigate: handleMenuNavigation
            }, void 0, false, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 930,
                columnNumber: 7
            }, this),
            isHelpOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-black/75 p-6",
                style: {
                    zIndex: 120
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "scene-intro-guide-panel pixel-corners w-full max-w-2xl border border-[#9d4a1d] bg-[#ed7c42] p-6 text-[#2a1400]",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "map-help-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "map-help-title",
                            className: "artifact-label text-4xl sm:text-6xl",
                            children: "Map Guide"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 947,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-2xl leading-relaxed sm:text-3xl",
                            children: "Track the story through the timeline and select any unlocked stop on the map."
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 950,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-4 list-disc space-y-2 pl-5 text-xl sm:text-3xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Click an unlocked location or timeline stop to focus it."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 954,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Press Enter or use Visit to enter the active scene."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 955,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: "Use arrow keys to move between map nodes."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 956,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 953,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "artifact-button pixel-corners rounded-full border border-[#2a1400] bg-[#ffe7b0] px-5 py-2 text-lg uppercase tracking-[0.16em] text-[#2a1400] sm:text-2xl",
                                onClick: ()=>setIsHelpOpen(false),
                                children: "Ok, got it!"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                lineNumber: 959,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 958,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 941,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 937,
                columnNumber: 9
            }, this) : null,
            isRouteLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scene-route-loading-overlay",
                role: "status",
                "aria-live": "polite",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "scene-route-loading-panel pixel-corners",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scene-route-loading-title",
                            children: "Loading Next Scene"
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 974,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scene-route-loading-subtitle",
                            children: "Compiling next page..."
                        }, void 0, false, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 975,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "scene-route-loading-dots",
                            "aria-hidden": "true",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "scene-route-loading-dot"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 977,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "scene-route-loading-dot"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 978,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "scene-route-loading-dot"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                                    lineNumber: 979,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                            lineNumber: 976,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                    lineNumber: 973,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
                lineNumber: 972,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Github/hock-lee-design-sit/src/app/hock-lee-bus-riots-pixel/map/page.tsx",
        lineNumber: 693,
        columnNumber: 5
    }, this);
}
_s1(RoleMapPage, "GpAxmJsWABVEFHgzz2UH+fk5EwQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Github$2f$hock$2d$lee$2d$design$2d$sit$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = RoleMapPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "Map1961Page");
__turbopack_context__.k.register(_c1, "RoleMapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Github_hock-lee-design-sit_src_app_hock-lee-bus-riots-pixel_b9254393._.js.map