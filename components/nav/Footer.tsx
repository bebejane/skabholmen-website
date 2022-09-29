import s from './Footer.module.scss'
import cn from 'classnames'
import { usePage } from '/lib/context/page'
import Markdown from '/lib/dato/components/Markdown'
import Up from '/public/images/up.svg'
import Link from 'next/link'

export type FooterProps = {
  contact: GlobalQuery['contact'],
  menu: GlobalQuery['menu']
}

export default function Footer({contact: { phone, email, address, social }, menu} : FooterProps){
  
  const { footerSeparator } = usePage()
  
	return (
		<footer className={cn(s.footer, footerSeparator && s.separator)}>
			<div className={s.wrap}>
        <div className={s.top}>
          <Markdown className={s.address}>
            {address}
          </Markdown>
          <ul className={s.menu}>
          {menu.map(({children}, idx) => 
            children.map(({label, page}, idx) => 
              page ? 
                <Link key={idx} href={page?.slug}>
                  <a><li>{label}</li></a>
                </Link>
              :
                <><li>{label}</li></>
            )
          )}
          </ul>
          <ul className={s.social}>
            {social.map(({name, url}, idx) => 
              <li key={idx}>
                <a href={url}>{name}</a>
              </li> 
            )}
          </ul>
        </div>
        
        <div className={s.bottom}>
          <div className={s.phone}><a href={`tel://${phone}`}>{phone}</a></div>
          <div className={s.email}><a href={`mailto:${email}`}>{email}</a></div>
          <div className={s.copyright}>© 2022 Skabholmen Invest. All rights reserved.</div>
        </div>
      </div>
      <div className={s.up} onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}><Up/></div>
		</footer>
	)
}