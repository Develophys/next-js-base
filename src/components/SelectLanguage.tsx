"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeLocale, useCurrentLocale } from "@/../locales/client";

export default function SelectLanguage() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const handleLanguageSelect = (language: "pt" | "en" | "es") => {
    changeLocale(language);
  };

  return (
    <Select onValueChange={handleLanguageSelect} value={locale}>
      <SelectTrigger className="w-26 ">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="pt">Português (Brasil)</SelectItem>
          <SelectItem value="es">Espanhol</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
