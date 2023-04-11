import { Button } from './Button.styled';

interface ILoadButtonEl {
  onClick(): void;
}

export function LoadButton({ onClick }: ILoadButtonEl) {
  return (
    <Button type="button" onClick={onClick}>
      Load more
    </Button>
  );
}
