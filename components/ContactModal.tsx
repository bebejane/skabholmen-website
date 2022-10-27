import s from './ContactModal.module.scss'
import cn from 'classnames'
import { Modal } from '/components'
import { useKey } from 'rooks'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';
import Close from '/public/images/close.svg'

type ContactProps = {
  contact: ContactRecord,
  show:boolean,
  onClose: () => void
}

export default function ContactModal({ contact, show, onClose }: ContactProps) {

  useKey(["Escape"], ()=> show && onClose());

  return(
    <Modal>
      <div className={cn(s.contact, show && s.show)}>
        <p>
          <h3>Have a question?</h3>
          {contact.phone ? 
            <>
              Give us a call at
              <br/>
              <a href={`tel://${contact.phone}`}>{contact.phone}</a>
              <br/>
              or send an email to
              <br/>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          :
            <>
              Send us an email at
              <br/>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          }
        </p>
        <p>
          <h3>Office Address</h3>
          <Markdown>{contact.address}</Markdown>
        </p>
        <div className={s.close} onClick={onClose}><Close/></div>
      </div> 
    </Modal>
  )
}
