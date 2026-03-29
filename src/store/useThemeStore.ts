import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
    isDark: boolean,
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            isDark: true,
            toggleTheme: () => {
                const newIsDark = !get().isDark;
                set({isDark: newIsDark});
                document.documentElement.classList.toggle('dark', newIsDark);
            }
        }), 
        {name: 'theme'}
    )
)