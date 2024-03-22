import Doctor from "@/models/doctor";
import Patient from "@/models/patient";

declare module "next-auth" {
  interface Session {
    user: (Doctor | Patient);
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: (Doctor | Patient);
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}
