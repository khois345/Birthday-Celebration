import Form from "@/components/Form";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ThaiHomePage() {
  return (
    <>
      <LanguageSwitcher locale="th" />
      <Form locale="th" />
      <PageFooter locale="th" />
    </>
  );
}
