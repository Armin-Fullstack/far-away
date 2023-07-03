export interface PackingItemProps {
  packObj: {
    id: string;
    description: string;
    quantity: number;
    packed: boolean;
  };
  onDeletePack: (id: string) => void;
  onTogglePack: (id: string) => void;
}
export interface Pack {
  description: string;
  quantity: number;
  packed: boolean;
  id: string;
}
export interface FormProps {
  onAddPack: (packItem: Pack) => void;
}
export interface PackingListsProps {
  pack: Pack[];
  onDeletePack: (id: string) => void;
  onTogglePack: (id: string) => void;
  onClearList: () => void;
}