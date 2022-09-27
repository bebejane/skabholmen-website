import s from './ContactModal.module.scss'
import cn from 'classnames'
import { Modal } from '/components'
import Markdown from '/lib/dato/components/Markdown'
import Logo from '/public/images/logo.svg'

type ContactProps = {
  contact: ContactRecord,
  show:boolean,
  onClose: () => void
}

export default function ContactModal({ contact, show, onClose }: ContactProps) {

  
  return(
    <Modal>
      <div className={cn(s.contact, show && s.show)}>
        <p>
          <h3>Have a question?</h3>
          Give us a call at <a href={`tel://${contact.phone}`}>{contact.phone}</a> or send an email to <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
        <p>
          <h3>Find us on the map</h3>
          <Markdown>{contact.address}</Markdown>
        </p>
        <div className={s.close} onClick={onClose}>close</div>
        <div className={s.footer}>
          <div className={s.logo}>
            <Logo/>
          </div>
          <div className={s.links}>
            {contact.social.map(({name, url, icon}, key) => 
              <a key={key} href={url}>
                <img src={icon.url}/>
              </a>
            )}
          </div>
        </div>
        
      </div> 
    </Modal>
  )
}
