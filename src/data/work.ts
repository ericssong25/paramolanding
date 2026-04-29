export type WorkMediaItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; poster?: string; title?: string };

export type WorkGalleryItem =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'carousel'; coverSrc: string; alt?: string; slides: Array<{ src: string; alt?: string }> };

export type WorkSection =
  | {
      type: 'gallery';
      title: string;
      dimensions?: string;
      items: WorkGalleryItem[];
    }
  | {
      type: 'videoGrid';
      title: string;
      dimensions?: string;
      items: Array<{ src: string; poster?: string; title?: string }>;
    };

export type WorkItem = {
  slug: string;
  category: string;
  title: string;
  coverImage: string;
  instagramUrl?: string;
  sections: WorkSection[];
};

export const WORK: WorkItem[] = [
  {
    slug: 'injury-guardians',
    category: 'Redes sociales',
    title: 'Injury Guardians',
    coverImage:
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1400',
    instagramUrl: 'https://instagram.com/injuryguardians',
    sections: [
      {
        type: 'gallery',
        title: 'Diseños para redes sociales',
        dimensions: '1080x1350',
        items: [
          {
            type: 'image',
            src: '/images/injury-guardians-post1.jpg',
            alt: 'Piezas para redes sociales',
          },
          {
            type: 'carousel',
            coverSrc: '/images/carrousel-1/injury-guardians-post3 (1).jpg',
            alt: 'Carrusel de diseños',
            slides: [
              {
                src: '/images/carrousel-1/injury-guardians-post3 (1).jpg',
                alt: 'Slide 1',
              },
              {
                src: '/images/carrousel-1/injury-guardians-post3 (2).jpg',
                alt: 'Slide 2',
              },
              {
                src: '/images/carrousel-1/injury-guardians-post3 (3).jpg',
                alt: 'Slide 3',
              },
              {
                src: '/images/carrousel-1/injury-guardians-post3 (4).jpg',
                alt: 'Slide 4',
              },
              {
                src: '/images/carrousel-1/injury-guardians-post3 (5).jpg',
                alt: 'Slide 5',
              },
            ],
          },
          {
            type: 'image',
            src: '/images/injury-guardians-post2.jpg',
            alt: 'Piezas para redes sociales-2',
          },
        ],
      },
      {
        type: 'videoGrid',
        title: 'Edición de videos',
        dimensions: '1080x1920',
        items: [
          { src: '/videos/injury-guardians-1.mp4', title: 'Video 1' },
          { src: '/videos/injury-guardians-2.mp4', title: 'Video 2' },
          { src: '/videos/injury-guardians-3.mp4', title: 'Video 3' },
          { src: '/videos/injury-guardians-4.mp4', title: 'Video 4' },
          { src: '/videos/injury-guardians-5.mp4', title: 'Video 5' },
        ],
      },
    ],
  },
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return WORK.find((w) => w.slug === slug);
}

