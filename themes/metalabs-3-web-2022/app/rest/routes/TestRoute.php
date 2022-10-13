<?php
/**
 *
 * Plugin BF Advanced Images is dependency
 *
 * Plugin repos: https://github.com/bornfight/bf-advanced-images
 * Plugin page: https://wordpress.org/plugins/bf-advanced-images/
 *
 */
namespace metalabs3Web2022\rest\routes;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use bornfight\wpHelpers\rest\BaseRoute;
use metalabs3Web2022\config\Config;
use metalabs3Web2022\rest\callback\TestCallback;

class TestRoute extends BaseRoute {
	public const ROUTE = 'test-route';

	public function get_route_slug(): string {
		return self::ROUTE;
	}

	public function get_namespace(): string {
		return Config::get_api_namespace();
	}

	public function get_args(): array {
		return array(
			'methods'             => array( 'GET' ),
			'callback'            => array(
				new TestCallback(),
				'rest_endpoint'
			),
			'permission_callback' => '__return_true',
		);
	}
}
