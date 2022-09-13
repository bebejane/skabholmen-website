import s from './Footer.module.scss'
import Markdown from '/lib/dato/components/Markdown'

export type FooterProps = {
  about: GlobalQuery['about'],
  menu: GlobalQuery['menu']
}

export default function Footer({about: { phone, email, address, social }, menu} : FooterProps){
  
	return (
		<footer className={s.footer}>
			<div className={s.wrap}>
        <div className={s.top}>
          <Markdown className={s.address}>{address}</Markdown>
          <ul className={s.menu}>
            {menu.map(({label}, idx) => 
              <li key={idx}>{label}</li>
            )}
          </ul>
          <ul className={s.social}>
            {social.map(({name, url}, idx) => 
              <li key={idx}>{name}</li> 
            )}
          </ul>
        </div>
        <div className={s.bottom}>
          <div className={s.phone}>{phone}</div>
          <div className={s.email}>{email}</div>
          <div className={s.copyright}>© 2022 Skabholmen Invest. All rights reserved.</div>
        </div>
      </div>
		</footer>
	)
}