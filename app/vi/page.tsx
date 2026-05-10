import Form from "@/components/Form";
import PageFooter from "@/components/PageFooter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function VietnameseHomePage() {
  return (
    <>
      <LanguageSwitcher locale="vi" />
      <Form locale="vi" />
      <PageFooter locale="vi" />
    </>
  );
}
