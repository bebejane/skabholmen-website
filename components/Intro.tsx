import s from './Intro.module.scss'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components';

type Props = {
  title:string,
  intro:string
}

export default function Intro({ title, intro} : Props){
  
  return (
		<section className={s.intro}>
      <h1>{title}</h1>
      <hr/>
      {intro && <Markdown>{intro}</Markdown>}
    </section>	
	)
}
