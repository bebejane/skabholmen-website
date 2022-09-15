import s from './Intro.module.scss'
import Markdown from '/lib/dato/components/Markdown'

type Props = {
  title:string,
  intro:string
}

export default function Intro({ title, intro} : Props){

	return (
		<section className={s.intro}>
      <h1>{title}</h1>
      <hr/>
      <Markdown>{intro}</Markdown>
    </section>	
	)
}
