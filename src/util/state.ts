import create from 'zustand'

type Modifiers = {
  setOpen: (open: boolean) => void
  setIds: (matchId: string, stageId: string) => void
}

type State = {
  open: boolean
  matchId: string
  stageId: string
  modifiers: Modifiers
}

export const useMatchModalStore = create<State>((set) => ({
  open: false,
  matchId: '',
  stageId: '',
  modifiers: {
    setOpen: (open) => set({ open }),
    setIds: (matchId, stageId) => set({ matchId, stageId }),
  },
}))

export const useMatchModalModifiers = () =>
  useMatchModalStore((store) => store.modifiers)
