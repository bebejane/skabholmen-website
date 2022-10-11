import s from './MenuMobile.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useScrollInfo from '/lib/hooks/useScrollInfo'
import useStore from '/lib/store'
import Link from 'next/link'
import Arrow from '/public/images/arrow.svg'
import { usePage } from '/lib/context/page'

export type MenuMobileProps = { menu: MenuRecord[], banner?: boolean, contact: ContactRecord }

export default function MenuMobile({ menu, contact, banner = false }: MenuMobileProps) {

  const page = usePage()

  const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition, viewportHeight } = useScrollInfo()
  const [showMenuMobile, setShowMenuMobile, setShowContact] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile, state.setShowContact])
  const [selected, setSelected] = useState<string | undefined>()
  const [coords, setCoords] = useState<any>({ left: 0, top: 0 })
  const [inverted, setInverted] = useState<boolean>(page.menu === 'inverted')

  useEffect(() => { // Toggle menu bar on scroll
    setSelected(undefined)
  }, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setSelected]);

  useEffect(() => {
    const banner = document.getElementById('banner')
    setInverted(page.menu === 'inverted' && (!banner || scrolledPosition < banner.clientHeight))
  }, [scrolledPosition, viewportHeight, page])

  return (
    <>
      <nav className={cn(s.menu, showMenuMobile && s.show, inverted && s.invert)} role="menu">
        <ul>
          {menu.map(({ id, label, page, children }, idx) => children.map(({ label, page }, idx) =>
            <li key={idx} role="menuitem">
              {page?.slug ?
                  <Link href={page?.slug}><a>{label}</a></Link>
                :
                  <>{label}</>
              }
            </li>
          ))}
          <li onClick={()=>setShowContact(true)}>Contact</li>
        </ul>
      </nav>
    </>
  )
}