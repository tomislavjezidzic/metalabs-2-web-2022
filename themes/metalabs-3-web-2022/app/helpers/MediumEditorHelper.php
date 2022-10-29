<?php

namespace metalabs3Web2022\helpers;

class MediumEditorHelper {
	public function format_emphasized_text( ?string $text ): string {
		if ( empty( $text ) ) {
			return '';
		}

		return preg_replace( '/(<[^>]+) style=".*?"/i', '$1', $text );
	}

	public function replace_span_with_paragraph( ?string $text ): string {
		return str_replace( 'span', 'p', $this->format_emphasized_text( $text ) );
	}
}