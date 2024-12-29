// ナビゲーション関数
import { page } from "$app/state";
import { goto } from "$app/navigation";
export function updateSearchParams(updates: { [key: string]: string | null }) {
    const searchParams = new URLSearchParams(page.url.searchParams);
    Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }
    });
    goto(`?${searchParams.toString()}`);
}