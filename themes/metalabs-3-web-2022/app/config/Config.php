<?php

namespace metalabs3Web2022\config;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Config {
	public static function get_api_namespace(): string {
		return 'bornfight/v1';
	}
}
