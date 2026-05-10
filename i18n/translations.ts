export type Locale = "en" | "vi";

export const localePacks = {
  en: {
    form: {
      title: "Enter the details of the birthday person",
      nameLabel: "Enter name",
      ageLabel: "Enter age",
      regardLabel: "Enter birthday regard (optional)",
      regardPlaceholder: "Max 100 characters",
      submit: "Submit",
      saving: "Saving...",
      validationAge: "Please enter a valid age",
      validationName: "Please enter a name",
      rateLimit: "You have reached the daily session limit (5 requests). Please try again tomorrow.",
      saveError: "Could not save birthday celebration",
      defaultRegard: "Wish you a wonderful birthday!",
    },
    celebration: {
      happyBirthday: "Happy Birthday!",
      sessionMissing: "Session not found or has expired. Please check the link or create a new session.",
    },
    actions: {
      shareLabel: "Share this celebration:",
      copy: "Copy",
      copied: "URL copied to clipboard!",
      switchColor: "Switch Color",
      backToHome: "Back to home",
    },
    cake: {
      blowCandles: "Click to Blow Candles",
      microphoneDenied: "Please allow microphone access for the full experience",
    },
    footer: {
      rights: "All rights reserved.",
      aboutTitle: "About this website:",
      builtWith: "built with Next.js, TypeScript, Tailwind CSS, SASS, and Framer Motion.",
      hostedBy: "Hosted by Vercel.",
      feedback: "Having feedback? Please visit",
    },
    language: {
      english: "English",
      vietnamese: "Tiếng Việt",
    },
  },
  vi: {
    form: {
      title: "Vui lòng nhập thông tin của người được chúc",
      nameLabel: "Nhập tên",
      ageLabel: "Nhập tuổi",
      regardLabel: "Nhập lời chúc sinh nhật (không bắt buộc)",
      regardPlaceholder: "Tối đa 100 ký tự",
      submit: "Xác nhận",
      saving: "Đang lưu...",
      validationAge: "Vui lòng nhập tuổi hợp lệ",
      validationName: "Vui lòng nhập tên",
      rateLimit: "Bạn đã đạt giới hạn tạo phiên trong ngày (5 lượt). Vui lòng thử lại vào ngày mai.",
      saveError: "Không thể lưu buổi chúc mừng sinh nhật",
      defaultRegard: "Chúc bạn có một ngày sinh nhật tuyệt vời!",
    },
    celebration: {
      happyBirthday: "Chúc mừng sinh nhật!",
      sessionMissing: "Không tìm thấy phiên hoặc phiên đã hết hạn. Vui lòng kiểm tra liên kết hoặc tạo phiên mới.",
    },
    actions: {
      shareLabel: "Chia sẻ buổi chúc mừng này:",
      copy: "Sao chép",
      copied: "Đã sao chép liên kết!",
      switchColor: "Đổi màu",
      backToHome: "Quay về trang chủ",
    },
    cake: {
      blowCandles: "Bấm để thổi nến",
      microphoneDenied: "Vui lòng cấp quyền microphone để có trải nghiệm đầy đủ",
    },
    footer: {
      rights: "All rights reserved.",
      aboutTitle: "Về trang web này:",
      builtWith: "xây dựng bằng Next.js, TypeScript, Tailwind CSS, SASS và Framer Motion.",
      hostedBy: "Được hosting bởi Vercel.",
      feedback: "Bạn có góp ý? Vui lòng truy cập",
    },
    language: {
      english: "English",
      vietnamese: "Tiếng Việt",
    },
  },
} as const;

export function getTranslations(locale: Locale) {
  return localePacks[locale];
}

export function getLocalePrefix(pathname: string): "" | "/en" | "/vi" {
  if (pathname === "/vi" || pathname.startsWith("/vi/")) {
    return "/vi";
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "/en";
  }

  return "";
}
