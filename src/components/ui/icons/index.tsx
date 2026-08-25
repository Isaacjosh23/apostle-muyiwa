import { IconProps, Icons } from "./_types";
import CloseIcon from "./close";
import MenuIcon from "./menu";
import NextArrow from "./next-arrow";
import PlayIcon from "./play";
import PreviousIcon from "./prev-arrow";
import WriteIcon from "./write";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case Icons.Close:
      return <CloseIcon {...props} />;

    case Icons.Menu:
      return <MenuIcon {...props} />;

    case Icons.Play:
      return <PlayIcon {...props} />;

    case Icons.PreviousArrow:
      return <PreviousIcon {...props} />;

    case Icons.NextArrow:
      return <NextArrow {...props} />;

    case Icons.Write:
      return <WriteIcon {...props} />;

    default:
      return null;
  }
}
