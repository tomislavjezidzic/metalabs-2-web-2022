<?php
/**
 * @var boolean $show
 * @var string $side_text
 * @var string $medium_editor_title
 * @var string $description
 */

use metalabs3Web2022\helpers\MediumEditorHelper;

if ( ! empty( $show ) ) {
	$medium_editor_helper = new MediumEditorHelper();
	get_partial( 'components/modules/text-module', array(
		'side_text'   => $side_text,
		'title'       => ! empty( $medium_editor_title ) ? $medium_editor_helper->format_emphasized_text( $medium_editor_title ) : '',
		'description' => $description,
	) );
}

