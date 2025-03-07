import { createApp, ref } from 'vue';

createApp({
  setup() {
    const activeProject = ref(null);
    
    const projects = ref([
      {
        title: "This Minigame Idea Does Not Exist",
        url: "https://websim.ai/@api/this-minigame-idea-does-not-exist",
        description: "AI-generated minigame concepts brought to life with interactive gameplay elements.",
        imageUrl: null
      },
      {
        title: "This Programming Language Does Not Exist",
        url: "https://websim.ai/@api/this-programming-language-does-not-exist",
        description: "A fictional programming language with syntax highlighting and examples.",
        imageUrl: null
      },
      {
        title: "This Date Does Not Exist",
        url: "https://websim.ai/@api/this-date-does-not-exist",
        description: "An interactive romantic date simulator with impossible scenarios.",
        imageUrl: null
      },
      {
        title: "This Soda Does Not Exist",
        url: "https://websim.ai/@api/this-soda-does-not-exist",
        description: "Fictional soda brand designer with flavors that have never existed.",
        imageUrl: null
      },
      {
        title: "This Cat Does Not Exist",
        url: "https://websim.ai/@api/this-cat-does-not-exist",
        description: "Generate and interact with fantasy cats with impossible features.",
        imageUrl: null
      },
      {
        title: "This Wireframe Does Not Exist",
        url: "https://websim.ai/@api/this-wireframe-does-not-exist/1",
        description: "UI/UX wireframe generator for apps that don't exist yet.",
        imageUrl: null
      },
      {
        title: "This Classic Arcade Game Does Not Exist",
        url: "https://websim.ai/@api/this-classic-arcade-game-does-not-exist/",
        description: "Play fictional arcade games inspired by classics but with unique twists.",
        imageUrl: null
      },
      {
        title: "This Slideshow Cartoon Does Not Exist",
        url: "https://websim.ai/@api/this-slideshow-cartoon-does-not-exist",
        description: "Generate and view slideshow cartoons with AI-created storylines.",
        imageUrl: null
      },
      {
        title: "This Fridge Does Not Exist",
        url: "https://websim.ai/@api/this-fridge-does-not-exist/",
        description: "Create and interact with virtual fridges filled with imaginary food items.",
        imageUrl: null
      },
      {
        title: "This Planet Does Not Exist",
        url: "https://websim.ai/@api/this-planet-does-not-exist",
        description: "Explore AI-generated planets with unique features and ecosystems.",
        imageUrl: null
      },
      {
        title: "This Tetris Game Does Not Exist",
        url: "https://websim.ai/@api/this-tetris-game-does-not-exist",
        description: "Play reimagined versions of Tetris with unusual mechanics and rules.",
        imageUrl: null
      },
      {
        title: "This Snake Game Does Not Exist",
        url: "https://websim.ai/@api/this-snake-game-does-not-exist",
        description: "Experience Snake game variants with unexpected twists and features.",
        imageUrl: null
      }
    ]);

    const openProject = (project) => {
      activeProject.value = project;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is open
    };

    const closeProject = () => {
      activeProject.value = null;
      document.body.style.overflow = ''; // Re-enable scrolling
    };

    // Generate images for projects using AI
    const generateProjectImages = async () => {
      for (let project of projects.value) {
        try {
          // Extract the project theme from the title
          const projectTheme = project.title.replace("This ", "").replace(" Does Not Exist", "");
          
          // Generate an image for each project
          const result = await websim.imageGen({
            prompt: `A colorful, modern app icon or thumbnail for "${projectTheme}". Bright colors, simple design, digital interface style.`,
            aspect_ratio: "1:1"
          });
          
          project.imageUrl = result.url;
        } catch (error) {
          console.error(`Failed to generate image for ${project.title}:`, error);
          // Fallback to a placeholder color
          project.imageUrl = generateColorPlaceholder(project.title);
        }
      }
    };

    // Generate a colored placeholder based on project title
    const generateColorPlaceholder = (title) => {
      let hash = 0;
      for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      const hue = hash % 360;
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='hsl(${hue}, 70%25, 60%25)'/%3E%3C/svg%3E`;
    };

    // Initialize
    generateProjectImages();

    // Key event listener for ESC key to close overlay
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeProject.value) {
        closeProject();
      }
    });

    return {
      projects,
      activeProject,
      openProject,
      closeProject
    };
  }
}).mount('#app');

