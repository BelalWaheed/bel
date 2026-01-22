import { createSlice } from "@reduxjs/toolkit";

export type Language = "ar" | "en";

interface LanguageState {
  language: Language;
}

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("language");
    if (stored === "en" || stored === "ar") {
      return stored;
    }
  }
  return "ar"; // Default to Arabic
};

const initialState: LanguageState = {
  language: getInitialLanguage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "ar" ? "en" : "ar";
      if (typeof window !== "undefined") {
        localStorage.setItem("language", state.language);
        // Update document direction
        document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = state.language;
      }
    },
    setLanguage: (state, action: { payload: Language }) => {
      state.language = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("language", state.language);
        document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = state.language;
      }
    },
    initializeLanguage: (state) => {
      // Apply language settings on mount
      if (typeof window !== "undefined") {
        document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = state.language;
      }
    },
  },
});

export const { toggleLanguage, setLanguage, initializeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
