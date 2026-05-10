import Form from "@/components/Form";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function JapaneseHomePage() {
  return (
    <>
      <LanguageSwitcher locale="ja" />
      <Form locale="ja" />
      <PageFooter locale="ja" />
    </>
  );
}
