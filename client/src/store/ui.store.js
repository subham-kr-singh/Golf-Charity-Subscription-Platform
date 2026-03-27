import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: typeof window !== 'undefined' && window.innerWidth >= 1024,
  activeModal: null,
  modalData: null,
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (name, data = null) => set({ activeModal: name, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null })
}));
