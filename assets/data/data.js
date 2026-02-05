const siteData = {
    "bio": "<p>Technological advancements are driving the rapid integration of renewables into the grid. However, they face challenges of intermittency and variability (quite sad, isn't it?), which pose difficulties for system operators in maintaining a consistent supply-demand balance. As a <strong class=\"text-[var(--text-main)]\">Prime Minister's Research Fellow (PMRF)</strong> at the <strong class=\"text-[var(--text-main)]\">Indian Institute of Technology Kanpur</strong>, my research focuses on <strong class=\"text-[var(--text-main)]\">Transactive Energy System Design, Independent Distribution System Operator, Flexibility services, and Electricity Markets</strong>. My goal is to enhance grid reliability and leverage renewable power sources. With a Bachelor's degree from the <strong class=\"text-[var(--text-main)]\">National Institute of Technology Srinagar</strong>, I possess a comprehensive understanding of theory and practice (or at least I believe so). I am enthusiastic about applying my skills and knowledge to bring about positive changes in the energy sector by enhancing grid reliability through distribution-side flexibility and innovating electricity market operations (that lengthy sentence reflects my excitement!). The potential for innovation in the energy sector is limitless, and I firmly believe (emphasis on \"I believe\") that this research has the power to strengthen the grid, increase renewable deployment, positively impact the climate (Go Greta!), and enhance grid resiliency – truly a win-win situation.</p>",
    "focusAreas": [
        {
            "title": "DER Aggregation",
            "icon": "network",
            "description": "Designing optimization tools to aggregate DERs for Wholesale Market participation."
        },
        {
            "title": "Independent Distribution System Operator (IDSO)",
            "icon": "user",
            "description": "Modelling the role of IDSO to perform grid-safe aggregation and participate in wholesale markets."
        },
        {
            "title": "DRL Agents for DERs",
            "icon": "ev-charger",
            "description": "Deep reinforcement learning (DRL) based transactive agents for DERs"
        },
        {
            "title": "Swing Contract Design",
            "icon": "receipt-text",
            "description": "Developing Swing Contracts for IDSO"
        }
    ],
    "projects": [
        {
            "id": "IDSO",
            "title": "IDSO's DER Aggregation Tool",
            "tech": "Python | Answer Set Programming",
            "description": "An open source tool to model Independent Distribution System Operator (IDSO) for aggregating distributed energy resources (DERs) and participating in wholesale electricity markets while ensuring grid safety and reliability. The tool uses optimization techniques to maximize DER revenue while adhering to grid constraints. The complete mathematical formulation can be found <a href=\"https://arxiv.org/abs/2508.08187\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[var(--primary)] underline\">here</a>.",
            "github": "https://github.com/sharmaswastik/IDSOAggregationProblem",
            "docs": "https://arxiv.org/abs/2508.08187"
        },
        {
            "id": "project-alpha",
            "title": "Three-Phase Unbalanced LinDistFlow",
            "tech": "Python | Pyomo",
            "description": "This project focuses on developing a three-phase unbalanced LinDistFlow model using Python. The model aims to accurately represent power flow in distribution networks, accounting for unbalanced loads and phases.",
            "github": "https://github.com/sharmaswastik/Three-Phase-Distribution-Network-OPF"
        },
        {
            "id": "project-RL2",
            "title": "Meta-Reinforcement Learning",
            "tech": "Python | Pytorch",
            "description": "An implementation of the paper RL2: Fast Reinforcement Learning via Slow Reinforcement Learning (available <a href=\"https://arxiv.org/pdf/1611.02779.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[var(--primary)] underline\">here</a>). We used GRUs to train our model, and the policy is optimized using a simple actor-critic algorithm, with the actor being the RNN agent and the baseline/critic network being a simple MLP.",
            "github": "https://github.com/sharmaswastik/EE-675A-Course-Project"
        }
    ],
    "teaching": {
        "pmrf": [
            {
                "title": "Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur: Workshop on \"LaTeX for Document Editing\"",
                "role": "Teaching Assistant",
                "period": "Jan 2025 - April 2025",
                "description": "A workshop focused on teaching LaTeX for professional document preparation, covering basics to advanced formatting techniques."
            },
            {
                "title": "NPTEL Course: EE79 Smart Grids: Basics to Advanced Technologies",
                "role": "Teaching Assistant",
                "period": "Jan 2025 - April 2025",
                "description": "Doubt clearing and problem solving sessions for students enrolled in the course.",
                "lectureLink": "https://www.youtube.com/playlist?list=PLqTDTw8KvSg5i9fhQVENGgpfDnFlX6Mzm"
            },
            {
                "title": "Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur: Workshop on \"Machine Learning with Python\"",
                "role": "Teaching Assistant",
                "period": "April 2024",
                "description": "A 30-hours hands-on workshop covering fundamentals of Machine Learning using Python."
            },
            {
                "title": "NPTEL Course: EE37 Smart Grids: Basics to Advanced Technologies",
                "role": "Teaching Assistant",
                "period": "Jan 2024 - April 2024",
                "description": "Doubt clearing and problem solving sessions for students enrolled in the course.",
                "lectureLink": "https://www.youtube.com/playlist?list=PLqTDTw8KvSg6MIw_CUPUsWb9gUXGZ1C4a"
            },
            {
                "title": "Atal Bihari Vajpayee Indian Institute of Information Technology Gwalior: EE101 Fundamentals of Electrical and Electronics",
                "role": "Teaching Assistant",
                "period": "Oct 2023",
                "description": "Problem solving tutorials and laboratory practicals."
            },
            {
                "title": "NPTEL Course: EE116 Fundamentals of Electrical Engineering",
                "role": "Teaching Assistant",
                "period": "July 2023 - Oct 2023",
                "description": "Doubt clearing and problem solving sessions for students enrolled in the course.",
                "lectureLink": "https://www.youtube.com/playlist?list=PLqTDTw8KvSg6NKI3vbjbNdLEzqgcS19Jj"
            }
        ],
        "institute": [
            {
                "title": "EE 630(P): Simulation of Modern Power Systems",
                "role": "Teaching Assistant (Lab Tutor)",
                "period": "2025-26 Sem I",
                "description": "Conducted lab sessions on power system simulation using Python.",
                "tags": ["Python", "Algorithms"]
            },
            {
                "title": "EE 675: Introduction to Reinforcement Learning",
                "role": "Teaching Assistant",
                "period": "2024-25 Sem II",
                "description": "Assisting instructor with correcting assignments, and clearing student doubts."
            },
            {
                "title": "EE 633A: Electric Power System Operation and Management Under Restructured Environment",
                "role": "Teaching Assistant",
                "period": "2022-23 Sem II",
                "description": "Assisting instructor with correcting quizzes, assignments, and clearing student doubts."
            },
            {
                "title": "EE 632A: Economic Operation and Control of Power Systems",
                "role": "Teaching Assistant",
                "period": "2022-23 Sem I",
                "description": "Assisting instructor with correcting quizzes, assignments, and clearing student doubts."
            },
            {
                "title": "ESO 203A: Introduction to Electrical Engineering",
                "role": "Teaching Assistant",
                "period": "2021-22 Sem II",
                "description": "Preparing questions for weekly quizzes and assisting in grading assignments."
            }
        ]
    },
    "gallery": [
        "V1.0/images/1.JPEG",
        "V1.0/images/2.JPEG",
        "V1.0/images/3.JPEG",
        "V1.0/images/4.JPEG",
        "V1.0/images/PESGMPoster.jpeg",
        "V1.0/images/6 Small.jpeg",
        "V1.0/images/7.JPEG",
        "V1.0/images/8.JPEG"
    ],
    "talks": [
        "V1.0/images/img1.JPG",
        "V1.0/images/img2.JPG",
        "V1.0/images/img3.JPG",
        "V1.0/images/img4.JPG",
        "V1.0/images/img5.JPG",
        "V1.0/images/img6.JPG",
        "V1.0/images/img7.JPG",
        "V1.0/images/img2.JPG"
    ],
    "publications": {
        "preprints": [

        ],
        "journals": [{
            "title": "IDSO-Managed Bid-Based Transactive Design for DER Participation in Wholesale Markets While Preserving T-D Interactions",
            "authors": "S. Sharma, S. Battula, and S.N. Singh",
            "year": "2026",
            "venue": "IEEE Transactions on Energy Markets, Policy, and Regulation",
            "link": "",
            "preprint": "https://arxiv.org/abs/2508.08187",
            "doi": "doi: 10.1109/TEMPR.2026.3661757",
            "citation": "S. Sharma, S. Battula and S. N. Singh, “IDSO-Managed Bid-Based Transactive Distribution Systems Design for DER Participation in Wholesale Markets While Preserving T-D Interactions,” in IEEE Transactions on Energy Markets, Policy and Regulation, doi: 10.1109/TEMPR.2026.3661757."
        }],
        "conferences": [
            {
                "title": "Towards Improved System Flexibility: Enabling IDSO's Swing Contract Market Participation",
                "authors": "S. Sharma, S. Battula, and S.N. Singh",
                "year": "2026",
                "venue": "2026 IEEE Power & Energy Society Transmission & Distribution Conference & Exposition, Chicago, Illinois, 2026",
                "status": "[Accepted]"
            },
            {
                "title": "Transactive Electric Vehicle Agent: A Deep Reinforcement Learning Approach",
                "authors": "S. Sharma, S. Battula, and S.N. Singh",
                "year": "2024",
                "venue": "2024 IEEE Power & Energy Society General Meeting, Seattle, Washington, 2024",
                "doi": "doi: 10.1109/PESGM51994.2024.10688919",
                "link": "https://ieeexplore.ieee.org/document/10688919",
                "citation": "S. Sharma, S. Battula and S. N. Singh, Transactive Electric Vehicle Agent: A Deep Reinforcement Learning Approach, 2024 IEEE Power & Energy Society General Meeting (PESGM), Seattle, WA, USA, 2024, pp. 1-5, doi: 10.1109/PESGM51994.2024.10688919."
            }
        ]
    },
    "reads": {
        "fictional": [
            {
                "title": "Yellowface",
                "author": "R.F. Kuang",
                "description": "A satirical thriller about diversity, cultural appropriation, and the publishing industry.",
                "searchQuery": "Yellowface R.F. Kuang"
            },
            {
                "title": "Psycho-Cybernetics",
                "author": "Maxwell Maltz",
                "description": "A self-help classic exploring the mind-body connection and self-image psychology.",
                "searchQuery": "Psycho-Cybernetics Maxwell Maltz"
            }
        ],
        "technical": [
            {
                "title": "Power System Analysis",
                "author": "Grainger and Stevenson",
                "description": "The classic comprehensive guide to power systems engineering.",
                "searchQuery": "Power System Analysis Grainger Stevenson"
            },
            {
                "title": "A New Swing-Contract Design for Wholesale Power Markets",
                "author": "Leigh Tesfatsion",
                "description": "Proposes a linked swing-contract market design for centrally-managed wholesale power markets.",
                "searchQuery": "A New Swing-Contract Design for Wholesale Power Markets Leigh Tesfatsion"
            },
            {
                "title": "Optimization Models in Electricity Markets",
                "author": "Anthony Papavasiliou",
                "description": "A comprehensive introduction to the structure and operation of electricity markets.",
                "searchQuery": "Optimization Models in Electricity Markets Anthony Papavasiliou"
            },
            {
                "title": "Grokking Deep Reinforcement Learning",
                "author": "Miguel Morales",
                "description": "An intuitive guide to deep reinforcement learning concepts and algorithms.",
                "searchQuery": "Grokking Deep Reinforcement Learning Miguel Morales"
            }
        ],
        "papers": [
            {
                "title": "Locational Marginal Pricing: A Fundamental Reconsideration",
                "author": "Leigh Tesfatsion, 2024",
                "description": "The paper introduces why there is a fundamental need to reconsider locational marginal pricing in electricity markets.",
                "link": "https://ieeexplore.ieee.org/document/10419119"
            },
            {
                "title": "Braided Cobwebs: Cautionary Tales for Dynamic Pricing in Retail Electric Power Markets",
                "author": "A.G. Thomas and L. Tesfatsion, 2018",
                "description": "The paper shows that one-way dynamic retail pricing can create unstable braided cobweb cycles between wholesale and retail markets and usually reduces household welfare compared with flat-rate tariffs.",
                "link": "https://ieeexplore.ieee.org/document/8353474/"
            },
            {
                "title": "Distribution Systems in a High Distributed Energy Resources Future",
                "author": "P.D. Martin and L. Kristov, 2015",
                "description": "The article introduces for the first time, the need for an Independent Distribution System Operator (IDSO) to manage the highly \"active\" distribution systems.",
                "link": "https://eta-publications.lbl.gov/sites/default/files/lbnl-1003797.pdf"
            }
        ]
    }
};
