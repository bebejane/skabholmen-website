import s from './Menu.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useScrollInfo from '/lib/hooks/useScrollInfo'
import useStore from '/lib/store'
import Link from 'next/link'
import Arrow from '/public/images/arrow.svg'
import Skabholmen from '/public/images/skabholmen.svg'
import Invest from '/public/images/invest.svg'
import { usePage } from '/lib/context/page'
import { ContactModal } from '/components'
import Markdown from '/lib/dato/components/Markdown'

export type MenuProps = { menu: MenuRecord[], banner?:boolean, contact: ContactRecord }

export default function Menu({ menu, banner = false, contact }: MenuProps) {

  const router = useRouter()
  const page = usePage()
  
  const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition, viewportHeight} = useScrollInfo()
  const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
  const [selected, setSelected] = useState<string | undefined>()
  const [showContact, setShowContact] = useStore((state) => [state.showContact, state.setShowContact])
  const [coords, setCoords] = useState<any>({left:0, top:0})
  const [inverted, setInverted] = useState<boolean>(page.menu === 'inverted')

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {

    const el = document.getElementById(e.currentTarget.id)
    const items = document.getElementById(`${e.currentTarget.id}-items`)
    const bounds = el.getBoundingClientRect();
    const boundsItems = items.getBoundingClientRect();
    const top = bounds.top - bounds.height + window.scrollY;
    const left = Math.min(document.body.clientWidth - boundsItems.width, bounds.left + (bounds.width / 2 )) - (boundsItems.width /2);
    
    setCoords({left, top})
    setSelected(e.type === 'mouseenter' ? e.currentTarget.id : undefined)
  }

  useEffect(() => { // Toggle menu bar on scroll
    setShowMenu(!showContact && ((isScrolledUp && !isPageBottom) || isPageTop))
    setSelected(undefined)
  }, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setShowMenu, setSelected, showContact]);

  useEffect(()=>{ 
    setSelected(undefined) 
  }, [router.asPath, setSelected])
  
  useEffect(()=>{
    const banner = document.getElementById('banner')
    setInverted(page.menu === 'inverted' && (!banner || scrolledPosition < banner.clientHeight))
  }, [scrolledPosition, viewportHeight, page])

  useEffect(()=>{
    setShowMenu(!showContact)
  }, [showContact, setShowMenu])

  return (
    <>
      <nav className={cn(s.menu, !showMenu && s.hide, inverted && s.invert)} role="menu">
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
          <li role="menuitem" onClick={()=>setShowContact(true)}>
            <span className={s.title}>Contact</span>
          </li>
        </ul>
      </nav>
      {menu.map(({ id, label, page, children }, idx) => {
        return(
          <ul 
            id={`${id}-items`} 
            key={`${id}-items`} 
            onMouseEnter={(e)=>setSelected(id)} 
            onMouseLeave={(e)=>setSelected(undefined)} 
            className={cn(s.item, id === selected && s.show, inverted && s.inverted)} 
            style={id === selected ? coords : undefined}
          >
            {children.map(({ label, page }, idx) =>
              <li key={idx} role="menuitem">
                {page?.slug ?
                  <Link href={page?.slug}>
                    <a className={cn(`/${page?.slug}` === router.asPath && s.selected)}>
                      {label}
                    </a>
                  </Link>
                :
                  <>{label}</>
                }
              </li>
            )}
            
          </ul>
        )})
      }
      <ContactModal 
        contact={contact} 
        show={showContact} 
        onClose={()=> setShowContact(false)}
      />
    </>
  )
}


const Logo = ({inverted}) =>{

  return(
    <Link href="/">
      <a className={cn(s.logo, inverted && s.invert)}>
        <Skabholmen width={113} height={15}/><Invest width={52} height={15}/>
      </a>
    </Link>
  )
}