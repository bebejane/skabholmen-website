import styles from './Menu.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import useScrollInfo from '/lib/hooks/useScrollInfo'
import useStore from '/lib/store'
import Link from 'next/link'

export type MenuProps = { menu: GlobalQuery['menu'] }

export default function Menu({ menu }: MenuProps) {

  const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition } = useScrollInfo()
  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [selected, setSelected] = useState()

  useEffect(() => { // Toggle menu bar on scroll
    setShowMenu((isScrolledUp && !isPageBottom) || isPageTop)
  }, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setShowMenu]);

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelected(e.type === 'mouseenter' ? e.target.id : undefined)
  }

  return (
    <>
      <h3 className={styles.logo}>Skabholmen Group</h3>
      <nav className={cn(styles.menu, !showMenu && styles.hide)}>
        <ul>
          {menu.map(({ id, label, page, children }, idx) => {
            return (
              <li key={idx} onMouseLeave={handleMouseOver}>
                <span id={id} onMouseEnter={handleMouseOver} >
                  {label}
                </span>
                {children.length > 0 &&
                  <ul className={cn(id === selected && styles.show)}>
                    {children.map(({ label, page }, idx) =>
                      <li key={idx}>
                        {page?.slug ? <Link href={page?.slug}>{label}</Link> : <>{label}</>}
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