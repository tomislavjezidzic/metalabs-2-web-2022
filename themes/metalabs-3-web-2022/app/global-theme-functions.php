<?php

use bornfight\wpHelpers\core\PartialFinder;

/**
 * Base url convertion method.
 *
 * @param $url
 *
 * @return string
 */
function bu( $url ) {
	$clean = trim( $url );

	return INCLUDE_URL . "/static/" . $clean;
}

function au( $url ) {
	$clean = trim( $url );

	return get_template_directory() . "/static/" . $clean;
}

function get_partial( $partial, $data = null, $return = false, $folder = PartialFinder::PARTIAL_FOLDER ) {
	return PartialFinder::get_instance()->get_partial( $partial, $data, $return, $folder );
}

/**
 * Get icon method.
 *
 * @param $name
 *
 * @return string
 */
function get_icon( $name ) {
	return get_partial( 'icons/icon-' . $name, [], true, 'static' );
}

function bf_content( int $id = null ) {
	global $post;

	if ( empty( $id ) ) {
		$id = $post->ID;
	}

	return apply_filters( 'the_content', get_post_field( 'post_content', $id ) );
}

// When flexible layout is used -> just change partial url if you are using different
function get_modules_partial( array $modules, array $dependencies = array() ): void {
	if ( ! empty( $modules ) ) {
		foreach ( $modules as $index => $module ) {
			$module['index'] = $index;
			$module          = array_merge( $dependencies, $module );
			get_module_partial( $module );
		}
	}
}

function get_module_partial( array $module ): void {
	get_partial( 'modules/' . $module['acf_fc_layout'], $module );
}