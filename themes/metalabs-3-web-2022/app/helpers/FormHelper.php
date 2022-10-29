<?php

namespace metalabs3Web2022\helpers;

// cf7
class FormHelper {
	public function get_form( int $form_id ): string {
		if ( empty( $form_id ) ) {
			return '';
		}

		return do_shortcode( $this->get_form_content( $form_id ) );
	}

	public function get_form_content( int $form_id, string $form_class = '' ): string {
		return sprintf( '[contact-form-7 id="%s" title="%s" html_class="%s"]',
			esc_attr( $form_id ),
			get_the_title( $form_id ),
			esc_attr( $form_class ) );
	}
}