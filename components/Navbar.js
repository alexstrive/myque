import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Collapse,
  NavbarToggler,
} from 'shards-react'
import { signIn, signOut, useSession } from 'next-auth/client'

const CustomNavbar = () => {
  const router = useRouter()
  const { pathname } = router
  const [session, loading] = useSession()
  const [isOpen, setIsOpen] = useState()

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Navbar type="dark" theme="primary" expand="md">
      <Link href="/questions" passHref>
        <NavbarBrand>MyQ</NavbarBrand>
      </Link>
      <NavbarToggler onClick={toggle} />

      <Collapse open={isOpen} navbar>
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
            <>
              <NavItem>
                <Link href="/api/auth/signin" passHref>
                  <NavLink>Войти</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/signup" passHref>
                  <NavLink>Регистрация</NavLink>
                </Link>
              </NavItem>
            </>
          )}
          {session && (
            <NavItem>
              <Link href="/api/auth/signout" passHref>
                <NavLink>Выйти</NavLink>
              </Link>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default CustomNavbar
