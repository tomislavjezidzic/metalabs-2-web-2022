<?php
/**
 *
 * @var boolean $show
 * @var array $upper_text
 * @var array $bottom_text
 * @var array $gallery
 *
 */

use metalabs3Web2022\helpers\MediumEditorHelper;
use metalabs3Web2022\images\ImageHelper;

if ( ! empty( $show ) ) {
	$medium_editor_helper = new MediumEditorHelper();
	get_partial( 'components/modules/marque-module', array(
		'upper_text'   => ! empty( $upper_text['marque_text'] ) ? $medium_editor_helper->replace_span_with_paragraph( $upper_text['marque_text'] ) : '',
		'bottom_text'  => ! empty( $bottom_text['marque_text'] ) ? $medium_editor_helper->replace_span_with_paragraph( $bottom_text['marque_text'] ) : '',
		'gallery'      => $gallery,
		'image_helper' => new ImageHelper(),
	) );
}