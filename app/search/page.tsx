import { constructMetadata } from '@/lib/seo';
import SearchClient from './SearchClient';

export const metadata = constructMetadata({
  title: 'Search Atlas Library: Fish, Plants & Equipment',
  description: 'Search the complete database of freshwater species, marine fish, live aquatic plants, and aquarium hardware specs.',
  path: '/search',
  noIndex: true,
});

export default function SearchPage() {
  return <SearchClient />;
}
