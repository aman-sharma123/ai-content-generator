export default[
    {
        name:'Blog Title',
        desc:'An AI tool that generates blog title based on your blog information',
        category:'Blog',
        icon:'https://cdn-icons-png.flaticon.com/128/4180/4180996.png',
        aiPrompt:'Give me 3 blog topic ideas in bullet wise only, also give outline of 40 words to 50 words for each bullet point based on given niche & outline in Rich text editor format',
        slug:'generate-blog-title',
        form:[
            {
                label:'Enter your blog niche',
                field:'input',
                name:'niche',
                required:true,
            },
            {
                label:'Enter blog outline',
                field:'textarea',
                name:'outline',
            }
        ]
    },
    {
        name:'Blog Content',
        desc:'An AI tool that serves as a your personal blog post title writer, generating content based on your given topic',
        category:'blog',
        icon:'https://cdn-icons-png.flaticon.com/128/2593/2593542.png',
        slug:'blog-content-generation',
        aiPrompt:'Generate Blog content based on topic and outline in Rich text editor format',
        form: [
            {
                label:'Enter your blog topic',
                field:'input',
                name:'topic',
                required:true,
            },
            {
                label:'Enter blog Outline here',
                field:'textarea',
                name:'outline',
            }
        ]
    },
    {
        name:'Blog Topic Ideas',
        desc:'An AI tool that serves as a your personal blog post topic writer, generating topic ideas based on the given niche',
        category:'blog',
        icon:'https://cdn-icons-png.flaticon.com/128/11497/11497847.png',
        slug:'blog-topic-idea',
        aiPrompt:'Generate top 5 Blog Topic Ideas in bullet point only, (no description) based on niche in rich text editor ',
        form: [
            {
                label:'Enter your niche',
                field:'input',
                name:'niche',
                required:true,
            },
        ]
    },
    {
        name:'Youtube SEO Title',
        desc:'An AI tool that generates youtube seo title, generating youtube SEO optimized Title',
        category:'Youtube Tools',
        icon:'https://cdn-icons-png.flaticon.com/128/10098/10098011.png',
        slug:'youtube-seo-title',
        aiPrompt:'Generate Best SEO optimized high ranked 5 title ideas in bullet point only, (no description) based on the keywords in Rich text editor format',
        form: [
            {
                label:'Enter your youtube video topic keywords',
                field:'input',
                name:'keywords',
                required:true,
            },
            {
                label:'Enter youtube description outline here(optional)',
                field:'textarea',
                name:'outline',
            }
        ]
    },{
        name:'Youtube Description',
        desc:'An AI tool that serves as a your personal youtube description writer, generating youtube description based on your youtube video title',
        category:'Youtube Tool',
        icon:'https://cdn-icons-png.flaticon.com/128/174/174883.png',
        slug:'youtube-description',
        aiPrompt:'Generate youtube description with emoji under 4-5 lines, based on the given topic and outline in Rich text editor format',
        form: [
            {
                label:'Enter your blog topic/title',
                field:'input',
                name:'topic',
                required:true,
            },
            {
                label:'Enter youtube Outline here',
                field:'textarea',
                name:'outline',
            }
        ]
    },
    {
        name:'Youtube Tags',
        desc:'An AI tool that generates high quality youtube tags, generating youtube tags based on the title of the youtube video',
        category:'Youtube Tool',
        icon:'https://cdn-icons-png.flaticon.com/128/10884/10884882.png',
        slug:'youtube-tag',
        aiPrompt:'Generate 10 Youtube tags in bullet point only, (no description) based on the youtube video title and outline in Rich text editor format',
        form: [
            {
                label:'Enter your blog topic',
                field:'input',
                name:'title',
                required:true,
            },
            {
                label:'Enter youtube Outline here(Optional)',
                field:'textarea',
                name:'outline'
            }
        ]
    },
    {
        name:'English Grammar Check',
        desc:'This handy tool refines your writing, eliminating errors',
        category:'Writing Assistant',
        icon:'https://cdn-icons-png.flaticon.com/128/4419/4419942.png',
        slug:'text-improver',
        aiPrompt:'Given textToImprove, Rewrite text without any grammatical error in Rich text editor format',
        form: [
            {
                label:'Enter text that you want to re-write or improve',
                field:'textarea',
                name:'textToImprove',
                required:true,
            },
        ]
    },
    {
        name:'Add Emojis to Text',
        desc:'An AI tool that adds emojis to the given text',
        category:'blog',
        icon:'https://cdn-icons-png.flaticon.com/128/18602/18602111.png',
        slug:'add-emoji-to-text',
        aiPrompt:'Add Emoji to outline text',
        form: [
            {
                label:'Enter your text to add emojis',
                field:'textarea',
                name:'outline',
                required:true,
            },
        ]
    },
    {
        name:'Instagram Post Generator',
        desc:'An AI tool that serves as your personal instagram post generator, generating Instagram posts based on the keywords',
        category:'Instagram Tool',
        icon:'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
        slug:'instagram-post-generator',
        aiPrompt:'Generate Instagram post based on given keywords and outline in Rich text editor format',
        form: [
            {
                label:'Enter your blog topic',
                field:'input',
                name:'keywords',
                required:true,
            },
            {
                label:'Enter blog Outline here',
                field:'textarea',
                name:'outline',
            }
        ]
    },
    {
        name:'Instagram Hash Tag Generator',
        desc:'An AI tool that generates high-quality tags for instagram posts, generating Instagram tags based on the title',
        category:'Instagram Tool',
        icon:'https://cdn-icons-png.flaticon.com/128/7045/7045432.png',
        slug:'instagram-tags-generator',
        aiPrompt:'Give me SEO optimized tags in bullet point only, (no description), in the three categories general, specific,unique & engaging based on the given keywords in Rich text editor format',
        form: [
            {
                label:'Enter keywords for your Instagram HashTag',
                field:'input',
                name:'keywords',
                required:true,
            },
        ]
    },
    {
        name:'Rewrite Article (Plagiarism Free)',
        desc:'Use this tool to rewrite existing Article or Blog Post',
        category:'Rewriting Tool',
        icon:'https://cdn-icons-png.flaticon.com/128/2696/2696555.png',
        slug:'rewrite-article',
        aiPrompt:'Rewrite given article without any Plagiarism in Rich text editor format',
        form: [
            {
                label:'🤖Provide your Article/Blogpost',
                field:'textarea',
                name:'article',
                required:true,
            },
        ]
    }
]