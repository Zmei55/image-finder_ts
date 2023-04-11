export interface IGalleryItem {
  tags: string;
  webformatURL: string;
  largeImageURL: string;
  onImageClick(largeImageURL: string, tags: string): void;
}
