<?php

namespace metalabs3Web2022\optimization;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use bornfight\wpHelpers\optimization\BaseWPPluginsOptimization;

class WPPlugins extends BaseWPPluginsOptimization {
	public function init(): void {
		$this->deactivate_acfe_options( array(
			'remove_acfe_module_author',
			'remove_acfe_dynamic_block_types',
			'remove_acfe_dynamic_dynamic_forms',
			'remove_acfe_dynamic_post_type',
			'remove_acfe_dynamic_taxonomies',
			'remove_acfe_dynamic_options_page',
			'remove_acfe_multi_language_support',
			'remove_acfe_module_options',
			'remove_acfe_module_taxonomies_enhancements',
		) );
	}
}
