import s from './Menu.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useScrollInfo from '/lib/hooks/useScrollInfo'
import useStore from '/lib/store'
import Link from 'next/link'
import Arrow from '/public/images/arrow.svg'
import Logo from '/public/images/logo.svg'
import { Turn as Hamburger } from 'hamburger-react'
import { useLayout } from '/lib/context/layout'

export type MenuProps = { menu: GlobalQuery['menu'] }

export default function Menu({ menu, inverted = false }: MenuProps) {

  const router = useRouter()
  const layout = useLayout()

  const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition } = useScrollInfo()
  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [selected, setSelected] = useState<string | undefined>()
  const isInverted = layout.menu === 'inverted'

  useEffect(() => { // Toggle menu bar on scroll
    setShowMenu((isScrolledUp && !isPageBottom) || isPageTop)
  }, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setShowMenu]);

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelected(e.type === 'mouseenter' ? e.currentTarget.id : undefined)
  }

  useEffect(()=>{
    setSelected(undefined)
  }, [router.asPath, setSelected])
  
  return (
    <>
      <Link href="/">
        <a className={cn(s.logo, isInverted && s.invert)}><Logo /></a>
      </Link>
      <div className={s.hamburger}>
        <Hamburger size={24} color={isInverted ? '#fff' : '#000'}/>
      </div>
      <nav className={cn(s.menu, !showMenu && s.hide, isInverted && s.invert)} role="menu">
        <ul>
          {menu.map(({ id, label, page, children }, idx) => {
            return (
              <li key={idx} onMouseLeave={handleMouseOver} role="presentation">
                <span id={id} className={s.title} onMouseEnter={handleMouseOver} role="menuitem">
                  {label} {children.length > 0 && <Arrow className={cn(s.arrow, id === selected && s.show)} />}
                </span>
                {children.length > 0 &&
                  <ul className={cn(id === selected && s.show)}>
                    {children.map(({ label, page }, idx) =>
                      <li key={idx} role="menuitem">
                        {page?.slug ?
                          <Link href={page?.slug}>{label}</Link>
                          :
                          <>{label}</>
                        }
                      </li>
                    )}
                  </ul>
                }
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}