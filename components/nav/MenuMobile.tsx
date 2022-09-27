import s from './MenuMobile.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useScrollInfo from '/lib/hooks/useScrollInfo'
import useStore from '/lib/store'
import Link from 'next/link'
import Arrow from '/public/images/arrow.svg'
import { usePage } from '/lib/context/page'

export type MenuMobileProps = { menu: MenuRecord[], banner?:boolean, contact: ContactRecord }

export default function MenuMobile({ menu, contact, banner = false }: MenuMobileProps) {

  const router = useRouter()
  const page = usePage()
  
  const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition, viewportHeight} = useScrollInfo()
  const [showMenuMobile] = useStore((state) => [state.showMenuMobile])
  const [selected, setSelected] = useState<string | undefined>()
  const [coords, setCoords] = useState<any>({left:0, top:0})
  const [inverted, setInverted] = useState<boolean>(page.menu === 'inverted')

  useEffect(() => { // Toggle menu bar on scroll
    //setShowMenu((isScrolledUp && !isPageBottom) || isPageTop)
    setSelected(undefined)
  }, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setSelected]);

  useEffect(()=>{
    const banner = document.getElementById('banner')
    setInverted(page.menu === 'inverted' && (!banner || scrolledPosition < banner.clientHeight))
  }, [scrolledPosition, viewportHeight, page])
  
  return (
    <>
      <nav className={cn(s.menu, showMenuMobile && s.show, inverted && s.invert)} role="menu">
        <ul>
          {menu.map(({ id, label, page, children }, idx) => {
            return (
              <li id={id} key={idx} role="presentation">
                <span id={id} className={s.title}  role="menuitem">
                  {label} {children.length > 0 && false && <Arrow className={cn(s.arrow, id === selected && s.show)} />}
                </span>
                <ul 
                  id={`${id}-items`} 
                  key={`${id}-items`} 
                  className={cn(s.item, id === selected && s.show, inverted && s.inverted)} 
                  style={id === selected ? coords : undefined}
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
              </li>
            )
          })}
        </ul>
        <div className={s.contact}>
          <div className={s.social}>
            {contact.social.map(({name, url, icon}, key) => 
              <a key={key} href={url}>
                <img src={icon.url}/>
              </a>
            )}
          </div>
          <div className={s.phoneEmail}>
            <a href={`tel://${contact.phone}`}>{contact.phone}</a>
            <br/>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </nav>
      
    </>
  )
}