export interface SliderConfigType {
  title: string;
  description: string;
  link: '/blog/movies' | '/blog/series';
  image: string;
}

export const SliderConfig: SliderConfigType[] = [
  {
    title: 'blog_movies_title',
    description: 'blog_movies_desc',
    link: '/blog/movies',
    image: '/moviesCover.jpg',
  },
  {
    title: 'blog_series_title',
    description: 'blog_series_desc',
    link: '/blog/series',
    image: '/seriesCover.jpg',
  },
];
