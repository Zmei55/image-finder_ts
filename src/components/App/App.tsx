import React, { useState } from 'react';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFormSubmit = (searchQuery: string) => {
    setSearchQuery(searchQuery);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />
    </Container>
  );
};

//? class

// import React, { Component } from 'react';

// export class App extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   render() {
//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery searchQuery={this.state.searchQuery} />
//       </Container>
//     );
//   }
// }
