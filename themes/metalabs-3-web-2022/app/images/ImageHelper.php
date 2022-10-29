<?php

namespace metalabs3Web2022\images;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class ImageHelper extends ImageHandler {
	// This is useful if having mobile and desktop image sizes picture element with source
	public function get_image_partial( array $args ): string {
		if ( empty( $args['image_id'] ) || empty( $args['desktop_image_size'] ) || empty( $args['mobile_image_size'] ) ) {
			return '';
		}

		$args['desktop_image_url'] = $this->get_image_by_size_name( $args['image_id'], $args['desktop_image_size'] );
		$args['mobile_image_url']  = $this->get_image_by_size_name( $args['image_id'], $args['mobile_image_size'] );
		$args['alt']               = $this->get_attachment_alt_text( $args['image_id'] );

		return get_partial( 'images/image', $args, true );
	}

	public function get_service_card_image( int $image_id ): string {
		$image_url = $this->get_image_by_size_name( $image_id, 'image_600' );

		if ( empty( $image_url ) ) {
			return '';
		}

		return sprintf( '<img src="%s" loading="lazy"
                 alt="%s">', esc_url( $image_url ), $this->get_attachment_alt_text( $image_id ) );
	}

	public function get_marque_logo_image( int $image_id ): string {
		$image_url = $this->get_image_by_size_name( $image_id, 'image_600' );

		if ( empty( $image_url ) ) {
			return '';
		}

		return sprintf( '
			<img class="c-marque-module__logo" loading="lazy" src="%s" alt="%s">
		', esc_url( $image_url ), esc_attr( $this->get_attachment_alt_text( $image_id ) ) );
	}
}