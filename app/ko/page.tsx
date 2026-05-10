import Form from "@/components/Form";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function KoreanHomePage() {
  return (
    <>
      <LanguageSwitcher locale="ko" />
      <Form locale="ko" />
      <PageFooter locale="ko" />
    </>
  );
}
