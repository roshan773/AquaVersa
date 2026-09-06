import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';
import QuizClient from './QuizClient';

export const metadata = constructMetadata({
  title: 'Aquarium Science Quiz: Test Fish Care Knowledge',
  description: 'Test your understanding of the nitrogen cycle, water chemistry, filtration, species compatibility, and fish health in this 10-question quiz.',
  path: '/quiz',
});

export default function QuizPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Aquarium Science Quiz', url: '/quiz' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Science Knowledge Quiz',
    description: '10-question educational assessment testing knowledge of nitrogen cycling, water parameters, filtration, and aquatic health.',
    path: '/quiz',
    applicationCategory: 'EducationalApplication',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <QuizClient />
    </>
  );
}
