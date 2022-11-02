<?php
/**
 *
 * @var boolean $show
 * @var string $anchor_id
 * @var array $slides
 *
 */

if ( ! empty( $show ) ) {
	get_partial( 'components/modules/3d-slider', array(
		'slides'    => $slides,
		'anchor_id' => $anchor_id,
	) );
}