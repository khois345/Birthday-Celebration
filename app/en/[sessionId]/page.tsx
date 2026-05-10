import CelebrationPageContent from "@/components/CelebrationPageContent";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageFooter from "@/components/PageFooter";

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function EnglishBirthdaySessionPage({ params }: PageProps) {
  const { sessionId } = await params;

  return (
    <>
      <LanguageSwitcher locale="en" />
      <CelebrationPageContent sessionId={sessionId} locale="en" />
      <PageFooter locale="en" />
    </>
  );
}
