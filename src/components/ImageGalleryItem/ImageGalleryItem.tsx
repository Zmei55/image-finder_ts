import { IGalleryItem } from 'types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
  onImageClick,
}: IGalleryItem) {
  return (
    <GalleryItem>
      <Img
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick(largeImageURL, tags)}
      />
    </GalleryItem>
  );
}
