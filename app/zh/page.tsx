import Form from "@/components/Form";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ChineseHomePage() {
  return (
    <>
      <LanguageSwitcher locale="zh" />
      <Form locale="zh" />
      <PageFooter locale="zh" />
    </>
  );
}
