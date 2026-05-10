import CelebrationPageContent from "@/components/CelebrationPageContent";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageFooter from "@/components/PageFooter";

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function SpanishBirthdaySessionPage({ params }: PageProps) {
  const { sessionId } = await params;

  return (
    <>
      <LanguageSwitcher locale="es" />
      <CelebrationPageContent sessionId={sessionId} locale="es" />
      <PageFooter locale="es" />
    </>
  );
}
