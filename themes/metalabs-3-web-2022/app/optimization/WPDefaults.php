<?php

namespace metalabs3Web2022\optimization;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use bornfight\wpHelpers\optimization\BaseWPDefaultsOptimization;

class WPDefaults extends BaseWPDefaultsOptimization {
	public function init() : void {
		$this->deactivate_gutenberg_scripts();
		$this->deactivate_wp_comments();
		$this->deactivate_wp_embeds();
		$this->deactivate_wp_emoji();
		$this->deactivate_wp_js_dependencies( array(
			'remove_jquery_migrate'       => true,
			'remove_jquery_migrate_admin' => true,
			'remove_jquery_on_front'      => true,
		) );
		$this->deactivate_wp_posts();

		// Add CDN Jquery
//		$this->add_jquery_cdn();
	}
}
