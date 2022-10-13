<?php

namespace metalabs3Web2022\helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class NavigationHelper {
	public function get_is_active_class( int $object_id, array $submenu_items = array() ): string {
		$current_page_id = get_queried_object_id();

		if ( $object_id === $current_page_id ) {
			return 'is-active';
		}

		if ( ! empty( $submenu_items[0] ) ) {
			foreach ( $submenu_items as $submenu_item ) {
				if ( ( (int) $submenu_item->object_id === $current_page_id ) ) {
					return 'is-active';
				}
			}
		}

		return '';
	}
}
