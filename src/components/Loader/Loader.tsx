import { ThreeDots } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export function Loader() {
  return (
    <ThreeDots
      height="40"
      width="90"
      radius="9"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      wrapperClass=""
      visible={true}
    />
  );
}
