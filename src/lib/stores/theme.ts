import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

// ローカルストレージからテーマを取得
function getStoredTheme(): Theme {
    if (!browser) return 'system';
    return (localStorage.getItem('theme') as Theme) || 'system';
}

// システムのカラースキーム設定を取得
function getSystemTheme(): 'light' | 'dark' {
    if (!browser) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// テーマストアの作成
function createThemeStore() {
    const { subscribe, set } = writable<Theme>(getStoredTheme());

    return {
        subscribe,
        setTheme: (newTheme: Theme) => {
            if (browser) {
                localStorage.setItem('theme', newTheme);
                set(newTheme);
                updateTheme(newTheme);
            }
        },
        initialize: () => {
            if (browser) {
                const storedTheme = getStoredTheme();
                set(storedTheme);
                updateTheme(storedTheme);

                // システムのテーマ変更を監視
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                    const currentTheme = getStoredTheme();
                    if (currentTheme === 'system') {
                        updateTheme('system');
                    }
                });
            }
        }
    };
}

// HTML要素のクラスを更新
function updateTheme(theme: Theme) {
    if (!browser) return;

    const root = document.documentElement;
    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;

    if (effectiveTheme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

export const theme = createThemeStore();