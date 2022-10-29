<?php

namespace metalabs3Web2022\helpers;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

use bornfight\wpHelpers\acf\ACFLinkHelper;

class LinkHelper extends ACFLinkHelper{
	public function get_link( ?array $link_options = array() ): array {
		$link_data = array(
			'url'    => '',
			'label'  => ! empty( $link_options['label'] ) ? $link_options['label'] : '',
			'target' => ! empty( $link_options['new_tab'] ) ? 'target=_blank' : '',
		);

		return match ( $link_options['type'] ) {
			'internal' => $this->get_internal_data( $link_options['internal'], $link_data ),
			'external' => $this->get_external_link_data( $link_options['external'], $link_data ),
			default => $link_data,
		};

	}

	protected function get_internal_data( int $post_data, array $link_data ): array {
		if ( empty( $post_data ) ) {
			return $link_data;
		}

		$link_data['url']   = get_permalink( $post_data );
		$link_data['label'] = ! empty( $link_data['label'] ) ? $link_data['label'] : get_the_title( $post_data );

		return $link_data;
	}

	public function get_underline_link( array $params ): string {
		return get_partial( 'components/underline-link', $params, true );
	}
}
