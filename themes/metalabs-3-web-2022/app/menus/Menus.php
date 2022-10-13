<?php

namespace metalabs3Web2022\menus;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use bornfight\wpHelpers\menus\BaseMenus;

class Menus extends BaseMenus {
	const HEADER_MENU_LOCATION = 'header-menu';
	const FOOTER_MENU_LOCATION = 'footer-menu';

	public function get_menus(): array {
		return array(
			self::HEADER_MENU_LOCATION        => __( 'Header Menu', 'wp-helpers-bf' ),
			self::FOOTER_MENU_LOCATION        => __( 'Footer Menu', 'wp-helpers-bf' )
		);
	}
}
