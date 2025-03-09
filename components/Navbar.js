import Link from "next/link";
import Image from "next/image"; // Import Image component
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa"; 
import styles from "../styles/Navbar.module.css"; 

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/">Collection</Link></li>
      </ul>
      <div className={styles.icons}>
        <FaSearch className={styles.icon} title="Search" />
        <Link href="/signup"><FaUser className={styles.icon} title="Signup" /></Link>
        <Link href="/wishlist"><FaHeart className={styles.icon} title="Wishlist" /></Link>
        <Link href="/cart"><FaShoppingCart className={styles.icon} title="Cart" /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
