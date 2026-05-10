import CelebrationPageContent from "@/components/CelebrationPageContent";
import PageFooter from "@/components/PageFooter";

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function BirthdaySessionPage({ params }: PageProps) {
  const { sessionId } = await params;

  return (
    <>
      <CelebrationPageContent sessionId={sessionId} />
      <PageFooter />
    </>
  );
}