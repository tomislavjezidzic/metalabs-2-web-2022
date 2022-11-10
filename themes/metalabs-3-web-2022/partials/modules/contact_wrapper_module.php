<?php
/**
 *
 * @var boolean $show
 * @var string $anchor_id
 * @var string $side_text
 * @var string $medium_editor_title
 * @var string $description
 * @var array $model
 * @var string $email
 *
 */

use metalabs3Web2022\helpers\LinkHelper;
use metalabs3Web2022\helpers\MediumEditorHelper;

if ( ! empty( $show ) ) {
	$medium_editor_helper = new MediumEditorHelper();
	$link_helper          = new LinkHelper();
	$email                = ! empty( $email ) ? sprintf( '<a href="%s"><b>%s</b></a>', $link_helper->get_mailto( $email ), esc_html( $email ) ) : '';

	get_partial( 'components/modules/contact-wrapper-module', array(
		'side_text'   => $side_text,
		'title'       => ! empty( $medium_editor_title ) ? $medium_editor_helper->format_emphasized_text( $medium_editor_title ) : '',
		'description' => $description,
		'model'       => $model,
		'anchor_id'   => $anchor_id,
		'email'       => $email,
	) );
}