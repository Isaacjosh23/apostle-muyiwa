import { IconProps, Icons } from "./_types";
import CloseIcon from "./close";
import MenuIcon from "./menu";

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

    default:
      return null;
  }
}
