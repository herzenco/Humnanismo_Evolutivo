export interface Event {
  id: string;
  titleKey: string;
  descriptionKey: string;
  date: string;
  location: string;
  videoUrl?: string;
  imageUrl: string;
  categoryKey: string;
  gallery?: string[];
  sections?: {
    titleKey: string;
    contentKey: string;
  }[];
}

export const events: Event[] = [
  {
    id: 'smge-2025',
    titleKey: 'event.smge.title',
    descriptionKey: 'event.smge.description',
    date: '2025-10-28',
    location: 'Cancún, Quintana Roo',
    videoUrl: 'https://youtu.be/HLHjY3NnX2k',
    imageUrl: '/lovable-uploads/bd0dec77-828d-40b0-8bcc-30690a3a1fb3.png',
    categoryKey: 'event.category.conference',
    gallery: [
      '/lovable-uploads/smge-2025-gallery-1.jpeg',
      '/lovable-uploads/smge-2025-gallery-2.jpeg',
      '/lovable-uploads/smge-2025-gallery-3.jpeg'
    ],
    sections: [
      {
        titleKey: 'event.smge.section1.title',
        contentKey: 'event.smge.section1.content'
      },
      {
        titleKey: 'event.smge.section2.title',
        contentKey: 'event.smge.section2.content'
      },
      {
        titleKey: 'event.smge.section3.title',
        contentKey: 'event.smge.section3.content'
      }
    ]
  },
  {
    id: 'conferencia-paz-2025',
    titleKey: 'event.paz.title',
    descriptionKey: 'event.paz.description',
    date: '2025-09-18',
    location: 'Cancún, Quintana Roo',
    imageUrl: '/lovable-uploads/conferencia-paz-2025-4.jpeg',
    categoryKey: 'event.category.conference',
    gallery: [
      '/lovable-uploads/conferencia-paz-2025-1.jpeg',
      '/lovable-uploads/conferencia-paz-2025-3.jpeg',
      '/lovable-uploads/conferencia-paz-2025-4.jpeg',
      '/lovable-uploads/conferencia-paz-2025-5.jpeg',
      '/lovable-uploads/conferencia-paz-2025-6.jpeg',
      '/lovable-uploads/conferencia-paz-2025-7.jpeg'
    ],
    sections: [
      {
        titleKey: 'event.paz.section1.title',
        contentKey: 'event.paz.section1.content'
      },
      {
        titleKey: 'event.paz.section2.title',
        contentKey: 'event.paz.section2.content'
      },
      {
        titleKey: 'event.paz.section3.title',
        contentKey: 'event.paz.section3.content'
      },
      {
        titleKey: 'event.paz.section4.title',
        contentKey: 'event.paz.section4.content'
      }
    ]
  }
];
