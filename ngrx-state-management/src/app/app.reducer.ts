import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { reduce } from "rxjs/operators";
import { environment } from "../environments/environment";

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];

export function logger(reducer: ActionReducer<any>) : ActionReducer<any> {
  return (state, action) => {
    console.log("state before reducer: ", state);
    console.log("action: ", action);

    return reduce(state, action);
  }
}
