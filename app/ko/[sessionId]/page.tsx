import CelebrationPageContent from "@/components/CelebrationPageContent";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PageFooter from "@/components/PageFooter";

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function KoreanBirthdaySessionPage({ params }: PageProps) {
  const { sessionId } = await params;

  return (
    <>
      <LanguageSwitcher locale="ko" />
      <CelebrationPageContent sessionId={sessionId} locale="ko" />
      <PageFooter locale="ko" />
    </>
  );
}
