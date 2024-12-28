import type { UrlState } from "$src/types/state/url-state";

export const urlState = $state<UrlState>({
    daily: null,
    project: null,
    taskList: null,
});

export function updateUrlState(state: UrlState) {
    if (urlState.daily !== state.daily) {
        urlState.daily = state.daily;
    }
    if (urlState.project !== state.project) {
        urlState.project = state.project;
    }
    if (urlState.taskList !== state.taskList) {
        urlState.taskList = state.taskList;
    }
}
