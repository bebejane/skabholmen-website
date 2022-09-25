import s from './Navbar.module.scss'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useScrollInfo from '/lib/hooks/useScrollInfo'
import useStore from '/lib/store'
import Link from 'next/link'
import Skabholmen from '/public/images/skabholmen.svg'
import Invest from '/public/images/invest.svg'
import { Turn as Hamburger } from 'hamburger-react'
import { usePage } from '/lib/context/page'

type NavbarProps = {

}

export default function Navbar({ }: NavbarProps) {

  const page = usePage()
  const router = useRouter()
  
  const { scrolledPosition, viewportHeight} = useScrollInfo()
  const [showMenuMobile, setShowMenuMobile] = useStore((state) => [state.showMenuMobile, state.setShowMenuMobile])  
  const [inverted, setInverted] = useState<boolean>(page.menu === 'inverted')
  
  useEffect(()=>{
    const banner = document.getElementById('banner')
    const inverted = page.menu === 'inverted' && (!banner || scrolledPosition < banner.clientHeight)
    setInverted(inverted && !showMenuMobile)
  }, [scrolledPosition, viewportHeight, page, showMenuMobile])

  useEffect(()=>{
    setShowMenuMobile(false)
  }, [router.asPath, setShowMenuMobile])
  
  return (
    <>
      <div className={cn(s.navbar, page.layout === 'full' && s.transparent)}>
        <Logo inverted={inverted}/>
        <div className={s.hamburger}>
          <Hamburger 
            size={24} 
            color={inverted ? '#fff' : '#000'} 
            toggled={showMenuMobile} 
            onToggle={setShowMenuMobile}
          />
        </div>
      </div>
     
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