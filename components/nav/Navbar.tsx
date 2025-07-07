import s from './Navbar.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useScrollInfo } from 'dato-nextjs-utils/hooks';
import useStore from '/lib/store';
import Link from 'next/link';
import Skabholmen from '/public/images/logo.svg';

import { Fade as Hamburger } from 'hamburger-react';
import { usePage } from '/lib/context/page';
import { is } from 'date-fns/locale';
import { set } from 'date-fns';

type NavbarProps = {};

export default function Navbar({}: NavbarProps) {
	const page = usePage();
	const router = useRouter();

	const { scrolledPosition, viewportHeight } = useScrollInfo();
	const [showMenuMobile, setShowMenuMobile, showContact, setShowContact, invertedMenu, setInvertedMenu] = useStore(
		(state) => [
			state.showMenuMobile,
			state.setShowMenuMobile,
			state.showContact,
			state.setShowContact,
			state.invertedMenu,
			state.setInvertedMenu,
		]
	);

	useEffect(() => {
		if (showMenuMobile || showContact) return setInvertedMenu(true);

		const banner = document.getElementById('banner')?.getBoundingClientRect();
		const logo = document.getElementById('logo')?.getBoundingClientRect();

		if (!banner) return setInvertedMenu(false);
		if (!logo) return;

		const { scrollY } = window;
		const isOverlayed =
			scrolledPosition >= banner?.y + scrollY - logo.bottom &&
			scrolledPosition <= banner?.y + banner?.height - logo.bottom + scrollY;

		setInvertedMenu(isOverlayed);
	}, [scrolledPosition, viewportHeight, page, showMenuMobile, showContact, setInvertedMenu]);

	useEffect(() => {
		setShowMenuMobile(false);
		setInvertedMenu(page.menu === 'inverted');
	}, [router.asPath, setShowMenuMobile, page, setInvertedMenu, showContact]);

	return (
		<>
			<div className={cn(s.navbar, invertedMenu && s.transparent)}>
				<Logo inverted={invertedMenu} />
			</div>
		</>
	);
}

const Logo = ({ inverted }: { inverted: boolean }) => {
	return (
		<Link href='/' className={cn(s.logo, inverted && s.invert)} passHref={true}>
			<Skabholmen width={174} height={15} />
		</Link>
	);
};
