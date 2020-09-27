import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'shards-react'
import { signIn, signOut, useSession } from 'next-auth/client'

const CustomNavbar = () => {
  const router = useRouter()
  const { pathname } = router
  const [session, loading] = useSession()

  return (
    <Navbar type="dark" theme="primary" expand="md">
      <Link href="/questions" passHref>
        <NavbarBrand>MyQ</NavbarBrand>
      </Link>
      <Nav navbar>
        <NavItem>
          <Link href="/questions" passHref>
            <NavLink active={pathname === '/questions'}>Вопросы</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/categories" passHref>
            <NavLink active={pathname === '/categories'}>Категории</NavLink>
          </Link>
        </NavItem>
        {session && (
          <NavItem>
            <Link href="/ask" passHref>
              <NavLink active={pathname === '/ask'}>Спросить</NavLink>
            </Link>
          </NavItem>
        )}
      </Nav>
      <Nav navbar className="ml-auto">
        {!session && (
          <NavItem>
            <Button onClick={signIn}>Войти / Регистрация</Button>
          </NavItem>
        )}
        {session && (
          <NavItem>
            <Button onClick={signOut}>Выйти</Button>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  )
}

export default CustomNavbar
