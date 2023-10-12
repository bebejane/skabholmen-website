import s from './BannerImage.module.scss'
import cn from 'classnames'
import { Image } from 'react-datocms'

type Props = {
	image: FileField,
	stripes: boolean
}

export default function BannerImage({ image, stripes = false }: Props) {

	return (
		<section id="banner" className={cn(s.bannerImage, stripes && s.top)}>
			{image?.responsiveImage &&
				<Image data={image.responsiveImage} objectFit="cover" className={s.image} />
			}
			{stripes &&
				<>
					<div className={s.stripeQuarter}></div>
					<div className={s.stripeHalf}></div>
				</>
			}
		</section>
	)
}