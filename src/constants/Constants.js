export const NODE_ENV = "development";
export const PROAPPS_API_PROD = "https://pro-apps.herokuapp.com/api"
export const PROAPPS_API_DEV = "http://localhost:3001/api"  // http://192.168.1.17:3001/api
export const topics = [
    {
        title: "Application web",
        icon: "laptop",
        subtitle: "outils professionnels",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/cca721dc-c62a-4909-970f-779898ba6416",
        description: `Vous allez gagner du temps !
        Conçevons les outils web dont votre activité a besoin.
        Un intranet d'entreprise ? un système d'organisation ? 
        On peut vous faire ça !`
    },
    {
        title: "Application mobile",
        icon: "mobile alternate",
        subtitle: "privée, ios & android",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/03ae4423-e619-48ec-86a2-4245c96f8563",
        description: `Mettez toute votre entreprise dans votre poche et partagez vos outils personnalisés avec vos collaborateurs via l'AppStore Apple et le PlayStore Google`
    },
    {
        title: "Site vitrine",
        icon: "sitemap", 
        subtitle: "web & responsive mobile",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/52ed543a-4011-4d88-9ee0-1ff14c505722",
        description: `Un produit, un service ou un évènement à présenter et/ou à mettre en avant ? Vos visiteurs vont faire du lèche-vitrine, on va faire briller les étagères !`
    },
    {
        title: "Base de données",
        icon: "database",        
        subtitle: "cryptage & stockage",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/e30fe728-a692-4fbe-9436-95e5d62b82a0",
        description: `Il parait que les datas valent de l'or, autant les mettre à l'abris ! Nous proposons des solutions de stockage sécurisé à court, moyen et long terme`
    },
    {
        title: "Blockchain",
        icon: "ethereum",
        subtitle: "smart-contracts & applications décentralisées",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/e3d54f65-fea1-47ac-bfaf-4c2483d0c0ef",
        description: `La dernière grosse révolution en matière d'internet est bel est bien la blockchain. Fini les serveurs, tokénisation et décentralisation sont les mots d'ordre ici.`
    },
    {
        title: "Conception graphique",
        icon: "paint brush",
        subtitle: "logos, flyers, bannières & cartes de visite",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/798030d1-7904-4fd3-be87-544fc86ffe94",
        description: `Besoin d'une réalisation graphique personnalisée dans un format précis ? on s'en charge dans le respect de votre charte graphique et s'il faut, on la conçoit ensemble.`
    },
    // audit
    {
        title: "Audit de code",
        icon: "eye",
        subtitle: "qualité, sureté & sécurité",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/5105c32f-15f3-4a7a-9a5e-117a8372136e",
        description: `Besoin d'un point de vue extérieur ? Nous faisons le tour de votre code et vous rendons un rapport détaillé pour permettre à vos collaborateurs d'apprécier son niveau de qualité et de sécurité`
    },
    // formation
    {
        title: "Formation & Mentorat",
        icon: "student",
        subtitle: "conception, languages & technologies",
        imageSrc: "https://pro-apps-web-services.s3.eu-west-3.amazonaws.com/picture/e886858d-867c-4ff3-bb4f-b6a0d87d3901",
        description: `Besoin d'une connaissance technique ? Chez ProApps on aime partager, nous assurons des modules de formation personnalisés sur demande, donc il suffit de demander ;)`
    }
]