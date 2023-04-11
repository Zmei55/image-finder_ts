import React, { useState, useEffect } from 'react';
import PicturesApiService from 'services/pictures-api';
import { IError, IPicture } from 'types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { LoadButton } from 'components/Button';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { GalleryContainer } from './ImageGallery.styled';

interface IImageGalleryEl {
  searchQuery: string;
}

const picturesApiService = new PicturesApiService();

export function ImageGallery({ searchQuery }: IImageGalleryEl) {
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [largeImageURL, setLargeImageURL] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);

    picturesApiService.query = searchQuery;
    picturesApiService.resetPage();
    picturesApiService
      .fetchPictures()
      .then(pictures => setPictures(pictures))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const onLoadMore = () => {
    setLoading(true);

    picturesApiService.incrementPage();
    picturesApiService
      .fetchPictures()
      .then(pictures =>
        setPictures(prevPictures => [...prevPictures, ...pictures]),
      )
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLargeImg = (largeImageURL: string, tags: string) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const shouldRenderLoadMoreButton = pictures.length > 0 && !loading;

  return (
    <>
      {error && (
        <>
          <h1>Something went wrong!</h1>
          <p>{error.message}</p>
        </>
      )}

      {pictures && (
        <GalleryContainer>
          {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onImageClick={handleLargeImg}
            />
          ))}
        </GalleryContainer>
      )}

      {loading && <Loader />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}

      {shouldRenderLoadMoreButton && <LoadButton onClick={onLoadMore} />}
    </>
  );
}

//? class

// import { Component } from 'react';

// export class ImageGallery extends Component {
//   state = {
//     pictures: null,
//     loading: false,
//     error: null,
//     showModal: false,
//     largeImageURL: null,
//     tags: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevSearchQuery = prevProps.searchQuery;
//     const nextSearchQuery = this.props.searchQuery;

//     if (prevSearchQuery !== nextSearchQuery) {
//       this.setState({ loading: true });

//       picturesApiService.query = nextSearchQuery;
//       picturesApiService.resetPage();
//       picturesApiService
//         .fetchPictures()
//         .then(pictures => this.setState({ pictures: pictures.hits }))
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   onLoadMore = () => {
//     this.setState({ loading: true });

//     picturesApiService.incrementPage();
//     picturesApiService
//       .fetchPictures()
//       .then(pictures =>
//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...pictures.hits],
//         })),
//       )
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ loading: false }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   handleLargeImg = (largeImageURL, tags) => {
//     this.setState({
//       largeImageURL,
//       tags,
//     });
//     this.toggleModal();
//   };

//   render() {
//     const { pictures, loading, error, showModal, largeImageURL, tags } =
//       this.state;

//     return (
//       <React.Fragment>
//         {pictures && (
//           <GalleryContainer>
//             {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
//               <ImageGalleryItem
//                 key={id}
//                 tags={tags}
//                 webformatURL={webformatURL}
//                 largeImageURL={largeImageURL}
//                 onImageClick={this.handleLargeImg}
//               />
//             ))}
//           </GalleryContainer>
//         )}

//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}

//         {loading && <Loader />}

//         {pictures && !loading && <LoadButton onClick={this.onLoadMore} />}

//         {error && (
//           <React.Fragment>
//             <h1>Something went wrong!</h1>
//             <p>{error.message}</p>
//           </React.Fragment>
//         )}
//       </React.Fragment>
//     );
//   }
// }
