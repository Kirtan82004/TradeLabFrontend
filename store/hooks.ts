import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./store"

// Typed dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch

// Typed selector hook (optional, but useful)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
