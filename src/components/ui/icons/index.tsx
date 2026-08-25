import { IconProps, Icons } from "./_types";
import CheckMarkIcon from "./checkmark";
import CloseIcon from "./close";
import EmailIcon from "./email";
import MenuIcon from "./menu";
import NextArrow from "./next-arrow";
import PlayIcon from "./play";
import PreviousIcon from "./prev-arrow";
import RightArrowIcon from "./right-arrow";
import WriteIcon from "./write";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case Icons.CheckMark:
      return <CheckMarkIcon {...props} />;

    case Icons.Close:
      return <CloseIcon {...props} />;

    case Icons.Email:
      return <EmailIcon {...props} />;

    case Icons.Menu:
      return <MenuIcon {...props} />;

    case Icons.Play:
      return <PlayIcon {...props} />;

    case Icons.PreviousArrow:
      return <PreviousIcon {...props} />;

    case Icons.NextArrow:
      return <NextArrow {...props} />;

    case Icons.RightArrow:
      return <RightArrowIcon {...props} />;

    case Icons.Write:
      return <WriteIcon {...props} />;

    default:
      return null;
  }
}
