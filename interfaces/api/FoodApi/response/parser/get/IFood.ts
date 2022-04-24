export default interface IFood {
  category: string
  categoryLabel: string
  foodContentsLabel?: string
  foodId: string
  image?: string
  label: string
  nutrients: {
    CHOCDF: number
    ENERC_KCAL: number
    FAT: number
    FIBTG: number
    PROCNT: number
  }
  uri: string
}
