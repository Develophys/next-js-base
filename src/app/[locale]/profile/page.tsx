import { getScopedI18n } from "@/../locales/server";

export default async function ProfilePage() {
  const scopedP = await getScopedI18n("profile");

  return <h1>{scopedP("title")}</h1>;
}
