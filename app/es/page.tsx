import Form from "@/components/Form";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SpanishHomePage() {
  return (
    <>
      <LanguageSwitcher locale="es" />
      <Form locale="es" />
      <PageFooter locale="es" />
    </>
  );
}
