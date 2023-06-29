import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';

export default function Nav() {
  const user = useUser(); // This gives us the current user logged in
  console.log('User in Nav ==', user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
