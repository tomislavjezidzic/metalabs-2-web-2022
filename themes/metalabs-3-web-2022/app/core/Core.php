<?php

namespace metalabs3Web2022\core;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use metalabs3Web2022\acf\ACFDefaults;
use metalabs3Web2022\menus\Menus;
use metalabs3Web2022\options\RewriteRules;
use metalabs3Web2022\options\RoleManagement;
use metalabs3Web2022\options\WordpressDefaults;
use metalabs3Web2022\adminMenus\CustomMenus;
use metalabs3Web2022\rest\CustomRoutes;
use metalabs3Web2022\postTypes\CustomPostTypes;
use metalabs3Web2022\postTypes\CustomTaxonomies;
use metalabs3Web2022\blocks\CustomBlocks;
use metalabs3Web2022\images\ImageSizes;
use metalabs3Web2022\optimization\WPDefaults;
use metalabs3Web2022\optimization\WPPlugins;

final class Core {
	public function init(): void {
//		$this->init_theme_update_checker();
		$this->init_classes();
	}

	private function init_theme_update_checker(): void {
		if ( class_exists( 'metalabs3Web2022\core\ThemeUpdateChecker' ) ) {
			//Initialize the update checker.
			$example_update_checker = new ThemeUpdateChecker(
				'metalabs-3-web-2022',                                            //Theme folder name, AKA "slug".
				'https://service.bwp.zone/?identifier=358811136dd04a95a840d7a82ccd0f2d&type=manifest' //URL of the metadata file.
			);

			add_action( 'load-themes.php', function () use ( $example_update_checker ) {
				$example_update_checker->check_for_updates();
			} );
		}
	}

	private function init_classes(): void {
		$custom_post_types = new CustomPostTypes();
		$custom_post_types->register();

		$custom_taxonomies = new CustomTaxonomies();
		$custom_taxonomies->register();

		$menus = new Menus();
		$menus->register();

		$custom_menus = new CustomMenus();
		$custom_menus->register();

		$wordpress_defaults = new WordpressDefaults();
		$wordpress_defaults->init();

		$role_management = new RoleManagement();
		$role_management->init();

		$rewrite_rules = new RewriteRules();
		$rewrite_rules->register();

		$custom_routes = new CustomRoutes();
		$custom_routes->register();

		$custom_blocks = new CustomBlocks();
		$custom_blocks->init();

		// Images
		$image_sizes = new ImageSizes();
		$image_sizes->init();

		// Optimization
		$wp_defaults = new WPDefaults();
		$wp_defaults->init();

		$wp_plugins = new WPPlugins();
		$wp_plugins->init();

		$acf_defaults = new ACFDefaults();
		$acf_defaults->init();
	}
}
