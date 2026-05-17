import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Desert Solitude',
    category: 'landscapes',
    year: '2024',
    slug: 'desert-solitude',
    // Photo by Zain Creations on Unsplash
    coverImage: '/assets/portfolio/01-1733496637708-9470e9c8cfe2.jpg',
    description: 'An exploration of the stark beauty and quiet majesty of the American Southwest. This series captures the interplay of light, shadow, and ancient geological formations that define the desert landscape.',
    client: 'National Geographic',
    camera: 'Hasselblad X2D 100C',
    location: 'Arizona & Utah',
    images: [
      {
        id: '1-1',
        // Photo by Joe Dudeck on Unsplash
        src: '/assets/portfolio/02-1610142004358-e4e987e4c5af.jpg',
        alt: 'Desert canyon at golden hour',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        // Photo by Giorgio Fouarge on Unsplash
        src: '/assets/portfolio/03-1705321217071-b1b6672fa23c.jpg',
        alt: 'Sand dunes in morning light',
        aspectRatio: 'portrait'
      },
      {
        id: '1-3',
        // Photo by Astroby krishna on Unsplash
        src: '/assets/portfolio/04-1727319384541-8b96ca1526e8.jpg',
        alt: 'Rock formations under starry sky',
        aspectRatio: 'landscape'
      },
      {
        id: '1-4',
        // Photo by Ilker Ozmen on Unsplash
        src: '/assets/portfolio/05-1725986951716-75fb278ecaec.jpg',
        alt: 'Desert vista at sunset',
        aspectRatio: 'square'
      }
    ]
  },
  {
    id: '2',
    title: 'Urban Portraits',
    category: 'portraits',
    year: '2024',
    slug: 'urban-portraits',
    // Photo by Bradley Andrews on Unsplash
    coverImage: '/assets/portfolio/06-1761069234906-a7c77124f641.jpg',
    description: 'A portrait series celebrating the diversity and character of city dwellers. Each subject was photographed in their favorite urban location, revealing the intimate connection between people and their environment.',
    client: 'The New York Times Magazine',
    camera: 'Canon EOS R5',
    location: 'New York City',
    images: [
      {
        id: '2-1',
        // Photo by ali mahmoodi on Unsplash
        src: '/assets/portfolio/07-1559123988-ebd5228736b0.jpg',
        alt: 'Portrait of young man in urban setting',
        aspectRatio: 'portrait'
      },
      {
        id: '2-2',
        // Photo by mouad bouallayel on Unsplash
        src: '/assets/portfolio/08-1628173422874-0d18ff5bfb83.jpg',
        alt: 'Professional portrait in natural light',
        aspectRatio: 'portrait'
      },
      {
        id: '2-3',
        // Photo by Ivan Lenin on Unsplash
        src: '/assets/portfolio/09-1581329318020-a226e3713ea8.jpg',
        alt: 'Candid street portrait',
        aspectRatio: 'square'
      },
      {
        id: '2-4',
        // Photo by Elric Pxl on Unsplash
        src: '/assets/portfolio/10-1651464416004-60ae4e4846d6.jpg',
        alt: 'Portrait with city backdrop',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '3',
    title: 'Architectural Visions',
    category: 'architecture',
    year: '2023',
    slug: 'architectural-visions',
    // Photo by E Vos on Unsplash
    coverImage: '/assets/portfolio/11-1758543437543-6d61ca0fd530.jpg',
    description: 'Modern architecture captured through a minimalist lens. This series focuses on geometric forms, materiality, and the interplay of structure with natural light.',
    client: 'Architectural Digest',
    camera: 'Sony A7R V',
    location: 'International',
    images: [
      {
        id: '3-1',
        // Photo by Zulfugar Karimov on Unsplash
        src: '/assets/portfolio/12-1762344682624-176d89eb3bfe.jpg',
        alt: 'Modern glass building facade',
        aspectRatio: 'portrait'
      },
      {
        id: '3-2',
        // Photo by Jason Leung on Unsplash
        src: '/assets/portfolio/13-1690927324729-bcf7d2b3ecac.jpg',
        alt: 'Architectural interior with natural light',
        aspectRatio: 'landscape'
      },
      {
        id: '3-3',
        // Photo by Declan Sun on Unsplash
        src: '/assets/portfolio/14-1752756351017-bbe91e0439a0.jpg',
        alt: 'Geometric concrete structure',
        aspectRatio: 'square'
      },
      {
        id: '3-4',
        // Photo by Alessandro Ricossa on Unsplash
        src: '/assets/portfolio/15-1748940644273-47564655923f.jpg',
        alt: 'Contemporary building at dusk',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'Fashion Forward',
    category: 'editorial',
    year: '2023',
    slug: 'fashion-forward',
    // Photo by Yigit ARISOY on Unsplash
    coverImage: '/assets/portfolio/16-1682232568244-edbb92614c2a.jpg',
    description: 'An editorial series exploring contemporary fashion through bold compositions and dramatic lighting. Shot on location and in studio.',
    client: 'Vogue',
    camera: 'Phase One XF IQ4',
    location: 'New York & Paris',
    images: [
      {
        id: '4-1',
        // Photo by Cord Allman on Unsplash
        src: '/assets/portfolio/17-1730724620317-2b806898bdda.jpg',
        alt: 'Fashion editorial portrait',
        aspectRatio: 'portrait'
      },
      {
        id: '4-2',
        // Photo by Happy Face Emoji on Unsplash
        src: '/assets/portfolio/18-1704137892949-e480ceaebe24.jpg',
        alt: 'Model in dramatic lighting',
        aspectRatio: 'portrait'
      },
      {
        id: '4-3',
        // Photo by Lawrence Krowdeed on Unsplash
        src: '/assets/portfolio/19-1631970283992-6b57250a4a29.jpg',
        alt: 'Fashion photography in urban setting',
        aspectRatio: 'landscape'
      },
      {
        id: '4-4',
        // Photo by Ayo Ogunseinde on Unsplash
        src: '/assets/portfolio/20-1540513325222-55b3afd3ed5b.jpg',
        alt: 'Editorial fashion portrait',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '5',
    title: 'Mountain Stories',
    category: 'documentary',
    year: '2023',
    slug: 'mountain-stories',
    // Photo by Eva Šumah on Unsplash
    coverImage: '/assets/portfolio/21-1742260765447-239ed006350a.jpg',
    description: 'Documentary series following mountain communities and their relationship with the changing alpine environment. A year-long project documenting life at altitude.',
    client: 'Personal Project',
    camera: 'Fujifilm GFX 100 II',
    location: 'Swiss Alps',
    images: [
      {
        id: '5-1',
        // Photo by Marek Piwnicki on Unsplash
        src: '/assets/portfolio/22-1680287327539-9467451a8b81.jpg',
        alt: 'Mountain landscape at dawn',
        aspectRatio: 'landscape'
      },
      {
        id: '5-2',
        // Photo by Wang John on Unsplash
        src: '/assets/portfolio/23-1621765808360-5b2ea25d147a.jpg',
        alt: 'Alpine village in winter',
        aspectRatio: 'landscape'
      },
      {
        id: '5-3',
        // Photo by Peter Robbins on Unsplash
        src: '/assets/portfolio/24-1721960778604-6a814f039347.jpg',
        alt: 'Mountain peaks in fog',
        aspectRatio: 'portrait'
      },
      {
        id: '5-4',
        // Photo by FETHI BOUHAOUCHINE on Unsplash
        src: '/assets/portfolio/25-1654362248566-6804dbcc5bdc.jpg',
        alt: 'Sunrise over mountain range',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '6',
    title: 'Coastal Light',
    category: 'landscapes',
    year: '2022',
    slug: 'coastal-light',
    // Photo by Max Kukurudziak on Unsplash
    coverImage: '/assets/portfolio/26-1669908752972-e04c3b65e855.jpg',
    description: 'The ever-changing mood of the coastline captured through different seasons and weather conditions. A meditation on light, water, and time.',
    location: 'Pacific Northwest',
    camera: 'Nikon Z9',
    images: [
      {
        id: '6-1',
        // Photo by Stefanie Jockschat on Unsplash
        src: '/assets/portfolio/27-1619508126123-3586ee993858.jpg',
        alt: 'Ocean waves at sunset',
        aspectRatio: 'landscape'
      },
      {
        id: '6-2',
        // Photo by Vladimir Shubarin on Unsplash
        src: '/assets/portfolio/28-1566303060899-999a74200af8.jpg',
        alt: 'Rocky coastline in morning mist',
        aspectRatio: 'landscape'
      },
      {
        id: '6-3',
        // Photo by Panchanok Juntanarach on Unsplash
        src: '/assets/portfolio/29-1762686185418-2bffbb8d8fea.jpg',
        alt: 'Beach at golden hour',
        aspectRatio: 'landscape'
      },
      {
        id: '6-4',
        // Photo by Emma Watson on Unsplash
        src: '/assets/portfolio/30-1594927058779-aa4c1b5804a3.jpg',
        alt: 'Coastal cliffs in dramatic light',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '7',
    title: 'Studio Sessions',
    category: 'portraits',
    year: '2022',
    slug: 'studio-sessions',
    // Photo by Kyle Loftus on Unsplash
    coverImage: '/assets/portfolio/31-1616267624976-b45d3a7bac73.jpg',
    description: 'Controlled studio portraiture emphasizing form, light, and expression. Classic approach to contemporary subjects.',
    client: 'Various Editorial',
    camera: 'Hasselblad H6D-100c',
    location: 'New York Studio',
    images: [
      {
        id: '7-1',
        // Photo by Kyle Loftus on Unsplash
        src: '/assets/portfolio/31-1616267624976-b45d3a7bac73.jpg',
        alt: 'Studio portrait with dramatic lighting',
        aspectRatio: 'portrait'
      },
      {
        id: '7-2',
        // Photo by Robert Piosik on Unsplash
        src: '/assets/portfolio/32-1551536548-4de53e534e3f.jpg',
        alt: 'Classic portrait in soft light',
        aspectRatio: 'portrait'
      },
      {
        id: '7-3',
        // Photo by Bench Accounting on Unsplash
        src: '/assets/portfolio/33-1449247709967-d4461a6a6103.jpg',
        alt: 'Portrait with minimalist background',
        aspectRatio: 'square'
      },
      {
        id: '7-4',
        // Photo by Vitaly Gariev on Unsplash
        src: '/assets/portfolio/34-1758521233019-e53cb9ce77b5.jpg',
        alt: 'Contemporary studio portrait',
        aspectRatio: 'portrait'
      }
    ]
  },
  {
    id: '8',
    title: 'City Lights',
    category: 'editorial',
    year: '2022',
    slug: 'city-lights',
    // Photo by Michael Wu on Unsplash
    coverImage: '/assets/portfolio/35-1582210413269-f0bf6d13f58f.jpg',
    description: 'Urban nightscapes and the electric energy of city life after dark. Long exposures and ambient light create a dreamlike quality.',
    client: 'Adobe Creative Cloud',
    camera: 'Sony A7S III',
    location: 'Tokyo & New York',
    images: [
      {
        id: '8-1',
        // Photo by Li Zhang on Unsplash
        src: '/assets/portfolio/36-1617293134227-0ec282f3ed89.jpg',
        alt: 'City street at night with neon lights',
        aspectRatio: 'landscape'
      },
      {
        id: '8-2',
        // Photo by Clay LeConey on Unsplash
        src: '/assets/portfolio/37-1643124859906-b5f7ef3e210d.jpg',
        alt: 'Urban skyline at dusk',
        aspectRatio: 'landscape'
      },
      {
        id: '8-3',
        // Photo by Lutz Stallknecht on Unsplash
        src: '/assets/portfolio/38-1761870033405-d1474ec5dae9.jpg',
        alt: 'Night photography of city architecture',
        aspectRatio: 'portrait'
      },
      {
        id: '8-4',
        // Photo by stable pattern on Unsplash
        src: '/assets/portfolio/39-1701012292510-83de4283ef1e.jpg',
        alt: 'Downtown at night with light trails',
        aspectRatio: 'landscape'
      }
    ]
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
