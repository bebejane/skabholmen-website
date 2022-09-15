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

export default function Menu({ menu }: MenuProps) {

  const router = useRouter()
  const layout = useLayout()
  
  const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition } = useScrollInfo()
  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [selected, setSelected] = useState<string | undefined>()
  const [coords, setCoords] = useState<any>({left:0, top:0})
  const isInverted = layout.menu === 'inverted'

  useEffect(() => { // Toggle menu bar on scroll
    setShowMenu((isScrolledUp && !isPageBottom) || isPageTop)
  }, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setShowMenu]);

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {

    const el = document.getElementById(e.currentTarget.id)
    const items = document.getElementById(`${e.currentTarget.id}-items`)
    const bounds = el.getBoundingClientRect();
    const boundsItems = items.getBoundingClientRect();
    const top = bounds.top- bounds.height;
    const left = Math.min(document.body.clientWidth - boundsItems.width, bounds.left + (bounds.width / 2 )) - (boundsItems.width /2);
    
    setCoords({left, top})
    setSelected(e.type === 'mouseenter' ? e.currentTarget.id : undefined)
  }

  useEffect(()=>{ setSelected(undefined) }, [router.asPath, setSelected])
  
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
              <li id={id} key={idx} onMouseLeave={handleMouseOver} role="presentation">
                <span id={id} className={s.title} onMouseEnter={handleMouseOver} role="menuitem">
                  {label} {children.length > 0 && <Arrow className={cn(s.arrow, id === selected && s.show)} />}
                </span>
              </li>
            )
          })}
        </ul>
      </nav>
      {menu.map(({ id, label, page, children }, idx) => {
        return(
          <ul 
            id={`${id}-items`} 
            key={`${id}-items`} 
            onMouseEnter={(e)=>setSelected(id)} 
            onMouseLeave={(e)=>setSelected(undefined)} 
            className={cn(s.item, id === selected && s.show, isInverted && s.inverted)} 
            style={coords}
          >
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
        )})
      }
    </>
  )
}