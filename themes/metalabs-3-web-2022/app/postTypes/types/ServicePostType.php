<?php

namespace metalabs3Web2022\postTypes\types;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use bornfight\wpHelpers\postTypes\BasePostType;
use bornfight\wpHelpers\postTypes\CustomPostTypeInterface;

class ServicePostType extends BasePostType implements CustomPostTypeInterface {
	public const LABEL = 'Service';
	public const LABEL_PLURAL = 'Services';
	public const SLUG = 'service';

	public function get_post_type_slug(): string {
		return self::SLUG;
	}

	/**
	 * Change default labels here before return
	 *
	 * @return array
	 */
	public function get_labels(): array {
		return $this->get_default_labels( self::LABEL, self::LABEL_PLURAL );
	}

	/**
	 * Change default args here before return
	 *
	 * @return array
	 */
	public function get_args(): array {
		$args                       = $this->get_default_args( $this->get_labels() );
		$args['public']             = false;
		$args['publicly_queryable'] = false;
		$args['supports']           = array( 'title', 'thumbnail' );
		$args['menu_icon']          = 'dashicons-edit-large';

		return $args;
	}
}
