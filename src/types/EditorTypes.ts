export interface EditorControls {
  setLanguage: (language: string) => void;
  setCardPadding: (padding: string) => void;
  exportCard: (format: 'png' | 'svg' | 'url') => void;
  cardPadding: string;
}