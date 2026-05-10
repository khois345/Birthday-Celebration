// app/[sessionId]/page.tsx
import CelebrationPageContent from "@/components/CelebrationPageContent";

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function BirthdaySessionPage({ params }: PageProps) {
  const { sessionId } = await params;

  return <CelebrationPageContent sessionId={sessionId} />;
}