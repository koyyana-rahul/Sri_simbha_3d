import { headerNavigationItems } from "../../../config/navigation.config";
import NavItem from "../NavItem/NavItem";

/**
 * Primary (desktop) navigation.
 *
 * Rendered as a semantic `<nav>` + `<ul>` so assistive technology can jump
 * straight to it, and driven entirely by `navigation.config.js`.
 */
const Navbar = ({ onNavigate, className = "" }) => (
  <nav aria-label="Primary" className={className}>
    <ul className="flex items-center justify-center space-x-6 xl:space-x-8 font-medium text-sm lg:text-[15px] whitespace-nowrap">
      {headerNavigationItems.map((item) => (
        <li key={item.id} className="relative">
          <NavItem to={item.path} label={item.label} onClick={onNavigate} />
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
