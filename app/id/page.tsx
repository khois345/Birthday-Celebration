import Form from "@/components/Form";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function IndonesianHomePage() {
  return (
    <>
      <LanguageSwitcher locale="id" />
      <Form locale="id" />
      <PageFooter locale="id" />
    </>
  );
}
