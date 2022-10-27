import s from './Footer.module.scss'
import cn from 'classnames'
import { usePage } from '/lib/context/page'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import Up from '/public/images/up.svg'
import Link from 'next/link'
import  useStore  from '/lib/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export type FooterProps = {
  contact: GlobalQuery['contact'],
  menu: GlobalQuery['menuFooter']
}

export default function Footer({contact: { phone, email, address }, menu} : FooterProps){
  
  const router = useRouter()
  const [isHome, setIsHome] = useState(false)
  const { footerSeparator } = usePage()
  const [setShowContact] = useStore((state) => [state.setShowContact])
  
  useEffect(()=>{ setIsHome(router.asPath === '/') }, [router, setIsHome])
  
  return (
		<footer className={cn(s.footer, isHome ? s.noseparator : footerSeparator ?  s.separator : null  )}>
			<div className={s.wrap}>
        <div className={s.top}>
          <Markdown className={s.address}>
            {address}
          </Markdown>
          <ul className={s.menu}>
            {menu.map(({label, page}, idx) => 
              <Link key={idx} href={`/${page.slug}`}>
                <a><li>{label}</li></a>
              </Link>
            )}
            <li onClick={()=> setShowContact(true)}>Contact</li>
          </ul>
        </div>
        
        <div className={s.bottom}>
          {phone && 
            <div className={s.phone}><a href={`tel://${phone}`}>{phone}</a></div>
          }
          <div className={s.email}><a href={`mailto:${email}`}>{email}</a></div>
          <div className={s.copyright}>© 2022 Skabholmen Invest. All rights reserved.</div>
        </div>
      </div>
      <div className={s.up} onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}>
        <Up/>
      </div>
		</footer>
	)
}