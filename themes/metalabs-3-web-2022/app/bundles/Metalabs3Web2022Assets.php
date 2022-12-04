<?php

namespace metalabs3Web2022\bundles;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

use bornfight\wpHelpers\bundles\AssetBundle;
use metalabs3Web2022\config\Config;

class Metalabs3Web2022Assets extends AssetBundle {
//    public $asyncCss = true;

	public array $js;
	public array $css;

	public function __construct() {
		$this->set_js_data();
		$this->set_css_data();
	}

	public function set_js_data(): void {
		$this->js = array(
			'metalabs3Web2022Vendor' => array(
				'path'     => 'dist/vendor.js',
				'version'  => 1.12,
				'localize' => array(
					'object' => 'frontend_rest_object',
					'data'   => $this->get_localize_data()
				),
				'timestamp_bust' => true
			),
			'metalabs3Web2022Bundle' => array(
				'path'    => 'dist/bundle.js',
				'version' => 1.12,
				'timestamp_bust' => true
			),
		);
	}

	public function set_css_data(): void {
		$this->css = array(
			'metalabs3Web2022MainCSS' => array(
				'path'      => 'dist/style.css',
				'in_footer' => false,
				'version'   => 1.12,
				'timestamp_bust' => true
			),
		);
	}

	public function get_localize_data(): array {
		return array(
			'rest_url' => trailingslashit(get_rest_url( null, Config::get_api_namespace() )),
		);
	}
}
