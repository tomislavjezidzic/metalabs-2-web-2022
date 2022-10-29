<?php
/**
 *
 * @var boolean $show
 * @var array $slides
 *
 */

if ( ! empty( $show ) ) {
	get_partial( 'components/modules/3d-slider', array(
		'slides' => $slides,
	) );
}