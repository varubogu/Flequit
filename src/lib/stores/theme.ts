import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system' | string;

interface ThemeColors {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
}

interface ThemePreset {
    name: string;
    colors: {
        light: ThemeColors;
        dark: ThemeColors;
    };
}

const defaultPresets: ThemePreset[] = [
    {
        name: 'default',
        colors: {
            light: {
                background: '0 0% 100%',
                foreground: '240 10% 3.9%',
                primary: '240 5.9% 10%',
                secondary: '240 4.8% 95.9%',
                accent: '240 4.8% 95.9%',
                muted: '240 4.8% 95.9%',
                border: '240 5.9% 90%'
            },
            dark: {
                background: '240 10% 3.9%',
                foreground: '0 0% 98%',
                primary: '0 0% 98%',
                secondary: '240 3.7% 15.9%',
                accent: '240 3.7% 15.9%',
                muted: '240 3.7% 15.9%',
                border: '240 3.7% 15.9%'
            }
        }
    },
    {
        name: 'blue',
        colors: {
            light: {
                background: '0 0% 100%',
                foreground: '222.2 84% 4.9%',
                primary: '221.2 83.2% 53.3%',
                secondary: '210 40% 96.1%',
                accent: '210 40% 96.1%',
                muted: '210 40% 96.1%',
                border: '214.3 31.8% 91.4%'
            },
            dark: {
                background: '222.2 84% 4.9%',
                foreground: '210 40% 98%',
                primary: '217.2 91.2% 59.8%',
                secondary: '217.2 32.6% 17.5%',
                accent: '217.2 32.6% 17.5%',
                muted: '217.2 32.6% 17.5%',
                border: '217.2 32.6% 17.5%'
            }
        }
    },
    {
        name: 'green',
        colors: {
            light: {
                background: '0 0% 100%',
                foreground: '240 10% 3.9%',
                primary: '142.1 76.2% 36.3%',
                secondary: '138 69% 93%',
                accent: '138 69% 93%',
                muted: '138 69% 93%',
                border: '142.1 76.2% 90%'
            },
            dark: {
                background: '240 10% 3.9%',
                foreground: '0 0% 98%',
                primary: '142.1 70.6% 45.3%',
                secondary: '142.1 76.2% 15%',
                accent: '142.1 76.2% 15%',
                muted: '142.1 76.2% 15%',
                border: '142.1 76.2% 15%'
            }
        }
    }
];

// ローカルストレージからテーマを取得
function getStoredTheme(): { theme: Theme; preset: string } {
    if (!browser) return { theme: 'system', preset: 'default' };
    return {
        theme: (localStorage.getItem('theme') as Theme) || 'system',
        preset: localStorage.getItem('theme-preset') || 'default'
    };
}

// システムのカラースキーム設定を取得
function getSystemTheme(): 'light' | 'dark' {
    if (!browser) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// テーマストアの作成
function createThemeStore() {
    const stored = getStoredTheme();
    const themeStore = writable<Theme>(stored.theme);
    const presetStore = writable<string>(stored.preset);

    // 現在のプリセットを監視
    const currentPreset = derived(presetStore, ($preset) => {
        return defaultPresets.find(p => p.name === $preset) || defaultPresets[0];
    });

    let currentPresetValue: ThemePreset;
    currentPreset.subscribe(value => {
        currentPresetValue = value;
    });

    return {
        subscribe: themeStore.subscribe,
        preset: {
            subscribe: presetStore.subscribe,
            set: (newPreset: string) => {
                if (browser) {
                    localStorage.setItem('theme-preset', newPreset);
                    presetStore.set(newPreset);
                    const currentTheme = localStorage.getItem('theme') as Theme || 'system';
                    updateTheme(currentTheme, defaultPresets.find(p => p.name === newPreset) || defaultPresets[0]);
                }
            }
        },
        presets: defaultPresets,
        setTheme: (newTheme: Theme) => {
            if (browser) {
                localStorage.setItem('theme', newTheme);
                themeStore.set(newTheme);
                updateTheme(newTheme, currentPresetValue);
            }
        },
        initialize: () => {
            if (browser) {
                const { theme: storedTheme, preset: storedPreset } = getStoredTheme();
                themeStore.set(storedTheme);
                presetStore.set(storedPreset);
                updateTheme(storedTheme, defaultPresets.find(p => p.name === storedPreset) || defaultPresets[0]);

                // システムのテーマ変更を監視
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                    const currentTheme = getStoredTheme().theme;
                    if (currentTheme === 'system') {
                        updateTheme('system', currentPresetValue);
                    }
                });
            }
        }
    };
}

// HTML要素のクラスとCSSカスタムプロパティを更新
function updateTheme(theme: Theme, preset: ThemePreset) {
    if (!browser) return;

    const root = document.documentElement;
    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
    const colors = preset.colors[effectiveTheme as 'light' | 'dark'];

    // テーマクラスの更新
    if (effectiveTheme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    // トランジションクラスの追加
    root.classList.add('transitioning');

    // カスタムプロパティの更新
    Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });

    // トランジション後にクラスを削除
    setTimeout(() => {
        root.classList.remove('transitioning');
    }, 200);
}

export const theme = createThemeStore();